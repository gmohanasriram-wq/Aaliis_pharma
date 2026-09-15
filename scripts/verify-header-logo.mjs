// scripts/verify-header-logo.mjs
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9223;
const APP_URL = process.env.APP_URL || "http://localhost:3000";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runLogoVerification() {
  console.log("Starting Chrome Headless for Header Logo Verification on port " + PORT + "...");
  const userDir = "C:\\Users\\sriram\\.gemini\\antigravity\\brain\\chrome-temp-" + Date.now();
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      `--user-data-dir=${userDir}`,
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  try {
    let targets = null;
    for (let attempt = 0; attempt < 10; attempt++) {
      await sleep(500);
      try {
        const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
        targets = await versionRes.json();
        if (Array.isArray(targets) && targets.length > 0) break;
      } catch (e) {
        // retry
      }
    }
    const pageTarget = targets ? (targets.find((t) => t.type === "page") || targets[0]) : null;
    if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
      throw new Error("Could not find WebSocket target in Chrome");
    }

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let msgId = 1;
    const callbacks = new Map();
    const consoleErrors = [];

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.method === "Runtime.consoleAPICalled" && data.params.type === "error") {
        consoleErrors.push(data.params.args.map((a) => a.value || a.description).join(" "));
      }
      if (data.id && callbacks.has(data.id)) {
        const cb = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) cb.reject(data.error);
        else cb.resolve(data.result);
      }
    };

    await new Promise((res) => (ws.onopen = res));

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        callbacks.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send("Runtime.enable");
    await send("Page.enable");
    await send("DOM.enable");

    console.log(`Navigating to ${APP_URL}...`);
    await send("Page.navigate", { url: APP_URL });
    await sleep(2500);

    const viewports = [
      { width: 390, height: 844, name: "390px (Mobile Portrait)" },
      { width: 768, height: 1024, name: "768px (Tablet)" },
      { width: 1024, height: 768, name: "1024px (Laptop / Desktop)" },
      { width: 1440, height: 900, name: "1440px (Wide Desktop)" },
    ];

    console.log("\n==================================================");
    console.log("HEADER LOGO VIEWPORT INSPECTION RESULTS");
    console.log("==================================================\n");

    let allPassed = true;

    for (const vp of viewports) {
      await send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.width <= 768,
      });

      await sleep(800);

      const evalRes = await send("Runtime.evaluate", {
        expression: `(() => {
          const header = document.querySelector('header');
          const logoImg = header ? header.querySelector('img[alt*="Aaliis Pharmaceuticals"]') : null;
          const body = document.body;
          const docEl = document.documentElement;

          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const hasHorizontalOverflow = scrollWidth > clientWidth;

          if (!logoImg) return { error: "Header logo img not found" };

          const logoRect = logoImg.getBoundingClientRect();
          const headerRect = header.getBoundingClientRect();

          return {
            scrollWidth,
            clientWidth,
            hasHorizontalOverflow,
            logoRect: {
              width: Math.round(logoRect.width * 10) / 10,
              height: Math.round(logoRect.height * 10) / 10,
              top: Math.round(logoRect.top * 10) / 10,
              bottom: Math.round(logoRect.bottom * 10) / 10,
              left: Math.round(logoRect.left * 10) / 10,
              right: Math.round(logoRect.right * 10) / 10,
            },
            headerHeight: Math.round(headerRect.height * 10) / 10,
            aspectRatio: Math.round((logoRect.width / logoRect.height) * 100) / 100,
          };
        })()`,
        returnByValue: true,
      });

      const metrics = evalRes.result.value;

      console.log(`[VIEWPORT: ${vp.name}]`);
      console.log(`  Screen Width: ${vp.width}px | Document Width: ${metrics.clientWidth}px`);
      console.log(`  Logo Rendered Dimensions: ${metrics.logoRect.width}px (W) × ${metrics.logoRect.height}px (H)`);
      console.log(`  Logo Aspect Ratio (W/H): ${metrics.aspectRatio} (Natural ~1.50)`);
      console.log(`  Header Total Height: ${metrics.headerHeight}px`);
      console.log(`  Horizontal Overflow: ${metrics.hasHorizontalOverflow ? "FAIL (YES)" : "PASS (NONE)"}`);

      if (metrics.hasHorizontalOverflow) {
        console.error(`  --> FAILED: Horizontal overflow detected`);
        allPassed = false;
      }

      // Check mobile vs desktop target sizes
      if (vp.width <= 768) {
        if (metrics.logoRect.width < 55 || metrics.logoRect.width > 75) {
          console.warn(`  --> Note: mobile width (${metrics.logoRect.width}px) expected ~60-70px`);
        } else {
          console.log(`  --> PASS: mobile width is within ~60-70px range`);
        }
      } else {
        if (metrics.logoRect.width < 75 || metrics.logoRect.width > 88) {
          console.warn(`  --> Note: desktop width (${metrics.logoRect.width}px) expected ~75-85px`);
        } else {
          console.log(`  --> PASS: desktop width is within ~75-85px range`);
        }
      }

      // Capture screenshot
      const shot = await send("Page.captureScreenshot", { format: "png" });
      const shotDir = "C:\\Users\\sriram\\.gemini\\antigravity\\brain\\d9774dd1-f8c0-4902-a8a6-f9b7e51040ec";
      const shotPath = path.join(shotDir, `header_logo_${vp.width}px.png`);
      fs.writeFileSync(shotPath, Buffer.from(shot.data, "base64"));
      console.log(`  Screenshot saved: header_logo_${vp.width}px.png\n`);
    }

    console.log("==================================================");
    console.log(`CONSOLE ERRORS COUNT: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((e) => console.error("Console Error:", e));
      allPassed = false;
    }
    console.log(`OVERALL RESULT: ${allPassed ? "ALL VIEWPORTS PASSED" : "VERIFICATION FAILED"}`);
    console.log("==================================================\n");

    ws.close();
    chromeProcess.kill();
    process.exit(allPassed ? 0 : 1);
  } catch (err) {
    console.error("Browser test error:", err);
    chromeProcess.kill();
    process.exit(1);
  }
}

runLogoVerification();
