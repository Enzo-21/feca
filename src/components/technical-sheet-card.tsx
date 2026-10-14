import { Download, FileText } from "lucide-react";
import Reveal from "@/components/reveal";

const PDF_HREF = "/ficha-tecnica/FECA-Ficha-Tecnica.pdf";

export default function TechnicalSheetCard() {
  return (
    <section className="px-3 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-xl uppercase text-ink">
                Ficha técnica del producto
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-graphite">
                Consultá la información técnica de FECA (creatina monohidrato
                200 mesh) o descargá el documento en PDF.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/ficha-tecnica"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-xs font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-dark"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Ver ficha técnica
              </a>
              <a
                href={PDF_HREF}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex h-12 items-center gap-2 rounded-full bg-graphite px-6 text-xs font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-ink"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Descargar PDF
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
