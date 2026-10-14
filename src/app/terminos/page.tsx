import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Prose from "@/components/prose";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de compra de los productos FECA: pedidos, precios, envíos, medios de pago y uso del sitio.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Términos y condiciones"
            description="Condiciones generales para el uso del sitio y la compra de nuestros productos."
      />

      <section className="px-3 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-2 lg:px-0">
          <Reveal className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <Prose>
              <p>
                Al usar este sitio y realizar un pedido aceptás las condiciones
                descriptas a continuación. Las consultas se atienden por{" "}
                <Link href="/contacto">WhatsApp</Link>.
              </p>

              <h2>Productos</h2>
              <p>
                FECA comercializa suplementos dietarios —en particular, creatina
                monohidrato—. La información publicada es de carácter
                informativo y no reemplaza la consulta con un profesional de la
                salud. Ante cualquier condición médica, embarazo o lactancia,
                consultá a un profesional antes de consumir.
              </p>

              <h2>Precios y pagos</h2>
              <p>
                Los precios se expresan en pesos argentinos y pueden
                actualizarse sin aviso previo. El precio vigente es el que se
                confirma al coordinar la compra. Los medios de pago disponibles
                se informan por WhatsApp al momento de cerrar el pedido.
              </p>

              <h2>Envíos</h2>
              <p>
                Realizamos envíos a todo el territorio argentino. Los plazos y
                costos de envío se informan al confirmar el pedido, según la
                localidad de destino.
              </p>

              <h2>Cambios y devoluciones</h2>
              <p>
                Si el producto llega en mal estado o no coincide con lo
                solicitado, escribinos para coordinar un reemplazo o la
                devolución correspondiente, conforme al derecho de consumo
                vigente.
              </p>

              <h2>Propiedad intelectual</h2>
              <p>
                Los contenidos de este sitio (textos, marca, gráfica) pertenecen
                a FECA. Los datos técnicos y los certificados de análisis se
                publican con fines de transparencia.
              </p>

              <h2>Contacto</h2>
              <p>
                Para consultas sobre estos términos, escribinos por{" "}
                <Link href="/contacto">WhatsApp</Link>.
              </p>
            </Prose>
          </Reveal>
        </div>
      </section>
    </>
  );
}
