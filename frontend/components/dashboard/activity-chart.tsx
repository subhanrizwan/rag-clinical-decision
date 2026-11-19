"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ActivityPoint = {
  period: string;
  value: number;
};

const ranges = [
  { label: "4M", length: 4 },
  { label: "8M", length: 8 },
  { label: "12M", length: 12 },
];

export default function ActivityChart({
  title,
  data,
  metricLabel,
}: {
  title: string;
  data: ActivityPoint[];
  metricLabel: string;
}) {
  const [range, setRange] = useState(8);
  const visibleData = useMemo(() => data.slice(-range), [data, range]);

  return (
    <section className="app-panel dashboard-panel dashboard-chart">
      <div className="dashboard-panel-heading">
        <div>
          <h2>{title}</h2>
          <p>Illustrative activity · synthetic data</p>
        </div>
        <div className="chart-range" role="group" aria-label="Chart time range">
          {ranges.map((item) => (
            <button
              key={item.length}
              type="button"
              onClick={() => setRange(item.length)}
              aria-pressed={range === item.length}
              className={range === item.length ? "is-selected" : ""}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="dashboard-chart-area" role="img" aria-label={`${title} chart showing ${metricLabel} over time`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visibleData} margin={{ top: 10, right: 6, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activity-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1BB394" stopOpacity={0.24} />
                <stop offset="100%" stopColor="#1BB394" stopOpacity={0.015} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--line)" strokeDasharray="3 5" vertical={false} />
            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 10 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 10 }}
              width={35}
            />
            <Tooltip
              cursor={{ stroke: "#1BB394", strokeDasharray: "3 3" }}
              contentStyle={{
                border: "1px solid var(--line)",
                borderRadius: 6,
                background: "var(--surface)",
                color: "var(--heading)",
                fontSize: 11,
              }}
              labelStyle={{ color: "var(--muted)" }}
              formatter={(value) => [`${value ?? 0}`, metricLabel]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1BB394"
              strokeWidth={2}
              fill="url(#activity-fill)"
              activeDot={{ r: 4, strokeWidth: 0, fill: "#1BB394" }}
              isAnimationActive
              animationDuration={450}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
