import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Pie, PieChart, Sector } from "recharts";
import type { Budget } from "@/lib/types";

type BudgetCardProps = {
  budgets: Budget[];
  totalBudget?: number;
};

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

export default function BudgetsCard({ budgets, totalBudget = 0 }: BudgetCardProps) {
  const totalSpent = budgets.reduce((acc, b) => acc + b.currentSpending, 0);

  const chartData = budgets.map((b) => ({
    name: b.category,
    value: b.maxSpending,
    color: themeColors[b.theme] ?? "#ccc",
  }));

  return (
    <div className="bg-white rounded-xl p-8">
      <div className="flex justify-between items-center">
        <p className="text-preset-2">Budgets</p>
        <Link
          className="flex items-center gap-2 text-preset-4-rg hover:underline"
          href={"/budgets"}
        >
          See Details{" "}
          <span>
            <CaretRightIcon size={16} />
          </span>
        </Link>
      </div>
      <div className="relative">
        <PieChart width={240} height={240}>
          <Pie
            data={chartData}
            cx={110}
            cy={110}
            innerRadius={70}
            outerRadius={110}
            dataKey={"value"}
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
          <p className="text-preset-5-rg">of ${totalBudget.toFixed(2)} limit</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {budgets.map((budget) => (
          <div
            key={budget.category}
            className="pl-4 border-l-4 flex flex-col"
            style={{ borderColor: themeColors[budget.theme] ?? "#ccc" }}
          >
            <p className="flex flex-col gap-4">${budget.category}</p>
            <p className="text-preset-5-rg">{budget.category}</p>
            <p className="text-preset-4-bd">${budget.maxSpending.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
