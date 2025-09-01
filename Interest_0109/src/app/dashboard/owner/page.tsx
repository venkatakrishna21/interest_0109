"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import type { Debt, Customer } from "../../../types/database";
import DebtChart from "../../../components/DebtChart";

export default function OwnerDashboard() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalDebt, setTotalDebt] = useState(0);
  const [avgRate, setAvgRate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: c } = await supabase.from("customers").select("id, name, email");
      setCustomers(c || []);

      const { data: d } = await supabase
        .from("debts")
        .select("id, principal, interest_rate, updated_at, customer_id, status");
      setDebts(d || []);

      let t = 0, r = 0;
      (d || []).forEach((x: any) => { t += Number(x.principal || 0); r += Number(x.interest_rate || 0); });
      setTotalDebt(t);
      setAvgRate((d?.length || 0) ? r / (d!.length) : 0);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">📊 Owner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="text-sm text-gray-600">Total Customers</div>
          <div className="text-2xl font-semibold">{customers.length}</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="text-sm text-gray-600">Total Debt</div>
          <div className="text-2xl font-semibold">₹{totalDebt.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="text-sm text-gray-600">Average Interest</div>
          <div className="text-2xl font-semibold">{avgRate.toFixed(2)}%</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <div className="text-lg font-semibold mb-2">Debt by Status</div>
        <DebtChart debts={debts} />
      </div>
    </div>
  );
}
