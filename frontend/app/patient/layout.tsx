  import DashboardShell from "../../components/dashboard-shell";
import type { ReactNode } from "react";

export default function PatientLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
