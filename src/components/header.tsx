import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-medium text-white tracking-tight hover:text-white/70 transition-colors"
          aria-label="Frames — Home"
        >
          Frames
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/collection/landscapes"
            className="px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
