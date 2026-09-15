# Aaliis Pharmaceuticals — Agentic Engineering Master Data

## Purpose

This file is the source-of-truth input for an agentic engineering workflow building the Aaliis Pharmaceuticals website.

The website is for **Aaliis Pharmaceuticals**, a **B2B PCD pharma company** supplying pharmaceutical products to **pharmacies, hospitals, and distributors across Tamil Nadu**.

Do not position Aaliis as an online retail pharmacy or direct-to-patient medicine seller.

---

# 1. Company Master Data

| Field | Value |
|---|---|
| Legal name | AALIIS PHARMACEUTICALS |
| Trade name | AALIIS PHARMACEUTICALS |
| Business constitution | Partnership |
| Business model | PCD Pharma |
| Established | 17 February 2025 |
| GSTIN | 33ACIFA9984F1Z2 |
| Principal place of business | No. 1/29, 1st Main Road, Kavivarasu Kannadasan Nagar, Kodungaiyur, Chennai, Tamil Nadu – 600118 |
| Operational area | All over Tamil Nadu |
| Customer types | Pharmacies, hospitals, distributors |
| Direct patient sales | No |
| Public phone | +91 8072051898 |
| Public email | aaliispharma2025@gmail.com |
| M. Gopi designation currently supplied | Regional Business Manager |
| Form 20B drug licence | TN/205/20B/00848 |
| Form 21B drug licence | TN/205/21B/00848 |
| Official company logo | `./images/aaliis-logo.png` (also accessible as `./images/logo.png`) |

## Partners

The GST certificate identifies:

- Dhayalan Yogeshwari — Partner
- Gopi Kalpana — Partner

Do not change these names or infer other legal roles without source documentation.

## Designation rule

The supplied visiting-card designation for M. Gopi is **Regional Business Manager**.

Do **not** publish "CEO" unless official company documentation later confirms that designation.

---

# 2. Business Positioning

## Core business

Aaliis Pharmaceuticals operates as a **PCD pharma company**.

## Customers

Aaliis supplies:

- Pharmacies
- Hospitals
- Distributors

## Geographic coverage

- All over Tamil Nadu

## Patient-facing model

- Aaliis does **not** sell medicines directly to patients.

## Website positioning

The website should function primarily as a **B2B pharmaceutical company and product catalogue / enquiry website**.

Avoid positioning the company as:

- Online pharmacy
- Retail medicine store
- Direct-to-consumer medicine seller
- Medicine e-commerce marketplace

## Primary website conversion actions

Recommended business-oriented actions:

- Request Product Details
- Business Enquiry
- Become a Distributor
- Request PCD Franchise Information
- Contact Us

Avoid consumer e-commerce CTAs such as:

- Buy Now
- Add to Cart
- Order Medicine Online

---

# 3. Recommended Website Structure

```text
AALIIS PHARMACEUTICALS
│
├── Home
├── About Us
├── Products
│   ├── Product Categories
│   └── Individual Product Pages
├── PCD Pharma
├── Why Aaliis
├── Business Enquiry
├── Contact Us
├── Privacy Policy
├── Terms / Legal
└── Regulatory / Quality Information
```

---

# 4. Product Data Status

There are currently **19 unique products identified in the conversation**.

Important engineering rule:

- Treat the actual product packaging/photos and verified company information as the source of truth.
- Do not invent missing product information.
- Do not silently correct unusual units, names, spellings, or compositions.
- If a product field is uncertain, mark it as `needs_verification`.
- Product and manufacturer datasets are **separate datasets**.

## Product list

1. MAXYCOD
2. Nervlis Plus
3. Myozac
4. Tryptomec
5. Regawin 75 M
6. Fluparin-P
7. ALFROS
8. Gladior-P
9. Regawin-50M
10. Rabedon-DSR
11. Biolis-M
12. Gladior-SP
13. Panvolis-DSR / Pantolis-DSR — exact naming should be verified against packaging
14. Pantolis-40
15. Pregawin-NT
16. Etozen-MR
17. ZECAL-D3
18. Nervlis
19. Levomak-LC

## Product schema

Each product record should be designed to support:

```text
product
├── id
├── brand_name
├── category
├── generic_composition
├── dosage_form
├── strength
├── pack_size
├── prescription_status
├── classification
├── dosage_or_usage
├── storage
├── manufacturer_reference (optional/internal)
├── marketed_by
├── product_image
├── description
├── verification_status
└── source_notes
```

Important: manufacturer information should not be structurally required for the public product page because the manufacturer dataset is maintained separately.

---

# 5. Manufacturer Data — Separate Dataset

