"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brand } from "./site-header";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

type Mode = "login" | "register" | "forgot";

const copy = {
  login: { eyebrow: "WELCOME BACK", title: "Sign in to your workspace.", subtitle: "Access your prescription review dashboard and saved records.", button: "Sign in" },
  register: { eyebrow: "GET STARTED", title: "Create your account.", subtitle: "Join the RAG Clinical Decision Support demonstration workspace.", button: "Create account" },
  forgot: { eyebrow: "ACCOUNT RECOVERY", title: "Reset your password.", subtitle: "Enter your email address to begin the password recovery process.", button: "Request reset link" },
};

export default function AuthPanel({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState("patient");
  const [notice, setNotice] = useState("");
  const text = copy[mode];
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice("");
    const form = new FormData(e.currentTarget);
    if (mode === "register") {
      const pass = String(form.get("password") ?? "");
      if (pass.length < 8) { setNotice("Please use at least 8 characters for your password."); return; }
      if (pass !== String(form.get("confirm") ?? "")) { setNotice("Your passwords do not match."); return; }
    }
    if (mode === "forgot") {
      setNotice("UI demonstration only: no recovery email has been sent. Email delivery will be connected during backend development.");
    } else {
      setNotice("UI demonstration only: no account was created or authenticated. Use the demo workspace links below to preview dashboards.");
    }
  }
  return (
    <div className="rcds-public rcds-auth-screen">
      <div className="rcds-auth-aside">
        <div className="rcds-auth-aside-inner">
          <Brand light />
          <div className="rcds-auth-aside-body">
            <div className="rcds-eyebrow rcds-eyebrow-dark"><span/> CLARITY THROUGH EVIDENCE</div>
            <h2>Better context.<br/><em>Better review.</em></h2>
            <p>A focused workspace for extracting prescription details, surfacing supported safety information and enabling clinician review.</p>
            <div className="rcds-auth-graphic" aria-hidden="true">
              <span className="rcds-auth-ring rcds-auth-ring-1"/><span className="rcds-auth-ring rcds-auth-ring-2"/><span className="rcds-auth-ring rcds-auth-ring-3"/>
              <div className="rcds-auth-graphic-center"><ShieldOutlinedIcon sx={{fontSize:45}} /></div>
              <div className="rcds-auth-graphic-pill rcds-auth-pill-a"><CheckCircleOutlineRoundedIcon sx={{fontSize:17}}/> Clinical review</div>
              <div className="rcds-auth-graphic-pill rcds-auth-pill-b"><LockOutlinedIcon sx={{fontSize:17}}/> Evidence context</div>
            </div>
          </div>
          <p className="rcds-auth-aside-foot">ACADEMIC FYP PROTOTYPE <span>·</span> SYNTHETIC DATA ONLY</p>
        </div>
      </div>
      <div className="rcds-auth-main">
        <div className="rcds-auth-top"><Link href="/" className="rcds-back"><ArrowBackRoundedIcon sx={{fontSize:18}} /> Back to homepage</Link></div>
        <div className="rcds-auth-card">
          <div className="rcds-auth-mobile-logo"><Brand /></div>
          <span className="rcds-kicker">{text.eyebrow}</span>
          <h1>{text.title}</h1>
          <p className="rcds-auth-subtitle">{text.subtitle}</p>
          <form onSubmit={submit} className="rcds-auth-form">
            {mode === "register" && <div className="rcds-field"><label htmlFor="fullName">Full name</label><input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="Enter your full name" required minLength={2}/></div>}
            <div className="rcds-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="name@example.com" required/></div>
            {mode === "register" && <div className="rcds-field"><label htmlFor="role">Account type</label><select id="role" name="role" value={role} onChange={e => setRole(e.target.value)}><option value="patient">Patient</option><option value="doctor">Doctor (requires verification)</option></select><small>Administrative access is assigned by an authorized administrator.</small></div>}
            {mode !== "forgot" && <div className="rcds-field"><div className="rcds-label-row"><label htmlFor="password">Password</label>{mode === "login" && <Link href="/forgot-password">Forgot password?</Link>}</div><div className="rcds-password"><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "register" ? "new-password" : "current-password"} placeholder="Enter your password" required minLength={mode === "register" ? 8 : undefined}/><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(x => !x)}>{showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small"/>}</button></div></div>}
            {mode === "register" && <div className="rcds-field"><label htmlFor="confirm">Confirm password</label><div className="rcds-password"><input id="confirm" name="confirm" type={showConfirm ? "text" : "password"} autoComplete="new-password" placeholder="Re-enter your password" required minLength={8}/><button type="button" aria-label={showConfirm ? "Hide confirmation password" : "Show confirmation password"} onClick={() => setShowConfirm(x=>!x)}>{showConfirm ? <VisibilityOffOutlinedIcon fontSize="small"/> : <VisibilityOutlinedIcon fontSize="small"/>}</button></div></div>}
            {mode === "register" && <label className="rcds-terms"><input type="checkbox" required/><span>I understand this is an academic prototype and does not replace professional medical advice.</span></label>}
            {notice && <div role="status" className="rcds-form-notice">{notice}</div>}
            <button type="submit" className="rcds-btn rcds-btn-amber rcds-auth-submit">{text.button}<ArrowForwardRoundedIcon sx={{fontSize:19}}/></button>
          </form>
          <p className="rcds-auth-switch">{mode === "login" ? <>New to the platform? <Link href="/register">Create an account</Link></> : mode === "register" ? <>Already have an account? <Link href="/login">Sign in</Link></> : <>Remembered your password? <Link href="/login">Back to sign in</Link></>}</p>
          <div className="rcds-demo-access"><strong>Preview the UI without signing in</strong><p>These links only open prototype dashboards; they do not authenticate a user.</p><div>{["patient","doctor","admin"].map(x => <button key={x} type="button" onClick={() => router.push(`/${x}`)}>{x[0].toUpperCase()+x.slice(1)} demo <ArrowForwardRoundedIcon sx={{fontSize:14}}/></button>)}</div></div>
        </div>
        <p className="rcds-auth-footer">RAG Clinical Decision Support · Academic prototype · No patient data</p>
      </div>
    </div>
  );
}
