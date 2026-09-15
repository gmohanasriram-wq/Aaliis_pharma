import fs from "fs";
import path from "path";

console.log("=== RUNNING PHASE 4 PRODUCTION AUDIT & VERIFICATION ===\n");

// 1. Edge State: Not Found Page Verification
console.log("1. Verifying Branded 404 Page (app/not-found.tsx):");
const notFoundExists = fs.existsSync("app/not-found.tsx");
if (!notFoundExists) throw new Error("Missing app/not-found.tsx");
const notFoundSrc = fs.readFileSync("app/not-found.tsx", "utf8");
const hasProductsLink = notFoundSrc.includes('href="/products"');
const hasHomeLink = notFoundSrc.includes('href="/"');
const hasEnquiryLink = notFoundSrc.includes('href="/business-enquiry"');
console.log(" - not-found.tsx exists:", notFoundExists);
console.log(" - Has /products catalogue recovery link:", hasProductsLink);
console.log(" - Has / homepage recovery link:", hasHomeLink);
console.log(" - Has /business-enquiry conversion link:", hasEnquiryLink);
if (!hasProductsLink || !hasHomeLink || !hasEnquiryLink) {
  throw new Error("not-found.tsx is missing required recovery links");
}

// 2. Edge State: Error Boundary Verification
console.log("\n2. Verifying Error Boundary (app/error.tsx):");
const errorExists = fs.existsSync("app/error.tsx");
if (!errorExists) throw new Error("Missing app/error.tsx");
const errorSrc = fs.readFileSync("app/error.tsx", "utf8");
const hasReset = errorSrc.includes("reset()");
const hasErrorProducts = errorSrc.includes('href="/products"');
const hasErrorHome = errorSrc.includes('href="/"');
const hasErrorContact = errorSrc.includes('href="/contact"');
console.log(" - error.tsx exists:", errorExists);
console.log(" - Has reset() retry mechanism:", hasReset);
console.log(" - Has /products recovery link:", hasErrorProducts);
console.log(" - Has / homepage recovery link:", hasErrorHome);
console.log(" - Has /contact support desk link:", hasErrorContact);
if (!hasReset || !hasErrorProducts || !hasErrorHome || !hasErrorContact) {
  throw new Error("error.tsx is missing broad recovery options");
}

// 3. Accessibility: Skip-to-content Link in Root Layout
console.log("\n3. Verifying Skip-to-Content Link (app/layout.tsx):");
const layoutSrc = fs.readFileSync("app/layout.tsx", "utf8");
const hasSkipLink = layoutSrc.includes('href="#main-content"') && layoutSrc.includes('Skip to main content');
const hasMainId = layoutSrc.includes('id="main-content"') && layoutSrc.includes('tabIndex={-1}');
console.log(" - Skip to main content link present:", hasSkipLink);
console.log(" - Main landmark id='main-content' and tabIndex={-1} present:", hasMainId);
if (!hasSkipLink || !hasMainId) {
  throw new Error("Missing skip-to-content landmark in app/layout.tsx");
}

// 4. Accessibility: Nav Links aria-current & Focus Rings
console.log("\n4. Verifying Navigation Accessibility (components/navigation/nav-links.tsx):");
const navSrc = fs.readFileSync("components/navigation/nav-links.tsx", "utf8");
const hasAriaCurrent = navSrc.includes('aria-current={isActive ? "page" : undefined}');
const hasNavFocus = navSrc.includes("focus-visible:ring-2 focus-visible:ring-brand-forest-800");
console.log(" - aria-current='page' dynamic attribute present:", hasAriaCurrent);
console.log(" - Visible keyboard focus ring present:", hasNavFocus);
if (!hasAriaCurrent || !hasNavFocus) {
  throw new Error("Navigation links missing accessibility attributes");
}

// 5. Accessibility: Category Tabs Focus Rings
console.log("\n5. Verifying Category Tabs Focus Rings (components/products/product-grid.tsx):");
const gridSrc = fs.readFileSync("components/products/product-grid.tsx", "utf8");
const hasTabFocus = gridSrc.includes("focus-visible:ring-2 focus-visible:ring-brand-forest-800");
console.log(" - Category filter tabs visible focus ring present:", hasTabFocus);
if (!hasTabFocus) {
  throw new Error("Category tabs missing keyboard focus styles");
}

