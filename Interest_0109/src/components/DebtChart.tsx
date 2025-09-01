"use client";
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Debt } from "../types/database";

export default function DebtChart({ debts }: { debts: Debt[] }) {
  const data = useMemo(() => {
    // group by status for a simple breakdown
    const groups: Record<string, number> = {};
    debts.forEach(d => {
      groups[d.status] = (groups[d.status] || 0) + Number(d.principal || 0);
    });
    return Object.entries(groups).map(([status, total]) => ({ status, total }));
  }, [debts]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
