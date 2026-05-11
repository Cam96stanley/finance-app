"use client";

import { useQuery } from "@tanstack/react-query";
import type { Pot, Stat, Transaction } from "@/lib/types";
import Loading from "@/ui/components/Loading";
import BalanceCard from "@/ui/components/overview/BalanceCard";
import PotsCard from "@/ui/components/overview/PotsCard";
import TransactionCard from "@/ui/components/overview/TransactionCard";

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

  const pots: Pot[] =
    data?.pots.items.map((pot: Pot) => ({
      title: pot.name,
      total: pot.currentAmount,
    })) ?? [];

  const transactions: Transaction[] = data?.recentTransactions.map((transaction: Transaction) => ({
    id: transaction.id,
    counterParty: transaction.counterParty,
    amount: transaction.amount,
    date: transaction.date,
    type: transaction.type
  }))

  return (
    <div>
      <main className="px-10 py-8">
        <h1 className="text-preset-1">Overview</h1>
        <BalanceCard stats={stats} />
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <PotsCard pots={pots} totalSaved={data?.pots.totalSaved} />
            <TransactionCard transactions={transactions}/>
          </div>
        </div>
      </main>
    </div>
  );
}
