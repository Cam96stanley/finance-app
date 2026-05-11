// src/ui/components/budgets/BudgetCard.tsx
"use client";

import { CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Budget, Transaction } from "@/lib/types";
import { Progress } from "@/ui/primitives/Progress";

const themeColors: Record<string, string> = {
  green: "#277C78",
  yellow: "#F2CDAC",
  cyan: "#82C9D7",
  navy: "#626070",
  red: "#C94736",
  purple: "#826CB0",
  "light-purple": "#AF81BA",
  turquoise: "#597C7C",
  brown: "#93674F",
  magenta: "#934F6F",
  blue: "#3F82B2",
  "navy-grey": "#97A0AC",
  "army-green": "#7F9161",
  gold: "#CAB361",
  orange: "#BE6C49",
};

type BudgetCardProps = {
  budget: Budget;
  transactions: Transaction[];
};

export default function BudgetItemCard({ budget, transactions }: BudgetCardProps) {
  const color = themeColors[budget.theme] ?? "#ccc";
  const percentage = Math.min(
    (budget.currentSpending / budget.maxSpending) * 100,
    100,
  );
  const remaining = Math.max(budget.maxSpending - budget.currentSpending, 0);
  const latestTransactions = transactions.slice(0, 3);

  return (
    <div className="bg-white rounded-xl p-8 flex flex-col gap-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <p className="text-preset-2">{budget.category}</p>
        </div>
        <button type="button">
          <DotsThreeIcon size={24} className="text-muted-foreground" />
        </button>
      </div>

      {/* Max */}
      <p className="text-preset-4-rg text-muted-foreground">
        Maximum of ${budget.maxSpending.toFixed(2)}
      </p>

      {/* Progress bar */}
      <Progress
        value={percentage}
        className="h-8 bg-secondary"
        style={{ "--progress-color": color } as React.CSSProperties}
      />

      {/* Spent / Remaining */}
      <div className="grid grid-cols-2 divide-x divide-gray-200">
        <div
          className="flex flex-col gap-1 pl-4 border-l-4"
          style={{ borderColor: color }}
        >
          <p className="text-preset-5-rg text-muted-foreground">Spent</p>
          <p className="text-preset-4-bd">
            ${budget.currentSpending.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col gap-1 pl-4 border-l-4 border-gray-200">
          <p className="text-preset-5-rg text-muted-foreground">Remaining</p>
          <p className="text-preset-4-bd">${remaining.toFixed(2)}</p>
        </div>
      </div>

      {/* Latest Spending */}
      <div className="bg-secondary rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-preset-3">Latest Spending</p>
          <Link
            href={`/transactions?category=${budget.category}`}
            className="flex items-center gap-2 text-preset-4-rg text-muted-foreground hover:underline"
          >
            See All
            <CaretRightIcon size={16} />
          </Link>
        </div>
        <div className="flex flex-col">
          {latestTransactions.length === 0 ? (
            <p className="text-preset-5-rg text-muted-foreground text-center py-4">
              No transactions yet
            </p>
          ) : (
            latestTransactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center py-3 border-t border-gray-200 first:border-t-0"
              >
                <p className="text-preset-4-bd">{t.counterParty}</p>
                <div className="flex flex-col items-end">
                  <p className="text-preset-4-bd">-${t.amount.toFixed(2)}</p>
                  <p className="text-preset-5-rg text-muted-foreground">
                    {new Date(t.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
