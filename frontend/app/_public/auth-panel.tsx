"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { Brand } from "./site-header";
import ThemeToggle from "../../components/theme-toggle";

type Mode = "login" | "register" | "forgot";
const DEMO_EMAIL = "demo@rag-clinical.test";
const DEMO_PASSWORD = "DemoAccess123!";

const copy = {
  login: {
    eyebrow: "WELCOME BACK",
    title: "Sign in to your workspace",
    subtitle: "Access the RAG Clinical Decision Support demonstration.",
    button: "Sign in",
  },
  register: {
    eyebrow: "GET STARTED",
    title: "Create your account",
    subtitle: "Register for the demonstration workspace.",
    button: "Create account",
  },
  forgot: {
    eyebrow: "ACCOUNT RECOVERY",
    title: "Reset your password",
    subtitle: "Enter your email to preview the recovery flow.",
    button: "Request reset link",
  },
};

export default function AuthPanel({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState("patient");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const text = copy[mode];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const form = new FormData(event.currentTarget);
    if (mode === "forgot") {
      setNotice("Password recovery is not connected yet. Contact your administrator.");
      return;
    }

    if (mode === "register") {
      const password = String(form.get("password") ?? "");
      if (password.length < 8) {
        setNotice("Please use at least 8 characters for your password.");
        return;
      }
      if (password !== String(form.get("confirm") ?? "")) {
        setNotice("Your passwords do not match.");
        return;
      }
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(
          mode === "register"
            ? {
                name: String(form.get("fullName") ?? "").trim(),
                email: String(form.get("email") ?? "").trim(),
                password: String(form.get("password") ?? ""),
                role,
              }
            : {
                email: String(form.get("email") ?? "").trim(),
                password: String(form.get("password") ?? ""),
                role,
              },
        ),
      });
      const result = (await response.json()) as {
        message?: unknown;
        user?: { role?: unknown; verificationStatus?: unknown };
      };

      if (!response.ok) {
        setNotice(typeof result.message === "string" ? result.message : "The request could not be completed.");
        return;
      }

      if (mode === "register") {
        setNotice(
          role === "doctor"
            ? "Account created. A workspace will be available after administrator approval; sign in once approved."
            : "Account created. Sign in with your new credentials to continue.",
        );
        return;
      }

      const accountRole = result.user?.role;
      if (accountRole !== "patient" && accountRole !== "doctor" && accountRole !== "admin") {
        setNotice("Sign-in succeeded, but the account role is invalid. Contact your administrator.");
        return;
      }
      router.replace(`/${accountRole}`);
      router.refresh();
    } catch {
      setNotice("Unable to reach the authentication service. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rcds-public rcds-auth-screen">
      <aside className="rcds-auth-aside">
        <Brand />
        <div className="rcds-auth-aside-copy">
          <span className="rcds-kicker">CLINICAL REVIEW, WITH CONTEXT</span>
          <h2>Evidence in view.<br /><em>People in control.</em></h2>
          <p>Keep prescription details, source context, and clinician review in one focused workspace.</p>
        </div>
        <div className="rcds-auth-aside-note">
          <ShieldCheck size={17} />
          <span>Academic prototype · Synthetic data · Not medical advice</span>
        </div>
      </aside>

      <main className="rcds-auth-main">
        <div className="rcds-auth-top">
          <Link href="/" className="rcds-back"><ArrowLeft size={16} /> Homepage</Link>
          <ThemeToggle compact />
        </div>
        <div className="rcds-auth-card">
          <div className="rcds-auth-mobile-brand"><Brand /></div>
          <span className="rcds-kicker">{text.eyebrow}</span>
          <h1>{text.title}</h1>
          <p className="rcds-auth-subtitle">{text.subtitle}</p>
          {mode === "login" && process.env.NODE_ENV !== "production" && (
            <div className="rcds-form-notice">
              <strong>Development demo access</strong><br />
              Email: {DEMO_EMAIL}<br />
              Password: {DEMO_PASSWORD}<br />
              Choose a workspace below. These credentials are disabled in production.
            </div>
          )}
          <form onSubmit={submit} className="rcds-auth-form">
            {mode === "register" && (
              <div className="rcds-field">
                <label htmlFor="fullName">Full name</label>
                <input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="Enter your full name" required minLength={2} />
              </div>
            )}
            <div className="rcds-field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="name@example.com" defaultValue={mode === "login" && process.env.NODE_ENV !== "production" ? DEMO_EMAIL : undefined} required />
            </div>
            {mode === "login" && process.env.NODE_ENV !== "production" && (
              <div className="rcds-field">
                <label htmlFor="workspaceRole">Demo workspace</label>
                <select id="workspaceRole" name="workspaceRole" value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
                <small>Regular accounts always open their assigned workspace.</small>
              </div>
            )}
            {mode === "register" && (
              <div className="rcds-field">
                <label htmlFor="role">Account type</label>
                <select id="role" name="role" value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor (requires verification)</option>
                </select>
                <small>Administrative access is assigned by an authorized administrator.</small>
              </div>
            )}
            {mode !== "forgot" && (
              <div className="rcds-field">
                <div className="rcds-label-row">
                  <label htmlFor="password">Password</label>
                  {mode === "login" && <Link href="/forgot-password">Forgot password?</Link>}
                </div>
                <div className="rcds-password">
                  <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "register" ? "new-password" : "current-password"} placeholder="Enter your password" defaultValue={mode === "login" && process.env.NODE_ENV !== "production" ? DEMO_PASSWORD : undefined} required minLength={mode === "register" ? 8 : undefined} />
                  <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)}>
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
            )}
            {mode === "register" && (
              <div className="rcds-field">
                <label htmlFor="confirm">Confirm password</label>
                <div className="rcds-password">
                  <input id="confirm" name="confirm" type={showConfirm ? "text" : "password"} autoComplete="new-password" placeholder="Re-enter your password" required minLength={8} />
                  <button type="button" aria-label={showConfirm ? "Hide confirmation password" : "Show confirmation password"} onClick={() => setShowConfirm((value) => !value)}>
                    {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
            )}
            {mode === "register" && (
              <label className="rcds-terms">
                <input type="checkbox" required />
                <span>I understand this academic prototype does not replace professional medical advice.</span>
              </label>
            )}
            {notice && <div role="status" className="rcds-form-notice">{notice}</div>}
            <button type="submit" className="rcds-btn rcds-btn-primary rcds-auth-submit" disabled={submitting}>
              {submitting ? "Please wait..." : text.button}<ArrowRight size={17} />
            </button>
          </form>

          <p className="rcds-auth-switch">
            {mode === "login" ? <>New to the platform? <Link href="/register">Create an account</Link></> : mode === "register" ? <>Already have an account? <Link href="/login">Sign in</Link></> : <>Remembered your password? <Link href="/login">Back to sign in</Link></>}
          </p>
          <div className="rcds-demo-access">
            <strong>Workspace access</strong>
            <p>Sign in with registered credentials. Your approved account role determines which workspace opens.</p>
          </div>
        </div>
        <p className="rcds-auth-footer">RAG Clinical Decision Support · Academic prototype</p>
      </main>
    </div>
  );
}
