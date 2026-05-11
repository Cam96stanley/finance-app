"use client";

import { useQuery } from "@tanstack/react-query";
import type { Budget } from "@/lib/types";
import BudgetSummaryCard from "@/ui/components/budgets/BudgetSummaryCard";
import BudgetItemCard from "@/ui/components/budgets/BudgetItemCard";
import Loading from "@/ui/components/Loading";

export default function Page() {
  const { data, isLoading } =
    useQuery({
      queryKey: ["budgets"],
      queryFn: async () => {
        const res = await fetch("/api/budgets");
        return res.json();
      },
    });

  if (isLoading) return <Loading />;

  const budgets = data ?? [];
  const totalBudget = budgets.reduce((acc: number, b: any) => acc + b.maxSpending, 0);

  return (
    <div>
      <main className=" px-10 py-8">
        <h1 className="text-preset-1 pb-8">Budgets</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <BudgetSummaryCard budgets={budgets} totalBudget={totalBudget} />
          </div>
          <div className="flex flex-col gap-6">
            {budgets.map((budget: any) => (
              <BudgetItemCard
                key={budget.id}
                budget={budget}
                transactions={budget.latestTransactions ?? []}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
