"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, BookOpen, CheckCheck, ClipboardList, FileText, Info, RotateCcw, Save } from "lucide-react";
import { useDoctorReviews } from "@/components/doctor/use-doctor-reviews";
import { DemoBanner, PageHeading, Panel, Status } from "@/components/doctor/doctor-ui";
import type { ReviewDecision } from "@/data/doctor";

export default function Verify({initialId}: {initialId?:string}) {
  const {reviews,decide,loaded}=useDoctorReviews();
  const [id,setId]=useState(initialId??"DR-104");
  const record=reviews.find(r=>r.id===id)??reviews[0];
  const [note,setNote]=useState("");
  const [message,setMessage]=useState("");
  useEffect(()=>{setNote(record?.note??"");setMessage("");},[record?.id,record?.note]);
  function save(decision:ReviewDecision){
    if(!record)return;
    if(note.trim().length<8){setMessage("Please enter at least 8 characters explaining your demo review decision.");return;}
    decide(record.id,decision,note);
    setMessage(`Demo decision saved as “${decision}” in this browser. No real clinical system was updated.`);
  }
  if(!record)return <p>No demo records found.</p>;
  return <>
    <PageHeading eyebrow="Clinical review workspace" title="Prescription Verification" description="Compare placeholder source material, OCR fields and evidence slots before recording a demo review decision." action={<Link href="/doctor?view=reviews" className="inline-flex items-center gap-2 rounded-control border border-line bg-white px-4 py-2.5 text-sm font-bold text-heading"><ArrowLeft size={17}/> Queue</Link>}/>
    <DemoBanner/>
    <div className="mb-5 flex flex-col justify-between gap-3 rounded-xl border border-line bg-white p-4 sm:flex-row sm:items-center"><label className="flex flex-wrap items-center gap-3 text-sm font-semibold text-heading">Select demo record <select value={record.id} onChange={e=>setId(e.target.value)} className="rounded-lg border border-line px-3 py-2 text-sm">{reviews.map(r=><option key={r.id} value={r.id}>{r.id} — {r.patient}</option>)}</select></label><Status value={record.status}/></div>
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="space-y-6"><Panel><div className="mb-4 flex items-center gap-2"><FileText className="text-[#9A6219]" size={20}/><h3 className="font-heading text-lg font-bold text-heading">Original prescription</h3></div><div className="flex min-h-60 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D9D0C2] bg-[#F9F7F3] p-6 text-center"><ClipboardList className="text-[#C6B7A1]" size={42}/><p className="mt-3 font-semibold text-heading">Source document placeholder</p><p className="mt-2 max-w-sm text-xs leading-5 text-muted">The real uploaded image/PDF will appear here after authenticated backend integration. No document is available in this prototype.</p></div><p className="mt-3 text-xs text-muted">Record: {record.id} · {record.date}</p></Panel>
      <Panel><h3 className="font-heading text-lg font-bold text-heading">Extracted medicine fields</h3><p className="mb-4 mt-2 text-xs text-muted">Illustrative OCR output; not verified from a document.</p><div className="space-y-3">{record.medicines.map((m,i)=><div key={m} className="flex items-center justify-between rounded-xl border border-line p-4"><div><p className="text-xs text-muted">Field {i+1}</p><p className="font-semibold text-heading">{m}</p></div><span className="rounded-md bg-[#FFF4DF] px-2 py-1 text-xs font-bold text-[#8A581B]">Unverified</span></div>)}</div><p className="mt-4 rounded-lg bg-[#FFF4DF] p-3 text-xs leading-5 text-[#80531D]">OCR confirmation and dosage instructions must come from the original prescription and a qualified professional. Never infer missing instructions.</p></Panel></div>
      <div className="space-y-6"><Panel><div className="mb-4 flex items-center gap-2"><AlertTriangle size={20} className="text-[#B47726]"/><h3 className="font-heading text-lg font-bold text-heading">Safety review indicators</h3></div><div className="rounded-xl border border-[#F1D8AC] bg-[#FFF8EA] p-4"><p className="font-semibold text-[#63451B]">{record.flag}</p><p className="mt-2 text-sm leading-6 text-[#63451B]">This is a synthetic workflow flag, not a validated drug interaction. Source evaluation is unavailable in demo mode.</p></div><div className="mt-4 flex gap-2 rounded-xl border border-[#D6E3F2] bg-[#F0F6FD] p-3 text-xs leading-5 text-[#315D88]"><Info size={18} className="shrink-0"/><p>Insufficient evidence is <strong>not</strong> equivalent to a safe prescription. This screen cannot determine clinical safety.</p></div></Panel>
      <Panel><div className="mb-4 flex items-center gap-2"><BookOpen size={20} className="text-[#9A6219]"/><h3 className="font-heading text-lg font-bold text-heading">RAG evidence panel</h3></div><div className="rounded-xl border border-dashed border-line bg-[#FAF8F4] p-5"><p className="font-semibold text-heading">Evidence sources not connected</p><p className="mt-2 text-sm leading-6 text-body">Future integration will show retrieved source passages, reference labels, document dates, and uncertainty. No citations are invented here.</p></div></Panel>
      <Panel><h3 className="font-heading text-lg font-bold text-heading">Record demo decision</h3><p className="mt-2 text-xs leading-5 text-muted">Choosing “Reviewed” only updates this synthetic UI record; it does not mean the medication is safe.</p><label htmlFor="doctor-note" className="mt-4 block text-sm font-bold text-heading">Review notes</label><textarea id="doctor-note" value={note} onChange={e=>setNote(e.target.value)} rows={4} placeholder="Document OCR uncertainties and required follow-up..." className="mt-2 w-full resize-y rounded-xl border border-line p-3 text-sm text-heading outline-none focus:border-primary-hover"/>
      <div className="mt-4 flex flex-wrap gap-3"><button type="button" disabled={!loaded} onClick={()=>save("Reviewed")} className="inline-flex items-center gap-2 rounded-control bg-primary px-4 py-2.5 text-sm font-bold text-obsidian hover:bg-primary-hover disabled:opacity-50"><CheckCheck size={17}/> Mark Reviewed</button><button type="button" disabled={!loaded} onClick={()=>save("Needs clarification")} className="inline-flex items-center gap-2 rounded-control border border-line bg-white px-4 py-2.5 text-sm font-bold text-heading hover:bg-[#FAF8F4] disabled:opacity-50"><Save size={17}/> Request Clarification</button></div>
      {message&&<p role="status" className="mt-4 rounded-lg border border-line bg-[#FAF8F4] p-3 text-xs text-heading">{message}</p>}
      </Panel></div>
    </div>
  </>;
}
