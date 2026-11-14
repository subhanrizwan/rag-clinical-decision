"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { Bell, LockKeyhole, UserRound } from "lucide-react";
import { DemoNotice, Panel, SectionTitle } from "@/components/patient/primitives";

export default function ProfileSettings(){
  const [name,setName]=useState("Demo Patient");
  const [email,setEmail]=useState("demo@example.test");
  const [notices,setNotices]=useState(true);
  const [saved,setSaved]=useState(false);
  function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setSaved(true);}
  return <div className="space-y-6"><SectionTitle title="Profile & Settings" description="Preview your account preferences and profile form."/><DemoNotice text="This is a frontend-only settings preview. Changes are not saved to a server, and no authentication, email notifications or password management are connected."/>
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]"><Panel><div className="mb-6 flex items-center gap-2"><UserRound className="text-[#9B6113]" size={20}/><h3 className="font-heading text-lg font-extrabold text-heading">Personal information</h3></div><form onSubmit={submit} className="space-y-5"><label className="block"><span className="mb-2 block text-sm font-bold text-heading">Full name</span><input required maxLength={80} value={name} onChange={e=>{setName(e.target.value);setSaved(false);}} className="h-12 w-full rounded-xl border border-line bg-page px-4 text-sm text-heading outline-none focus:border-primary-hover"/></label><label className="block"><span className="mb-2 block text-sm font-bold text-heading">Email address</span><input type="email" required value={email} onChange={e=>{setEmail(e.target.value);setSaved(false);}} className="h-12 w-full rounded-xl border border-line bg-page px-4 text-sm text-heading outline-none focus:border-primary-hover"/></label><button type="submit" className="min-h-11 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-obsidian hover:bg-primary-hover">Apply demo changes</button>{saved&&<p role="status" className="text-xs font-semibold text-clinical-success">Form updated in memory only. Refreshing will restore demo values.</p>}</form></Panel>
      <div className="space-y-5"><Panel><div className="flex items-center gap-2"><Bell size={20} className="text-[#9B6113]"/><h3 className="font-heading font-extrabold text-heading">Preferences</h3></div><label className="mt-5 flex items-center justify-between gap-3 text-sm text-body"><span><strong className="block text-heading">Review notifications</strong><small className="mt-1 block text-muted">Visual preference only</small></span><input type="checkbox" checked={notices} onChange={e=>setNotices(e.target.checked)} className="size-5 accent-[#B87315]"/></label></Panel><Panel><div className="flex items-center gap-2"><LockKeyhole size={20} className="text-[#9B6113]"/><h3 className="font-heading font-extrabold text-heading">Security</h3></div><p className="mt-3 text-sm leading-6 text-body">Password updates, verified email, session management and role permissions will be part of backend authentication.</p><button type="button" disabled title="Available after authentication is built" className="mt-4 rounded-xl border border-line px-4 py-2.5 text-sm font-bold text-heading opacity-50">Change password (coming soon)</button></Panel></div></div>
  </div>;
}
