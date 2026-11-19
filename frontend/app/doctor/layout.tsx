import ProtectedDashboard from "../../components/protected-dashboard";
import type { ReactNode } from "react";

export default function DoctorLayout({ children }: { children: ReactNode }) {
  return <ProtectedDashboard role="doctor">{children}</ProtectedDashboard>;
}
  