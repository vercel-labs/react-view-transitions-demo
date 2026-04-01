import { Suspense, ViewTransition } from "react";
import {
  GalleryContent,
  GalleryContentSkeleton,
} from "@/components/gallery-content";
import {
  GalleryControls,
  GalleryControlsSkeleton,
} from "@/components/gallery-controls";

export default function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "fade-in",
        "nav-back": "fade-in",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<GalleryControlsSkeleton />}>
          <GalleryControls />
        </Suspense>

        <Suspense
          fallback={
            <ViewTransition exit="slide-down" default="none">
              <GalleryContentSkeleton />
            </ViewTransition>
          }
        >
          <ViewTransition enter="slide-up" default="none">
            <GalleryContent searchParams={searchParams} />
          </ViewTransition>
        </Suspense>
      </div>
    </ViewTransition>
  );
}