The manufacturer dataset exists to communicate **quality, regulatory compliance, manufacturing capability, and reliability**.

It is NOT intended to:

- Market manufacturers
- Generate leads for manufacturers
- Display manufacturer sales contacts
- Display manufacturer phone/email
- Promote manufacturers as businesses

The website should communicate that Aaliis works with qualified manufacturing partners and that manufacturing quality is evaluated using documented quality and regulatory information.

## Manufacturer schema

```text
manufacturer
├── id
├── name
├── manufacturing_licence
├── who_gmp_gmp_status
├── iso_certifications
├── regulatory_information
├── manufacturing_capabilities
├── quality_reliability_assessment
└── verification_status
```

## Required public manufacturer fields

1. Manufacturing licence
2. WHO-GMP / GMP status
3. ISO certifications
4. Regulatory information
5. Manufacturing capabilities
6. Overall quality / reliability assessment

Do NOT expose manufacturer contact details unless specifically required later.

---

# 6. Manufacturer Quality Data

## Exodrug

### Assessment
**High**

### Manufacturing licence
- D.L. No.: MNB/24/1263 & MB/24/1264
- Aaliis supplier documentation identifies Exodrug and these licence numbers.
- A Government of Himachal Pradesh GMP certificate was previously identified for these licence numbers, with GMP validity reported through April 2029.

### WHO-GMP / GMP status
- GMP strongly supported.
- Government GMP certificate evidence identified for the above manufacturing licences.

### ISO certifications
- ISO 9001:2015 stated by the manufacturer.

### Regulatory information
- GSTIN: 02AYQPD2452H2ZO
- Drug licences: MNB/24/1263 & MB/24/1264

### Manufacturing capabilities
- Tablets
- Capsules
- Syrups
- Suspensions
- Ointments
- Injectable formulations

### Overall quality / reliability assessment
**High**

Rationale: strong GMP and regulatory evidence, documented drug licences, and broad formulation capability.

---

## Biocenna Healthcare Pvt. Ltd.

### Assessment
**High**

### Manufacturing licence
- Exact licence number: Not verified in the current evidence set.

### WHO-GMP / GMP status
- WHO-GMP stated by the manufacturer.
- Manufacturer describes WHO-GMP certification and quality assurance/control processes.

### ISO certifications
- ISO certification is referenced by the manufacturer.
- Exact standard/certificate should be verified before publishing a specific ISO number.

### Regulatory information
- Pharmaceutical manufacturing facility with stated GMP / quality systems.
- Exact current manufacturing licence number is not yet verified.

### Manufacturing capabilities
- Beta-lactam manufacturing
- Non-beta-lactam manufacturing
- Tablets
- Capsules
- Oral liquids
- Powders
- External preparations

### Overall quality / reliability assessment
**High**

Rationale: WHO-GMP status stated by the manufacturer, dedicated quality/testing infrastructure, and broad pharmaceutical manufacturing capability.

---

## J.M. Laboratories

### Assessment
**High**

### Manufacturing licence
- DL 20B: MNB/15/906
- DL 21B: MB/15/907
- MSME UDYAM: UDYAM-HP-110000339
- GSTIN: 02AALFJ2020N1ZL

### WHO-GMP / GMP status
- WHO-GMP stated by the manufacturer.
- Manufacturer describes its facilities as GMP-accredited.

### ISO certifications
- ISO 9001:2008 stated by the manufacturer.

### Regulatory information
- Drug licences: MNB/15/906 and MB/15/907
- Supplier documentation to Aaliis identifies J.M. Laboratories and these licence details.

### Manufacturing capabilities
- Tablets
- Capsules
- Liquids
- Injections
- Beta-lactam manufacturing
- Third-party pharmaceutical manufacturing

### Overall quality / reliability assessment
**High**

Rationale: WHO-GMP and ISO claims, documented drug licences, and broad pharmaceutical dosage-form capability.

---

## M.M. Pharma Group / Applied Communication & Controls

### Assessment
**High**

### Manufacturing licence
- DL Form 25: 45/UA/2015
- DL Form 28: 59/UA/SC/P-2015
- FSSAI No.: 10017012000416
- GSTIN: 05ABBFA5741J2ZL
- Aaliis supplier documentation names Applied Communication and Controls.
- Public company information identifies the entity as part of the M.M. Pharma Group.

### WHO-GMP / GMP status
- GMP: the group / Applied Communication & Controls site states GMP compliance and GMP-certified manufacturing plants.

### ISO certifications
- ISO standards: stated by the group.
- Exact ISO certificate numbers/standards should be verified before displaying a specific ISO claim.

