import { cn } from "@/lib/utils";
import Reveal from "@/components/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-bold uppercase tracking-[3px]",
          align === "center" && "justify-center",
          tone === "light" ? "text-cream" : "text-brand"
        )}
      >
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        {eyebrow}
        <span className="h-px w-8 bg-current" aria-hidden="true" />
      </p>
      <h2
        className={cn(
          "font-display text-3xl leading-[1.05] uppercase text-balance sm:text-4xl lg:text-5xl",
          tone === "light" && "text-white",
          tone === "dark" && "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            tone === "default" && "text-muted-foreground",
            tone === "light" && "text-white/85",
            tone === "dark" && "text-white/85"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}