"use client";

import Link from "next/link";
import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`rcds-brand ${light ? "rcds-brand-light" : ""}`} aria-label="RAG Clinical Decision Support home">
      <span className="rcds-brand-mark"><HealthAndSafetyRoundedIcon fontSize="small" /></span>
      <span className="rcds-brand-name">RAG<span> Clinical</span><small>DECISION SUPPORT</small></span>
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
          <a href="/#features" onClick={() => setOpen(false)}>Platform</a>
          <a href="/#workflow" onClick={() => setOpen(false)}>How it works</a>
          <a href="/#safety" onClick={() => setOpen(false)}>Our approach</a>
          <a href="/#faq" onClick={() => setOpen(false)}>FAQ</a>
          <div className="rcds-nav-mobile-actions">
            <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
            <Link href="/register" onClick={() => setOpen(false)}>Get started <ArrowOutwardRoundedIcon fontSize="small" /></Link>
          </div>
        </nav>
        <div className="rcds-header-actions">
          <Link href="/login" className="rcds-header-login">Sign in</Link>
          <Link href="/register" className="rcds-btn rcds-btn-dark rcds-header-register">Get started <ArrowOutwardRoundedIcon sx={{fontSize:18}} /></Link>
        </div>
        <button type="button" className="rcds-mobile-toggle" onClick={() => setOpen(x => !x)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
        </button>
      </div>
    </header>
  );
}
