"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Activity,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ClipboardCheck,
  FileClock,
  FilePlus2,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings2,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import ThemeToggle from "../theme-toggle";
import type { AuthenticatedUser } from "../../lib/server-auth";

type Role = "patient" | "doctor" | "admin";

const navigation = {
  patient: [
    { label: "Overview", href: "/patient", key: "overview", icon: LayoutDashboard },
    { label: "Upload prescription", href: "/patient?section=upload", key: "upload", icon: FilePlus2 },
    { label: "Prescriptions", href: "/patient?section=prescriptions", key: "prescriptions", icon: FileText },
    { label: "Safety reports", href: "/patient?section=reports", key: "reports", icon: ShieldCheck },
    { label: "Schedule", href: "/patient?section=schedule", key: "schedule", icon: CalendarDays },
    { label: "History", href: "/patient?section=history", key: "history", icon: FileClock },
    { label: "Settings", href: "/patient?section=settings", key: "settings", icon: Settings2 },
  ],
  doctor: [
    { label: "Overview", href: "/doctor", key: "overview", icon: LayoutDashboard },
    { label: "Review queue", href: "/doctor?view=reviews", key: "reviews", icon: ClipboardCheck },
    { label: "Verification", href: "/doctor?view=verify", key: "verify", icon: ShieldCheck },
    { label: "Review history", href: "/doctor?view=history", key: "history", icon: FileClock },
  ],
  admin: [
    { label: "Overview", href: "/admin", key: "overview", icon: LayoutDashboard },
    { label: "Users & roles", href: "/admin/users", key: "users", icon: Users },
    { label: "Knowledge base", href: "/admin/knowledge-base", key: "knowledge-base", icon: BookOpen },
    { label: "Audit logs", href: "/admin/audit-logs", key: "audit-logs", icon: Activity },
  ],
} satisfies Record<Role, { label: string; href: string; key: string; icon: typeof LayoutDashboard }[]>;

const roleLabels: Record<Role, string> = {
  patient: "Patient workspace",
  doctor: "Doctor workspace",
  admin: "Admin workspace",
};

export default function WorkspaceShell({
  role,
  user,
  children,
}: {
  role: Role;
  user: AuthenticatedUser;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [logoutError, setLogoutError] = useState("");
  const queryKey = role === "patient" ? "section" : "view";
  const activeKey =
    role === "admin"
      ? pathname === "/admin"
        ? "overview"
        : pathname.slice(pathname.lastIndexOf("/") + 1) || "overview"
      : searchParams.get(queryKey) ?? "overview";
  const activeItem =
    navigation[role].find((item) => item.key === activeKey) ?? navigation[role][0];
  const searchResults = searchQuery.trim()
    ? navigation[role].filter((item) =>
        item.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      )
    : [];
  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();

  function submitSearch() {
    if (searchResults[0]) {
      router.push(searchResults[0].href);
      setSearchQuery("");
    }
  }

  async function signOut() {
    setLogoutError("");
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("Sign-out request failed.");
      router.replace("/login");
      router.refresh();
    } catch {
      setLogoutError("Could not sign out. Please try again.");
    }
  }

  return (
    <div className={`workspace workspace-${role} ${collapsed ? "workspace-collapsed" : ""}`}>
      {mobileOpen && (
        <button
          type="button"
          className="workspace-scrim"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        id="workspace-navigation"
        className={`workspace-sidebar ${mobileOpen ? "workspace-sidebar-open" : ""}`}
      >
        <div className="workspace-brand-row">
          <Link
            href={`/${role}`}
            className="workspace-brand"
            aria-label="RAG Clinical Decision Support home"
            onClick={() => setMobileOpen(false)}
          >
            <span className="workspace-brand-mark"><ShieldCheck size={19} /></span>
            {!collapsed && (
              <span className="workspace-brand-copy">
                <strong>RAG Clinical</strong>
                <small>Decision Support</small>
              </span>
            )}
          </Link>
          <button
            type="button"
            className="workspace-collapse"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((value) => !value)}
          >
            <ChevronLeft size={17} />
          </button>
          <button
            type="button"
            className="workspace-close"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace-nav-label">{!collapsed && roleLabels[role]}</div>
        <nav className="workspace-nav" aria-label={`${roleLabels[role]} navigation`}>
          {navigation[role].map((item) => {
            const Icon = item.icon;
            const active = item.key === activeKey;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                title={collapsed ? item.label : undefined}
                className={`workspace-nav-link ${active ? "is-active" : ""}`}
              >
                <Icon size={18} aria-hidden="true" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="workspace-sidebar-foot">
          <div className="workspace-profile">
            <span className="workspace-avatar">{initials}</span>
            {!collapsed && (
              <span className="workspace-profile-copy">
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </span>
            )}
          </div>
        </div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-header">
          <div className="workspace-header-title">
            <button
              type="button"
              className="workspace-menu"
              aria-label="Open navigation"
              aria-controls="workspace-navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={21} />
            </button>
            <div>
              <span className="workspace-eyebrow">{roleLabels[role]}</span>
              <h1>{activeItem.label}</h1>
            </div>
          </div>
          <div className="workspace-header-tools">
            <div className="workspace-search-wrap">
              <label className="workspace-search">
                <Search size={16} aria-hidden="true" />
                <input
                  aria-label="Find a workspace page"
                  placeholder="Find a page..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") submitSearch();
                    if (event.key === "Escape") setSearchQuery("");
                  }}
                />
              </label>
              {searchQuery.trim() && (
                <div className="workspace-search-results">
                  {searchResults.length ? searchResults.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setSearchQuery("")}
                    >
                      {item.label}
                    </Link>
                  )) : <span>No matching workspace page</span>}
                </div>
              )}
            </div>
            <span className="workspace-demo-label">Prototype</span>
            <ThemeToggle compact />
            <button type="button" className="workspace-logout" onClick={signOut} aria-label="Sign out" title="Sign out">
              <LogOut size={16} aria-hidden="true" />
            </button>
            <span className="workspace-avatar workspace-avatar-header" aria-label={`${user.name} account`}>
              {initials}
            </span>
          </div>
        </header>
        {logoutError && <p className="workspace-logout-error" role="alert">{logoutError}</p>}

        <main className="workspace-content">{children}</main>
        <footer className="workspace-footer">
          Prototype only · Synthetic data · Not medical advice
        </footer>
      </div>
    </div>
  );
}
