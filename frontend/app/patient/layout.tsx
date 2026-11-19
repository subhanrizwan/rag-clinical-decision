  import ProtectedDashboard from "../../components/protected-dashboard";
import type { ReactNode } from "react";

  export default function PatientLayout({ children }: { children: ReactNode }) {
    return <ProtectedDashboard role="patient">{children}</ProtectedDashboard>;
}
