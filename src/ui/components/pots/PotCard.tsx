"use client";

import { DotsThreeIcon } from "@phosphor-icons/react";
import { themeColorMap } from "@/lib/theme-colors";
import { Progress } from "@/ui/primitives/Progress";

type PotCardProps = {
  pot: {
    id: string;
    name: string;
    currentAmount: number;
    targetAmount: number;
    theme: string;
  };
};

export default function PotCard({ pot }: PotCardProps) {
  const color = themeColorMap[pot.theme] ?? "#ccc";
  const percentage = Math.min(
    (pot.currentAmount / pot.targetAmount) * 100,
    100,
  );

  return (
    <div className="bg-white rounded-xl p-8 flex flex-col gap-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <p className="text-preset-2">{pot.name}</p>
        </div>
        <button type="button">
          <DotsThreeIcon size={24} className="text-muted-foreground" />
        </button>
      </div>

      {/* Total Saved */}
      <div className="flex justify-between items-center">
        <p className="text-preset-4-rg text-muted-foreground">Total Saved</p>
        <p className="text-preset-1">${pot.currentAmount.toFixed(2)}</p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <Progress
          value={percentage}
          className="h-2 bg-secondary"
          style={{ "--progress-color": color } as React.CSSProperties}
        />
        <div className="flex justify-between items-center">
          <p className="text-preset-5-rg text-muted-foreground">
            {percentage.toFixed(2)}%
          </p>
          <p className="text-preset-5-rg text-muted-foreground">
            Target of ${pot.targetAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="bg-secondary text-preset-4-bd py-4 rounded-xl hover:bg-secondary/80 transition-colors"
        >
          + Add Money
        </button>
        <button
          type="button"
          className="bg-secondary text-preset-4-bd py-4 rounded-xl hover:bg-secondary/80 transition-colors"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}