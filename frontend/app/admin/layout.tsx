import type { ReactNode } from "react";
import ProtectedDashboard from "../../components/protected-dashboard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <ProtectedDashboard role="admin">{children}</ProtectedDashboard>;
}

