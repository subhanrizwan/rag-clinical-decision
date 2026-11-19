import type { ReactNode } from "react";
import { Search, DatabaseZap } from "lucide-react";

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`app-panel rounded-lg border border-line bg-white p-5 sm:p-6 ${className}`}>{children}</section>;
}
export function Heading({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return   <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
  <div><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.19em] text-primary">{eyebrow}</p>
    <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[#1C2026] sm:text-3xl">{title}</h2>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77716B]">{description}</p></div>{children}
  </div>;
}
export function Pill({ status }: { status: string }) {
  const s = status.toLowerCase();
  const color = s.includes("active") || s.includes("indexed") || s.includes("success") || s.includes("completed") ? "bg-[#E6F5EE] text-[#116B4F]" : s.includes("suspend") || s.includes("review") || s.includes("warning") ? "bg-[#FCE8E8] text-[#AB3442]" : s.includes("pending") ? "bg-[#FFF1D8] text-[#8A581B]" : "bg-[#EDF1F6] text-[#50637A]";
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${color}`}>{status}</span>;
}
export function SearchField({ value, onChange, placeholder="Search records..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <label className="flex min-h-11 items-center gap-2 rounded-xl border border-[#E6E0D7] bg-white px-3 text-[#817B73] focus-within:border-[#C78D38]">
    <Search size={17} /><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} className="min-w-0 flex-1 bg-transparent text-sm text-[#1C2026] outline-none placeholder:text-[#A09A92]" />
  </label>;
}
export function Empty({ message="No matching records found." }: { message?: string }) {
  return <div className="flex flex-col items-center gap-2 px-6 py-14 text-center text-[#817B73]"><DatabaseZap size={25}/><p className="text-sm">{message}</p></div>;
}
export function DemoNotice() {
  return <div className="mt-5 rounded-md border border-primary/25 bg-primary-soft px-4 py-3 text-xs leading-5 text-heading"><strong>Prototype only:</strong> All names, metrics, logs and knowledge records are synthetic. Browser actions are UI demos, not genuine account administration, validated clinical evidence, real audits or production AI monitoring.</div>
}
export const selectStyle = "min-h-11 rounded-xl border border-[#E6E0D7] bg-white px-3 text-sm text-[#1C2026] outline-none focus:border-[#C78D38]";
export const darkButton = "inline-flex min-h-10 items-center justify-center gap-2 rounded-control bg-primary px-4 py-2 text-xs font-bold text-obsidian transition-colors hover:bg-primary-hover disabled:opacity-50";
export const lightButton = "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#E6E0D7] bg-white px-4 py-2 text-xs font-bold text-[#27282C] transition-colors hover:bg-[#F5F2EC] disabled:opacity-50";
