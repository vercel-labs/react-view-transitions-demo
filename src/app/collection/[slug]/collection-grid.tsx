import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPhotoImage } from "@/lib/images";
import { getCollection } from "@/data/queries/photos";

export async function CollectionGrid({ slug }: { slug: string }) {
  const collectionPhotos = await getCollection(slug);

  return (
    <>
      <p className="font-mono text-xs text-white/40 -mt-6 mb-6">
        {collectionPhotos.length} photo{collectionPhotos.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {collectionPhotos.map((photo, i) => (
          <ViewTransition key={photo.id}>
            <Link
              href={`/photo/${photo.id}`}
              transitionTypes={["nav-forward"]}
              className="group relative block overflow-hidden rounded-lg aspect-[4/3]"
            >
              <ViewTransition name={`photo-${photo.id}`} share="morph" default="none">
                <Image
                  data-photo-id={photo.id}
                  src={getPhotoImage(photo.seed)}
                  alt={`${photo.title} — ${photo.location}`}
                  className="w-full h-full object-cover block rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                  placeholder="blur"
                />
              </ViewTransition>
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
          </ViewTransition>
        ))}
      </div>
    </>
  );
}
