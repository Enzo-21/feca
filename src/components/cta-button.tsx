import { cn } from "@/lib/utils";

type CtaButtonProps = {
  label: string;
  as?: "link" | "button";
  href?: string;
  variant?: "primary" | "outline" | "light" | "dark";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const ctaBase =
  "group/cta relative inline-flex h-auto min-h-[3.125rem] items-center justify-center overflow-hidden rounded-full px-6 font-sans text-sm font-bold uppercase tracking-[1px] transition-all duration-200";
const ctaVariants: Record<string, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  outline:
    "border-2 border-brand bg-transparent text-brand hover:bg-brand-light/60",
  light: "bg-white text-brand hover:bg-cream",
  dark: "bg-graphite text-white hover:bg-ink",
};

export function CtaButton({
  label,
  as = "link",
  href = "#",
  variant = "primary",
  className,
  type = "button",
  onClick,
}: CtaButtonProps) {
  const content = (
    <>
      <span className="transition-all duration-200 group-hover/cta:pr-5">
        {label}
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="absolute right-4 h-4 w-4 -translate-x-2 opacity-0 transition-all duration-200 group-hover/cta:translate-x-0 group-hover/cta:opacity-100"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </>
  );

  const classes = cn(ctaBase, ctaVariants[variant], className);

  if (as === "link") {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}