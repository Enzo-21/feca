import { Dumbbell, Zap, Waves, Check } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";

const features = [
  {
    icon: Dumbbell,
    title: "Calidad y pureza",
    text: "Nuestra creatina es pura y favorece el crecimiento muscular, el rendimiento, la fuerza y la resistencia. Controlamos su pureza para que obtenés lo que prometimos.",
    bullets: [
      "Pureza verificada",
      "Materia prima de calidad controlada",
    ],
  },
  {
    icon: Zap,
    title: "Compromiso y calidad",
    text: "Brindamos certificados de análisis por lote y trazabilidad de nuestras materias primas. No aceptamos atajos: cada lote es verificable.",
    bullets: [
      "Certificados de análisis por lote",
      "Trazabilidad de materias primas",
    ],
  },
  {
    icon: Waves,
    title: "Precio justo y competitivo",
    text: "Ofrecemos un producto puro, sin aditivos ni procesos industriales que inflen el precio. Calidad de primera mano, al precio que corresponde.",
    bullets: [
      "Producto puro, sin aditivos",
      "Sin costos innecesarios",
    ],
  },
];

export default function Features() {
  return (
    <section className="px-3 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-[2.5rem] bg-brand px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <SectionHeading
          eyebrow="Creatina pura"
          title="Los puntos fuertes de FECA"
          description="Creatina monohidrato de máxima pureza, con trazabilidad lote a lote y certificados de calidad verificables por cualquier consumidor."
          tone="light"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 110}>
              <div className="group flex h-full flex-col items-start gap-5 rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm transition-colors duration-300 hover:bg-white/20">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <feature.icon className="h-7 w-7" strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-lg leading-snug uppercase text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/85">
                  {feature.text}
                </p>

                <ul className="mt-auto flex flex-col gap-2 border-t border-white/20 pt-5">
                  {feature.bullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[1px] text-white"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-brand">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}