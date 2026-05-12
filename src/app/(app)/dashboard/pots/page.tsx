"use client";

import { TipJarIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/ui/components/Loading";
import PotCard from "@/ui/components/pots/PotCard";
import { Button } from "@/ui/primitives/Button";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["pots"],
    queryFn: async () => {
      const res = await fetch("/api/pots");
      return res.json();
    },
  });

  if (isLoading) return <Loading />;

  const pots = data ?? [];

  return (
    <div>
      <main className="px-10 py-8">
        <div className="flex justify-between">
          <h1 className="text-preset-1 pb-8">Pots</h1>
          <Button>+ Add New Pot</Button>
        </div>
        {pots.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-2 text-muted-foreground">
            <TipJarIcon size={48} />
            <p className="text-preset-2 text-foreground">No pots yet</p>
            <p className="text-preset-4-rg">
              Create a pot to start saving towards your goals
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {pots.map((pot: any) => (
              <PotCard key={pot.id} pot={pot} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
