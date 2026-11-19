import { Suspense, type ReactNode } from "react";
import WorkspaceShell from "./dashboard/workspace-shell";
import type { AuthenticatedUser } from "../lib/server-auth";

type Role = "patient" | "doctor" | "admin";

export default function DashboardShell({
  role = "patient",
  user,
  children,
}: {
  role?: Role;
  user: AuthenticatedUser;
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<div className="workspace-loading" aria-label="Loading workspace" />}>
      <WorkspaceShell role={role} user={user}>{children}</WorkspaceShell>
    </Suspense>
  );
}
