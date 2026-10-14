import { ShieldCheck, Search } from "lucide-react";
import Reveal from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QualityTeaser() {
  return (
    <section className="px-3 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-[2.5rem] bg-feather px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal className="flex flex-col items-start gap-5">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[3px] text-brand">
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              Sello de Calidad FECA®
            </p>
            <h2 className="font-display text-3xl leading-[1.05] uppercase text-ink sm:text-4xl">
              Calidad de producto, disponible y comprobable
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-graphite">
              Cada envase de FECA lleva un número de lote único. Ingresalo aquí y
              descubrí el certificado de análisis que corresponde exactamente a
              tu producto.
            </p>
            <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm">
              <ShieldCheck className="h-5 w-5 text-brand" />
              Procesos auditados y resultados trazables
            </div>
          </Reveal>

          <Reveal delay={120} className="w-full">
            <form
              action="/calidad"
              method="get"
              className="flex w-full flex-col gap-4 rounded-[2rem] bg-white p-6 shadow-lg sm:p-8"
            >
              <label
                htmlFor="lote-teaser"
                className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground"
              >
                Número de lote
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="lote-teaser"
                    name="lote"
                    type="text"
                    required
                    placeholder="Ej.: 202604-013"
                    className="h-12 rounded-full bg-background pr-4 pl-11 text-sm text-ink placeholder:text-muted-foreground focus-visible:border-brand focus-visible:ring-0"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-auto min-h-12 rounded-full bg-brand px-7 text-sm font-bold uppercase tracking-[1px] text-white hover:bg-brand-dark"
                >
                  Buscar
                </Button>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                El número de lote se encuentra en la base del envase, debajo del
                sello de calidad.
              </p>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground sm:text-left">
              <a
                href="/ficha-tecnica"
                className="font-semibold text-graphite underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand"
              >
                Ver ficha técnica del producto →
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}