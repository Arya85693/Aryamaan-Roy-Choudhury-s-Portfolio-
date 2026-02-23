"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-navy-secondary backdrop-blur-sm border-b border-slate-700 shadow-sm">
      <div className="flex justify-between items-center px-10 py-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-slate-100 font-semibold text-sm hover:text-accent transition-colors duration-200"
        >
          Aryamaan Roy Choudhury
        </a>
        <div className="flex gap-8">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`group relative inline-block text-sm font-medium transition-all duration-200 py-1 ${
                activeSection === id
                  ? "text-accent"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {label}
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full transition-opacity duration-200 ${activeSection === id ? "opacity-100" : "opacity-0 group-hover:opacity-70"}`} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
