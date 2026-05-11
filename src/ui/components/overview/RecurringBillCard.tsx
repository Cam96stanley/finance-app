import { CaretRightIcon, ReceiptIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { RecurringBill } from "@/lib/types";

type RecurringBillCardProps = {
  recurringBills: RecurringBill[];
};

export default function RecurringBillCard({
  recurringBills,
}: RecurringBillCardProps) {
  const isEmpty = recurringBills.every(({ total }) => total === 0);

  return (
    <div className="bg-white rounded-xl p-8 flex-1">
      <div className="flex justify-between items-center pb-8">
        <p className="text-preset-2">Recurring Bills</p>
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
      <div className="flex flex-col gap-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground">
            <ReceiptIcon size={32} />
            <p className="text-preset-4-bd">No recurring bills</p>
            <p className="text-preset-5-rg">
              Your recurring bills will appear here
            </p>
          </div>
        ) : (
          recurringBills.map(({ title, total, color }) => (
            <div
              key={title}
              className={`flex justify-between items-center p-5 bg-secondary rounded-xl border-l-4 ${color}`}
            >
              <p className="text-preset-4-rg">{title}</p>
              <p className="text-preset-4-bd">${total}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
