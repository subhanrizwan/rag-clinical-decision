import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpenText,
  Clock3,
  FileText,
  ShieldAlert,
  Users,
} from "lucide-react";
import ActivityChart from "@/components/dashboard/activity-chart";
import StatCard from "@/components/dashboard/stat-card";
import { DemoNotice, Heading, Panel, Pill } from "./admin-ui";
import { initialEvents, initialSources, initialUsers } from "./data";

const activity = [
  { period: "Jan", value: 22 },
  { period: "Feb", value: 30 },
  { period: "Mar", value: 26 },
  { period: "Apr", value: 43 },
  { period: "May", value: 39 },
  { period: "Jun", value: 52 },
  { period: "Jul", value: 44 },
  { period: "Aug", value: 59 },
  { period: "Sep", value: 54 },
  { period: "Oct", value: 68 },
  { period: "Nov", value: 61 },
  { period: "Dec", value: 76 },
];

export default function Overview() {
  const pendingEvents = initialEvents.filter((event) => event.level === "Warning").length;

  return (
    <div className="dashboard-page">
      <Heading
        eyebrow="ADMINISTRATION / OVERVIEW"
        title="Platform overview"
        description="A high-level view of the synthetic users, records, and reference sources in this prototype."
      />
      <DemoNotice />
      <section className="dashboard-stat-grid dashboard-stat-grid-four">
        <StatCard label="Demo users" value={initialUsers.length.toString().padStart(2, "0")} detail="All roles" icon={Users} />
        <StatCard label="Prescription samples" value="74" detail="Illustrative records" icon={FileText} tone="info" />
        <StatCard label="Review queue" value="12" detail="Illustrative pending" icon={Clock3} tone="warning" />
        <StatCard label="Knowledge sources" value={initialSources.length.toString().padStart(2, "0")} detail="Example RAG sources" icon={BookOpenText} tone="success" />
      </section>

      <div className="dashboard-overview-grid">
        <div className="dashboard-overview-main">
          <ActivityChart title="Platform activity" data={activity} metricLabel="Events" />
          <Panel className="app-panel">
            <div className="dashboard-panel-heading">
              <div><h2>Recent sample activity</h2><p>Fictional events for the UI demonstration</p></div>
              <Link href="/admin/audit-logs" className="dashboard-text-link">View logs <ArrowRight size={14} /></Link>
            </div>
            <div className="dashboard-record-list">
              {initialEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="dashboard-record">
                  <span className="dashboard-record-icon"><Activity size={17} /></span>
                  <span className="dashboard-record-copy">
                    <strong>{event.action}</strong>
                    <small>{event.actor} · {event.target}</small>
                  </span>
                  <Pill status={event.level} />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel className="app-panel dashboard-side-panel">
          <div className="dashboard-panel-heading">
            <div><h2>Workspace status</h2><p>Frontend integration boundaries</p></div>
          </div>
          <div className="dashboard-module-list">
            {[
              { label: "Admin interface", value: "Demo" },
              { label: "Role permissions", value: "Not connected" },
              { label: "OCR & RAG services", value: "Not connected" },
              { label: "Sample warnings", value: `${pendingEvents}` },
            ].map((item) => (
              <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>
            ))}
          </div>
          <div className="dashboard-shortcuts">
            <Link href="/admin/users"><Users size={16} /><span><strong>Manage demo users</strong><small>Browse sample roles</small></span><ArrowRight size={15} /></Link>
            <Link href="/admin/knowledge-base"><BookOpenText size={16} /><span><strong>Knowledge sources</strong><small>View example references</small></span><ArrowRight size={15} /></Link>
          </div>
          <div className="dashboard-safety-note"><ShieldAlert size={16} /><p>All data and activity shown here are synthetic.</p></div>
        </Panel>
      </div>
    </div>
  );
}
