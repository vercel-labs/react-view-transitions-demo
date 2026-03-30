import Image from "next/image";
import Link from "next/link";
import { photos, getPicsum } from "@/lib/photos";

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Stats */}
      <p className="font-mono text-xs text-white/40 mb-8">
        112 photos · 4 collections
      </p>

      {/* Masonry grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-3">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/photo/${photo.id}`}
            className="group relative block break-inside-avoid mb-3 overflow-hidden rounded-lg"
          >
            {/* TODO: view-transition-name="photo-[id]" */}
            <Image
              data-photo-id={photo.id}
              src={getPicsum(photo.seed, photo.w, photo.h)}
              alt={`${photo.title} — ${photo.location}`}
              width={photo.w}
              height={photo.h}
              className="w-full h-auto block"
              style={{ aspectRatio: `${photo.w}/${photo.h}` }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
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
    </div>
  );
}
