"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { profile, projects } from "@/data/content";
import { SearchIcon } from "@/components/Icons";
import { getTheme, toggleTheme } from "@/lib/theme";

export const OPEN_COMMAND_MENU = "open-command-menu";

type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

export default function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const go = (hash: string) => () => router.push(`/#${hash}`);
    const external = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      { id: "work", group: "Navigate", label: "Selected work", run: go("work") },
      { id: "experience", group: "Navigate", label: "Experience", run: go("experience") },
      { id: "research", group: "Navigate", label: "Research & technical communication", run: go("research") },
      { id: "about", group: "Navigate", label: "About", run: go("about") },
      { id: "skills", group: "Navigate", label: "Skills", run: go("skills") },
      { id: "education", group: "Navigate", label: "Education & leadership", run: go("education") },
      { id: "contact", group: "Navigate", label: "Contact", run: go("contact") },
      ...projects.map((p) => ({
        id: `case-${p.slug}`,
        group: "Case studies",
        label: p.title,
        hint: p.kind,
        run: () => router.push(`/projects/${p.slug}`),
      })),
      { id: "resume", group: "Links", label: "Open résumé (PDF)", run: external(profile.resume) },
      {
        id: "email",
        group: "Links",
        label: "Copy email address",
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => setToast("Email copied to clipboard"),
            () => setToast(profile.email)
          );
        },
      },
      { id: "github", group: "Links", label: "GitHub", hint: "github.com/Arya85693", run: external(profile.github) },
      {
        id: "linkedin",
        group: "Links",
        label: "LinkedIn",
        hint: profile.linkedin.replace(/^https:\/\/www\./, "").replace(/\/$/, ""),
        run: external(profile.linkedin),
      },
      {
        id: "matchupdna-live",
        group: "Links",
        label: "Matchup DNA (live)",
        hint: "matchupdna.com",
        run: external("https://www.matchupdna.com/"),
      },
      {
        id: "hoops-live",
        group: "Links",
        label: "Hoops Stock Market (live)",
        hint: "hoopsstockmarket.com",
        run: external("https://hoopsstockmarket.com/"),
      },
      {
        id: "theme",
        group: "Preferences",
        label: "Toggle light / dark theme",
        hint: "theme",
        run: () => {
          toggleTheme();
          setToast(getTheme() === "light" ? "Light theme on" : "Dark theme on");
        },
      },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint ?? ""} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => setActiveIndex(0), [query]);

  const runCommand = (command: Command) => {
    close();
    command.run();
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const command = filtered[activeIndex];
      if (command) runCommand(command);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex animate-fade-in items-start justify-center bg-ink/70 px-4 pt-[14vh] backdrop-blur-sm"
          onMouseDown={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-ink-850 shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <SearchIcon className="h-4 w-4 text-paper-dim" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Jump to a section, project, or link…"
                className="h-14 flex-1 bg-transparent text-sm text-paper placeholder:text-paper-dim focus:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined}
                aria-autocomplete="list"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-paper-dim">
                esc
              </kbd>
            </div>
            <ul id="command-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-paper-dim">No results</li>
              )}
              {filtered.map((command, i) => {
                const showGroup = i === 0 || filtered[i - 1].group !== command.group;
                return (
                  <li key={command.id} role="presentation">
                    {showGroup && (
                      <p className="px-3 pb-1.5 pt-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-paper-dim">
                        {command.group}
                      </p>
                    )}
                    <div
                      id={`cmd-${command.id}`}
                      role="option"
                      aria-selected={i === activeIndex}
                      onMouseMove={() => setActiveIndex(i)}
                      onClick={() => runCommand(command)}
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm ${
                        i === activeIndex ? "bg-paper/[0.06] text-paper" : "text-paper-muted"
                      }`}
                    >
                      <span>{command.label}</span>
                      {command.hint && (
                        <span className="truncate font-mono text-[0.7rem] text-paper-dim">{command.hint}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center">
        {toast && (
          <p className="animate-fade-in rounded-full border border-line-strong bg-ink-800 px-4 py-2 text-sm text-paper shadow-xl">
            {toast}
          </p>
        )}
      </div>
    </>
  );
}
