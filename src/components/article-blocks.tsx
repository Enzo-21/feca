import { Info, TriangleAlert } from "lucide-react";
import type { Block } from "@/content/creatina/types";
import { cn } from "@/lib/utils";

/** Render tipográfico de los bloques de un artículo del hub de creatina. */
export default function ArticleBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-10 font-display text-xl uppercase leading-snug text-ink first:mt-0 sm:text-2xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mt-7 font-display text-base uppercase tracking-wide text-ink"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-4 text-base leading-relaxed text-graphite">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-4 flex flex-col gap-2 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-graphite">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    <span className="text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-4 flex flex-col gap-2 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-graphite">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-[0.7rem] font-bold text-brand">
                      {j + 1}
                    </span>
                    <span className="text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-feather">
                    <tr>
                      {block.head.map((cell) => (
                        <th
                          key={cell}
                          className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={cn(
                              "px-4 py-3 text-graphite",
                              c === 0 && "font-semibold text-ink"
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {block.caption ? (
                  <p className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
                    {block.caption}
                  </p>
                ) : null}
              </div>
            );
          case "callout": {
            const isWarn = block.tone === "warn";
            return (
              <div
                key={i}
                className={cn(
                  "mt-6 flex items-start gap-3 rounded-2xl border-l-4 p-5",
                  isWarn
                    ? "border-brand bg-brand-light/40"
                    : "border-brand bg-feather"
                )}
              >
                {isWarn ? (
                  <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                ) : (
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                )}
                <div>
                  {block.title ? (
                    <p className="text-sm font-bold uppercase tracking-wide text-ink">
                      {block.title}
                    </p>
                  ) : null}
                  <p className="mt-1 text-sm leading-relaxed text-graphite">
                    {block.text}
                  </p>
                </div>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
