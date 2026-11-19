import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ClipboardCheck,
  FilePlus2,
  FileText,
  ShieldAlert,
} from "lucide-react";
import ActivityChart from "@/components/dashboard/activity-chart";
import StatCard from "@/components/dashboard/stat-card";
import { DemoNotice, Panel, PrimaryLink, SectionTitle, StatusPill } from "@/components/patient/primitives";
import { prescriptions } from "@/data/patient";

const activity = [
  { period: "Jan", value: 18 },
  { period: "Feb", value: 24 },
  { period: "Mar", value: 19 },
  { period: "Apr", value: 31 },
  { period: "May", value: 28 },
  { period: "Jun", value: 36 },
  { period: "Jul", value: 27 },
  { period: "Aug", value: 41 },
  { period: "Sep", value: 34 },
  { period: "Oct", value: 46 },
  { period: "Nov", value: 39 },
  { period: "Dec", value: 48 },
];

export default function PatientDashboard() {
  const needsReview = prescriptions.filter((item) => item.status === "Needs review").length;
  const reviewed = prescriptions.filter((item) => item.status === "Reviewed").length;

  return (
    <div className="dashboard-page">
      <SectionTitle
        title="Good morning, Demo Patient"
        description="Review your records and see where each one is in the demonstration workflow."
        action={<PrimaryLink href="/patient?section=upload"><FilePlus2 size={16} /> Upload prescription</PrimaryLink>}
      />
      <DemoNotice />
      <section className="dashboard-stat-grid">
        <StatCard label="Prescriptions" value={prescriptions.length.toString().padStart(2, "0")} detail="Synthetic records" icon={FileText} />
        <StatCard label="Needs review" value={needsReview.toString().padStart(2, "0")} detail="Not a clinical risk score" icon={ShieldAlert} tone="warning" />
        <StatCard label="Reviewed" value={reviewed.toString().padStart(2, "0")} detail="Demo review status" icon={ClipboardCheck} tone="success" />
      </section>

      <div className="dashboard-overview-grid">
        <div className="dashboard-overview-main">
          <ActivityChart title="Prescription activity" data={activity} metricLabel="Records" />
          <Panel className="app-panel">
            <div className="dashboard-panel-heading">
              <div><h2>Recent prescriptions</h2><p>Latest synthetic records in this workspace</p></div>
              <Link href="/patient?section=prescriptions" className="dashboard-text-link">View all <ArrowRight size={14} /></Link>
            </div>
            <div className="dashboard-record-list">
              {prescriptions.slice(0, 4).map((item) => (
                <Link href={`/patient?section=reports&id=${item.id}`} key={item.id} className="dashboard-record">
                  <span className="dashboard-record-icon"><FileText size={17} /></span>
                  <span className="dashboard-record-copy">
                    <strong>{item.name}</strong>
                    <small>{item.id} · Uploaded {item.uploaded}</small>
                  </span>
                  <StatusPill type={item.status} />
                </Link>
              ))}
            </div>
          </Panel>
        </div>

        <Panel className="app-panel dashboard-side-panel">
          <div className="dashboard-panel-heading">
            <div><h2>Workspace shortcuts</h2><p>Continue where you left off</p></div>
          </div>
          <div className="dashboard-shortcuts">
            <Link href="/patient?section=reports"><ShieldAlert size={17} /><span><strong>Safety reports</strong><small>Check evidence and review context</small></span><ArrowRight size={15} /></Link>
            <Link href="/patient?section=schedule"><CalendarDays size={17} /><span><strong>Medication schedule</strong><small>View the synthetic schedule demo</small></span><ArrowRight size={15} /></Link>
            <Link href="/patient?section=history"><ClipboardCheck size={17} /><span><strong>Prescription history</strong><small>Browse sample activity events</small></span><ArrowRight size={15} /></Link>
          </div>
          <div className="dashboard-safety-note">
            <ShieldAlert size={16} />
            <p>Missing or inconclusive evidence is unknown—not proof that a prescription is safe.</p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
