import fs from "fs";
import path from "path";

console.log("=== PHASE 2 ROUTE HTML AUDIT ===");
const routes = [
  ".next/server/app/index.html",
  ".next/server/app/about.html",
  ".next/server/app/products.html",
  ".next/server/app/products/maxycod.html",
  ".next/server/app/business-enquiry.html",
  ".next/server/app/pcd-pharma.html",
  ".next/server/app/why-aaliis.html",
  ".next/server/app/contact.html",
  ".next/server/app/terms.html",
  ".next/server/app/privacy.html",
];

for (const r of routes) {
  if (fs.existsSync(r)) {
    const html = fs.readFileSync(r, "utf8");
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    const twitterMatch = html.match(/<meta name="twitter:card" content="([^"]+)"/);
    const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gs);
    const cleanRoute = r.replace(".next/server/app/", "");

    console.log(
      cleanRoute.padEnd(25) +
      " | Canonical: " +
      (canonicalMatch ? canonicalMatch[1] : "MISSING").padEnd(35) +
      " | Twitter: " +
      (twitterMatch ? twitterMatch[1] : "MISSING").padEnd(22) +
      " | H1 count: " +
      (h1Matches ? h1Matches.length : 0)
    );
  }
}

console.log("\n=== IMAGE ALT TEXT AUDIT (products.html & maxycod.html) ===");
const prodHtml = fs.readFileSync(".next/server/app/products.html", "utf8");
const imgTags = prodHtml.match(/<img[^>]+>/g) || [];
console.log(`Found ${imgTags.length} <img> tags on /products:`);
imgTags.slice(0, 5).forEach((t, i) => {
  const alt = t.match(/alt="([^"]*)"/);
  console.log(`  Img ${i + 1} alt: "${alt ? alt[1] : "NO ALT"}"`);
});

const detailHtml = fs.readFileSync(".next/server/app/products/maxycod.html", "utf8");
const detailImgs = detailHtml.match(/<img[^>]+>/g) || [];
console.log(`Found ${detailImgs.length} <img> tags on /products/maxycod:`);
detailImgs.forEach((t, i) => {
  const alt = t.match(/alt="([^"]*)"/);
  console.log(`  Img ${i + 1} alt: "${alt ? alt[1] : "NO ALT"}"`);
});

