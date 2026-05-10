"use client";

import { useQuery } from "@tanstack/react-query";
import type { Pot, Stat } from "@/lib/types";
import Loading from "@/ui/components/Loading";
import BalanceCard from "@/ui/components/overview/BalanceCard";
import PotsCard from "@/ui/components/overview/PotsCard";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await fetch("/api/overview");
      return res.json();
    },
  });

  if (isLoading) return <Loading />;

  const stats: Stat[] = [
    { title: "Current Balance", total: data?.balance ?? 0 },
    { title: "Income", total: data?.totalIncome ?? 0 },
    { title: "Expenses", total: data?.totalExpenses ?? 0 },
  ];

  const pots: Pot[] = [
    { title: "Savings", total: 159 },
    { title: "Gift", total: 40 },
    { title: "Concert Ticket", total: 110 },
    { title: "New Laptop", total: 10 },
  ];

  return (
    <div>
      <main className="px-10 py-8">
        <h1 className="text-preset-1">Overview</h1>
        <BalanceCard stats={stats} />
        <div className="grid grid-cols-2 gap-6">
          <PotsCard pots={pots} />
        </div>
      </main>
    </div>
  );
}
