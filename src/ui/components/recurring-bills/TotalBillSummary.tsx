type Summary = {
  paid: { count: number; total: number }
  upcoming: { count: number; total: number }
  dueSoon: { count: number; total: number }
}

type TotaBillsSummaryProps = {
  summary?: Summary
}

export default function TotalBillSummary({ summary }: TotaBillsSummaryProps) {
  return (
    <div className="bg-white p-5 rounded-xl">
      <p className="text-preset-3">Summary</p>
      <div>
        <div className="flex justify-between py-4 border-b border-secondary">
          <p className="text-preset-5-rg">Paid Bills</p>
          <p className="text-preset-5-bd">
            {summary?.paid.count} (${summary?.paid.total.toFixed(2)})
          </p>
        </div>
        <div className="flex justify-between py-4 border-b border-secondary">
          <p className="text-preset-5-rg">Total Upcoming</p>
          <p className="text-preset-5-bd">
            {summary?.upcoming.count} (${summary?.upcoming.total.toFixed(2)})
          </p>
        </div>
        <div className="text-destructive flex justify-between py-4">
          <p className="text-preset-5-rg">Due Soon</p>
          <p className="text-preset-5-bd">
            {summary?.dueSoon.count} (${summary?.dueSoon.total.toFixed(2)})
          </p>
        </div>
      </div>
    </div>
  );
}
