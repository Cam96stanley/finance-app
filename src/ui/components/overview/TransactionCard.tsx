import { ArrowsDownUpIcon, CaretRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import type { Transaction } from "@/lib/types";

type TransactionCardProps = {
  transactions: Transaction[];
};

export default function TransactionCard({
  transactions,
}: TransactionCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 flex-1">
      <div className="flex justify-between items-center">
        <p className="text-preset-2">Transactions</p>
        <Link
          className="flex items-center gap-2 text-preset-4-rg hover:underline"
          href={"/transactions"}
        >
          See Details{" "}
          <span>
            <CaretRightIcon size={16} />
          </span>
        </Link>
      </div>
      <div>
        {transactions.length === 0 ? (
          <div className="flex flex-col my-20 items-center justify-center py-12 gap-2 text-muted-foreground">
            <ArrowsDownUpIcon size={32} />
            <p className="text-preset-4-bd">No transactions yet</p>
            <p className="text-preset-5-rg">
              Your recent transactions will appear here
            </p>
          </div>
        ) : (
          transactions.map(({ counterParty, amount, date, type, id }) => (
            <div
              key={id}
              className="flex justify-between items-center py-4 border-b border-gray-100"
            >
              <p className="text-preset-4-bd">{counterParty}</p>
              <div className="flex flex-col items-end">
                {type === "expense" ? (
                  <p className="text-preset-4-bd text-red-500">-${amount}</p>
                ) : (
                  <p className="text-preset-4-bd text-green">+${amount}</p>
                )}
                <p className="text-preset-5-rg">
                  {new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
