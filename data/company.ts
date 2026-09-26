import { CompanyInfo } from "@/types";

export const companyData: CompanyInfo = {
  legalName: "AALIIS PHARMACEUTICALS",
  tradeName: "AALIIS PHARMACEUTICALS",
  constitution: "Partnership",
  businessModel: "PCD Pharma",
  establishedDate: "17 February 2025",
  gstin: "33ACIFA9984F1Z2",
  licences: [
    {
      type: "Form 20B Drug Licence",
      number: "TN/205/20B/00848",
    },
    {
      type: "Form 21B Drug Licence",
      number: "TN/205/21B/00848",
    },
  ],
  principalAddress:
    "No. 1/29, 1st Main Road, Kavivarasu Kannadasan Nagar, Kodungaiyur, Chennai, Tamil Nadu – 600118",
  operationalArea: "All over Tamil Nadu",
  customerTypes: ["Pharmacies", "Hospitals", "Distributors"],
  directPatientSales: false,
  phone: "+91 8072051898",
  email: "aaliispharma2025@gmail.com",
  partners: [
    {
      name: "Dhayalan Yogeshwari",
      role: "Partner",
    },
    {
      name: "Gopi Kalpana",
      role: "Partner",
    },
  ],
  executives: [
    {
      name: "M. Gopi",
      designation: "Regional Business Manager",
      notes:
        "Official designation documented on visiting card. Must not be published as CEO without verified corporate documentation.",
    },
    {
      name: "S. RAGU RAMAN",
      designation: "Manager",
      phone: "+91 8072393936",
      notes: "Commercial operations and institutional management.",
    },
  ],
  logoPath: "/images/branding/aaliis-pharmaceutical-logo.png",
  websitePositioning:
    "B2B PCD pharmaceutical company supplying verified formulations to pharmacies, hospitals, and distributors across Tamil Nadu. Direct-to-patient sales are not conducted.",
};
