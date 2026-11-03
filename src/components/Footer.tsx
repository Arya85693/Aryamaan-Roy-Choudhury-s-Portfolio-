import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-5 py-8 text-sm text-paper-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs">Designed &amp; built with Next.js, TypeScript &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
