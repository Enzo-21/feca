"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import CartButton from "@/components/cart/cart-button";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/comprar", label: "Comprar" },
  { href: "/calidad", label: "Calidad" },
  { href: "/creatina", label: "Aprender" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // `"/"` es prefijo de toda ruta, así que se compara exacto; el resto, por
  // prefijo (p. ej. `/creatina/que-es` marca `/creatina`).
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-300 bg-cream",
        scrolled
          ? "border-border shadow-sm md:bg-cream/90 md:backdrop-blur-md"
          : "border-transparent md:bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="FECA — Inicio" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm font-semibold uppercase tracking-[1px] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-brand after:transition-all after:duration-300",
                  active
                    ? "text-brand after:w-full"
                    : "text-graphite hover:text-brand after:w-0 hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <CartButton />
          <a
            href="/comprar"
            className="hidden min-h-12 items-center rounded-full bg-brand px-6 text-xs font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-dark md:inline-flex"
          >
            Comprar ahora
          </a>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-graphite transition-colors hover:text-brand md:hidden"
          >
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-20 bottom-0 z-40 origin-top bg-cream transition-all duration-300",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Móvil">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-2xl px-4 py-4 text-2xl font-semibold uppercase tracking-wide transition-colors",
                isActive(link.href)
                  ? "bg-brand-light text-brand"
                  : "text-graphite hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/comprar"
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 text-sm font-bold uppercase tracking-[1px] text-white"
          >
            Comprar ahora
          </a>
        </nav>
      </div>
    </header>
  );
}