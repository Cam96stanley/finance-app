"use client";

import { useQuery } from "@tanstack/react-query";
import type {
  Budget,
  Pot,
  RecurringBill,
  Stat,
  Transaction,
} from "@/lib/types";
import Loading from "@/ui/components/Loading";
import BalanceCard from "@/ui/components/overview/BalanceCard";
import BudgetsCard from "@/ui/components/overview/BudgetsCard";
import PotsCard from "@/ui/components/overview/PotsCard";
import RecurringBillCard from "@/ui/components/overview/RecurringBillCard";
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

  const transactions: Transaction[] =
    data?.recentTransactions.map((transaction: Transaction) => ({
      id: transaction.id,
      counterParty: transaction.counterParty,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
    })) ?? [];

  const recurringBills: RecurringBill[] = [
    {
      title: "Paid Bills",
      total: data?.recurringBills.paidBills,
      color: "border-green",
    },
    {
      title: "Total Upcoming",
      total: data?.recurringBills.totalUpcoming,
      color: "border-yellow",
    },
    {
      title: "Due soon",
      total: data?.recurringBills.dueSoon,
      color: "border-cyan",
    },
  ];

  const budgets: Budget[] =
    data?.budgets.items.map((budget: Budget) => ({
      maxSpending: budget.maxSpending,
      currentSpending: budget.currentSpending,
      theme: budget.theme,
      category: budget.category,
    })) ?? [];

  return (
    <div>
      <main className="px-10 py-8">
        <h1 className="text-preset-1">Overview</h1>
        <BalanceCard stats={stats} />
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <PotsCard pots={pots} totalSaved={data?.pots.totalSaved} />
            <TransactionCard transactions={transactions} />
          </div>
          <div className="flex flex-col gap-6">
            <BudgetsCard budgets={budgets} />
            <RecurringBillCard recurringBills={recurringBills} />
          </div>
        </div>
      </main>
    </div>
  );
}
