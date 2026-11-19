"use client";

import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  ShieldAlert,
} from "lucide-react";
import ActivityChart from "@/components/dashboard/activity-chart";
import StatCard from "@/components/dashboard/stat-card";
import { useDoctorReviews } from "@/components/doctor/use-doctor-reviews";
import { DemoBanner, Panel, Status } from "@/components/doctor/doctor-ui";

const activity = [
  { period: "Jan", value: 12 },
  { period: "Feb", value: 17 },
  { period: "Mar", value: 14 },
  { period: "Apr", value: 20 },
  { period: "May", value: 24 },
  { period: "Jun", value: 18 },
  { period: "Jul", value: 27 },
  { period: "Aug", value: 23 },
  { period: "Sep", value: 31 },
  { period: "Oct", value: 26 },
  { period: "Nov", value: 35 },
  { period: "Dec", value: 30 },
];

export default function Overview() {
  const { reviews } = useDoctorReviews();
  const pending = reviews.filter((review) => review.status === "Pending").length;
  const clarification = reviews.filter((review) => review.status === "Needs clarification").length;
  const reviewed = reviews.filter((review) => review.status === "Reviewed").length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading">
        <div>
          <span className="dashboard-kicker">CLINICAL WORKSPACE</span>
          <h2>Good morning, Doctor</h2>
          <p>Review assigned synthetic records and document demo verification decisions.</p>
        </div>
        <Link href="/doctor?view=reviews" className="dashboard-primary-link">Open review queue <ArrowRight size={16} /></Link>
      </div>
      <DemoBanner />
      <section className="dashboard-stat-grid dashboard-stat-grid-four">
        <StatCard label="Assigned records" value={reviews.length.toString().padStart(2, "0")} detail="Synthetic records" icon={ClipboardCheck} />
        <StatCard label="Pending review" value={pending.toString().padStart(2, "0")} detail="Awaiting demo review" icon={Clock3} tone="warning" />
        <StatCard label="Needs clarification" value={clarification.toString().padStart(2, "0")} detail="Follow-up requested" icon={ShieldAlert} tone="info" />
        <StatCard label="Reviewed" value={reviewed.toString().padStart(2, "0")} detail="Demo decisions" icon={FileCheck2} tone="success" />
      </section>

      <div className="dashboard-overview-grid">
        <div className="dashboard-overview-main">
          <ActivityChart title="Review activity" data={activity} metricLabel="Reviews" />
          <Panel className="app-panel">
            <div className="dashboard-panel-heading">
              <div><h2>Recent assignments</h2><p>Records currently in the review queue</p></div>
              <Link href="/doctor?view=reviews" className="dashboard-text-link">View queue <ArrowRight size={14} /></Link>
            </div>
            <div className="dashboard-record-list">
              {reviews.slice(0, 4).map((review) => (
                <div key={review.id} className="dashboard-record">
                  <span className="dashboard-record-icon"><ClipboardCheck size={17} /></span>
                  <span className="dashboard-record-copy">
                    <strong>{review.patient} <small>· {review.id}</small></strong>
                    <small>{review.date} · {review.medicines.length} extracted item(s)</small>
                  </span>
                  <Status value={review.status} />
                  <Link href={`/doctor?view=verify&id=${review.id}`} className="dashboard-icon-link" aria-label={`Review ${review.id}`}><ArrowRight size={15} /></Link>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel className="app-panel dashboard-side-panel">
          <div className="dashboard-panel-heading">
            <div><h2>Review principles</h2><p>Keep source and uncertainty in view</p></div>
          </div>
          <ul className="dashboard-principles">
            <li><span>01</span><p>Confirm extracted fields against the original source.</p></li>
            <li><span>02</span><p>Do not infer missing dose or instruction details.</p></li>
            <li><span>03</span><p>Insufficient evidence does not establish safety.</p></li>
          </ul>
          <div className="dashboard-safety-note">
            <ShieldAlert size={16} />
            <p>This prototype does not perform clinical analysis or verification.</p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
