"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Activity, Bell, Database, LayoutDashboard, Menu, ScrollText, ShieldCheck, Users, X } from "lucide-react";
import type { ReactNode } from "react";
const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users & Roles", icon: Users },
  { href: "/admin/knowledge-base", label: "AI & Knowledge Base", icon: Database },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
];
export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname=usePathname(); const [open,setOpen]=useState(false);
  const title=nav.find(x=>x.href===pathname)?.label ?? "Admin Workspace";
  return <div className="min-h-screen bg-[#F7F5F1] font-sans text-[#605F5C] lg:flex">
    {open && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-black/55 lg:hidden" onClick={()=>setOpen(false)} />}
    <aside id="admin-nav" className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-[#1C2026] transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open?"translate-x-0":"-translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-6">
        <Link href="/admin" onClick={()=>setOpen(false)} className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-[#F0A13B] text-[#1C2026]"><ShieldCheck size={23}/></span>
          <span><span className="block text-sm font-extrabold tracking-tight text-white">RAG Clinical</span><span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C4B2A0]">Decision Support</span></span>
        </Link>
        <button className="text-white lg:hidden" aria-label="Close menu" onClick={()=>setOpen(false)}><X size={21}/></button>
      </div>
      <nav aria-label="Admin sections" className="flex-1 space-y-1 overflow-y-auto px-4 py-7">
        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#858991]">Admin Workspace</p>
        {nav.map(item=>{const Icon=item.icon;const active=pathname===item.href;return <Link key={item.href} href={item.href} aria-current={active?"page":undefined} onClick={()=>setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-semibold transition-colors ${active?"bg-[#3D3325] text-white":"text-[#AEB2B8] hover:bg-white/10 hover:text-white"}`}><Icon size={19} className={active?"text-[#F0A13B]":""}/>{item.label}</Link>})}
      </nav>
      <div className="border-t border-white/10 p-4"><div className="flex items-center gap-3 rounded-xl bg-white/5 p-3"><span className="grid size-10 place-items-center rounded-full bg-[#F0A13B] text-sm font-black text-[#1C2026]">A</span><span><span className="block text-sm font-bold text-white">Admin Demo</span><span className="block text-xs text-[#AEB2B8]">FYP Prototype</span></span></div></div>
    </aside>
    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-3 border-b border-[#E6E0D7] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3"><button aria-label="Open navigation" aria-controls="admin-nav" aria-expanded={open} className="grid size-10 place-items-center rounded-xl border border-[#E6E0D7] lg:hidden" onClick={()=>setOpen(true)}><Menu size={21}/></button><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A0773A]">Administrator / Demo</p><h1 className="truncate font-heading text-base font-extrabold text-[#1C2026] sm:text-xl">{title}</h1></div></div>
        <div className="flex items-center gap-3"><span className="hidden items-center gap-1.5 rounded-lg bg-[#FFF0D8] px-3 py-1.5 text-xs font-bold text-[#895B20] sm:flex"><Activity size={14}/> UI Prototype</span><span className="grid size-10 place-items-center rounded-xl border border-[#E6E0D7] bg-white text-[#51545C]" aria-label="Notifications unavailable in prototype" title="Notifications: coming later"><Bell size={18}/></span><span className="grid size-10 place-items-center rounded-full bg-[#1C2026] text-sm font-bold text-[#F0A13B]">A</span></div>
      </header>
      <main className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">{children}</main>
    </div>
  </div>;
}
