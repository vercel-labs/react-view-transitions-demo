import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPicsum } from "@/lib/photos";
import { getPhoto, getPhotos } from "@/data/queries/photos";
import { Badge } from "@/components/ui/badge";
import { PhotoDetailsToggle } from "@/components/photo-details-toggle";

export async function PhotoContent({ id }: { id: string }) {
  const [photo, allPhotos] = await Promise.all([getPhoto(id), getPhotos()]);

  const currentIndex = allPhotos.findIndex((p) => p.id === id);
  const prevPhoto = currentIndex > 0 ? allPhotos[currentIndex - 1] : null;
  const nextPhoto =
    currentIndex < allPhotos.length - 1 ? allPhotos[currentIndex + 1] : null;

  return (
    <>
      <ViewTransition name={`photo-${photo.id}`} share="morph">
        <div
          className="relative mx-auto mb-4 sm:mb-8 max-h-[30vh] md:max-h-[35vh] lg:max-h-[45vh] max-w-full overflow-hidden rounded-lg"
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
      </ViewTransition>

      <div>
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 border-t border-white/10 pt-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              {photo.title}
            </h1>
            <p className="font-mono text-sm text-white/40">{photo.location}</p>
            <p className="text-sm text-white/60">
              {photo.photographer} &middot; {photo.year}
            </p>
            <div className="pt-1">
              <Link
                href={`/collection/${photo.collection}`}
                transitionTypes={["nav-forward"]}
              >
                <Badge variant="outline" className="font-mono text-xs">
                  {photo.photographer}
                </Badge>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {prevPhoto ? (
              <Link
                href={`/photo/${prevPhoto.id}`}
                transitionTypes={["nav-back"]}
                className="flex items-center gap-2 px-4 py-2 rounded border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors"
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
                transitionTypes={["nav-forward"]}
                className="flex items-center gap-2 px-4 py-2 rounded border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors"
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
        <PhotoDetailsToggle />
      </div>
    </>
  );
}

export function PhotoContentSkeleton() {
  return (
    <>
      <div
        className="relative mx-auto mb-4 sm:mb-8 max-h-[30vh] md:max-h-[35vh] lg:max-h-[45vh] max-w-full overflow-hidden rounded-lg bg-white/5 animate-pulse"
        style={{ aspectRatio: "4/3" }}
      />
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
    </>
  );
}
