import { Suspense, ViewTransition } from "react";
import {
  PhotographerList,
  PhotographerListSkeleton,
} from "./photographer-list";

export default function AboutPage() {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-4">
            About
          </h1>
          <p className="text-base text-white/50 leading-relaxed">
            Frames is a curated photography gallery exploring light, place, and
            time.
          </p>
        </div>

        <section className="border-t border-white/10 pt-12">
          <h2 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-8">
            Photographers
          </h2>
          <Suspense
            fallback={
              <ViewTransition exit="slide-down">
                <PhotographerListSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition enter="slide-up" default="none">
              <PhotographerList />
            </ViewTransition>
          </Suspense>
        </section>
      </div>
    </ViewTransition>
  );
}
