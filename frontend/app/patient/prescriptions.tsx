"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText, Search, ArrowUpRight } from "lucide-react";
import { prescriptions } from "@/data/patient";
import { DemoNotice, EmptyState, Panel, PrimaryLink, SectionTitle, StatusPill } from "@/components/patient/primitives";

export default function MyPrescriptions() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All statuses");
  const visible = useMemo(() => prescriptions.filter(p => (`${p.name} ${p.id} ${p.medicines.join(" ")}`).toLowerCase().includes(query.toLowerCase()) && (filter === "All statuses" || p.status === filter)), [query, filter]);
  return <div className="space-y-6"><SectionTitle title="My Prescriptions" description="Search, browse and review your prescription records." action={<PrimaryLink href="/patient?section=upload">New upload</PrimaryLink>} /><DemoNotice />
    <Panel>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row"><label className="relative flex-1"><span className="sr-only">Search prescriptions</span><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by prescription ID, name or medicine" className="h-12 w-full rounded-xl border border-line bg-page pl-11 pr-4 text-sm text-heading outline-none focus:border-primary-hover" /></label><label><span className="sr-only">Filter status</span><select value={filter} onChange={e => setFilter(e.target.value)} className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-heading outline-none focus:border-primary-hover sm:w-48">{["All statuses", "Reviewed", "Needs review", "Processing"].map(x => <option key={x}>{x}</option>)}</select></label></div>
      <div className="mb-4 text-xs font-semibold text-muted">Showing {visible.length} of {prescriptions.length} synthetic records</div>
      {visible.length === 0 ? <EmptyState /> : <div className="space-y-3">{visible.map(item => <div key={item.id} className="flex flex-col gap-4 rounded-xl border border-line p-4 transition hover:bg-page md:flex-row md:items-center md:justify-between"><div className="flex items-start gap-3"><span className="rounded-xl bg-primary-soft p-3 text-[#93570C]"><FileText size={21} /></span><div><h3 className="font-heading text-sm font-extrabold text-heading">{item.name}</h3><p className="mt-1 text-xs text-muted">{item.id} · Uploaded {item.uploaded}</p><p className="mt-2 text-xs text-body">{item.medicines.join(" · ")}</p></div></div><div className="flex flex-wrap items-center gap-3"><StatusPill type={item.status} /><Link href={`/patient?section=reports&id=${item.id}`} className="inline-flex items-center gap-1 text-sm font-extrabold text-[#9B6113] hover:underline">View details <ArrowUpRight size={15} /></Link></div></div>)}</div>}
    </Panel>
  </div>;
}
