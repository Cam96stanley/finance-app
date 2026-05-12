export default function TotalBillSummary() {
  return (
    <div className="bg-white p-5 rounded-xl">
      <p className="text-preset-3">Summary</p>
      <div>
        <div className="flex justify-between py-4 border-b border-secondary">
          <p className="text-preset-5-rg">Paid Bills</p>
          <p className="text-preset-5-bd">4 ($190.00)</p>
        </div>
        <div className="flex justify-between py-4 border-b border-secondary">
          <p className="text-preset-5-rg">Total Upcoming</p>
          <p className="text-preset-5-bd">4 ($194.98)</p>
        </div>
        <div className="text-destructive flex justify-between py-4">
          <p className="text-preset-5-rg">Due Soon</p>
          <p className="text-preset-5-bd">2 ($59.98)</p>
        </div>
      </div>
    </div>
  );
}
