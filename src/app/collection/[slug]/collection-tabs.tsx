"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function CollectionTabs({ slugs }: { slugs: string[] }) {
  const pathname = usePathname();
  const activeSlug = pathname.split("/").pop();

  return (
    <>
      {slugs.map((s) => (
        <Link
          key={s}
          href={`/collection/${s}`}
          className={`px-3 py-1.5 rounded font-mono text-xs transition-colors ${
            s === activeSlug
              ? "bg-white/10 text-white border border-white/20"
              : "text-white/40 hover:text-white"
          }`}
        >
          {s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")}
        </Link>
      ))}
    </>
  );
}
