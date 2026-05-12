"use client";

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
          <Button>
            + Add New Pot
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {pots.map((pot: any) => (
            <PotCard key={pot.id} pot={pot} />
          ))}
        </div>
      </main>
    </div>
  );
}
