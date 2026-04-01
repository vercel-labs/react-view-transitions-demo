import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CollectionGrid } from "./collection-grid";

const COLLECTION_SLUGS = ["mia-kern", "kenji-mori", "leila-osei", "sam-rivera"];

export async function generateStaticParams() {
  return COLLECTION_SLUGS.map((slug) => ({ slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!COLLECTION_SLUGS.includes(slug)) notFound();

  return (
    <Suspense key={slug} fallback={<CollectionGridSkeleton />}>
      <CollectionGrid slug={slug} />
    </Suspense>
  );
}

function CollectionGridSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-20 bg-white/5 rounded -mt-6 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white/5 rounded-lg" style={{ aspectRatio: "4/3" }} />
        ))}
      </div>
    </div>
  );
}
