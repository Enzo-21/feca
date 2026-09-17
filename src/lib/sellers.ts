export type SellerId = "alain" | "enzo";

export type Seller = {
  id: SellerId;
  name: string;
  whatsapp: string;
};

export const sellers: Record<SellerId, Seller> = {
  alain: { id: "alain", name: "Alain", whatsapp: "5493516195674" },
  enzo: { id: "enzo", name: "Enzo", whatsapp: "5493516195674" },
};

export const provinces = [
  "Ciudad Autónoma de Buenos Aires",
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
] as const;

export type Province = (typeof provinces)[number];

const alainProvinces = new Set<Province>([
  "Ciudad Autónoma de Buenos Aires",
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
]);

export function getSellerForProvince(province: string): Seller {
  return alainProvinces.has(province as Province)
    ? sellers.alain
    : sellers.enzo;
}