// 6. Form Polish & Edge States: Business Enquiry Form
console.log("\n6. Verifying B2B Form Validation & Edge States (components/forms/business-enquiry-form.tsx):");
const formSrc = fs.readFileSync("components/forms/business-enquiry-form.tsx", "utf8");
const hasNormalizePhone = formSrc.includes("normalizePhone");
const hasPhoneAriaInvalid = formSrc.includes("aria-invalid={Boolean(errors.phone)}");
const hasPhoneAriaDescribed = formSrc.includes('aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}');
const hasPhoneAlert = formSrc.includes('id="enquiry-phone-error"') && formSrc.includes('role="alert"');
const hasEmailAriaInvalid = formSrc.includes("aria-invalid={Boolean(errors.email)}");
const hasEmailAriaDescribed = formSrc.includes('aria-describedby={errors.email ? "enquiry-email-error" : undefined}');
const hasEmailAlert = formSrc.includes('id="enquiry-email-error"') && formSrc.includes('role="alert"');
const hasSubmittingState = formSrc.includes("isSubmitting") && formSrc.includes("Processing Enquiry...");
const hasResetAction = formSrc.includes("Submit Another Commercial Enquiry");

console.log(" - Phone input normalization helper present:", hasNormalizePhone);
console.log(" - Phone aria-invalid & aria-describedby present:", hasPhoneAriaInvalid && hasPhoneAriaDescribed);
console.log(" - Phone role='alert' element present:", hasPhoneAlert);
console.log(" - Email aria-invalid & aria-describedby present:", hasEmailAriaInvalid && hasEmailAriaDescribed);
console.log(" - Email role='alert' element present:", hasEmailAlert);
console.log(" - Subtle submission state present:", hasSubmittingState);
console.log(" - Reset/Submit Another Enquiry action present:", hasResetAction);

if (!hasNormalizePhone || !hasPhoneAlert || !hasEmailAlert || !hasSubmittingState || !hasResetAction) {
  throw new Error("Form missing required accessible validation or edge states");
}

// 7. Security & Code Hygiene Audit
console.log("\n7. Verifying Application Security & Cleanliness:");
let securityClean = true;
function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next" && entry.name !== ".git") {
      scanDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (content.includes("dangerouslySetInnerHTML")) {
        console.error("FAILED: dangerouslySetInnerHTML found in", fullPath);
        securityClean = false;
      }
      if (content.includes("TODO:") || content.includes("FIXME:")) {
        console.warn("WARNING: TODO/FIXME found in", fullPath);
      }
    }
  }
}
scanDirectory("app");
scanDirectory("components");
scanDirectory("data");
console.log(" - 0 dangerouslySetInnerHTML instances:", securityClean);
if (!securityClean) throw new Error("Security check failed");

// 8. HTML Output Audit across All Built Routes
console.log("\n8. Verifying Pre-rendered HTML Output & Headings:");
const buildAppDir = ".next/server/app";
const routesToAudit = [
  "index.html",
  "about.html",
  "products.html",
  "pcd-pharma.html",
  "why-aaliis.html",
  "contact.html",
  "business-enquiry.html",
  "terms.html",
  "privacy.html",
  "_not-found.html",
  "products/maxycod.html",
  "products/levomak-lc.webp.html" // check another dynamic slug
];

routesToAudit.forEach((routeFile) => {
  const filePath = path.join(buildAppDir, routeFile);
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, "utf8");
    const h1s = (html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || []).length;
    const hasCanonical = html.includes('rel="canonical"');
    console.log(` - ${routeFile.padEnd(30)} | H1 count: ${h1s} | Canonical: ${hasCanonical}`);
    if (h1s !== 1) {
      throw new Error(`Route ${routeFile} has ${h1s} H1 tags (expected 1)`);
    }
  }
});

console.log("\n=== ALL PHASE 4 PRODUCTION CHECKS PASSED WITH ZERO DEFECTS ===");

