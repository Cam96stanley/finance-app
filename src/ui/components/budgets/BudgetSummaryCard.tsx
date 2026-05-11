// src/ui/components/budgets/BudgetSummaryCard.tsx
import { ChartDonutIcon } from "@phosphor-icons/react/dist/ssr";
import { Pie, PieChart, Sector } from "recharts";
import type { Budget } from "@/lib/types";

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

type BudgetSummaryCardProps = {
  budgets: Budget[];
  totalBudget?: number;
};

export default function BudgetSummaryCard({
  budgets,
  totalBudget = 0,
}: BudgetSummaryCardProps) {
  const totalSpent = budgets.reduce((acc, b) => acc + b.currentSpending, 0);

  const chartData = budgets.map((b) => ({
    name: b.category,
    value: b.maxSpending,
    color: themeColors[b.theme] ?? "#ccc",
  }));

  return (
    <div className="bg-white rounded-xl p-8 flex flex-col gap-6">
      {budgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground">
          <ChartDonutIcon size={32} />
          <p className="text-preset-4-bd">No budgets yet</p>
          <p className="text-preset-5-rg">Your budgets will appear here</p>
        </div>
      ) : (
        <>
          <div className="relative flex items-center justify-center">
            <PieChart width={240} height={240}>
              <Pie
                data={chartData}
                cx={110}
                cy={110}
                innerRadius={70}
                outerRadius={110}
                dataKey="value"
                strokeWidth={0}
                fill="#ccc"
                style={{ outline: "none" }}
              >
                {chartData.map((entry, i) => (
                  <Sector key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-preset-1">${totalSpent.toFixed(2)}</p>
              <p className="text-preset-5-rg text-muted-foreground">
                of ${totalBudget.toFixed(2)} limit
              </p>
            </div>
          </div>
          <div>
            <p className="text-preset-2">Spending Summary</p>
            <div className="flex flex-col mt-4">
              {budgets.map((budget) => (
                <div
                  key={budget.category}
                  className="flex justify-between items-center py-4 border-t border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1 h-5 rounded-full"
                      style={{
                        backgroundColor: themeColors[budget.theme] ?? "#ccc",
                      }}
                    />
                    <p className="text-preset-4-rg text-muted-foreground">
                      {budget.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-preset-4-bd">
                      ${budget.currentSpending.toFixed(2)}
                    </p>
                    <p className="text-preset-5-rg text-muted-foreground">
                      of ${budget.maxSpending.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
