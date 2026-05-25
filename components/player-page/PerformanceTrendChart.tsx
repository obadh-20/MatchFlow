// components/player-page/PerformanceTrendChart.tsx
// Area chart showing player rating trend over recent matches

"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";
import type { RatingTrendPoint } from "@/lib/player-types";

interface PerformanceTrendChartProps {
  data: RatingTrendPoint[];
}

export default function PerformanceTrendChart({ data }: PerformanceTrendChartProps) {
  const isEmpty = !data || data.length === 0;
  const latest = isEmpty ? 0 : data[data.length - 1]?.rating ?? 0;
  const first = isEmpty || !data[0]?.rating ? 0 : data[0].rating;
  const change = first !== 0 ? ((latest - first) / first) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm p-5 bg-[var(--color-bg-card)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Performance Rating
          </h3>
          <span
            className={`flex items-center gap-0.5 text-xs font-bold ${
              isEmpty ? "text-gray-400" : isPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            <TrendingUp className={`w-3 h-3 ${!isEmpty && !isPositive && "rotate-180"}`} />
            {isEmpty ? "—" : `${isPositive ? "+" : ""}${change.toFixed(1)}%`}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[5, 10]}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ fontWeight: 600, color: "#374151" }}
            />
            <Area
              type="monotone"
              dataKey="rating"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              fill="url(#ratingGradient)"
              dot={{ r: 3, fill: "var(--color-primary)", stroke: "white", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "var(--color-primary)", stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}