import type { ReactNode } from "react";
import Reveal from "@/components/reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-12 sm:px-6 lg:px-8 lg:pt-32">
        <Reveal className={cn("flex flex-col items-start gap-5", className)}>
          {eyebrow ? (
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[3px] text-brand">
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-4xl leading-[1.05] uppercase text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-base leading-relaxed text-graphite sm:text-lg">
              {description}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
