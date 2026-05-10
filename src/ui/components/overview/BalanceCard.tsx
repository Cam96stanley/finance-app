import type { Stat } from "@/lib/types";

type BalanceCardProps = {
  stats: Stat[];
};

export default function BalanceCard({ stats }: BalanceCardProps) {
  return (
    <div className="py-8 grid grid-cols-3 gap-6">
      {stats.map(({ title, total }, i) => (
        <div
          key={title}
          className={`p-6 rounded-xl flex flex-col gap-3 ${i === 0 ? "bg-primary text-white" : "bg-card"}`}
        >
          <p
            className={`text-preset-4-rg ${i === 0 ? "text-grey" : "text-muted-foreground"}`}
          >
            {title}
          </p>
          <p className="text-preset-1">${total.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
