import { cn } from "@/lib/utils";

type LogoVariant = "color" | "white" | "mono";

type LogoMarkProps = {
  className?: string;
  variant?: LogoVariant;
};

const markColors: Record<LogoVariant, { chevron: string; arrows: string }> = {
  color: { chevron: "#cc5e21", arrows: "#5b5d5c" },
  white: { chevron: "#ffffff", arrows: "#ffffff" },
  mono: { chevron: "#5b5d5c", arrows: "#5b5d5c" },
};

export function LogoMark({ className, variant = "color" }: LogoMarkProps) {
  const colors = markColors[variant];
  return (
    <svg
      viewBox="76.7 76.5 146.6 147"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Isotipo FECA"
    >
      <polygon
        fill={colors.chevron}
        points="108.06 217.31 96.22 205.47 151.91 149.78 96.36 94.23 108.2 82.39 175.59 149.78 108.06 217.31"
      />
      <polygon
        fill={colors.arrows}
        points="158.71 85.17 149.95 76.47 130.07 96.36 141.92 108.22 150 100.14 199.63 149.78 150 199.41 141.92 191.33 130.09 203.17 141.2 214.29 150 223.53 158.8 214.29 223.31 149.78 158.71 85.17"
      />
      <polygon
        fill={colors.arrows}
        points="100.37 149.78 122.19 127.95 110.34 116.1 76.69 149.78 110.35 183.44 122.19 171.6 100.37 149.78"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      viewBox="27 178 246 53"
      className={cn("h-5 w-auto", className)}
      role="img"
      aria-label="FECA"
    >
      <g fill={fill}>
        <path d="M27.32,230.14l19.52-51.04h54.54l-3.55,9.28h-43.12l-5.4,14.13h37.55l-3.55,9.28h-37.55l-7.01,18.35h-11.42Z" />
        <path d="M89.71,230.14l19.52-51.04h55.97l-3.55,9.28h-44.54l-4.31,11.28h40.4l-3.55,9.28h-40.4l-4.56,11.92h44.54s-3.55,9.28-3.55,9.28h-55.97Z" />
        <path d="M179.67,230.5c-9.42,0-15.8-2.18-19.13-6.53-3.33-4.36-3.36-10.81-.08-19.38,3.26-8.52,8.22-14.97,14.89-19.35,6.67-4.38,14.71-6.54,24.11-6.5l25.64.14-3.49,9.14h-24.91c-6.19,0-11.28,1.31-15.28,3.93-4,2.62-7.11,6.83-9.33,12.64-2.22,5.81-2.34,10.03-.35,12.67,1.99,2.64,6.08,3.96,12.26,3.96h25.63l-3.55,9.28h-26.41Z" />
        <path d="M209.07,230.14l42.5-51.04h17.63l3.47,51.04h-12.42l-.73-10.78h-29.05l-8.98,10.78h-12.42ZM238.16,210.09h20.77l-1.49-22.06h-.93l-18.36,22.06Z" />
      </g>
    </svg>
  );
}

type LogoProps = {
  className?: string;
  variant?: LogoVariant;
};

export function Logo({ className, variant = "color" }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark variant={variant} className="h-9 w-9 shrink-0" />
      <Wordmark
        className={cn(
          "h-[1.15rem]",
          variant === "white" ? "text-white" : "text-graphite"
        )}
      />
    </span>
  );
}