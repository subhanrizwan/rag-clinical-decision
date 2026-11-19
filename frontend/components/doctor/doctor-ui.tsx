import type { ReactNode } from "react";
import type { ReviewStatus } from "@/data/doctor";

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`app-panel rounded-lg border border-line bg-white p-5 sm:p-6 ${className}`}>{children}</section>;
}

export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return   <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
  <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.17em] text-primary">{eyebrow}</p>
    <h2 className="font-heading text-2xl font-extrabold text-heading sm:text-3xl">{title}</h2>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-body">{description}</p></div>{action}</div>;
}

export function Status({ value }: { value: ReviewStatus }) {
  const styles: Record<ReviewStatus,string> = {
    Pending:"border-[#F1D8AC] bg-[#FFF4DF] text-[#875716]",
    "Needs clarification":"border-[#F1C8CA] bg-[#FFF0F1] text-[#A3333E]",
    Reviewed:"border-[#BCE7D5] bg-[#E7F8F0] text-[#156A4C]",
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold ${styles[value]}`}>{value}</span>;
}

export function DemoBanner() {
  return <div className="mb-6 rounded-md border border-primary/25 bg-primary-soft px-4 py-3 text-xs leading-5 text-heading">
    <strong>FYP Demo:</strong> All patients, prescriptions, alerts and review decisions here are synthetic. No live OCR, AI assessment or medical verification is performed.
  </div>;
}
