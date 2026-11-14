"use client";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Clock3, FileCheck2, ListChecks, ShieldAlert, Stethoscope } from "lucide-react";
import { useDoctorReviews } from "@/components/doctor/use-doctor-reviews";
import { Panel, PageHeading, DemoBanner, Status } from "@/components/doctor/doctor-ui";

export default function Overview() {
  const { reviews } = useDoctorReviews();
  const pending = reviews.filter(r=>r.status==="Pending").length;
  const clarified = reviews.filter(r=>r.status==="Needs clarification").length;
  const reviewed = reviews.filter(r=>r.status==="Reviewed").length;
  const stats = [
    {label:"Assigned Records",value:reviews.length,icon:ClipboardCheck,color:"bg-primary-soft text-[#9A6219]"},
    {label:"Pending Review",value:pending,icon:Clock3,color:"bg-[#FFF4DF] text-[#9A6219]"},
    {label:"Needs Clarification",value:clarified,icon:ShieldAlert,color:"bg-[#FFF0F1] text-[#A3333E]"},
    {label:"Reviewed",value:reviewed,icon:FileCheck2,color:"bg-[#E7F8F0] text-[#156A4C]"},
  ];
  return <>
    <PageHeading eyebrow="Clinical workspace" title="Good morning, Doctor" description="Track assigned prescription reviews, review extracted records, and record demo verification decisions." action={<Link href="/doctor?view=reviews" className="inline-flex items-center justify-center gap-2 rounded-control bg-primary px-5 py-3 text-sm font-bold text-obsidian hover:bg-primary-hover">Open Review Queue <ArrowRight size={17}/></Link>}/>
    <DemoBanner/>
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat)=>{const Icon=stat.icon;return <Panel key={stat.label} className="flex items-start justify-between"><div><p className="text-sm text-body">{stat.label}</p><p className="mt-3 font-heading text-3xl font-extrabold text-heading">{stat.value.toString().padStart(2,"0")}</p></div><span className={`rounded-xl p-3 ${stat.color}`}><Icon size={22}/></span></Panel>})}</div>
    <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
      <Panel><div className="mb-5 flex items-center justify-between gap-2"><h3 className="font-heading text-lg font-bold text-heading">Recent assignments</h3><Link href="/doctor?view=reviews" className="text-sm font-bold text-[#9A6219] hover:underline">View all</Link></div><div className="space-y-3">{reviews.slice(0,3).map((r)=><div key={r.id} className="flex flex-col gap-3 rounded-xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-heading">{r.patient} <span className="font-normal text-muted">· {r.id}</span></p><p className="mt-1 text-xs text-muted">{r.date} · {r.medicines.length} extracted item(s)</p></div><div className="flex items-center gap-3"><Status value={r.status}/><Link href={`/doctor?view=verify&id=${r.id}`} className="rounded-lg border border-line p-2 text-heading hover:bg-primary-soft" aria-label={`Open ${r.id}`}><ArrowRight size={17}/></Link></div></div>)}</div></Panel>
      <Panel className="bg-obsidian text-white"><span className="inline-flex rounded-xl bg-white/10 p-3 text-primary"><Stethoscope size={24}/></span><h3 className="mt-5 font-heading text-xl font-bold text-white">Review workflow</h3><p className="mt-3 text-sm leading-6 text-white/65">Inspect the source prescription, confirm extracted text, examine evidence placeholders, and document uncertainty before taking action.</p><Link href="/doctor?view=verify" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-obsidian">Start verification <ArrowRight size={16}/></Link><div className="mt-6 flex items-center gap-2 text-xs text-white/45"><ListChecks size={16}/> Synthetic records only</div></Panel>
    </div>
  </>;
}
