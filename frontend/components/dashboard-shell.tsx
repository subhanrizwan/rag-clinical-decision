import Link from "next/link";
import type { ReactNode } from "react";

const sections = [
  { label: "Overview", href: "/patient" },
  { label: "Upload", href: "/patient?section=upload" },
  { label: "Prescriptions", href: "/patient?section=prescriptions" },
  { label: "Reports", href: "/patient?section=reports" },
  { label: "Schedule", href: "/patient?section=schedule" },
  { label: "History", href: "/patient?section=history" },
  { label: "Settings", href: "/patient?section=settings" },
];

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-page">
      <header className="bg-obsidian text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/patient" className="w-fit">
            <span className="font-heading text-lg font-extrabold">
              Smart Rx Guard
            </span>
            <span className="ml-2 text-xs text-[#BCC0C7]">
              Patient workspace
            </span>
          </Link>
          <nav
            aria-label="Patient workspace"
            className="flex gap-2 overflow-x-auto pb-1"
          >
            {sections.map((section) => (
              <Link
                key={section.label}
                href={section.href}
                className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-[#E7E7E7] transition-colors hover:bg-obsidian-soft"
              >
                {section.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
