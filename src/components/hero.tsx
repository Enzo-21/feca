import Image from "next/image";
import { ArrowDown, BadgeCheck } from "lucide-react";
import RotatingWord from "@/components/rotating-word";
import { CtaButton } from "@/components/cta-button";
import { LogoMark } from "@/components/logo";

const keywords = ["Fuerza", "Potencia", "Resistencia", "Recuperación"];

const stats = [
  { value: "≥ 99,5%", label: "Pureza por HPLC" },
  { value: "100%", label: "Trazable por lote" },
  { value: "5 g", label: "Por servicio" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-sand/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 lg:px-8 lg:pt-32 lg:pb-28">
        <div className="flex min-w-0 flex-col items-start gap-7">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[3px] text-brand">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            Creatina pura · Impulsa tu rutina
          </p>

          <h1 className="font-display text-[clamp(1.8rem,4.2vw,3rem)] leading-[1.08] uppercase text-ink">
            Creatina pura
            <span className="block">para</span>
            <span className="block text-brand">
              <RotatingWord words={keywords} />
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-graphite sm:text-lg">
            FECA es monohidrato de creatina de máxima pureza, verificada con
            certificados de calidad por cada lote. Energía, fuerza y
            recuperación para que tu rutina no se detenga. Probado, no solo
            afirmado.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <CtaButton href="/comprar" label="Comprar ahora" />
            <CtaButton href="/calidad" label="Verificar lote" variant="outline" />
          </div>

          <dl className="mt-4 grid w-full max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-xl text-ink sm:text-2xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex min-w-0 justify-center">
          <div className="relative w-full max-w-md">
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-[2.5rem] border-2 border-brand/25"
              aria-hidden="true"
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-feather shadow-2xl">
              <Image
                src="/images/hero-athletes.png"
                alt="Packaging de FECA Creatina Monohidrato"
                fill
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 90vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-6 sm:p-8">
                <LogoMark variant="white" className="h-11 w-11 shrink-0" />
                <div className="text-white">
                  <p className="font-display text-xl uppercase leading-tight">
                    Impulsa tu rutina
                  </p>
                  <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[2px] text-white/80">
                    Monohidrato de creatina
                  </p>
                </div>
              </div>
            </div>

            <span className="absolute -top-3 left-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand shadow-lg lg:-left-6">
              <BadgeCheck className="h-4 w-4" />
              Calidad verificada
            </span>
            <span className="absolute -bottom-3 right-4 rounded-full bg-graphite px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg lg:-right-6">
              Lote a lote
            </span>
          </div>
        </div>
      </div>

      <a
        href="#aplicaciones"
        className="mx-auto mb-10 flex w-fit flex-col items-center gap-1 text-xs font-bold uppercase tracking-[3px] text-muted-foreground transition-colors hover:text-brand"
      >
        Descubrir más
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}