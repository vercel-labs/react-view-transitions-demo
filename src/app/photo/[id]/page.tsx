import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { photos, getPhoto, getPicsum } from "@/lib/photos";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return photos.map((photo) => ({ id: photo.id }));
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = getPhoto(id);

  if (!photo) {
    notFound();
  }

  const currentIndex = photos.findIndex((p) => p.id === id);
  const prevPhoto = currentIndex > 0 ? photos[currentIndex - 1] : null;
  const nextPhoto =
    currentIndex < photos.length - 1 ? photos[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white transition-colors mb-8"
      >
        ← Gallery
      </Link>

      {/* Photo */}
      <div className="flex justify-center mb-8">
        {/* TODO: view-transition-name="photo-[id]" */}
        <Image
          data-photo-id={photo.id}
          src={getPicsum(photo.seed, photo.w, photo.h)}
          alt={`${photo.title} — ${photo.location}`}
          width={photo.w}
          height={photo.h}
          className="max-h-[80vh] w-auto object-contain rounded-lg"
          priority
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </div>

      {/* Metadata */}
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 border-t border-white/10 pt-8">
        <div className="space-y-2">
          {/* TODO: view-transition-name="photo-title-[id]" */}
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {photo.title}
          </h1>
          <p className="font-mono text-sm text-white/40">{photo.location}</p>
          <p className="text-sm text-white/60">
            {photo.photographer} &middot; {photo.year}
          </p>
          <div className="pt-1">
            <Link href={`/collection/${photo.collection}`}>
              <Badge variant="outline" className="capitalize font-mono text-xs">
                {photo.collection}
              </Badge>
            </Link>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-3">
          {prevPhoto ? (
            <Link
              href={`/photo/${prevPhoto.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all"
            >
              <span>←</span>
              <span className="font-mono text-xs">{prevPhoto.title}</span>
            </Link>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 rounded border border-white/5 text-sm text-white/20 cursor-not-allowed">
              <span>←</span>
              <span className="font-mono text-xs">First</span>
            </span>
          )}
          {nextPhoto ? (
            <Link
              href={`/photo/${nextPhoto.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all"
            >
              <span className="font-mono text-xs">{nextPhoto.title}</span>
              <span>→</span>
            </Link>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 rounded border border-white/5 text-sm text-white/20 cursor-not-allowed">
              <span className="font-mono text-xs">Last</span>
              <span>→</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
