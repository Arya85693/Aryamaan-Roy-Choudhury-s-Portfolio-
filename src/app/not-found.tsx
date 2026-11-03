import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-page flex-col justify-center px-5 pt-28 sm:px-8">
      <p className="eyebrow text-accent">404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tightest text-paper">Page not found.</h1>
      <p className="mt-4 text-paper-muted">That page doesn’t exist, but the work does.</p>
      <div className="mt-8">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
