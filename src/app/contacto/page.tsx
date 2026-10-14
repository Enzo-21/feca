import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import { organization } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escribinos para coordinar tu compra de FECA, consultar por un lote o hacer una consulta sobre la creatina. La atención es por WhatsApp.",
  alternates: { canonical: "/contacto" },
};

const WHATSAPP_HREF = `https://wa.me/${organization.whatsapp}`;

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Atención"
        title="Contacto"
        description="Escribinos para coordinar tu compra, consultar por un lote o resolver una duda sobre la creatina. La atención es por WhatsApp."
      />

      <section className="px-3 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 px-4 sm:px-2 md:grid-cols-2 lg:px-0">
          <Reveal className="flex h-full flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[2px] text-brand">
              Compras y consultas
            </p>
            <h2 className="font-display text-xl uppercase text-ink">
              WhatsApp
            </h2>
            <p className="text-sm leading-relaxed text-graphite">
              Coordinamos tu pedido, el envío a todo el país y el medio de pago
              por WhatsApp, con un vendedor asignado según tu provincia.
            </p>
            <a
              href={WHATSAPP_HREF}
              className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 text-sm font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-dark"
            >
              Escribir por WhatsApp
            </a>
          </Reveal>

          <Reveal delay={90} className="h-full rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl uppercase text-ink">
              Datos útiles
            </h2>
            <dl className="mt-5 flex flex-col gap-5">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
                  Horario de atención
                </dt>
                <dd className="mt-1 text-sm text-graphite">
                  Lunes a sábados, de 9 a 19 h.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
                  Cobertura
                </dt>
                <dd className="mt-1 text-sm text-graphite">
                  Envíos a todo el territorio argentino.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
                  WhatsApp
                </dt>
                <dd className="mt-1 text-sm">
                  <a
                    href={WHATSAPP_HREF}
                    className="font-semibold text-brand hover:underline"
                  >
                    {organization.whatsapp}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
