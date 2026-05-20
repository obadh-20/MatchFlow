// components/match-detail/AttackMomentumChart.tsx
// Vertical bar chart showing match momentum over time using Recharts

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import type { MomentumPoint } from "@/types/match-detail";
import SectionCard from "./SectionCard";

interface AttackMomentumChartProps {
  data: MomentumPoint[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const val = payload[0].value as number;
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-md text-xs">
        <p className="font-medium text-gray-700">{`${label}'`}</p>
        <p className="text-[var(--color-primary)] font-semibold">
          {val > 0 ? `+${val}` : val === 0 ? "0" : `${val}`}
        </p>
      </div>
    );
  }
  return null;
}

export default function AttackMomentumChart({ data }: AttackMomentumChartProps) {
  // Transform data to show net home momentum, with green fill
  const chartData = data.map((point) => ({
    minute: point.minute,
    value: point.homeValue - point.awayValue,
  }));

  return (
    <SectionCard title="Attack Momentum">
      <div className="w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barCategoryGap={2}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="minute"
              tick={{ fontSize: 9, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-primary-light)" }} />
            <Bar
              dataKey="value"
              radius={[2, 2, 0, 0]}
              fill="var(--color-primary)"
              maxBarSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}