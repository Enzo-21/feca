import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, FileText, Layers, ShieldCheck } from "lucide-react";
import { certificates, type CertificateStatus } from "@/lib/certificates";
import Reveal from "@/components/reveal";
import Breadcrumbs from "@/components/breadcrumbs";
import JsonLd from "@/components/json-ld";
import { certificateSchema, breadcrumbSchema } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<CertificateStatus, string> = {
  approved: "Aprobado",
  rejected: "Rechazado",
  pending: "Pendiente",
};

export function generateStaticParams() {
  return certificates.map((certificate) => ({ lot: certificate.lot }));
}

function getCertificate(lot: string) {
  return certificates.find((certificate) => certificate.lot === lot);
}

export async function generateMetadata(props: {
  params: Promise<{ lot: string }>;
}): Promise<Metadata> {
  const { lot } = await props.params;
  const certificate = getCertificate(lot);
  if (!certificate) return {};
  return {
    title: `Certificado lote ${certificate.lot}`,
    description: `Certificado de análisis del lote ${certificate.lot} (${certificate.product}), analizado el ${certificate.date}. Resultados verificables: pureza, metales y control microbiológico.`,
    alternates: { canonical: `/calidad/${certificate.lot}` },
  };
}

export default async function LotPage(props: {
  params: Promise<{ lot: string }>;
}) {
  const { lot } = await props.params;
  const certificate = getCertificate(lot);
  if (!certificate) notFound();

  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Calidad", href: "/calidad" },
    { label: certificate.lot },
  ]; // breadcrumbs component expects label/href; keep as is for UI, but structured data fixed separately
  const hasRawMaterial = certificate.pageCount > 1;

  return (
    <>
      <JsonLd
        data={[
          certificateSchema(certificate),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Calidad", path: "/calidad" },
            { name: certificate.lot, path: `/calidad/${certificate.lot}` },
          ]),
        ]}
      />

      <section className="relative overflow-hidden px-3 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="mx-auto w-full max-w-6xl px-4 pt-24 sm:px-2 lg:px-8 lg:pt-28">
          <Breadcrumbs items={crumbs.map((c) => ({ label: c.label, href: c.href }))} />

          <Reveal className="flex flex-col items-start gap-5">
            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-brand shadow-sm">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              {STATUS_LABELS[certificate.status]}
            </span>
            <h1 className="font-display text-3xl leading-tight uppercase text-ink sm:text-4xl lg:text-5xl">
              Certificado de análisis
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-graphite sm:text-lg">
              Lote <strong className="font-display text-ink">{certificate.lot}</strong>{" "}
              · {certificate.product} · analizado el {certificate.date}. Estos
              son los resultados correspondientes a tu envase.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`/certificados/${certificate.filename}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-sm font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-dark"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Descargar certificado PDF
              </a>
              <Link
                href="/calidad"
                className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-bold uppercase tracking-[1px] text-graphite transition-colors hover:text-brand"
              >
                Verificar otro lote
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pt-12 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-2 lg:px-0">
          <Reveal className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-feather px-6 py-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
                  Resultados del análisis
                </span>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider",
                  certificate.status === "approved"
                    ? "bg-graphite text-white"
                    : "border border-border text-muted-foreground"
                )}
              >
                {STATUS_LABELS[certificate.status]}
              </span>
            </div>

            <div className="hidden items-center justify-between border-b border-border px-6 py-3 text-xs font-bold uppercase tracking-[2px] text-muted-foreground sm:flex">
              <span>Parámetro</span>
              <span>Especificación</span>
              <span>Resultado</span>
            </div>

            <ul className="divide-y divide-border">
              {certificate.tests.map((test) => (
                <li
                  key={test.name}
                  className="flex flex-col gap-1 px-6 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm text-ink">{test.name}</span>
                    {test.method ? (
                      <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground/70">
                        {test.method}
                      </span>
                    ) : null}
                  </span>
                  <span className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="text-xs text-muted-foreground">
                      {test.spec}
                    </span>
                    <span className="font-display text-sm text-brand">
                      {test.result}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {hasRawMaterial && (
            <Reveal className="mt-6 flex items-start gap-3 rounded-2xl border-l-4 border-brand bg-feather p-5">
              <Layers className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-graphite">
                El certificado en PDF incluye además el documento de análisis de
                la materia prima del proveedor ({certificate.pageCount} páginas en
                total).
              </p>
            </Reveal>
          )}

          <Reveal className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`/certificados/${certificate.filename}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-dark"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Descargar certificado PDF
            </a>
            <Link
              href="/ficha-tecnica"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold uppercase tracking-[1px] text-brand shadow-sm transition-colors hover:bg-cream"
            >
              Ver ficha técnica
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 rounded-[2.5rem] bg-graphite px-6 py-14 text-center sm:px-10 lg:px-16">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
            <ShieldCheck className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <h2 className="font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
            ¿Otro lote para verificar?
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Ingresá el número que figura en la base de tu envase y accedé al
            certificado correspondiente.
          </p>
          <Link
            href="/calidad"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold uppercase tracking-[1px] text-brand transition-colors hover:bg-cream"
          >
            Verificar un lote
          </Link>
        </div>
      </section>
    </>
  );
}
