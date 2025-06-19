export const monthsData = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// export const yearsData = Array.from(
//   { length: new Date().getFullYear() - 2001 + 1 },
//   (_, k) => 2001 + k
// );

export const yearsData = Array.from(
  { length: new Date().getFullYear() - 2010 + 1 },
  (_, k) => (2010 + k).toString()
);

export const IDVdefaultData = {
  minIdv: 175406,
  maxIdv: 584688,
};

export const commonAddons = [
  {
    title: "Zero Depreciation",
    info: "This add-on allows you to get the full value of your vehicle's parts replaced in case of an accident without any depreciation being deducted.",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: true,
  },
  {
    title: "Road Side Assistance",
    info: "This add-on provides you with emergency assistance services like towing, fuel delivery, and more in case you get stranded on the road.",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: false,
  },
  {
    title: "Engine Protector",
    info: "This add-on covers the cost of repairs to your car's engine in case of an accident.",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: true,
  },
  {
    title: "NCB Protection",
    info: "This add-on helps protect your no-claim bonus if you make a claim.",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: false,
  },
  {
    title: "Key Replacement",
    info: "This add-on covers the cost of replacing your car keys in case they are lost, stolen, or damaged.",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: true,
  },
  {
    title: "Consumable",
    info: "This add-on covers the cost of consumable items like engine oil, fuel, and other lubricants in case of an accident.",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: false,
  },
  {
    title: "Tyre Secure",
    info: "This add-on covers the cost of repairing or replacing your car's tyres in case of a puncture or damage.",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: true,
  },
  {
    title: "Return To Invoice",
    info: "This add-on covers the difference between the insured declared value and the invoice value of your car in case of theft or total loss.",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: false,
  },
  {
    title: "Loss of Personal Belongings",
    info: "This add-on covers the cost of personal belongings like laptops, phones, and other items that are stolen or damaged in an accident.",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: true,
  },
  {
    title: "Compulsory PA cover",
    info: "This add-on is mandatory by law and provides personal accident cover to the owner-driver of the vehicle.",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: false,
  },
  // {
  //   title: "Electrical Accessories",
  //   info: "This add-on covers the cost of electrical items like music players, speakers, and other accessories in case of theft or damage.",
  //   price: Math.floor(Math.random() * 10000 + 1000),
  //   isStrike: true,
  // },
  // {
  //   title: "Non Electrical Accessories",
  //   info: "This add-on covers the cost of non-electrical items like alloys, seat covers, and other accessories in case of theft or damage.",
  //   price: Math.floor(Math.random() * 10000 + 1000),
  //   isStrike: false,
  // },
  {
    title: "Unnamed Passenger Cover",
    info: "This add-on covers the cost of medical expenses and other damages for unnamed passengers in",
    price: Math.floor(Math.random() * 10000 + 1000),
    isStrike: false,

  }

];

export const commonPremiumDetails = [
  {
    title: "Basic Own Damage Premium",
    info: "",
  },
  {
    title: "Third Party Cover Premium",
    info: "",
  },
  {
    title: "Bi Fuel Liability Premium",
    info: "",
  },
  {
    title: "Legal Liability Paid Driver",
    info: "",
  },
  {
    title: "Zero Depreciation",
    info: "",
  },
  {
    title: "Road Side Assistance",
    info: "",
  },
  {
    title: "Engine Protector",
    info: "",
  },
  {
    title: "NCB Protection",
    info: "",
  },
  {
    title: "Key Replacement",
    info: "",
  },
  {
    title: "Consumable",
    info: "",
  },
  {
    title: "Tyre Secure",
    info: "",
  },
  {
    title: "Return To Invoice",
    info: "",
  },
  {
    title: "Loss of Personal Belongings",
    info: "",
  },
  // {
  //   title: "Emergency Transportation and Hotel Expenses",
  //   info: "",
  // },
  {
    title: "Compulsory PA cover (₹ 15,00,000)",
    info: "",
  },
  {
    title: "Electrical Accessories",
    info: "",
  },
  {
    title: "Non Electrical Accessories",
    info: "",
  },
  {
    title: "PA for passengers ₹ 50,000",
    info: "",
  },
  // {
  //   title: "Legal liability to employees (IMT 29)",
  //   info: "",
  // },
  // {
  //   title: "Home Cover (₹ 0)",
  //   info: "",
  // },
];

export const commonDiscounts = [
  {
    title: "Other Discounts",
    info: "",
  },
  {
    title: "No Claim Bonus (NCB)",
    info: "This discount is applicable if you have not made any claims in the previous year(s) of your policy.",
  },
  {
    title: "Voluntary Excess Discount",
    info: "This discount is applicable if you opt for a higher voluntary excess.",
  },
];

export const commonTaxes = [
  {
    title: "GST (18%)",
    info: "The Goods and Services Tax applied to the premium amount.",
  },
  {
    title: "Total Premium Payable",
    info: "The total premium amount that needs to be paid after adding GST and any applicable discounts.",
  },
];
