import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Prose from "@/components/prose";
import Reveal from "@/components/reveal";
import { CtaButton } from "@/components/cta-button";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "FECA es una marca argentina de creatina monohidrato 200 mesh. Conocé nuestro compromiso con la pureza, la trazabilidad y la transparencia lote a lote.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="La marca"
        title="Nosotros"
        description="FECA nace de una idea simple: la creatina no necesita promesas, necesita datos. Vendemos un solo producto y lo respaldamos con información verificable."
      />

      <section className="px-3 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-2 lg:px-0">
          <Reveal className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <Prose>
              <h2>Qué hacemos</h2>
              <p>
                Comercializamos <strong>creatina monohidrato 200 mesh</strong> en
                tres presentaciones (300 g, 500 g y 1 kg). Es la forma de
                creatina con más respaldo científico y la que usamos como
                referencia para todo lo que publicamos.
              </p>
              <p>
                No agregamos aditivos, saborizantes ni excipientes. Solo el
                monohidrato, con un control de calidad que documentamos.
              </p>

              <h2>Por qué la información importa</h2>
              <p>
                En suplementos, la diferencia suele estar en lo que no se
                muestra. Por eso publicamos la{" "}
                <Link href="/ficha-tecnica">ficha técnica</Link> con las
                especificaciones completas y el origen de la materia prima, y un{" "}
                <Link href="/calidad">certificado de análisis por lote</Link> que
                cualquiera puede consultar a partir del número impreso en su
                envase.
              </p>
              <ul>
                <li>Pureza de referencia ≥ 99,5 % determinada por HPLC.</li>
                <li>Cada lote con su análisis y su número correspondiente.</li>
                <li>Resultados visibles, no solo afirmaciones de marketing.</li>
              </ul>

              <h2>Nuestro compromiso</h2>
              <p>
                Preferimos explicar de menos y demostrar de más. Si algo no lo
                podemos respaldar con un dato, no lo afirmamos.
              </p>
            </Prose>

            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton href="/comprar" label="Ver productos" variant="primary" />
              <CtaButton
                href="/calidad"
                label="Verificar un lote"
                variant="outline"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
