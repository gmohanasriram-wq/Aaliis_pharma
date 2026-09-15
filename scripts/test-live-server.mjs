import http from "http";

const testRoutes = [
  { path: "/", expectedStatus: 200 },
  { path: "/about", expectedStatus: 200 },
  { path: "/products", expectedStatus: 200 },
  { path: "/pcd-pharma", expectedStatus: 200 },
  { path: "/why-aaliis", expectedStatus: 200 },
  { path: "/contact", expectedStatus: 200 },
  { path: "/business-enquiry", expectedStatus: 200 },
  { path: "/terms", expectedStatus: 200 },
  { path: "/privacy", expectedStatus: 200 },
  { path: "/products/maxycod", expectedStatus: 200 },
  { path: "/products/invalid-slug-xyz", expectedStatus: 404, expectedText: "Formulation or Page Record Not Located" },
  { path: "/unknown-route-test", expectedStatus: 404, expectedText: "404" },
];

async function run() {
  console.log("=== TESTING LIVE NEXT.JS PRODUCTION SERVER (PORT 3008) ===\n");
  let allPassed = true;
  for (const t of testRoutes) {
    await new Promise((resolve) => {
      http
        .get("http://localhost:3008" + t.path, (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            const statusOk = res.statusCode === t.expectedStatus;
            const textOk = !t.expectedText || data.includes(t.expectedText);
            const passed = statusOk && textOk;
            console.log(
              (passed ? "✓ PASS" : "✗ FAIL").padEnd(8),
              t.path.padEnd(30),
              `Status: ${res.statusCode} (expected ${t.expectedStatus})`,
              t.expectedText ? `| Text Verified: ${textOk}` : ""
            );
            if (!passed) allPassed = false;
            resolve();
          });
        })
        .on("error", (err) => {
          console.error("Connection error for", t.path, err.message);
          allPassed = false;
          resolve();
        });
    });
  }
  console.log("\nAll live endpoint tests passed:", allPassed);
  process.exit(allPassed ? 0 : 1);
}

run();

