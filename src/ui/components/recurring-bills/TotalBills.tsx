import { ReceiptIcon } from "@phosphor-icons/react/dist/ssr";

type TotalBillsProps = {
  totalBills: number
}

export default function TotalBills({ totalBills }: TotalBillsProps) {
  return (
    <div className="bg-primary p-5 rounded-xl">
      <div className="pb-6">
        <ReceiptIcon size={40} className="text-white" />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-white text-preset-4-rg">Total Bills</p>
        <p className="text-white text-preset-1">${totalBills.toFixed(2)}</p>
      </div>
    </div>
  );
}
