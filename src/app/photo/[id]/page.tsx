import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPicsum } from "@/lib/photos";
import { getPhoto, getPhotos } from "@/data/queries/photos";
import { PhotoMetadata } from "./photo-metadata";

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
  const photo = await getPhoto(id);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white transition-colors mb-8"
      >
        ← Gallery
      </Link>

      <div
        className="relative mx-auto mb-8 max-h-[60vh] max-w-full overflow-hidden rounded-lg"
        style={{ aspectRatio: `${photo.w}/${photo.h}` }}
      >
        <Image
          data-photo-id={photo.id}
          src={getPicsum(photo.seed, photo.w, photo.h)}
          alt={`${photo.title} — ${photo.location}`}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </div>

      <Suspense fallback={<MetadataSkeleton />}>
        <PhotoMetadata id={id} />
      </Suspense>
    </div>
  );
}

function MetadataSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 border-t border-white/10 pt-8 animate-pulse">
      <div className="space-y-3">
        <div className="h-8 w-48 bg-white/10 rounded" />
        <div className="h-4 w-32 bg-white/5 rounded" />
        <div className="h-4 w-40 bg-white/5 rounded" />
        <div className="h-5 w-20 bg-white/5 rounded mt-2" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-9 w-36 bg-white/5 rounded border border-white/5" />
        <div className="h-9 w-36 bg-white/5 rounded border border-white/5" />
      </div>
    </div>
  );
}
