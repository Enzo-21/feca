import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  slow?: boolean;
};

export default function Marquee({ items, className, slow = false }: MarqueeProps) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-5 text-sm font-bold uppercase tracking-[3px] sm:text-base">
            {item}
          </span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-current" fill="currentColor">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "mask-fade-y relative flex w-full overflow-hidden py-4",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max items-center",
          slow ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {row}
        {row}
      </div>
    </div>
  );
}