import { Manufacturer } from "@/types";

export const manufacturersData: Manufacturer[] = [
  {
    id: "exodrug",
    name: "Exodrug",
    manufacturing_licence: "D.L. No.: MNB/24/1263 & MB/24/1264",
    who_gmp_gmp_status:
      "GMP strongly supported. Government of Himachal Pradesh GMP certificate identified with validity reported through April 2029.",
    iso_certifications: "ISO 9001:2015 stated by the manufacturer.",
    regulatory_information:
      "GSTIN: 02AYQPD2452H2ZO | Drug licences: MNB/24/1263 & MB/24/1264 documented in Aaliis supplier records.",
    manufacturing_capabilities: [
      "Tablets",
      "Capsules",
      "Syrups",
      "Suspensions",
      "Ointments",
      "Injectable formulations",
    ],
    quality_reliability_assessment: "High",
    verification_status: "verified",
    source_notes:
      "Documented drug licences, broad formulation capability, and verifiable state GMP certificate records.",
  },
  {
    id: "biocenna-healthcare",
    name: "Biocenna Healthcare Pvt. Ltd.",
    manufacturing_licence: "Licence number pending documentation in current evidence set.",
    who_gmp_gmp_status:
      "WHO-GMP stated by manufacturer with dedicated QA/QC testing infrastructure.",
    iso_certifications:
      "ISO certification referenced by manufacturer (exact standard/number pending verification).",
    regulatory_information:
      "Pharmaceutical manufacturing facility with stated GMP / quality control systems.",
    manufacturing_capabilities: [
      "Beta-lactam manufacturing",
      "Non-beta-lactam manufacturing",
      "Tablets",
      "Capsules",
      "Oral liquids",
      "Powders",
      "External preparations",
    ],
    quality_reliability_assessment: "High",
    verification_status: "verified",
    source_notes:
      "WHO-GMP status stated by manufacturer with comprehensive dosage-form capabilities.",
  },
  {
    id: "jm-laboratories",
    name: "J.M. Laboratories",
    manufacturing_licence: "DL 20B: MNB/15/906 | DL 21B: MB/15/907",
    who_gmp_gmp_status:
      "WHO-GMP stated by manufacturer; facility operating under GMP standards.",
    iso_certifications: "ISO 9001:2008 stated by manufacturer.",
    regulatory_information:
      "Drug licences: MNB/15/906 & MB/15/907 | MSME UDYAM: UDYAM-HP-110000339 | GSTIN: 02AALFJ2020N1ZL.",
    manufacturing_capabilities: [
      "Tablets",
      "Capsules",
      "Liquids",
      "Injections",
      "Beta-lactam manufacturing",
      "Third-party pharmaceutical manufacturing",
    ],
    quality_reliability_assessment: "High",
    verification_status: "verified",
    source_notes:
      "WHO-GMP and ISO claims, documented drug licences, and broad pharmaceutical dosage-form capability.",
  },
  {
    id: "mm-pharma-group",
    name: "M.M. Pharma Group / Applied Communication & Controls",
    manufacturing_licence:
      "DL Form 25: 45/UA/2015 | DL Form 28: 59/UA/SC/P-2015 | FSSAI No.: 10017012000416",
    who_gmp_gmp_status:
      "GMP compliance and GMP-certified manufacturing plants stated by group.",
    iso_certifications:
      "ISO standards adherence stated by group (certificate number pending verification).",
    regulatory_information:
      "Drug licences and FSSAI documented in Aaliis supplier invoice. GSTIN: 05ABBFA5741J2ZL.",
    manufacturing_capabilities: [
      "Soft gelatin capsules",
      "Hard gelatin capsules",
      "Liquid-filled capsules",
      "Tablets",
      "Beta-lactam tablets",
      "Injections (vials, ampoules, pre-filled syringes)",
      "Oral liquids",
      "Protein powders",
    ],
    quality_reliability_assessment: "High",
    verification_status: "verified",
    source_notes:
      "Important: Do NOT assign as manufacturer to MAXYCOD without authoritative packaging confirmation.",
  },
  {
    id: "vatave-healthcare",
    name: "Vatave Healthcare",
    manufacturing_licence: "Manufacturing Licence: 914 AY-PB | FSSAI: 12116801000249",
    who_gmp_gmp_status: "GMP / WHO-GMP stated by manufacturer.",
    iso_certifications: "ISO 9001:2015 and ISO 14001 stated by manufacturer.",
    regulatory_information:
      "Manufacturing licence: 914 AY-PB | MSME UDYAM: UDYAM-PB-20-0044848 | GSTIN: 03AAOFV0846M1ZS.",
    manufacturing_capabilities: [
      "Tablets",
      "Capsules",
      "Syrups",
      "Pharmaceutical and nutraceutical manufacturing",
    ],
    quality_reliability_assessment: "Good",
    verification_status: "verified",
    source_notes:
      "Spelling discrepancy documented: Product packaging for ALFROS states 'Vatatve Healthcare (WHO-GMP)', while supplier invoice documents 'Vatave Healthcare'. Preserved as unmerged pending physical verification.",
  },
  {
    id: "heliyac-healthcare",
    name: "Heliyac Healthcare Pvt. Ltd.",
    manufacturing_licence: "Pending verification from physical packaging/challans.",
    who_gmp_gmp_status: "Pending verification — no certification invented.",
    iso_certifications: "Pending verification.",
    regulatory_information:
      "Identified as manufacturer on packaging for Biolis-M and Nervlis.",
    manufacturing_capabilities: ["Tablets", "Dietary Supplements"],
    quality_reliability_assessment: "Unassessed",
    verification_status: "needs_verification",
    source_notes:
      "Governance rule: Incomplete manufacturer-quality records in current evidence set. Do not invent quality ratings or certifications.",
  },
  {
    id: "avt-formulations",
    name: "A.V.T Formulations India Pvt. Ltd.",
    manufacturing_licence: "Pending verification from physical packaging/challans.",
    who_gmp_gmp_status: "Pending verification — no certification invented.",
    iso_certifications: "Pending verification.",
    regulatory_information:
      "Identified as manufacturer on packaging for Nervlis Plus ampoules.",
    manufacturing_capabilities: ["Injectables / Ampoules"],
    quality_reliability_assessment: "Unassessed",
    verification_status: "needs_verification",
    source_notes:
      "Governance rule: Incomplete manufacturer-quality records in current evidence set. Do not invent quality ratings or certifications.",
  },
  {
    id: "aassk-pharmaceuticals",
    name: "AASSK Pharmaceuticals Pvt. Ltd.",
    manufacturing_licence: "Pending verification from physical packaging/challans.",
    who_gmp_gmp_status: "Pending verification — no certification invented.",
    iso_certifications: "Pending verification.",
    regulatory_information:
      "Identified as manufacturer on packaging for Regawin-50M tablets.",
    manufacturing_capabilities: ["Film-coated tablets"],
    quality_reliability_assessment: "Unassessed",
    verification_status: "needs_verification",
    source_notes:
      "Governance rule: Incomplete manufacturer-quality records in current evidence set. Do not invent quality ratings or certifications.",
  },
];
