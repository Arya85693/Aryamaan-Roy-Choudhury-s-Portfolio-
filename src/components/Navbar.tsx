"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/content";
import { CloseIcon, SearchIcon } from "@/components/Icons";
import { OPEN_COMMAND_MENU } from "@/components/CommandMenu";

export const sections = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
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
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent"
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
          className="group flex items-center gap-3"
          aria-label={`${profile.name}, home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line-strong font-mono text-[0.7rem] font-semibold text-paper transition-colors group-hover:border-accent group-hover:text-accent">
            AR
          </span>
          <span className="hidden text-sm font-medium text-paper sm:inline">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map(({ id, label }) => {
            const active = isHome && activeSection === id;
            return (
              <a
                key={id}
                href={href(id)}
                aria-current={active ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active ? "text-paper" : "text-paper-muted hover:text-paper"
                }`}
              >
                {active && (
                  <span aria-hidden className="absolute inset-0 rounded-full bg-white/[0.06] ring-1 ring-line" />
                )}
                <span className="relative">{label}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_MENU))}
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-paper-muted transition-colors hover:border-line-strong hover:text-paper lg:flex"
            aria-label="Open command menu"
          >
            <SearchIcon className="h-3.5 w-3.5" />
            <kbd className="font-mono text-[0.68rem]">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-paper px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-accent sm:inline-flex"
          >
            Résumé
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-paper md:hidden"
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
                  <span className="font-mono text-xs text-accent">{`0${i + 1}`}</span>
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
