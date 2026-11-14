"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader, { Brand } from "./_public/site-header";
import "./public-pages.css";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import PsychologyAltOutlinedIcon from "@mui/icons-material/PsychologyAltOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const features = [
  { n: "01", icon: FileUploadOutlinedIcon, title: "Prescription intake", desc: "Upload a scan or document, then review the extracted fields before the analysis begins." },
  { n: "02", icon: FactCheckOutlinedIcon, title: "Medication context", desc: "Explore potential interaction concerns with clearly labeled uncertainty and supporting context." },
  { n: "03", icon: AutoStoriesOutlinedIcon, title: "Source-grounded findings", desc: "See which retrieved reference material supports each displayed observation." },
  { n: "04", icon: VerifiedUserOutlinedIcon, title: "Clinician review", desc: "A dedicated verification workflow keeps human judgment central to prescription safety." },
];
const steps = [
  { n: "01", title: "Upload & capture", desc: "Add a prescription image or PDF to begin the extraction workflow.", icon: FileUploadOutlinedIcon },
  { n: "02", title: "Review the details", desc: "Confirm medicine names, dose text and missing or unclear OCR fields.", icon: DescriptionOutlinedIcon },
  { n: "03", title: "Explore the findings", desc: "Review supported observations, references and uncertainty indicators.", icon: SearchRoundedIcon },
  { n: "04", title: "Request verification", desc: "Send the record to the clinician review workflow when required.", icon: MedicalServicesOutlinedIcon },
];

