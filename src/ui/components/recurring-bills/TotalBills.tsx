import { ReceiptIcon } from "@phosphor-icons/react/dist/ssr";

export default function TotalBills() {
  return (
    <div className="bg-primary p-5 rounded-xl">
      <div className="pb-6">
        <ReceiptIcon size={40} className="text-white" />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-white text-preset-4-rg">Total Bills</p>
        <p className="text-white text-preset-1">$384.98</p>
      </div>
    </div>
  );
}
