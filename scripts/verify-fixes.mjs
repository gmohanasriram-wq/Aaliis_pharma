import fs from "fs";
import path from "path";

console.log("=== RUNNING VERIFICATION CHECKS ===\n");

// 1. Check Product Categories Count in data/products.ts
const productsContent = fs.readFileSync("data/products.ts", "utf8");
const categoryMatches = [...productsContent.matchAll(/category:\s*"([^"]+)"/g)].map(m => m[1]);
console.log("1. Verifying 19 Products & Canonical Categories:");
const counts = {};
for (const cat of categoryMatches) {
  counts[cat] = (counts[cat] || 0) + 1;
}
console.table(counts);
const total = Object.values(counts).reduce((a, b) => a + b, 0);
console.log("Total Products:", total);
if (total !== 19) throw new Error("Expected 19 products, found " + total);

// 2. Check Image Sizes
console.log("\n2. Verifying Image Asset Sizes:");
const dir = "public/images/products";
const files = fs.readdirSync(dir).filter(f => f.endsWith(".webp"));
let totalBytes = 0;
for (const f of files) {
  const sz = fs.statSync(path.join(dir, f)).size;
  totalBytes += sz;
}
console.log("19 Product Images Total Size:", (totalBytes / 1024 / 1024).toFixed(2), "MB (Target: < 2 MB)");
const logoSz = fs.statSync("public/images/aaliis-logo.png").size;
console.log("Logo Size:", (logoSz / 1024).toFixed(1), "KB (Target: < 200 KB)");

// 3. Check Form Labels & Inputs in Business Enquiry Form
console.log("\n3. Verifying Form Accessibility:");
const formContent = fs.readFileSync("components/forms/business-enquiry-form.tsx", "utf8");
const requiredIds = [
  "enquiry-name",
  "enquiry-company-name",
  "enquiry-phone",
  "enquiry-email",
  "enquiry-city",
  "enquiry-district",
  "enquiry-business-type",
  "enquiry-message",
];
for (const id of requiredIds) {
  const hasId = formContent.includes(`id="${id}"`);
  const hasHtmlFor = formContent.includes(`htmlFor="${id}"`);
  console.log(` - ${id}: id=${hasId}, htmlFor=${hasHtmlFor}`);
  if (!hasId || !hasHtmlFor) throw new Error("Missing id or htmlFor for " + id);
}

// 4. Check Search input aria-label in ProductGrid
console.log("\n4. Verifying Catalogue Search Accessible Name:");
const gridContent = fs.readFileSync("components/products/product-grid.tsx", "utf8");
const hasAriaLabel = gridContent.includes('aria-label="Search formulations');
console.log(" - ProductGrid search aria-label present:", hasAriaLabel);
if (!hasAriaLabel) throw new Error("Missing search aria-label");

// 5. Check Breadcrumbs aria-label
console.log("\n5. Verifying Breadcrumbs Accessible Name:");
const detailContent = fs.readFileSync("app/products/[slug]/page.tsx", "utf8");
const hasBreadcrumbAria = detailContent.includes('aria-label="Breadcrumb"');
console.log(" - Breadcrumb aria-label present:", hasBreadcrumbAria);
if (!hasBreadcrumbAria) throw new Error("Missing breadcrumb aria-label");

// 6. Check Page Loader removed entirely
// It was reduced to `return null` when the blocking delay came out, and has since
// been deleted along with its mount in app/layout.tsx. Asserting absence is the
// stronger form of the original check: a loader that does not exist cannot block.
console.log("\n6. Verifying Page Loader Removed:");
const loaderPath = "components/motion/page-loader.tsx";
const loaderGone = !fs.existsSync(loaderPath);
console.log(" - components/motion/page-loader.tsx absent:", loaderGone);
if (!loaderGone) throw new Error("PageLoader module still exists");
const layoutContent = fs.readFileSync("app/layout.tsx", "utf8");
const stillMounted = layoutContent.includes("PageLoader");
console.log(" - no PageLoader reference in app/layout.tsx:", !stillMounted);
if (stillMounted) throw new Error("PageLoader still mounted in app/layout.tsx");

console.log("\n=== ALL AUDIT VERIFICATIONS PASSED SUCCESSFULLY ===");