### Regulatory information
- Drug licences and FSSAI information documented in Aaliis supplier records.
- Group states compliance with national and international regulatory requirements.

### Manufacturing capabilities
- Soft gelatin capsules
- Hard gelatin capsules
- Liquid-filled capsules
- Tablets
- Beta-lactam tablets
- Non-beta-lactam tablets
- Hormone tablets
- Cepha products
- Oral liquids
- Protein powders
- Sachets
- External preparations
- Suppositories
- Injections (vials, ampoules, pre-filled syringes)
- Eye and ear drops
- Cosmetics

### Overall quality / reliability assessment
**High**

Rationale: broad manufacturing infrastructure, stated GMP/ISO compliance, established manufacturing history, and documented regulatory information.

---

## Vatave Healthcare

### Assessment
**Good**

### Manufacturing licence
- Manufacturing Licence: 914 AY-PB
- MSME UDYAM: UDYAM-PB-20-0044848
- FSSAI No.: 12116801000249
- GSTIN: 03AAOFV0846M1ZS

### WHO-GMP / GMP status
- GMP / WHO-GMP stated by the manufacturer.

### ISO certifications
- ISO 9001:2015 stated by the manufacturer.
- ISO 14001 also stated by the manufacturer.

### Regulatory information
- Manufacturing licence: 914 AY-PB
- FSSAI: 12116801000249
- GSTIN: 03AAOFV0846M1ZS

### Manufacturing capabilities
- Tablets
- Capsules
- Syrups
- Pharmaceutical and nutraceutical manufacturing

### Overall quality / reliability assessment
**Good**

Rationale: documented manufacturing licence and regulatory registrations, plus manufacturer-stated GMP/ISO systems. Stronger certificate-level evidence would justify a higher rating.

---

# 7. Manufacturer Quality Presentation

## Recommended website section

### Heading

**Manufacturing & Quality Standards**

### Suggested copy

> Aaliis Pharmaceuticals works with qualified pharmaceutical manufacturing partners selected with attention to GMP compliance, quality-management systems, regulatory documentation, and manufacturing capability. Our manufacturing partners are evaluated using available quality and regulatory documentation to support consistent standards in pharmaceutical production.

## Manufacturer card structure

```text
Manufacturer Name

Manufacturing Licence
[licence information]

GMP / WHO-GMP
[status]

ISO Certifications
[certification information]

Regulatory Compliance
[regulatory information]

Manufacturing Capabilities
[capabilities]

Quality & Reliability
[assessment]
```

Do not use unsupported statements such as:

- "100% safe"
- "Guaranteed quality"
- "Best manufacturer"
- "Zero risk"
- "Guaranteed efficacy"
- "No side effects"

The quality section should establish **manufacturing credibility**, not guarantee clinical outcomes.

---

# 8. Website SEO / Google Direction

Because Aaliis is B2B and operates across Tamil Nadu, relevant search positioning can include:

- PCD pharma company in Tamil Nadu
- Pharmaceutical distributor Tamil Nadu
- PCD pharma franchise Tamil Nadu
- Pharma products supplier Tamil Nadu
- Pharmaceutical company Chennai
- PCD pharma products Chennai

Avoid presenting Aaliis as an online medicine retailer.

---

# 9. Business Enquiry Data

Recommended enquiry fields:

```text
name
company_or_pharmacy_name
phone
email
city
district
business_type
products_interested_in
message
```

Possible business types:

- Pharmacy
- Hospital
- Distributor
- Other healthcare business

---

# 10. Current Data Gaps

Do not invent these fields. Mark them as pending until verified.

### Company
- Official website/domain
- Official company email/domain email
- Additional company description approved by management
### Products
- Some exact product names/compositions require final verification against packaging/source documents.
- Complete verified product master data should be created before publication.
---

# 11. Agentic Engineering Rules

When using this file as context:

1. Treat this document as structured project input, not as permission to invent missing information.
2. Preserve company/product/manufacturer terminology unless a later verified source supersedes it.
3. Keep `products` and `manufacturers` as separate database entities.
4. Do not expose manufacturer contact information on public pages.
5. Do not turn manufacturer relationships into manufacturer advertising.
6. Do not publish unsupported regulatory or certification claims.
7. Keep pharmaceutical product claims factual and conservative.
8. Do not create patient-facing purchase functionality unless the business model is explicitly changed and legally reviewed.
9. Product pages should prioritize product identity, composition, dosage form, pack size, regulatory classification, and appropriate professional/business enquiry pathways.
10. Any field marked "not verified", "pending", or "needs verification" must not be presented as confirmed fact on the production website.
11. Before production deployment, run a content verification pass against the latest company documents and product packaging.