export default function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = document.querySelectorAll(".rcds-reveal");
    if (!("IntersectionObserver" in window)) { nodes.forEach(el => el.classList.add("rcds-seen")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("rcds-seen"); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: "0px 0px -30px 0px" });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`rcds-public rcds-landing ${ready ? "rcds-ready" : ""}`}>
      <SiteHeader />
      <main>
        <section className="rcds-hero" id="top">
          <div className="rcds-wrap rcds-hero-grid">
            <div className="rcds-hero-copy">
              <div className="rcds-eyebrow"><span /> A NEW STANDARD IN CLINICAL REVIEW</div>
              <h1>More clarity in<br />every <em>prescription.</em></h1>
              <p className="rcds-hero-lead">Turn complex prescription information into a clearer review workflow—with source-backed findings, visible uncertainty and clinician oversight.</p>
              <div className="rcds-hero-actions"><Link href="/register" className="rcds-btn rcds-btn-amber">Explore the platform <ArrowOutwardRoundedIcon sx={{ fontSize: 19 }} /></Link><a href="#workflow" className="rcds-text-link">See how it works <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} /></a></div>
              <div className="rcds-hero-proof"><span className="rcds-proof-icon"><ShieldOutlinedIcon sx={{ fontSize: 18 }} /></span><span>Designed for evidence-informed review<br /><strong>Academic demonstration · Not clinical advice</strong></span></div>
            </div>
            <div className="rcds-hero-visual" aria-label="Illustrative prototype of a prescription review dashboard">
              <div className="rcds-visual-grid" />
              <div className="rcds-preview-float rcds-preview-float-top"><span className="rcds-floating-dot" /> EVIDENCE-LED WORKFLOW</div>
              <div className="rcds-app-preview">
                <div className="rcds-preview-header"><span className="rcds-preview-avatar"><ShieldOutlinedIcon sx={{ fontSize: 19 }} /></span><span><strong>Prescription review</strong><small>Sample workspace / RX-001</small></span><span className="rcds-preview-menu">···</span></div>
                <div className="rcds-preview-main"><div className="rcds-preview-subtitle">REVIEW SUMMARY</div><div className="rcds-preview-title">Medication overview <span className="rcds-demo-pill">DEMO DATA</span></div><div className="rcds-preview-description">Extracted medication details awaiting confirmation</div>
                  <div className="rcds-preview-meds"><div><span className="rcds-medicine-icon">A</span><span><strong>Medicine A</strong><small>Medication field</small></span><span className="rcds-med-status">Needs verification</span></div><div><span className="rcds-medicine-icon">B</span><span><strong>Medicine B</strong><small>Medication field</small></span><span className="rcds-med-status">Needs verification</span></div></div>
                  <div className="rcds-preview-alert"><ErrorOutlineRoundedIcon sx={{ fontSize: 20 }} /><span><strong>Potential concern to review</strong><small>Illustrative warning — not a clinical conclusion</small></span></div>
                  <div className="rcds-preview-reference"><MenuBookOutlinedIcon sx={{ fontSize: 18 }} /><span><strong>Reference evidence</strong><small>Sources appear with the corresponding finding</small></span><ChevronRightRoundedIcon sx={{ fontSize: 18 }} /></div>
                </div>
                <div className="rcds-preview-footer"><span><CheckCircleOutlineRoundedIcon sx={{ fontSize: 16 }} /> Review workflow</span><span>01 / 03</span></div>
              </div>
              <div className="rcds-preview-float rcds-preview-float-bottom"><CheckCircleOutlineRoundedIcon sx={{ fontSize: 18 }} /> HUMAN REVIEW FIRST</div>
            </div>
          </div>
          <div className="rcds-wrap rcds-hero-bottom"><span>THE FOUNDATION OF A MORE TRANSPARENT WORKFLOW</span><span>01 — INTRODUCTION</span></div>
        </section>
        <section className="rcds-principle-strip"><div className="rcds-wrap rcds-principle-inner"><span><ShieldOutlinedIcon /> SAFETY-AWARE DESIGN</span><span><MenuBookOutlinedIcon /> REFERENCE CONTEXT</span><span><FactCheckOutlinedIcon /> EXPLICIT VERIFICATION</span><span><MedicalServicesOutlinedIcon /> CLINICIAN OVERSIGHT</span></div></section>
        <section id="features" className="rcds-section rcds-features"><div className="rcds-wrap"><div className="rcds-section-header rcds-reveal"><div><span className="rcds-kicker">THE PLATFORM / 01</span><h2>Everything in context.<br /><em>Nothing left to guess.</em></h2></div><p>A purpose-built interface that guides users from a prescription document to a more informed, reviewable result.</p></div><div className="rcds-feature-grid">{features.map(f => { const Icon = f.icon; return <article className="rcds-feature-card rcds-reveal" key={f.n}><div className="rcds-feature-top"><span>{f.n} / 04</span><span className="rcds-feature-icon"><Icon sx={{ fontSize: 29 }} /></span></div><div><h3>{f.title}</h3><p>{f.desc}</p></div><span className="rcds-feature-arrow"><ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} /></span></article> })}</div></div></section>
        <section id="workflow" className="rcds-section rcds-workflow"><div className="rcds-wrap"><div className="rcds-workflow-intro rcds-reveal"><span className="rcds-kicker">THE WORKFLOW / 02</span><h2>Simple to follow.<br /><em>Built for careful review.</em></h2><p>Each stage makes the next step clear—without hiding missing information or treating an unverified result as safe.</p></div><div className="rcds-step-list">{steps.map(s => { const Icon = s.icon; return <div key={s.n} className="rcds-step rcds-reveal"><span className="rcds-step-number">{s.n}</span><div className="rcds-step-icon"><Icon sx={{ fontSize: 26 }} /></div><div className="rcds-step-copy"><h3>{s.title}</h3><p>{s.desc}</p></div><ArrowOutwardRoundedIcon className="rcds-step-arrow" sx={{ fontSize: 21 }} /></div> })}</div></div></section>
        <section className="rcds-section rcds-insight" id="safety"><div className="rcds-wrap rcds-insight-grid"><div className="rcds-insight-copy rcds-reveal"><span className="rcds-kicker">DESIGNED WITH RESPONSIBILITY / 03</span><h2>A safer approach starts with <em>honest limits.</em></h2><p>Clinical decision support should make uncertainty visible, not disguise it. RAG Clinical Decision Support is designed to present retrieved evidence alongside findings—and leave medical decisions to qualified professionals.</p><div className="rcds-insight-points"><div><span><PsychologyAltOutlinedIcon /></span><strong>Evidence, not unsupported certainty</strong><p>No source or inconclusive evidence is clearly distinguished from a confirmed absence of risk.</p></div><div><span><MedicalServicesOutlinedIcon /></span><strong>Humans remain in the loop</strong><p>Doctor verification is a dedicated step, not an afterthought.</p></div></div><Link href="/register" className="rcds-inline-cta">Open the demo workspace <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} /></Link></div><div className="rcds-insight-visual rcds-reveal"><div className="rcds-evidence-card"><div className="rcds-evidence-header"><span><MenuBookOutlinedIcon sx={{ fontSize: 19 }} /> EVIDENCE & REVIEW</span><span className="rcds-demo-pill">ILLUSTRATIVE</span></div><div className="rcds-evidence-line"><span>01</span><div><strong>Source context</strong><p>Relevant reference information appears alongside each finding.</p></div><CheckCircleOutlineRoundedIcon sx={{ fontSize: 22 }} /></div><div className="rcds-evidence-line"><span>02</span><div><strong>Explicit uncertainty</strong><p>Unverified fields are labeled for confirmation.</p></div><ErrorOutlineRoundedIcon sx={{ fontSize: 22 }} /></div><div className="rcds-evidence-line"><span>03</span><div><strong>Clinical verification</strong><p>Qualified reviewers can inspect the original prescription.</p></div><ShieldOutlinedIcon sx={{ fontSize: 22 }} /></div><div className="rcds-evidence-bottom"><span className="rcds-status-circle" /> Designed for transparent decision support</div></div></div></div></section>
        <section className="rcds-section rcds-audience"><div className="rcds-wrap"><div className="rcds-audience-heading rcds-reveal"><span className="rcds-kicker">THREE WORKSPACES / 04</span><h2>The right tools for<br /><em>the right people.</em></h2></div><div className="rcds-audience-grid">{[{ name: "Patients", role: "PERSONAL WORKSPACE", icon: DescriptionOutlinedIcon, desc: "Upload prescriptions, verify extracted text and explore review status.", href: "/patient" }, { name: "Doctors", role: "CLINICAL WORKSPACE", icon: MedicalServicesOutlinedIcon, desc: "Review assigned prescriptions, inspect context and document verification decisions.", href: "/doctor" }, { name: "Administrators", role: "SYSTEM WORKSPACE", icon: ShieldOutlinedIcon, desc: "Oversee users, source records and system audit activity.", href: "/admin" }].map(x => { const Icon = x.icon; return <Link key={x.name} href={x.href} className="rcds-audience-card rcds-reveal"><div><Icon sx={{ fontSize: 29 }} /><span>{x.role}</span></div><h3>{x.name}</h3><p>{x.desc}</p><strong>Explore workspace <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} /></strong></Link> })}</div><p className="rcds-audience-note">Workspace links open demonstration screens; authentication and role-based access will be connected in the backend phase.</p></div></section>
        <section className="rcds-section rcds-faq" id="faq"><div className="rcds-wrap rcds-faq-grid"><div className="rcds-reveal"><span className="rcds-kicker">COMMON QUESTIONS / 05</span><h2>Useful answers.<br /><em>Without the fine print.</em></h2><p>What to know about the academic prototype before using its demonstration screens.</p></div><div className="rcds-faq-list rcds-reveal"><details><summary>Does this system replace a doctor?<span>+</span></summary><p>No. It is a clinical decision support prototype, not a diagnostic or prescribing service. Qualified clinicians remain responsible for clinical decisions.</p></details><details><summary>Are the displayed prescription records real?<span>+</span></summary><p>No. The current frontend uses synthetic demonstration data. Real user accounts and secure storage are not yet implemented.</p></details><details><summary>How will the analysis work?<span>+</span></summary><p>The planned system combines OCR, medicine name normalization, retrieved reference material and an evidence-grounded AI explanation workflow. Those backend capabilities are still to be integrated.</p></details><details><summary>Does missing interaction evidence mean a medicine is safe?<span>+</span></summary><p>No. Insufficient or missing evidence must not be interpreted as proof that an interaction or contraindication does not exist.</p></details></div></div></section>
        <section className="rcds-final-cta"><div className="rcds-wrap rcds-cta-inner"><div><span className="rcds-kicker">READY TO EXPLORE?</span><h2>Start with clarity.<br /><em>Build on evidence.</em></h2><p>Explore the frontend demonstration of RAG Clinical Decision Support.</p></div><Link href="/register" className="rcds-btn rcds-btn-amber">Explore the prototype <ArrowOutwardRoundedIcon sx={{ fontSize: 19 }} /></Link></div></section>
      </main>
      <footer className="rcds-footer"><div className="rcds-wrap rcds-footer-main"><Brand light /><div><a href="#features">Platform</a><a href="#workflow">Workflow</a><a href="#safety">Approach</a><Link href="/login">Sign in</Link></div></div><div className="rcds-wrap rcds-footer-bottom"><span>© {new Date().getFullYear()} RAG Clinical Decision Support. Academic FYP prototype.</span><span>Not medical advice · Synthetic data only</span></div></footer>
    </div>
  );
}
