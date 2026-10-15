import { Dumbbell, Zap, Timer, HeartPulse, ArrowRight } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { articlePath } from "@/content/creatina";

const benefits = [
  {
    icon: Dumbbell,
    title: "Desarrollo muscular",
    text: "El monohidrato de creatina puro es ideal para el desarrollo muscular y ayuda a generar la energía necesaria para explosiones de fuerza cortas e intensas.",
    gradient: "from-brand via-brand to-brand-dark",
    href: articlePath("desarrollo-muscular"),
  },
  {
    icon: Zap,
    title: "Fuerza y potencia",
    text: "Una ingesta diaria de 3 g de creatina aumenta el rendimiento físico durante el ejercicio de corta duración y de alta intensidad.",
    gradient: "from-ink via-graphite to-ink",
    href: articlePath("fuerza-y-potencia"),
  },
  {
    icon: Timer,
    title: "Más resistencia",
    text: "La creatina es una sustancia natural que desempeña un papel clave en la producción de energía y mejora el rendimiento en deportes de resistencia.",
    gradient: "from-sand via-sand to-[#a89279]",
    href: articlePath("resistencia"),
  },
  {
    icon: HeartPulse,
    title: "Recuperación",
    text: "Favorece la recuperación tras entrenamientos intensos, reponiendo las reservas de energía más rápido para tu siguiente desafío.",
    gradient: "from-[#e0783f] via-brand to-brand-dark",
    href: articlePath("recuperacion"),
  },
];

export default function Applications() {
  return (
    <section id="aplicaciones" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Aplicaciones"
          title="Comprobado, no solo afirmado: FECA se mueve más"
          description="La creatina, gracias a su función de apoyo al transporte de energía dentro de las células en forma de fosfocreatina, es el suplemento ideal para deportistas de cualquier disciplina."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <a href={benefit.href} className="flex flex-1 flex-col">
                  <div
                    className={`relative aspect-[2/1] overflow-hidden bg-gradient-to-br sm:aspect-[4/3] ${benefit.gradient}`}
                  >
                    <HexPattern />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110">
                      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                        <benefit.icon className="h-9 w-9 text-white" strokeWidth={1.8} />
                      </span>
                    </div>
                    <span className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 font-display text-xs uppercase tracking-wider text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-lg leading-snug uppercase text-ink">
                      {benefit.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {benefit.text}
                    </p>
                    <span className="mt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1px] text-brand">
                      Leer más
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HexPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
      <defs>
        <pattern
          id="hexgrid"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(24)"
        >
          <polygon points="32,6 58,21 58,43 32,58 6,43 6,21" fill="none" stroke="#fff" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexgrid)" />
    </svg>
  );
}