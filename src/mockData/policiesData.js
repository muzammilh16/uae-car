import {
  commonAddons,
  commonDiscounts,
  commonPremiumDetails,
  commonTaxes,
} from "./commonData";

export const policyType = ["Third Party", "Comprehensive"];
export const CarPoliciesData = [
  {
    id: "1",
    policyNumber: "123456789",
    policyHolder: "John Doe",
    title: "ICICI Lombard GIC ",
    partyType: policyType[0],
    isPaidDriver: true,
    price: 34660,
    icon: "/images/company_logo/icici.png",
  },
  {
    id: "2",
    policyNumber: "123456789",
    policyHolder: "John Doe",
    title: "LIBERTY",
    partyType:policyType[1],
    isPaidDriver: true,
    price: 3466000,
    icon: "/images/company_logo/icici.png",
  },
  {
    id: "3",
    policyNumber: "123456789",
    policyHolder: "John Doe",
    title: "LIBERTY",
    partyType: policyType[0],
    isPaidDriver: true,
    price: 3466,
    icon: "/images/company_logo/icici.png",
  },
  {
    id: "4",
    policyNumber: "123456789",
    policyHolder: "John Doe",
    title: "LIBERTY",
    partyType: policyType[1],
    isPaidDriver: true,
    price: 3466,
    icon: "/images/company_logo/icici.png",
  },
  {
    id: "5",
    policyNumber: "123456789",
    policyHolder: "John Doe",
    title: "LIBERTY",
    partyType: policyType[0],
    isPaidDriver: true,
    price: 3466,
    icon: "/images/company_logo/icici.png",
  },
];

export const ErrorsCarPoliciesData = [
  {
    id: 1,
    policyNumber: "123456789",
    policyHolder: "John Doe",
    title: "Go Digit General Insurance",
    partyType: "Third Party",
    isPaidDriver: true,
    price: 34660,
    icon: "/images/company_logo/icici.png",
    errorMessage: "Vehicle Invalid Mapped",
  },
  {
    id: 2,
    policyNumber: "123456789",
    policyHolder: "John Doe",
    title: "HDFC ERGO",
    partyType: "Third Party",
    isPaidDriver: true,
    price: 34660,
    icon: "/images/company_logo/icici.png",
    errorMessage: "UW Rules violated. Quote cannot be generated",
  },
  {
    id: 3,
    policyNumber: "123456789",
    policyHolder: "John Doe",
    title: "HDFC ERGO",
    partyType: "Third Party",
    isPaidDriver: true,
    price: 34660,
    icon: "/images/company_logo/icici.png",
    errorMessage: "UW Rules violated. Quote cannot be generated",
  },
  {
    id: 4,
    policyNumber: "123456789",
    policyHolder: "John Doe",
    title: "HDFC ERGO",
    partyType: "Third Party",
    isPaidDriver: true,
    price: 34660,
    icon: "/images/company_logo/icici.png",
    errorMessage: "UW Rules violated. Quote cannot be generated",
  },
];
export const insurerData = [
  "bajaj allianz",
  "bharti Axa",
  "Future Generali",
  "HDFC ERGO",
  "ICICI Lombard",
  "Liberty General",
  "Reliance General",
];

const planDetails = [
  {
    title: "Insurance Company",
    info: "",
  },
  {
    title: "Plan Type",
    info: "",
  },
  {
    title: "Insured Declared Value (IDV)",
    info: "Insured Declared Value data",
  },
];

export const defaultPoliciesCompareData = {
  "Plan details": planDetails.map((addon) => {
    return {
      [addon.title]: {
        info: addon.info,
        data: [],
      },
    };
  }),
  "Add-On Covers": commonAddons.map((addon) => {
    return {
      [addon.title]: {
        info: addon.info,
        data: [],
      },
    };
  }),
  "Premium details": commonPremiumDetails.map((addon) => {
    return {
      [addon.title]: {
        info: addon.info,
        data: [],
      },
    };
  }),
  Discounts: commonDiscounts.map((addon) => {
    return {
      [addon.title]: {
        info: addon.info,
        data: [],
      },
    };
  }),
  Premium: commonTaxes.map((addon) => {
    return {
      [addon.title]: {
        info: addon.info,
        data: [],
      },
    };
  }),
};
