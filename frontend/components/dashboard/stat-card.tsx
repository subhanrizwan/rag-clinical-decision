import type { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "accent",
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  tone?: "accent" | "warning" | "success" | "info";
}) {
  return (
    <section className="app-panel dashboard-stat">
      <div className="dashboard-stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
      <span className={`dashboard-stat-icon tone-${tone}`}><Icon size={18} /></span>
    </section>
  );
}
