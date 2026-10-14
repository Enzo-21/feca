import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Applications from "@/components/applications";
import Features from "@/components/features";
import QualityTeaser from "@/components/quality-teaser";
import ProductsPreview from "@/components/products-preview";
import TechnicalSheetCard from "@/components/technical-sheet-card";
import Faq from "@/components/faq";
import JsonLd from "@/components/json-ld";
import type { Metadata } from "next";
import { faqSchema } from "@/lib/structured-data";
import { homeFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const marqueeItems = [
  "Fuerza",
  "Resistencia",
  "Rendimiento",
  "Recuperación",
  "Calidad",
  "Transparencia",
  "Constancia",
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <div className="border-y border-border bg-white">
        <Marquee items={marqueeItems} />
      </div>
      <Applications />
      <Features />
      <div className="mt-4">
        <QualityTeaser />
      </div>
      <ProductsPreview />
      <div className="mt-4">
        <TechnicalSheetCard />
      </div>
      <Faq />
    </>
  );
}