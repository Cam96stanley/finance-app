import { CaretRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import type { Transaction } from "@/lib/types";

type TransactionCardProps = {
    transactions: Transaction[]
}

export default function TransactionCard({ transactions }: TransactionCardProps) {
  return (
    <div className="bg-white rounded-xl p-8">
      <div className="flex justify-between items-center">
        <p className="text-preset-2">Pots</p>
        <Link
          className="flex items-center gap-2 text-preset-4-rg hover:underline"
          href={"/pots"}
        >
          See Details{" "}
          <span>
            <CaretRightIcon size={16} />
          </span>
        </Link>
      </div>
      <div>
        {transactions.map(({ counterParty, amount, date, type, id }) => (
        <div key={id} className="flex justify-between items-center py-4 border-b border-gray-100">
          <p className="text-preset-4-bd">{counterParty}</p>
          <div className="flex flex-col">
            {type === "expense" ? (
                <p className="text-preset-4-bd">+${amount}</p>
            ) : (
                <p className="text-preset-4-bd">-${amount}</p>
            )}
            <p className="text-preset-5-rg">{date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
