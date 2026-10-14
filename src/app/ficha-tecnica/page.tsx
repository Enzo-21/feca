import type { Metadata } from "next";
import {
  ArrowRight,
  Atom,
  BadgeCheck,
  Boxes,
  Download,
  FileText,
  FlaskConical,
  MapPin,
  Package,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/cta-button";
import Reveal from "@/components/reveal";
import { technicalSheet } from "@/lib/technical_sheet";

const PDF_HREF = "/ficha-tecnica/FECA-Ficha-Tecnica.pdf";

const operatorGlyph: Record<string, string> = {
  ">=": "≥",
  "<=": "≤",
};

const formatNumber = (value: number | string) =>
  String(value).replace(".", ",");

export const metadata: Metadata = {
  title: "Ficha técnica",
  description:
    "Consultá la ficha técnica pública de FECA: creatina monohidrato 200 mesh, con especificaciones, origen y condiciones de almacenamiento. Descargá el documento en PDF.",
};

export default function FichaTecnicaPage() {
  const {
    product_information: info,
    specifications,
    country_of_origin,
    remark,
  } = technicalSheet;

  const infoFields = [
    { label: "Producto", value: info.product_name, icon: Package },
    {
      label: "Fórmula molecular",
      value: info.molecular_formula,
      icon: FlaskConical,
    },
    {
      label: "Peso molecular",
      value: `${formatNumber(info.molecular_weight)} g/mol`,
      icon: Atom,
    },
    { label: "Envasado", value: info.packing_spec, icon: Boxes },
    { label: "Origen", value: country_of_origin, icon: MapPin },
  ];

  const pills = [
    "Documento público",
    `Origen: ${country_of_origin}`,
    "Pureza ≥ 99,5%",
  ];

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
              Documento técnico
            </p>
            <h1 className="font-display text-4xl leading-[1.05] uppercase text-ink sm:text-5xl lg:text-6xl">
              Ficha técnica
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-graphite sm:text-lg">
              Esta es la ficha técnica pública de nuestro producto: creatina
              monohidrato (200 mesh). Acá vas a encontrar la información del
              producto, sus especificaciones de calidad y las condiciones de
              almacenamiento. Podés consultarla online o descargarla en PDF.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {pills.map((pill) => (
                <Badge
                  key={pill}
                  variant="secondary"
                  className="h-auto gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink shadow-sm [&>svg]:size-4!"
                >
                  <BadgeCheck className="text-brand" aria-hidden="true" />
                  {pill}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                nativeButton={false}
                render={
                  <a
                    href={PDF_HREF}
                    target="_blank"
                    rel="noreferrer"
                    download
                  />
                }
                className="h-12 rounded-full bg-brand px-7 text-sm font-bold uppercase tracking-[1px] text-white hover:bg-brand-dark"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Descargar PDF
              </Button>
              <a
                href="#especificaciones"
                className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-bold uppercase tracking-[1px] text-graphite transition-colors hover:text-brand"
              >
                Ver especificaciones
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-0 lg:px-2">
          <Reveal>
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl uppercase text-ink sm:text-2xl">
                Información del producto
              </h2>
              <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {infoFields.map((field) => (
                  <div key={field.label} className="flex flex-col gap-1.5">
                    <dt className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[2px] text-muted-foreground">
                      <field.icon
                        className="h-4 w-4 text-brand"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                      {field.label}
                    </dt>
                    <dd className="text-base font-semibold text-ink">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="especificaciones"
        className="scroll-mt-28 px-3 pb-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-0 lg:px-2">
          <Reveal className="mb-4 border-l-4 border-brand pl-4">
            <h2 className="font-display text-xl uppercase text-ink sm:text-2xl">
              Especificaciones
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {specifications.length} parámetros de control de calidad.
            </p>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="hidden items-center justify-between border-b border-border bg-feather px-6 py-3.5 sm:flex">
                <span className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
                  Parámetro
                </span>
                <span className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
                  Especificación
                </span>
              </div>
              <ul className="divide-y divide-border">
                {specifications.map((spec) => {
                  const isNumeric = "operator" in spec;
                  return (
                    <li
                      key={spec.item}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6"
                    >
                      <span className="text-sm text-ink sm:text-[0.95rem]">
                        {spec.item}
                      </span>
                      {isNumeric ? (
                        <span className="shrink-0 font-display text-sm text-brand sm:text-[0.95rem]">
                          {operatorGlyph[spec.operator]} {formatNumber(spec.value)}{" "}
                          {spec.unit}
                        </span>
                      ) : (
                        <span className="text-right text-sm text-graphite sm:text-[0.95rem]">
                          {spec.specification}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-0 lg:px-2">
          <Reveal>
            <div className="rounded-2xl border-l-4 border-brand bg-feather p-5 sm:p-6">
              <p className="text-[0.7rem] font-bold uppercase tracking-[2px] text-muted-foreground">
                Condiciones de almacenamiento
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink sm:text-base">
                {remark}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 rounded-[2.5rem] bg-graphite px-6 py-14 text-center sm:px-10 lg:px-16">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
            <ShieldCheck className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <h2 className="font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
            Llevá la ficha técnica con vos
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Descargá el documento en PDF o verificá la autenticidad del lote de
            tu envase en nuestra sección Calidad.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              nativeButton={false}
              render={
                <a href={PDF_HREF} target="_blank" rel="noreferrer" download />
              }
              className="h-12 rounded-full bg-white px-7 text-sm font-bold uppercase tracking-[1px] text-brand hover:bg-cream"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Descargar PDF
            </Button>
            <CtaButton href="/calidad" label="Verificar mi lote" variant="primary" />
          </div>
        </div>
      </section>
    </>
  );
}
