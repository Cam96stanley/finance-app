"use client";

import { useQuery } from "@tanstack/react-query";
import Loading from "@/ui/components/Loading";
import { columns } from "@/ui/components/recurring-bills/Columns";
import RecurringBillsTable from "@/ui/components/recurring-bills/RecurringBillsTable";
import TotalBillSummary from "@/ui/components/recurring-bills/TotalBillSummary";
import TotalBills from "@/ui/components/recurring-bills/TotalBills";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["bills"],
    queryFn: async () => {
      const res = await fetch("/api/bills");
      return res.json();
    },
  });

  if (isLoading) return <Loading />;

  const bills = data?.bills ?? [];
  const totalBills = data?.totalBills ?? 0;
  const summary = data?.summary;


  return (
    <div>
      <main className="px-10 py-8">
        <div className="flex justify-between">
          <h1 className="text-preset-1 pb-8">Recurring Bills</h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 flex flex-col gap-6">
            <TotalBills totalBills={totalBills} />
            <TotalBillSummary summary={summary} />
          </div>
          <div className="col-span-2">
            <RecurringBillsTable data={bills} columns={columns} />
          </div>
        </div>
      </main>
    </div>
  );
}
