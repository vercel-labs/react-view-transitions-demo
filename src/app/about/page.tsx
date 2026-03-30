import { photos } from "@/lib/photos";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const photographers = [
  { name: "Mia Kern", initials: "MK", location: "Berlin, Germany" },
  { name: "Kenji Mori", initials: "KM", location: "Tokyo, Japan" },
  { name: "Leila Osei", initials: "LO", location: "Accra, Ghana" },
  { name: "Sam Rivera", initials: "SR", location: "San Francisco, CA" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-4">
          About
        </h1>
        <p className="text-base text-white/50 leading-relaxed">
          Frames is a curated photography gallery exploring light, place, and
          time.
        </p>
      </div>

      {/* Photographers */}
      <section className="border-t border-white/10 pt-12">
        <h2 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-8">
          Photographers
        </h2>
        <div className="space-y-6">
          {photographers.map((p) => {
            const photoCount = photos.filter(
              (ph) => ph.photographer === p.name
            ).length;
            return (
              <div key={p.name} className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarFallback className="font-mono text-xs text-white/70 bg-white/5">
                    {p.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{p.name}</p>
                  <p className="font-mono text-xs text-white/40 mt-0.5">
                    {p.location}
                  </p>
                </div>
                <span className="font-mono text-xs text-white/30 shrink-0">
                  {photoCount} photo{photoCount !== 1 ? "s" : ""}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
