"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Activity, Bell, ClipboardCheck, History, LayoutDashboard, ListChecks, Menu, ShieldPlus, X } from "lucide-react";

const navigation = [
  { label: "Overview", href: "/doctor", view: "overview", icon: LayoutDashboard },
  { label: "Review Queue", href: "/doctor?view=reviews", view: "reviews", icon: ListChecks },
  { label: "Verification", href: "/doctor?view=verify", view: "verify", icon: ClipboardCheck },
  { label: "Review History", href: "/doctor?view=history", view: "history", icon: History },
];

export default function DoctorShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") ?? "overview";
  const [open, setOpen] = useState(false);
  const current = navigation.find((item) => pathname === "/doctor" && item.view === currentView);
  return <div className="min-h-screen bg-page lg:flex">
    {open && <button type="button" aria-label="Close navigation overlay" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/55 lg:hidden" />}
    <aside id="doctor-navigation" className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-obsidian text-white transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-6">
        <Link href="/doctor" onClick={() => setOpen(false)} className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-obsidian"><ShieldPlus size={24}/></span>
          <span><span className="block font-heading text-lg font-bold text-white">Smart Rx Guard</span><span className="block text-[10px] uppercase tracking-[0.18em] text-white/50">Doctor Workspace</span></span>
        </Link>
        <button type="button" aria-label="Close menu" className="lg:hidden" onClick={() => setOpen(false)}><X size={22}/></button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-7">
        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Clinical Review</p>
        <nav aria-label="Doctor menu" className="space-y-1">{navigation.map((item)=>{const Icon=item.icon; const active=pathname==="/doctor"&&item.view===currentView;return <Link key={item.href} href={item.href} onClick={()=>setOpen(false)} aria-current={active?"page":undefined} className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${active?"bg-[#423624] text-white":"text-white/60 hover:bg-white/10 hover:text-white"}`}><Icon size={19} className={active?"text-primary":"text-white/50"}/>{item.label}</Link>})}</nav>
      </div>
      <div className="border-t border-white/10 p-4"><div className="flex items-center gap-3 rounded-xl bg-white/5 p-3"><div className="flex size-10 items-center justify-center rounded-full bg-primary font-bold text-obsidian">D</div><div><p className="text-sm font-bold text-white">Demo Doctor</p><p className="text-xs text-white/50">Prototype account</p></div></div></div>
    </aside>
    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-md"><div className="flex h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3"><button type="button" aria-label="Open doctor navigation" aria-controls="doctor-navigation" aria-expanded={open} onClick={()=>setOpen(true)} className="flex size-10 items-center justify-center rounded-lg border border-line lg:hidden"><Menu size={21}/></button><div><p className="text-[10px] font-bold uppercase tracking-widest text-muted">Doctor Workspace</p><h1 className="truncate font-heading text-base font-extrabold text-heading sm:text-xl">{current?.label??"Doctor Dashboard"}</h1></div></div>
        <div className="flex items-center gap-3"><span className="hidden rounded-lg bg-primary-soft px-3 py-1.5 text-xs font-bold text-[#865514] sm:inline-flex">Demo Mode</span><span title="Notifications are not connected" className="rounded-xl border border-line p-2.5 text-muted"><Bell size={18}/></span><span className="flex size-9 items-center justify-center rounded-full bg-obsidian text-primary"><Activity size={17}/></span></div>
      </div></header>
      <main className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">{children}</main>
    </div>
  </div>;
}
