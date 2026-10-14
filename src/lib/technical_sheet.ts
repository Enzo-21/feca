export const technicalSheet = {
  product_information: {
    product_name: "Creatine Monohydrate 200 mesh",
    molecular_formula: "C4H9N3O2 • H2O",
    molecular_weight: 149.15,
    packing_spec: "25kg/carton/bag"
  },
  specifications: [
    {
      item: "Appearance",
      specification: "White Crystalline Powder"
    },
    {
      item: "Clarity & Color Of Solution",
      specification: "Clear & Colorless"
    },
    {
      item: "Assay",
      operator: ">=",
      value: 99.5,
      unit: "%"
    },
    {
      item: "Creatinine",
      operator: "<=",
      value: 100,
      unit: "ppm"
    },
    {
      item: "Loss On Drying",
      operator: "<=",
      value: 12.0,
      unit: "%"
    },
    {
      item: "Residue On Ignition",
      operator: "<=",
      value: 0.1,
      unit: "%"
    },
    {
      item: "Dicyanamide",
      operator: "<=",
      value: 50,
      unit: "ppm"
    },
    {
      item: "Dihydrotriazine",
      operator: "<=",
      value: 5,
      unit: "ppm"
    },
    {
      item: "Iron",
      operator: "<=",
      value: 10,
      unit: "ppm"
    },
    {
      item: "Sulfate",
      operator: "<=",
      value: 0.03,
      unit: "%"
    },
    {
      item: "Heavy Metal",
      operator: "<=",
      value: 0.5,
      unit: "ppm"
    },
    {
      item: "Arsenic (As)",
      operator: "<=",
      value: 0.1,
      unit: "ppm"
    },
    {
      item: "Lead (Pb)",
      operator: "<=",
      value: 0.1,
      unit: "ppm"
    },
    {
      item: "Mercury (Hg)",
      operator: "<=",
      value: 0.1,
      unit: "ppm"
    },
    {
      item: "Cadmium (Cd)",
      operator: "<=",
      value: 0.1,
      unit: "ppm"
    },
    {
      item: "Bulk Density",
      operator: ">=",
      value: 430,
      unit: "g/L"
    },
    {
      item: "Tapped Density",
      operator: ">=",
      value: 550,
      unit: "g/L"
    },
    {
      item: "Total Bacterial Count",
      operator: "<=",
      value: 100,
      unit: "cfu/g"
    },
    {
      item: "E. Coli",
      specification: "Negative"
    },
    {
      item: "Mould & Yease",
      specification: "Negative"
    },
    {
      item: "Salmonella",
      specification: "Negative"
    }
  ],
  country_of_origin: "China",
  remark: "Stored in cool, dry and ventilated warehouse, and keep away from Moisture."
} as const;

export default technicalSheet;
