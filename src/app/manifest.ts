import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FECA — Creatina pura",
    short_name: "FECA",
    description: "Creatina monohidrato pura, certificada lote a lote.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f7f6f5",
    theme_color: "#cc5e21",
    lang: "es",
    categories: ["health", "fitness"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Comprar",
        short_name: "Comprar",
        url: "/comprar",
      },
      {
        name: "Verificar lote",
        short_name: "Calidad",
        url: "/calidad",
      },
      {
        name: "Ficha técnica",
        short_name: "Ficha",
        url: "/ficha-tecnica",
      },
    ],
  };
}