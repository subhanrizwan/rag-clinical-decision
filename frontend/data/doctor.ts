export type ReviewStatus = "Pending" | "Needs clarification" | "Reviewed";
export type ReviewDecision = "Reviewed" | "Needs clarification";

export type ReviewRecord = {
  id: string;
  patient: string;
  date: string;
  medicines: string[];
  status: ReviewStatus;
  flag: "Potential issue" | "Incomplete OCR" | "None noted";
  note: string;
};

// Synthetic FYP demonstration records. These are NOT clinical findings.
export const initialReviews: ReviewRecord[] = [
  { id: "DR-104", patient: "Demo Patient A", date: "2026-11-09", medicines: ["Medicine A", "Medicine B"], status: "Pending", flag: "Potential issue", note: "" },
  { id: "DR-103", patient: "Demo Patient B", date: "2026-11-08", medicines: ["Medicine C"], status: "Pending", flag: "Incomplete OCR", note: "" },
  { id: "DR-102", patient: "Demo Patient C", date: "2026-11-06", medicines: ["Medicine D", "Medicine E"], status: "Needs clarification", flag: "Incomplete OCR", note: "Please confirm the second item with the original document." },
  { id: "DR-101", patient: "Demo Patient D", date: "2026-11-04", medicines: ["Medicine F"], status: "Reviewed", flag: "None noted", note: "Synthetic demo verification only; no clinical assessment performed." },
];
