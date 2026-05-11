"use client";

import { useQuery } from "@tanstack/react-query";
import Loading from "@/ui/components/Loading";
import { columns } from "@/ui/components/transactions/columns";
import DataTable from "@/ui/components/transactions/DataTable";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions");
      return res.json();
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <main className="px-10 py-8">
        <h1 className="text-preset-1">Transactions</h1>
        <div className="bg-white rounded-xl p-8 mt-8">
          <DataTable data={data ?? []} columns={columns} />
        </div>
      </main>
    </div>
  );
}
