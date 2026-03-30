import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { photos, getCollection, getPicsum } from "@/lib/photos";

const COLLECTION_SLUGS = ["landscapes", "urban", "street"];

export async function generateStaticParams() {
  return COLLECTION_SLUGS.map((slug) => ({ slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!COLLECTION_SLUGS.includes(slug)) {
    notFound();
  }

  const collectionPhotos = getCollection(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white transition-colors mb-8"
      >
        ← Gallery
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white capitalize mb-1">
          {slug}
        </h1>
        <p className="font-mono text-xs text-white/40">
          {collectionPhotos.length} photo{collectionPhotos.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Collection nav */}
      <div className="flex items-center gap-2 mb-10 border-b border-white/10 pb-6">
        {COLLECTION_SLUGS.map((s) => (
          <Link
            key={s}
            href={`/collection/${s}`}
            className={`px-3 py-1.5 rounded font-mono text-xs transition-colors capitalize ${
              s === slug
                ? "bg-white/10 text-white border border-white/20"
                : "text-white/40 hover:text-white"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-3">
        {collectionPhotos.map((photo) => (
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

      {/* All collections link */}
      <div className="mt-12 border-t border-white/10 pt-8">
        <p className="font-mono text-xs text-white/30 mb-4">Other collections</p>
        <div className="flex flex-wrap gap-2">
          {COLLECTION_SLUGS.filter((s) => s !== slug).map((s) => {
            const count = photos.filter((p) => p.collection === s).length;
            return (
              <Link
                key={s}
                href={`/collection/${s}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 font-mono text-xs text-white/50 hover:text-white hover:border-white/30 transition-all capitalize"
              >
                {s}
                <span className="text-white/30">{count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
