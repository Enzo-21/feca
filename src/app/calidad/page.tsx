import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import CertificateSearch from "@/components/certificate-search";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Calidad — Verificar lote",
  description:
    "Verificá la autenticidad de tu FECA: ingresá el número de lote de tu envase y descargá el certificado de análisis correspondiente.",
};

export default async function CalidadPage(props: PageProps<"/calidad">) {
  const { lote } = await props.searchParams;
  const initialQuery = typeof lote === "string" ? lote : "";

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-12 sm:px-6 lg:px-8 lg:pt-32">
          <Reveal className="flex flex-col items-start gap-5">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[3px] text-brand">
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              Sello de Calidad FECA®
            </p>
            <h1 className="font-display text-4xl leading-[1.05] uppercase text-ink sm:text-5xl lg:text-6xl">
              Calidad
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-graphite sm:text-lg">
              El sello de FECA es sinónimo de calidad: cada lote se analiza y su
              resultado queda a la vista. Ingresá el número de lote que figura en
              la base de tu envase y descubrí el certificado que corresponde a tu
              producto.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {["Pureza ≥ 99,5%", "Trazabilidad completa", "Laboratorio acreditado"].map(
                (item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink shadow-sm"
                  >
                    <BadgeCheck className="h-4 w-4 text-brand" />
                    {item}
                  </span>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-0 lg:px-2">
          <Reveal className="mb-4 border-l-4 border-brand pl-4">
            <h2 className="font-display text-xl uppercase text-ink">
              Certificados de análisis
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Esta es una versión de demostración con certificados de prueba.
            </p>
          </Reveal>
          <CertificateSearch initialQuery={initialQuery} />
        </div>
      </section>
    </>
  );
}