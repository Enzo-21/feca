import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Estilos tipográficos para contenido largo (legales, artículos). */
export default function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-none text-graphite",
        "[&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:uppercase [&_h2]:text-ink",
        "[&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-base [&_h3]:uppercase [&_h3]:text-ink",
        "[&_p]:mt-4 [&_p]:text-base [&_p]:leading-relaxed",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
        "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
        "[&_li]:leading-relaxed",
        "[&_a]:font-semibold [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-dark",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        className
      )}
    >
      {children}
    </div>
  );
}
