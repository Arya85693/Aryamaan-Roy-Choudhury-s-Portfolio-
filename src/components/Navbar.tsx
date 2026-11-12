"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/content";
import { CloseIcon } from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle";

export const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // One underline for the current section that slides between links instead of jumping.
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [bar, setBar] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) setActiveSection(id);
          else setActiveSection((current) => (current === id ? null : current));
        });
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const active = isHome && activeSection ? linkRefs.current[activeSection] : null;
    if (!active) return;
    const measure = () => setBar({ left: active.offsetLeft + 12, width: active.offsetWidth - 24 });
    measure();
    // Link widths change once the web font loads and when the window resizes.
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isHome, activeSection]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || menuOpen ? "border-b border-line bg-ink" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          onClick={(e) => {
            setMenuOpen(false);
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-display text-[0.95rem] font-semibold tracking-tight text-paper transition-colors hover:text-accent-fg"
          aria-label={`${profile.name}, home`}
        >
          {profile.name}
        </Link>

        <div className="relative hidden items-center gap-1 md:flex">
          {sections.map(({ id, label }) => {
            const active = isHome && activeSection === id;
            return (
              <a
                key={id}
                ref={(el) => {
                  linkRefs.current[id] = el;
                }}
                href={href(id)}
                aria-current={active ? "true" : undefined}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  active ? "text-paper" : "text-paper-muted hover:text-paper"
                }`}
              >
                {label}
              </a>
            );
          })}
          {bar && (
            <span
              aria-hidden
              className={`absolute -bottom-px left-0 h-0.5 bg-accent transition-[transform,width,opacity] duration-300 ease-out ${
                isHome && activeSection ? "opacity-100" : "opacity-0"
              }`}
              style={{ width: bar.width, transform: `translateX(${bar.left}px)` }}
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden bg-secondary px-4 py-1.5 text-sm font-medium text-on-secondary transition-colors hover:bg-secondary-soft sm:inline-flex"
          >
            Résumé
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center border border-line-strong text-paper md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <CloseIcon />
            ) : (
              <span aria-hidden className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="h-[calc(100dvh-4rem)] animate-fade-in border-t border-line bg-ink px-5 pb-10 pt-6 md:hidden"
        >
          <ul className="flex flex-col">
            {sections.map(({ id, label }, i) => (
              <li key={id} className="border-b border-line">
                <a
                  href={href(id)}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-display text-3xl font-semibold tracking-tight text-paper"
                >
                  <span className="font-mono text-xs text-secondary">{`0${i + 1}`}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Résumé
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
