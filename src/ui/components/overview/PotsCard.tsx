import { CaretRightIcon, TipJarIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Pot } from "@/lib/types/pot-card";

type PotsCardProps = {
  pots: Pot[];
};

export default function PotsCard({ pots }: PotsCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <p className="text-preset-2">Pots</p>
        <Link
          className="flex items-center gap-2 text-preset-4-rg"
          href={"/pots"}
        >
          See Details{" "}
          <span>
            <CaretRightIcon size={16} />
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-secondary px-4 py-5 rounded-xl flex gap-4 items-center">
          <TipJarIcon size={40} className="text-green" />
          <div className="flex flex-col gap-2">
            <p className="text-preset-4-rg">Total Saved</p>
            <p className="text-preset-1">$850</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {pots.map(({ title, total }) => (
            <div
              key={title}
              className="pl-4 border-l-4 border-green flex flex-col justify-center gap-1"
            >
              <p className="text-preset-5-rg">{title}</p>
              <p className="text-preset-4-bd">${total.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
