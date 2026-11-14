export const prescriptions = [
  {
    id: "RX-DEMO-001",
    name: "Sample prescription A",
    uploaded: "Nov 10, 2026",
    doctor: "Demo reviewer",
    status: "Needs review",
    medicines: ["Example medicine A", "Example medicine B"],
    risk: "Review required",
  },
  {
    id: "RX-DEMO-002",
    name: "Sample prescription B",
    uploaded: "Nov 8, 2026",
    doctor: "Not assigned",
    status: "Reviewed",
    medicines: ["Example medicine C"],
    risk: "No validated result",
  },
  {
    id: "RX-DEMO-003",
    name: "Sample prescription C",
    uploaded: "Nov 6, 2026",
    doctor: "Not assigned",
    status: "Processing",
    medicines: ["Example medicine D"],
    risk: "No validated result",
  },
] as const;

export const scheduleItems = [
  {
    id: "schedule-demo-1",
    label: "Morning",
    time: "8:00 AM",
    medicine: "Example medicine A",
    amount: "Example instruction — not a real dose",
  },
  {
    id: "schedule-demo-2",
    label: "Evening",
    time: "6:00 PM",
    medicine: "Example medicine B",
    amount: "Example instruction — not a real dose",
  },
];

export const historyItems = [
  {
    id: "event-demo-1",
    type: "Prescription added",
    detail: "Synthetic demo record added to the sample workspace.",
    date: "Nov 10, 2026",
    icon: "upload",
  },
  {
    id: "event-demo-2",
    type: "Review pending",
    detail: "No clinical review has been performed for this demo record.",
    date: "Nov 10, 2026",
    icon: "pending",
  },
  {
    id: "event-demo-3",
    type: "Demo review complete",
    detail: "Example status only; not a clinical verification.",
    date: "Nov 8, 2026",
    icon: "review",
  },
] as const;
