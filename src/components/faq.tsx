"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import { LogoMark } from "@/components/logo";

const faqs = [
  {
    question: "¿Qué es la creatina y cómo funciona?",
    answer:
      "La creatina es una sustancia natural que el cuerpo usa para producir energía. Suplementada como monohidrato, aumenta las reservas de fosfocreatina en el músculo, ayudando a sostener esfuerzos cortos e intensos, y a recuperarte más rápido entre series y entrenamientos.",
  },
  {
    question: "¿Cuánta creatina debo tomar al día?",
    answer:
      "La dosis respaldada por la ciencia es de 3 a 5 gramos diarios, todos los días, manteniéndola parte de tu rutina. No es necesaria una fase de carga: la constancia es lo que genera resultados.",
  },
  {
    question: "¿Necesito hacer una fase de carga?",
    answer:
      "No. Una fase de carga acelera la saturación muscular en los primeros días, pero con 3-5 g diarios alcanzás los mismos niveles en unas semanas. Lo importante es la regularidad.",
  },
  {
    question: "¿Qué diferencia a FECA de otras creatinas?",
    answer:
      "Pureza y transparencia. Nuestro monohidrato se analiza por HPLC (≥ 99,5% de pureza) y cada lote cuenta con un certificado de análisis público y verificable desde nuestra sección Calidad.",
  },
  {
    question: "¿Cómo verifico que mi envase es auténtico?",
    answer:
      "Buscá el número de lote en la base del envase, ingresalo en la página Calidad y comparalo con el certificado correspondiente. Si el lote no aparece, contactanos.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<string[]>(["item-0"]);

  return (
    <section className="px-3 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Conocimiento sobre creatina"
              title="Preguntas frecuentes"
              description="Todo lo que necesitás saber para tomar FECA con confianza y sumar la creatina como hábito."
            />
            <Reveal delay={120} className="mt-8 hidden lg:block">
              <div className="relative w-52 overflow-hidden rounded-[2rem] bg-feather shadow-xl">
                <div className="relative aspect-square">
                  <Image
                    src="/images/pouch-creatina.jpg"
                    alt="Pouch de FECA Creatina"
                    fill
                    sizes="208px"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
                    <LogoMark variant="white" className="h-7 w-7" />
                    <span className="font-display text-sm uppercase text-white">
                      FECA
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="w-full">
            <Accordion
              value={open}
              onValueChange={(value) => setOpen(value.slice(-1))}
              className="flex w-full flex-col gap-3"
            >
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm data-[state=open]:border-brand/40"
                >
                  <AccordionTrigger className="justify-between px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-ink hover:text-brand hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}