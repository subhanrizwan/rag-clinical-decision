import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  FileCheck2,
  FileUp,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import SiteHeader from "./_public/site-header";
import ScrollReveal from "./_public/scroll-reveal";
import "./public-pages.css";

const chartBars = [36, 54, 43, 76, 49, 64, 58, 84, 55, 69, 61, 78];

const workspaces = [
  {
    name: "Patient",
    description: "Upload prescriptions and follow review progress.",
    icon: FileCheck2,
  },
  {
    name: "Doctor",
    description: "Review assigned records and document verification.",
    icon: Stethoscope,
  },
  {
    name: "Administrator",
    description: "Browse sample users, sources, and activity logs.",
    icon: UsersRound,
  },
];

export default function Home() {
  return (
    <ScrollReveal>
      <div className="rcds-public">
        <SiteHeader />
        <main>
        <section className="rcds-hero">
          <div className="rcds-wrap rcds-hero-grid">
            <div className="rcds-hero-copy" data-scroll-reveal>
              <span className="rcds-eyebrow"><span /> CLINICAL REVIEW, WITH CONTEXT</span>
              <h1>Prescription review,<br /><em>made clearer.</em></h1>
              <p className="rcds-hero-lead">
                A structured workspace for prescription records, source context,
                visible uncertainty, and clinician review.
              </p>
              <div className="rcds-hero-actions">
                <Link href="/register" className="rcds-btn rcds-btn-primary">
                  Explore the prototype <ArrowRight size={17} />
                </Link>
                <a href="#platform" className="rcds-text-link">See the platform</a>
              </div>
              <p className="rcds-hero-note">
                <ShieldCheck size={17} />
                Academic demonstration · Synthetic data · Not medical advice
              </p>
            </div>

            <div className="rcds-preview" aria-label="Illustrative dashboard preview" data-scroll-reveal>
              <div className="rcds-preview-sidebar">
                <span className="rcds-preview-logo"><ShieldCheck size={15} /></span>
                <span className="rcds-preview-side-active"><span />Overview</span>
                <span><FileUp size={14} />Upload</span>
                <span><FileCheck2 size={14} />Records</span>
                <span><BookOpenCheck size={14} />Evidence</span>
              </div>
              <div className="rcds-preview-content">
                <div className="rcds-preview-toolbar">
                  <span><small>Patient workspace</small><strong>Overview</strong></span>
                  <span className="rcds-preview-avatar">P</span>
                </div>
                <div className="rcds-preview-stats">
                  <div><small>Prescriptions</small><strong>08</strong><span>Sample records</span></div>
                  <div><small>Needs review</small><strong>02</strong><span>Not a safety result</span></div>
                  <div><small>Reviewed</small><strong>06</strong><span>Demo workflow</span></div>
                </div>
                <div className="rcds-preview-chart">
                  <div className="rcds-preview-chart-head"><strong>Review activity</strong><span>Illustrative</span></div>
                  <div className="rcds-preview-bars" aria-hidden="true">
                    {chartBars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                  </div>
                  <div className="rcds-preview-chart-labels"><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span></div>
                </div>
                <div className="rcds-preview-record">
                  <span className="rcds-preview-record-icon"><FileCheck2 size={16} /></span>
                  <span><strong>Prescription record</strong><small>Source details · Review status</small></span>
                  <span className="rcds-preview-status">In review</span>
                </div>
                <p className="rcds-preview-disclaimer">Synthetic interface preview. No clinical analysis is performed.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="rcds-section">
          <div className="rcds-wrap">
            <div className="rcds-section-heading" data-scroll-reveal>
              <div><span className="rcds-kicker">THE PLATFORM</span><h2>One review flow.<br /><em>Clear at every step.</em></h2></div>
              <p>Keep source records, extracted details, and review status together—without presenting unverified output as a clinical conclusion.</p>
            </div>
            <div className="rcds-feature-grid">
              <article className="rcds-feature-card" data-scroll-reveal>
                <span className="rcds-feature-icon"><FileUp size={20} /></span>
                <h3>Prescription intake</h3>
                <p>Preview synthetic documents and keep the original record in view.</p>
              </article>
              <article className="rcds-feature-card" data-scroll-reveal>
                <span className="rcds-feature-icon"><BookOpenCheck size={20} /></span>
                <h3>Evidence context</h3>
                <p>Make references and missing evidence distinct from a confirmed finding.</p>
              </article>
              <article className="rcds-feature-card" data-scroll-reveal>
                <span className="rcds-feature-icon"><ShieldCheck size={20} /></span>
                <h3>Human verification</h3>
                <p>Give reviewers a dedicated place to record uncertainty and follow-up.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="workflow" className="rcds-section rcds-workflow">
          <div className="rcds-wrap rcds-workflow-layout">
            <div data-scroll-reveal>
              <span className="rcds-kicker">A TRANSPARENT WORKFLOW</span>
              <h2>Review the record,<br /><em>not just a result.</em></h2>
              <p>Every stage stays reviewable. The prototype labels disconnected features instead of implying they have been clinically validated.</p>
            </div>
            <ol className="rcds-steps">
              <li data-scroll-reveal><span>01</span><div><strong>Add a prescription</strong><p>Choose an image or PDF for local preview.</p></div></li>
              <li data-scroll-reveal><span>02</span><div><strong>Check extracted details</strong><p>Keep unclear fields visible for confirmation.</p></div></li>
              <li data-scroll-reveal><span>03</span><div><strong>Review evidence context</strong><p>Distinguish source information from unknowns.</p></div></li>
              <li data-scroll-reveal><span>04</span><div><strong>Record clinician review</strong><p>Document a demo decision without implying safety.</p></div></li>
            </ol>
          </div>
        </section>

        <section id="workspaces" className="rcds-section">
          <div className="rcds-wrap">
            <div className="rcds-section-heading rcds-section-heading-compact" data-scroll-reveal>
              <div><span className="rcds-kicker">ROLE-BASED WORKSPACES</span><h2>Useful tools for each role.</h2></div>
              <p>Sign in with an approved account to open its role-based workspace.</p>
            </div>
            <div className="rcds-workspace-grid">
              {workspaces.map(({ name, description, icon: Icon }) => (
                <Link href="/login" key={name} className="rcds-workspace-card" data-scroll-reveal>
                  <span className="rcds-feature-icon"><Icon size={20} /></span>
                  <strong>{name}</strong>
                  <p>{description}</p>
                  <span className="rcds-workspace-link">Sign in to open <ArrowRight size={15} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="safety" className="rcds-safety">
          <div className="rcds-wrap rcds-safety-inner" data-scroll-reveal>
            <span className="rcds-safety-icon"><ShieldCheck size={21} /></span>
            <div>
              <strong>Prototype only — not medical advice.</strong>
              <p>All records and metrics are synthetic. OCR, evidence retrieval, and clinical verification are not connected. Missing evidence does not establish that a prescription is safe.</p>
            </div>
          </div>
        </section>
        </main>
        <footer className="rcds-footer" data-scroll-reveal>
        <div className="rcds-wrap rcds-footer-inner">
          <span>RAG Clinical Decision Support</span>
          <span>Academic FYP prototype · Synthetic data only</span>
        </div>
        </footer>
      </div>
    </ScrollReveal>
  );
}
