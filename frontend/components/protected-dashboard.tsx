import { Suspense, type ReactNode } from "react";
import DashboardShell from "./dashboard-shell";
import {
  requireWorkspaceUser,
  type WorkspaceRole,
} from "../lib/server-auth";

export default function ProtectedDashboard({
  role,
  children,
}: {
  role: WorkspaceRole;
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<div className="workspace-loading" aria-label="Checking access" />}>
      <ResolvedDashboard role={role}>{children}</ResolvedDashboard>
    </Suspense>
  );
}

async function ResolvedDashboard({
  role,
  children,
}: {
  role: WorkspaceRole;
  children: ReactNode;
}) {
  const user = await requireWorkspaceUser(role);
  return (
    <DashboardShell role={role} user={user}>
      {children}
    </DashboardShell>
  );
}
