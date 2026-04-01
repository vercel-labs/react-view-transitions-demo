import Link from "next/link";
import { CollectionTabs } from "./collection-tabs";

const COLLECTION_SLUGS = ["mia-kern", "kenji-mori", "leila-osei", "sam-rivera"];

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        transitionTypes={["nav-back"]}
        className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white transition-colors mb-8"
      >
        ← Gallery
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Photographers
        </h1>
      </div>

      <div className="flex items-center gap-2 mb-10 border-b border-white/10 pb-6">
        <CollectionTabs slugs={COLLECTION_SLUGS} />
      </div>

      {children}
    </div>
  );
}
