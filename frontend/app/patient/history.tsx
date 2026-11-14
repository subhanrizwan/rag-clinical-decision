"use client";
import { useMemo,useState } from "react";
import { CheckCircle2, Clock3, History as HistoryIcon, Search, UploadCloud } from "lucide-react";
import { historyItems } from "@/data/patient";
import { DemoNotice, EmptyState, Panel, SectionTitle } from "@/components/patient/primitives";

const icons={upload:UploadCloud,review:CheckCircle2,pending:Clock3};
export default function PrescriptionHistory(){
  const [search,setSearch]=useState("");
  const visible=useMemo(()=>historyItems.filter(x=>`${x.id} ${x.type} ${x.detail} ${x.date}`.toLowerCase().includes(search.toLowerCase())),[search]);
  return <div className="space-y-6"><SectionTitle title="Prescription History" description="Browse the timeline of prescription uploads, processing and review events."/><DemoNotice text="These are synthetic example events, not real audit logs. Backend audit history will be read-only, access-controlled and timestamped when implemented."/>
    <Panel><div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><h3 className="flex items-center gap-2 font-heading text-lg font-extrabold text-heading"><HistoryIcon size={20} className="text-[#9B6113]"/>Activity timeline</h3><label className="relative"><span className="sr-only">Search history</span><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search activity" className="h-11 w-full rounded-xl border border-line bg-page pl-10 pr-3 text-sm text-heading outline-none focus:border-primary-hover sm:w-60"/></label></div>
      {visible.length===0?<EmptyState/>:<ol className="relative ml-4 border-l-2 border-line pl-7">{visible.map(item=>{const Icon=icons[item.icon as keyof typeof icons];return <li key={item.id} className="relative pb-7 last:pb-0"><span className="absolute -left-[43px] top-0 flex size-8 items-center justify-center rounded-full border-4 border-white bg-primary-soft text-[#9B6113]"><Icon size={15}/></span><div className="flex flex-col gap-2 rounded-xl border border-line p-4 sm:flex-row sm:items-start sm:justify-between"><div><h4 className="font-heading text-sm font-extrabold text-heading">{item.type}</h4><p className="mt-1 text-xs text-body">{item.detail}</p><p className="mt-2 text-[11px] text-muted">Event {item.id}</p></div><time className="shrink-0 text-xs font-semibold text-muted">{item.date}</time></div></li>})}</ol>}
    </Panel>
  </div>;
}
