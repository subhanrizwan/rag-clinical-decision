"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { CheckCircle2, FileText, Image as ImageIcon, ScanText, ShieldCheck, UploadCloud, X } from "lucide-react";
import { DemoNotice, Panel, SectionTitle } from "@/components/patient/primitives";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
export default function UploadPrescription() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file,setFile] = useState<File|null>(null);
  const [preview,setPreview] = useState<string|null>(null);
  const [error,setError] = useState("");
  const [confirmed,setConfirmed] = useState(false);
  const [dragging,setDragging] = useState(false);
  useEffect(()=>{
    if(!file){setPreview(null);return;}
    const url=URL.createObjectURL(file); setPreview(url);
    return ()=>URL.revokeObjectURL(url);
  },[file]);
  function choose(candidate?: File) {
    setError("");setConfirmed(false);
    if(!candidate)return;
    if(!ACCEPTED.includes(candidate.type)){setFile(null);setError("Unsupported file type. Please select a JPG, PNG, WebP or PDF.");return;}
    if(candidate.size > MAX_SIZE){setFile(null);setError("File is too large. Maximum file size is 10 MB.");return;}
    setFile(candidate);
  }
  function onChange(e:ChangeEvent<HTMLInputElement>){choose(e.target.files?.[0]);e.target.value="";}
  function onDrop(e:DragEvent<HTMLDivElement>){e.preventDefault();setDragging(false);choose(e.dataTransfer.files?.[0]);}
  return <div className="space-y-6"><SectionTitle title="Upload Prescription" description="Add a prescription image or PDF. The prototype previews files locally; actual OCR and analysis will be connected later."/><DemoNotice text="Demo only: files are previewed in your browser and are NOT uploaded, saved, scanned, analyzed or shared with a doctor. Use synthetic test prescriptions, never real patient information."/>
    <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]"><Panel><div className="mb-5 flex items-center gap-2"><UploadCloud className="text-[#9B6113]" size={21}/><h3 className="font-heading text-lg font-extrabold text-heading">Select a prescription</h3></div>
      <input type="file" ref={fileInput} accept=".pdf,.png,.jpg,.jpeg,.webp" className="sr-only" aria-label="Choose prescription file" onChange={onChange}/>
      <div onDrop={onDrop} onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)} className={`flex min-h-60 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-8 text-center transition ${dragging?"border-primary bg-primary-soft":"border-[#DBCDBA] bg-page"}`}><div className="rounded-2xl bg-primary-soft p-4 text-[#9B6113]"><UploadCloud size={31}/></div><h4 className="mt-4 font-heading text-base font-extrabold text-heading">Drag and drop your file here</h4><p className="mt-2 text-sm text-body">PNG, JPG, WebP or PDF · up to 10 MB</p><button onClick={()=>fileInput.current?.click()} type="button" className="mt-5 min-h-11 rounded-xl bg-primary px-5 py-2 text-sm font-bold text-obsidian hover:bg-primary-hover">Browse files</button></div>
      {error && <p role="alert" className="mt-3 rounded-lg bg-[#FBE8E9] px-3 py-2 text-sm text-[#A22A3E]">{error}</p>}
      {file && <div className="mt-5 rounded-xl border border-line p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="rounded-xl bg-primary-soft p-3 text-[#9B6113]">{file.type==="application/pdf"?<FileText size={22}/>:<ImageIcon size={22}/>}</div><div className="min-w-0"><p className="truncate text-sm font-bold text-heading">{file.name}</p><p className="mt-1 text-xs text-muted">{(file.size/1024/1024).toFixed(2)} MB · Browser-only preview</p></div></div><button type="button" aria-label="Remove selected file" onClick={()=>setFile(null)} className="rounded-lg p-2 hover:bg-page"><X size={18}/></button></div>
        {preview && (file.type==="application/pdf"?<div className="mt-4 rounded-xl border border-line bg-page p-4 text-center"><FileText size={28} className="mx-auto text-[#9B6113]"/><p className="mt-2 text-xs text-muted">PDF selected · preview in a new tab</p><a target="_blank" rel="noopener noreferrer" href={preview} className="mt-2 inline-block text-sm font-bold text-[#9B6113] underline">Open PDF preview</a></div>:<div className="mt-4 flex justify-center rounded-xl bg-page p-3"><img src={preview} alt="Selected prescription preview" className="max-h-80 max-w-full rounded-lg object-contain"/></div>)}
        <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-body"><input className="mt-1 accent-[#B87315]" type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)}/><span>I confirm this is a synthetic/demo prescription and have checked the uploaded file.</span></label>
        <button type="button" disabled={!confirmed} onClick={()=>setError("Preview complete. OCR and upload API are not yet connected; no processing was performed.")} className="mt-4 w-full rounded-xl bg-obsidian px-5 py-3 text-sm font-bold text-white hover:bg-obsidian-soft disabled:cursor-not-allowed disabled:opacity-50">Continue to extraction (coming soon)</button>
      </div>}
      </Panel><div className="space-y-5"><Panel><h3 className="font-heading text-lg font-extrabold text-heading">How it will work</h3><div className="mt-5 space-y-5">{[{n:"01",icon:UploadCloud,title:"Upload",text:"Choose a clear prescription photo or PDF."},{n:"02",icon:ScanText,title:"Verify extraction",text:"Review and correct OCR-extracted medicine information."},{n:"03",icon:ShieldCheck,title:"Safety review",text:"Check evidence-supported alerts and clinician review status."}].map(item=>{const Icon=item.icon;return <div className="flex items-start gap-3" key={item.n}><div className="rounded-xl bg-primary-soft p-3 text-[#9B6113]"><Icon size={19}/></div><div><p className="text-xs font-bold tracking-wider text-muted">STEP {item.n}</p><p className="mt-1 text-sm font-extrabold text-heading">{item.title}</p><p className="mt-1 text-xs leading-5 text-body">{item.text}</p></div></div>})}</div></Panel><Panel className="bg-primary-soft"><div className="flex items-center gap-2 text-[#8A581B]"><CheckCircle2 size={19}/><p className="font-heading font-extrabold text-heading">Photo tips</p></div><p className="mt-3 text-sm leading-6 text-body">Use good lighting, show the entire page, and avoid glare or cropped medication names. In the final app, extracted fields must be manually checked before analysis.</p></Panel></div></div>
  </div>;
}
