import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Applications from "@/components/applications";
import Features from "@/components/features";
import QualityTeaser from "@/components/quality-teaser";
import ProductsPreview from "@/components/products-preview";
import Faq from "@/components/faq";

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
      <Faq />
    </>
  );
}