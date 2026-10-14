import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Prose from "@/components/prose";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo trata FECA los datos que compartís al navegar el sitio o coordinar una compra por WhatsApp.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacidad"
        description="Qué datos usamos, para qué y por cuánto tiempo."
      />

      <section className="px-3 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-2 lg:px-0">
          <Reveal className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <Prose>
              <p>
                Esta política describe de forma simple cómo tratamos la
                información cuando navegás por el sitio o coordinás una compra.
              </p>

              <h2>Qué datos recopilamos</h2>
              <ul>
                <li>
                  <strong>Datos de contacto:</strong> los que nos compartís
                  voluntariamente por WhatsApp (nombre, teléfono, dirección de
                  envío) para concretar un pedido.
                </li>
                <li>
                  <strong>Datos de uso del sitio:</strong> el sitio es
                  principalmente estático y no requiere registro. No creamos
                  cuentas de usuario.
                </li>
              </ul>

              <h2>Para qué los usamos</h2>
              <p>
                Usamos tus datos únicamente para gestionar el pedido, coordinar
                el envío y responder consultas. No los usamos para fines
                ajenos a la compra.
              </p>

              <h2>Con quién los compartimos</h2>
              <p>
                Compartimos los datos imprescindibles con el servicio de
                logística que realiza el envío. No vendemos ni cedemos tus datos
                a terceros con fines publicitarios.
              </p>

              <h2>Conservación</h2>
              <p>
                Conservamos los datos de una compra durante el tiempo necesario
                para cumplir con la entrega y con las obligaciones legales
                aplicables.
              </p>

              <h2>Tus derechos</h2>
              <p>
                Podés solicitarnos el acceso, la corrección o la eliminación de
                tus datos escribiéndonos por{" "}
                <Link href="/contacto">WhatsApp</Link>.
              </p>
            </Prose>
          </Reveal>
        </div>
      </section>
    </>
  );
}
