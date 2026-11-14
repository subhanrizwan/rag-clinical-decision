export type Role = "Patient" | "Doctor" | "Admin";
export type UserStatus = "Active" | "Pending" | "Suspended";
export type AppUser = { id: string; name: string; email: string; role: Role; status: UserStatus; joined: string };
export type KnowledgeSource = { id: string; name: string; category: string; records: number; updated: string; status: "Indexed" | "Pending" | "Needs review" };
export type AuditEvent = { id: string; actor: string; action: string; target: string; date: string; level: "Info" | "Warning" | "Success" };

// All records are fictional FYP UI samples. No real patient data is included.
export const initialUsers: AppUser[] = [
  { id: "USR-001", name: "Aisha Khan", email: "aisha.demo@example.com", role: "Patient", status: "Active", joined: "2026-11-02" },
  { id: "USR-002", name: "Dr. Omar Siddiqui", email: "omar.demo@example.com", role: "Doctor", status: "Active", joined: "2026-11-02" },
  { id: "USR-003", name: "Hamza Ali", email: "hamza.demo@example.com", role: "Patient", status: "Pending", joined: "2026-11-03" },
  { id: "USR-004", name: "Dr. Sara Ahmed", email: "sara.demo@example.com", role: "Doctor", status: "Active", joined: "2026-11-04" },
  { id: "USR-005", name: "Fatima Noor", email: "fatima.demo@example.com", role: "Patient", status: "Suspended", joined: "2026-11-05" },
  { id: "USR-006", name: "Admin Demo", email: "admin.demo@example.com", role: "Admin", status: "Active", joined: "2026-11-01" },
  { id: "USR-007", name: "Bilal Raza", email: "bilal.demo@example.com", role: "Patient", status: "Active", joined: "2026-11-06" },
  { id: "USR-008", name: "Dr. Hina Malik", email: "hina.demo@example.com", role: "Doctor", status: "Pending", joined: "2026-11-07" },
];
export const initialSources: KnowledgeSource[] = [
  { id: "SRC-001", name: "Drug Label Examples", category: "Drug labeling", records: 346, updated: "2026-11-09", status: "Indexed" },
  { id: "SRC-002", name: "Terminology Mapping Sample", category: "Drug normalization", records: 128, updated: "2026-11-08", status: "Indexed" },
  { id: "SRC-003", name: "Interaction Review Examples", category: "Safety evidence", records: 74, updated: "2026-11-06", status: "Needs review" },
  { id: "SRC-004", name: "Sample Reference Documents", category: "RAG documents", records: 0, updated: "2026-11-10", status: "Pending" },
];
export const initialEvents: AuditEvent[] = [
  { id: "LOG-1001", actor: "Admin Demo", action: "Logged in (demo)", target: "Admin workspace", date: "2026-11-11 09:45", level: "Info" },
  { id: "LOG-1002", actor: "Dr. Sara Ahmed", action: "Reviewed sample", target: "RX-DEMO-007", date: "2026-11-11 09:12", level: "Success" },
  { id: "LOG-1003", actor: "System Sample", action: "Flagged missing evidence", target: "RX-DEMO-009", date: "2026-11-10 18:30", level: "Warning" },
  { id: "LOG-1004", actor: "Admin Demo", action: "Updated source status", target: "SRC-003", date: "2026-11-10 16:44", level: "Info" },
  { id: "LOG-1005", actor: "Aisha Khan", action: "Uploaded sample", target: "RX-DEMO-010", date: "2026-11-10 14:19", level: "Info" },
  { id: "LOG-1006", actor: "Dr. Omar Siddiqui", action: "Requested clarification", target: "RX-DEMO-008", date: "2026-11-09 13:05", level: "Warning" },
  { id: "LOG-1007", actor: "Admin Demo", action: "Created demo account", target: "USR-008", date: "2026-11-09 11:03", level: "Success" },
];
