import Link from "next/link";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-12 font-sans text-(--ui-text)">
      <div className="w-full max-w-lg rounded-2xl border border-(--ui-border) bg-white p-8 sm:p-10">
        <h1 className="text-4xl font-semibold tracking-tight">Project Tracker</h1>
        <p className="mt-3 leading-6 text-(--ui-muted)">Browse workspace projects and follow the progress of their tasks.</p>
        <nav aria-label="Get started" className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold">
          <Link
            href="/projects"
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            View projects
          </Link>
          <Link href="/playground" className="text-indigo-700 hover:underline">
            Component playground
          </Link>
        </nav>
      </div>
    </main>
  );
}
