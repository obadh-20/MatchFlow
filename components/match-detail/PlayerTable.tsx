// components/match-detail/PlayerTable.tsx
// Full player performance table with TanStack Table, tabs for Home/Away

"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import type { PlayerPerformance } from "@/types/match-detail";
import SectionCard from "./SectionCard";

interface PlayerTableProps {
  players: PlayerPerformance[];
}

export default function PlayerTable({ players }: PlayerTableProps) {
  const [activeTab, setActiveTab] = useState<"home" | "away">("home");

  const filteredPlayers = useMemo(
    () => players.filter((p) => p.team === activeTab),
    [players, activeTab]
  );

  const columns = useMemo<ColumnDef<PlayerPerformance>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Player",
        cell: ({ getValue }) => (
          <span className="font-medium text-gray-900 text-xs">{getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ getValue }) => {
          const rating = getValue<number>();
          const isTop = rating >= 8.0;
          return (
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                isTop
                  ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                  : "text-gray-700"
              }`}
            >
              {rating.toFixed(1)}
            </span>
          );
        },
      },
      { accessorKey: "goals", header: "G", cell: ({ getValue }) => <span className="text-xs font-semibold text-gray-700">{getValue<number>()}</span> },
      { accessorKey: "assists", header: "A", cell: ({ getValue }) => <span className="text-xs font-semibold text-gray-700">{getValue<number>()}</span> },
      { accessorKey: "shots", header: "S", cell: ({ getValue }) => <span className="text-xs text-gray-600">{getValue<number>()}</span> },
      { accessorKey: "passes", header: "P", cell: ({ getValue }) => <span className="text-xs text-gray-600">{getValue<number>()}</span> },
      { accessorKey: "tackles", header: "T", cell: ({ getValue }) => <span className="text-xs text-gray-600">{getValue<number>()}</span> },
    ],
    []
  );

  const table = useReactTable({
    data: filteredPlayers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <SectionCard title="Player Stats">
      {/* Tabs */}
      <div className="flex gap-1 mb-4 pb-3 border-b border-gray-100">
        <button
          onClick={() => setActiveTab("home")}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === "home"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("away")}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === "away"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Away
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left text-[10px] font-semibold uppercase tracking-wider text-gray-400 pb-2 pr-2 last:pr-0 whitespace-nowrap"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-50 hover:bg-[var(--color-primary-light)] transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-2.5 pr-2 last:pr-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}