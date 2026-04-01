import { Suspense } from "react";
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<GalleryControlsSkeleton />}>
        <GalleryControls />
      </Suspense>

      <Suspense fallback={<GalleryContentSkeleton />}>
        <GalleryContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
