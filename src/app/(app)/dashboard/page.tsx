"use client";

import { useQuery } from "@tanstack/react-query";
import Loading from "@/ui/components/Loading";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await fetch("/api/overview");
      return res.json();
    },
  });

  const stats = [
    { title: "Current Balance", total: data?.balance ?? 0 },
    { title: "Income", total: data?.totalIncome ?? 0 },
    { title: "Expenses", total: data?.totalExpenses ?? 0 },
  ];

  if (isLoading) return <Loading />;

  return (
    <div>
      <main className="px-10 py-8">
        <h1 className="text-preset-1">Overview</h1>
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
              <p className="text-preset-1">${total}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
