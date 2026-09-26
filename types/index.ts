export type VerificationStatus = "verified" | "pending" | "needs_verification";
export type QualityAssessment = "High" | "Good" | "Unassessed";

export interface CompanyPartner {
  name: string;
  role: string;
}

export interface CompanyExecutive {
  name: string;
  designation: string;
  phone?: string;
  notes?: string;
}

export interface CompanyLicence {
  type: string;
  number: string;
}

export interface CompanyInfo {
  legalName: string;
  tradeName: string;
  constitution: string;
  businessModel: string;
  establishedDate: string;
  gstin: string;
  licences: CompanyLicence[];
  principalAddress: string;
  operationalArea: string;
  customerTypes: string[];
  directPatientSales: boolean;
  phone: string;
  email: string;
  partners: CompanyPartner[];
  executives: CompanyExecutive[];
  logoPath: string;
  websitePositioning: string;
}

export type ProductCategory =
  | "Pain & Musculoskeletal"
  | "Neurological & Neuropathic"
  | "Gastroenterology & Anti-peptic"
  | "Nutraceuticals & Dietary Supplements"
  | "Parenteral Injections";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Pain & Musculoskeletal",
  "Neurological & Neuropathic",
  "Gastroenterology & Anti-peptic",
  "Nutraceuticals & Dietary Supplements",
  "Parenteral Injections",
];

export interface ProductCompositionItem {
  ingredient: string;
  strength?: string;
  notes?: string;
}

export interface Product {
  id: string;
  slug: string;
  brand_name: string;
  category: ProductCategory;
  generic_composition: string;
  composition_items?: ProductCompositionItem[];
  dosage_form: string;
  strength?: string;
  pack_size: string;
  prescription_status?: string;
  classification?: string;
  dosage_or_usage?: string;
  storage?: string;
  manufacturer_reference?: string;
  marketed_by: string;
  product_image: string;
  description?: string;
  colour?: string;
  verification_status: VerificationStatus;
  source_notes?: string;
  data_conflicts?: string[];
  aliases?: string[];
}

export interface Manufacturer {
  id: string;
  name: string;
  manufacturing_licence?: string;
  who_gmp_gmp_status?: string;
  iso_certifications?: string;
  regulatory_information?: string;
  manufacturing_capabilities?: string[];
  quality_reliability_assessment?: QualityAssessment;
  verification_status: VerificationStatus;
  source_notes?: string;
}

export type BusinessType =
  | "Pharmacy"
  | "Hospital"
  | "Distributor"
  | "Other healthcare business";

export interface BusinessEnquiry {
  name: string;
  company_or_pharmacy_name: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  business_type: BusinessType;
  products_interested_in: string[];
  message: string;
}
