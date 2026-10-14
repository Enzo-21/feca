import Link from "next/link";
import { Logo } from "@/components/logo";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/comprar", label: "Comprar" },
  { href: "/calidad", label: "Verificar lote" },
  { href: "/ficha-tecnica", label: "Ficha técnica" },
  { href: "/creatina", label: "Aprender" },
  { href: "/nosotros", label: "Nosotros" },
];

const products = [
  { href: "/productos/creatina-monohidrato-300g", label: "Creatina 300 g" },
  { href: "/productos/creatina-monohidrato-500g", label: "Creatina 500 g" },
  { href: "/productos/creatina-monohidrato-1kg", label: "Creatina 1 kg" },
];

const legal = [
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <Logo variant="white" />
          <p className="font-display text-sm uppercase tracking-wide text-white/90">
            Impulsa tu rutina
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-white/80">
            Creatina monohidrato pura, trazable y certificada lote a lote.
            Transparencia y constancia para tu rendimiento de cada día.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[2px] text-white/60">
            Navegación
          </p>
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="w-fit text-sm text-white/90 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[2px] text-white/60">
            Productos
          </p>
          {products.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="w-fit text-sm text-white/90 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[2px] text-white/60">
            Calidad
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-white/80">
            Verificá el certificado de tu lote en nuestra sección Calidad.
          </p>
          <Link
            href="/calidad"
            className="mt-2 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-xs font-bold uppercase tracking-[1px] text-brand transition-transform hover:-translate-y-0.5"
          >
            Verificar lote
          </Link>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/70 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} FECA®. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}