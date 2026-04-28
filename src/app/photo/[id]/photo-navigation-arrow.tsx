"use client";

import type { Photo } from "@/lib/photos";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

type Mode = "prev" | "next";

type Props = {
  photo: Photo | null;
  mode: Mode;
};

export default function PhotoNavigationArrow({ photo, mode }: Props) {
  const router = useRouter();

  const handleKeyDownEffect = useEffectEvent((event: KeyboardEvent) => {
    if (!photo) return;

    if (event.key === "ArrowLeft" && mode === "prev") {
      router.push(`/photo/${photo.id}`, {
        transitionTypes: transitionTypes[mode],
      });
    }

    if (event.key === "ArrowRight" && mode === "next") {
      router.push(`/photo/${photo.id}`, {
        transitionTypes: transitionTypes[mode],
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDownEffect);

    return () => {
      document.removeEventListener("keydown", handleKeyDownEffect);
    };
  }, []);

  if (photo) {
    return (
      <Link
        href={`/photo/${photo.id}`}
        transitionTypes={transitionTypes[mode]}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/50 text-white/60 hover:text-white hover:border-white/30 transition-colors"
      >
        {mode === "prev" ? "←" : "→"}
      </Link>
    );
  }

  return (
    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/5 bg-black/50 text-white/20 cursor-not-allowed">
      {mode === "prev" ? "←" : "→"}
    </span>
  );
}

const transitionTypes: Record<Mode, string[]> = {
  prev: ["nav-back"],
  next: ["nav-forward"],
};
