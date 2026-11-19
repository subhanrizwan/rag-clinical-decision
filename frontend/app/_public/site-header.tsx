"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import ThemeToggle from "../../components/theme-toggle";

export function Brand() {
  return (
    <Link href="/" className="rcds-brand" aria-label="RAG Clinical Decision Support home">
      <span className="rcds-brand-mark"><ShieldCheck size={19} /></span>
      <span className="rcds-brand-name">
        <strong>RAG Clinical</strong>
        <small>Decision Support</small>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="rcds-site-header">
      <div className="rcds-wrap rcds-header-inner">
        <Brand />
        <nav className={`rcds-header-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          <Link href="/#platform" onClick={() => setOpen(false)}>Platform</Link>
          <Link href="/#workflow" onClick={() => setOpen(false)}>Workflow</Link>
          <Link href="/#workspaces" onClick={() => setOpen(false)}>Workspaces</Link>
          <Link href="/#safety" onClick={() => setOpen(false)}>Safety</Link>
          <div className="rcds-nav-mobile-actions">
            <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
            <Link href="/register" onClick={() => setOpen(false)}>Create account</Link>
          </div>
        </nav>
        <div className="rcds-header-actions">
          <ThemeToggle compact />
          <Link href="/login" className="rcds-header-login">Sign in</Link>
          <Link href="/register" className="rcds-btn rcds-btn-primary">Create account</Link>
        </div>
        <button
          type="button"
          className="rcds-mobile-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
