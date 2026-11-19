import Link from "next/link";
import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <section
      className={`app-panel rounded-lg border border-line bg-white p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionTitle({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Patient workspace
        </p>
        <h1 className="font-heading text-2xl font-extrabold text-heading sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-body">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function DemoNotice({ text }: { text?: string }) {
  return (
    <aside className="rounded-md border border-primary/25 bg-primary-soft px-4 py-3 text-xs leading-5 text-heading">
      {text ??
        "Demo interface only. Records shown here are synthetic examples, not real patient information or clinical guidance."}
    </aside>
  );
}

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-obsidian transition-colors hover:bg-primary-hover"
    >
      {children}
    </Link>
  );
}

export function EmptyState({
  title = "No matching records",
  description = "Try changing your search or filter.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-page px-5 py-10 text-center">
      <p className="font-heading font-bold text-heading">{title}</p>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </div>
  );
}

const statusStyles = {
  Reviewed: "bg-[#E8F6EE] text-[#146B45]",
  "Needs review": "bg-[#FBE8E9] text-[#A22A3E]",
  Processing: "bg-[#FFF1D9] text-[#88530D]",
} as const;

export function StatusPill({ type }: { type: keyof typeof statusStyles }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusStyles[type]}`}
    >
      {type}
    </span>
  );
}
