"use client";

import { useMemo, useState } from "react";
import { FileSearch, FileText, Search, ShieldCheck } from "lucide-react";
import { certificates, type Certificate } from "@/lib/certificates";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CertificateSearchProps = {
  initialQuery?: string;
};

export default function CertificateSearch({
  initialQuery = "",
}: CertificateSearchProps) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return certificates;
    return certificates.filter(
      (c) =>
        c.lot.toLowerCase().includes(q) || c.product.toLowerCase().includes(q)
    );
  }, [query]);

  const uniqueLots = useMemo(() => {
    const prefixes = results.map((c) => c.lot.replace(/-?\d+$/, ""));
    return [...new Set(prefixes)];
  }, [results]);

  return (
    <div className="flex flex-col gap-8">
      <form
        role="search"
        className="w-full rounded-[2rem] bg-white p-5 shadow-lg sm:p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          htmlFor="lote-search"
          className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground"
        >
          Buscar por número de lote
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lote-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej.: FECA-2026-001"
              autoComplete="off"
              className="h-12 rounded-full bg-background pr-4 pl-11 text-sm text-ink placeholder:text-muted-foreground focus-visible:border-brand focus-visible:ring-0"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setQuery("")}
            disabled={!query}
            className="h-auto min-h-12 rounded-full border-2 border-brand px-7 text-sm font-bold uppercase tracking-[1px] text-brand hover:bg-brand-light/60 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
          >
            Limpiar
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Filtro rápido:
          </span>
          <button type="button" onClick={() => setQuery("")}>
            <Badge
              variant={!query ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 text-xs font-bold uppercase tracking-wider"
            >
              Todos
            </Badge>
          </button>
          {uniqueLots.slice(0, 6).map((lot) => (
            <button key={lot} type="button" onClick={() => setQuery(lot)}>
              <Badge
                variant={query === lot ? "default" : "outline"}
                className="cursor-pointer px-3 py-1 text-xs font-bold uppercase tracking-wider"
              >
                {lot}
              </Badge>
            </button>
          ))}
        </div>
      </form>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-display text-lg text-ink">{results.length}</span>{" "}
          {results.length === 1
            ? "certificado encontrado"
            : "certificados encontrados"}
        </p>
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-xs font-bold uppercase tracking-wider text-brand hover:underline"
          >
            Ver todos
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {results.map((certificate, i) => (
            <CertificateCard
              key={certificate.lot}
              certificate={certificate}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-[2rem] border-2 border-dashed border-border bg-white px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-feather text-muted-foreground">
            <FileSearch className="h-8 w-8" />
          </span>
          <h3 className="font-display text-xl uppercase text-ink">
            No encontramos ese lote
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Verificá que el número de lote coincida con el que figura en la base
            de tu envase (ej.: FECA-2026-001). Si aún así no aparece, escribinos
            y lo resolvemos.
          </p>
          <Button
            type="button"
            onClick={() => setQuery("")}
            className="mt-2 h-auto min-h-12 rounded-full bg-brand px-7 text-sm font-bold uppercase tracking-[1px] text-white hover:bg-brand-dark"
          >
            Mostrar todos los certificados
          </Button>
        </div>
      )}
    </div>
  );
}

function CertificateCard({
  certificate,
  index,
}: {
  certificate: Certificate;
  index: number;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-4 border-b border-border bg-feather px-6 py-4">
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <ShieldCheck className="h-6 w-6" strokeWidth={1.8} />
          <span className="absolute -top-1 -right-1 rounded-full bg-brand-dark px-1.5 py-0.5 font-display text-[0.6rem] text-white">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg uppercase leading-tight text-ink">
            {certificate.title}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {certificate.product}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-brand px-3 py-1 font-display text-xs uppercase tracking-wider text-white">
            {certificate.lot}
          </Badge>
          <Badge
            variant="secondary"
            className="px-3 py-1 text-xs font-semibold"
          >
            Análisis: {certificate.date}
          </Badge>
        </div>

        <ul className="flex flex-col divide-y divide-border">
          {certificate.tests.map((test) => (
            <li
              key={test.name}
              className="flex items-center justify-between gap-3 py-2.5 text-sm"
            >
              <span className="text-muted-foreground">{test.name}</span>
              <span className="flex items-center gap-2 text-right">
                <span className="text-xs text-muted-foreground">
                  {test.spec}
                </span>
                <span className="font-display text-sm text-brand">
                  {test.result}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <a
          href={`/certificados/${certificate.filename}`}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "group/pdf mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-graphite text-sm font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-ink"
          )}
        >
          <FileText className="h-4 w-4" />
          Descargar certificado PDF
        </a>
      </div>
    </article>
  );
}