"use client";
import Link from "next/link";
import { ArrowRight, History as HistoryIcon, RotateCcw } from "lucide-react";
import { useDoctorReviews } from "@/components/doctor/use-doctor-reviews";
import { DemoBanner, PageHeading, Panel, Status } from "../../components/doctor/doctor-ui";

export default function ReviewHistory(){
  const {reviews,reset}=useDoctorReviews();
  const history=reviews.filter(r=>r.status!=="Pending");
  return <>
    <PageHeading eyebrow="Audit trail prototype" title="Review History" description="See previously reviewed or clarification-requested synthetic records. Changes are saved locally in your browser." action={<button type="button" onClick={()=>{if(window.confirm("Reset only the synthetic doctor demo records in this browser?"))reset();}} className="inline-flex items-center justify-center gap-2 rounded-control border border-line bg-white px-4 py-2.5 text-sm font-bold text-heading hover:bg-[#FAF8F4]"><RotateCcw size={16}/> Reset demo</button>}/>
    <DemoBanner/>
    <Panel><div className="mb-5 flex items-center gap-2"><HistoryIcon className="text-[#9A6219]" size={21}/><h3 className="font-heading text-lg font-bold text-heading">Recorded demo reviews</h3></div>
      {history.length? <div className="space-y-3">{history.map(r=><div key={r.id} className="rounded-xl border border-line p-4 sm:p-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="font-bold text-heading">{r.id} <span className="font-normal text-muted">· {r.patient}</span></p><p className="mt-1 text-xs text-muted">Synthetic record date: {r.date}</p></div><div className="flex flex-wrap items-center gap-3"><Status value={r.status}/><Link href={`/doctor?view=verify&id=${r.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-[#9A6219] hover:underline">Open <ArrowRight size={15}/></Link></div></div><p className="mt-3 border-l-2 border-primary bg-[#FAF8F4] px-3 py-2 text-sm leading-6 text-body">{r.note||"No demo notes recorded."}</p></div>)}</div>:<p className="py-12 text-center text-sm text-muted">No completed demo reviews yet. Use Verification to add one.</p>}
      <p className="mt-4 text-xs text-muted">This is not a secure audit trail. Production audit logging requires a backend, timestamps, access controls and tamper-resistant storage.</p>
    </Panel>
  </>;
}
