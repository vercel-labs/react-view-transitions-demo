import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/photos";
import { getPhotoImage } from "@/lib/images";

export function PhotoGrid({ photos, q }: { photos: Photo[]; q?: string }) {
  return (
    <>
      <p className="font-mono text-xs text-white/40 mb-4">
        {photos.length} photo{photos.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <Link
            key={photo.id}
            href={`/photo/${photo.id}`}
            className="group relative block overflow-hidden rounded-lg aspect-[4/3]"
          >
            <Image
              data-photo-id={photo.id}
              src={getPhotoImage(photo.seed)}
              alt={`${photo.title} — ${photo.location}`}
              className="w-full h-full object-cover block rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
              <div className="p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-sm font-medium text-white leading-tight">
                  {photo.title}
                </p>
                <p className="font-mono text-xs text-white/60 mt-0.5">
                  {photo.location}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {photos.length === 0 && q && (
        <p className="text-center font-mono text-sm text-white/30 py-20">
          No photos match &ldquo;{q}&rdquo;
        </p>
      )}
    </>
  );
}
