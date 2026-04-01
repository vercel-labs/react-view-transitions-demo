import { Suspense } from "react";
import Link from "next/link";
import { getPhotos } from "@/data/queries/photos";
import { PhotoContent, PhotoContentSkeleton } from "./photo-content";

export async function generateStaticParams() {
  const photos = await getPhotos();
  return photos.map((photo) => ({ id: photo.id }));
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white transition-colors mb-4 sm:mb-8"
      >
        ← Gallery
      </Link>

      <Suspense fallback={<PhotoContentSkeleton />}>
        <PhotoContent id={id} />
      </Suspense>
    </div>
  );
}
