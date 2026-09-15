// scripts/verify-hero-viewports.mjs
// Real browser inspection across 390px, 768px, 1024px, and 1440px viewports

import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const APP_URL = process.env.APP_URL || "http://localhost:3000";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runBrowserTests() {
  console.log("Starting Chrome Headless for multi-viewport inspection...");
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--user-data-dir=C:\\Users\\sriram\\.gemini\\antigravity\\brain\\chrome-temp",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  await sleep(1500);

  try {
    // 1. Get DevTools WebSocket target
    const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const targets = await versionRes.json();
    const pageTarget = targets.find((t) => t.type === "page") || targets[0];
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
    console.log("VIEWPORT INSPECTION RESULTS");
    console.log("==================================================\n");

    let allPassed = true;

    for (const vp of viewports) {
      await send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.width <= 768,
      });

      await sleep(1000);

      // Evaluate headline geometry, text, wrapping, and horizontal overflow
      const evalRes = await send("Runtime.evaluate", {
        expression: `(() => {
          const h1 = document.querySelector('h1');
          const body = document.body;
          const docEl = document.documentElement;

          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const hasHorizontalOverflow = scrollWidth > clientWidth;

          if (!h1) return { error: "h1 not found" };

          const rect = h1.getBoundingClientRect();
          const spans = Array.from(h1.querySelectorAll('span')).map(s => ({
            text: s.innerText.trim(),
            rect: s.getBoundingClientRect(),
            display: window.getComputedStyle(s).display,
          }));

          const secondaryP = h1.parentElement.querySelector('p');
          const secondaryText = secondaryP ? secondaryP.innerText.trim() : "";

          return {
            scrollWidth,
            clientWidth,
            hasHorizontalOverflow,
            h1Text: h1.innerText.replace(/\\s+/g, ' ').trim(),
            h1Rect: { width: Math.round(rect.width), height: Math.round(rect.height), left: Math.round(rect.left), right: Math.round(rect.right) },
            h1FontSize: window.getComputedStyle(h1).fontSize,
            h1LineHeight: window.getComputedStyle(h1).lineHeight,
            spans: spans.map(s => ({ text: s.text, width: Math.round(s.rect.width), height: Math.round(s.rect.height), display: s.display })),
            secondaryText,
          };
        })()`,
        returnByValue: true,
      });

      const metrics = evalRes.result.value;

      console.log(`[VIEWPORT: ${vp.name}]`);
      console.log(`  Screen Width: ${vp.width}px | Document Client Width: ${metrics.clientWidth}px | Scroll Width: ${metrics.scrollWidth}px`);
      console.log(`  Horizontal Overflow: ${metrics.hasHorizontalOverflow ? "FAIL (YES)" : "PASS (NONE)"}`);
      console.log(`  Headline Text: "${metrics.h1Text}"`);
      console.log(`  Headline Font Size: ${metrics.h1FontSize} (Line Height: ${metrics.h1LineHeight})`);
      console.log(`  Headline Bounding Box: ${metrics.h1Rect.width}px × ${metrics.h1Rect.height}px (left: ${metrics.h1Rect.left}px, right: ${metrics.h1Rect.right}px)`);
      console.log(`  Secondary Positioning: "${metrics.secondaryText}"`);

      // Verify no horizontal overflow
      if (metrics.hasHorizontalOverflow) {
        console.error(`  --> FAILED: Horizontal overflow detected (${metrics.scrollWidth}px > ${metrics.clientWidth}px)`);
        allPassed = false;
      }

      // Verify headline width is within clientWidth
      if (metrics.h1Rect.right > metrics.clientWidth) {
        console.error(`  --> FAILED: Headline right edge (${metrics.h1Rect.right}px) exceeds viewport width (${metrics.clientWidth}px)`);
        allPassed = false;
      }

      // Take a screenshot
      const shot = await send("Page.captureScreenshot", { format: "png" });
      const shotDir = "C:\\Users\\sriram\\.gemini\\antigravity\\brain\\d9774dd1-f8c0-4902-a8a6-f9b7e51040ec";
      const shotPath = path.join(shotDir, `hero_${vp.width}px.png`);
      fs.writeFileSync(shotPath, Buffer.from(shot.data, "base64"));
      console.log(`  Screenshot saved: hero_${vp.width}px.png\n`);
    }

    console.log("==================================================");
    console.log(`CONSOLE ERRORS COUNT: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((e) => console.error("Console Error:", e));
      allPassed = false;
    }
    console.log(`OVERALL RESULT: ${allPassed ? "ALL VIEWPORTS PASSED WITH ZERO OVERFLOW" : "VERIFICATION FAILED"}`);
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

runBrowserTests();

