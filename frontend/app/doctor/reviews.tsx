"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useDoctorReviews } from "@/components/doctor/use-doctor-reviews";
import { DemoBanner, PageHeading, Panel, Status } from "@/components/doctor/doctor-ui";
import type { ReviewStatus } from "@/data/doctor";

export default function Reviews() {
  const { reviews } = useDoctorReviews();
  const [query,setQuery] = useState("");
  const [filter,setFilter] = useState<"All"|ReviewStatus>("All");
  const filtered = useMemo(()=>reviews.filter((r)=>(filter==="All"||r.status===filter) && [r.id,r.patient,...r.medicines].join(" ").toLowerCase().includes(query.toLowerCase())),[reviews,filter,query]);
  return <>
    <PageHeading eyebrow="Assigned prescriptions" title="Review Queue" description="Search synthetic prescription records, filter by review status, and open the verification workspace."/>
    <DemoBanner/>
    <Panel>
      <div className="mb-5 flex flex-col gap-3 md:flex-row"><label className="relative flex-1"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/><span className="sr-only">Search prescriptions</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search ID, patient, or extracted item..." className="w-full rounded-control border border-line bg-white py-3 pl-10 pr-4 text-sm text-heading outline-none focus:border-primary-hover"/></label><label className="flex items-center gap-2"><span className="text-xs font-semibold text-body">Status:</span><select value={filter} onChange={e=>setFilter(e.target.value as typeof filter)} className="rounded-control border border-line bg-white px-4 py-3 text-sm text-heading"><option>All</option><option>Pending</option><option>Needs clarification</option><option>Reviewed</option></select></label></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead><tr className="border-b border-line bg-[#FAF8F4] text-xs uppercase tracking-wide text-muted"><th className="px-4 py-3 font-bold">Prescription</th><th className="px-4 py-3 font-bold">Patient</th><th className="px-4 py-3 font-bold">Flag</th><th className="px-4 py-3 font-bold">Status</th><th className="px-4 py-3 text-right font-bold">Action</th></tr></thead><tbody>{filtered.map((r)=><tr key={r.id} className="border-b border-line last:border-0 hover:bg-[#FAF8F4]"><td className="px-4 py-4"><span className="font-bold text-heading">{r.id}</span><span className="mt-1 block text-xs text-muted">{r.date}</span></td><td className="px-4 py-4 text-heading">{r.patient}</td><td className="px-4 py-4 text-body">{r.flag}</td><td className="px-4 py-4"><Status value={r.status}/></td><td className="px-4 py-4 text-right"><Link href={`/doctor?view=verify&id=${r.id}`} className="inline-flex items-center gap-1 font-bold text-[#9A6219] hover:underline">Review <ArrowRight size={15}/></Link></td></tr>)}</tbody></table></div>
      {filtered.length===0&&<p className="py-12 text-center text-sm text-muted">No matching synthetic records.</p>}
      <p className="mt-4 text-xs text-muted">Showing {filtered.length} of {reviews.length} demo records</p>
    </Panel>
  </>;
}
