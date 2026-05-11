"use client";

import { UserButton } from "@clerk/nextjs";
import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsDownUpIcon,
  ChartDonutIcon,
  HouseIcon,
  ReceiptIcon,
  TipJarIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems: { link: string; Icon: Icon; title: string }[] = [
  { link: "/dashboard", Icon: HouseIcon, title: "Overview" },
  {
    link: "/dashboard/transactions",
    Icon: ArrowsDownUpIcon,
    title: "Transactions",
  },
  { link: "/dashboard/budgets", Icon: ChartDonutIcon, title: "Budgets" },
  { link: "/dashboard/pots", Icon: TipJarIcon, title: "Pots" },
  {
    link: "/dashboard/recurring-bills",
    Icon: ReceiptIcon,
    title: "Recurring Bills",
  },
];

export default function DashNav() {
  const pathname = usePathname();

  return (
    <div className="bg-primary min-h-full w-75 rounded-r-xl flex flex-col">
      <div className="py-10 px-8">
        <Image src={"/logo.svg"} alt="" width={121} height={21} />
      </div>
      <div className="flex flex-col justify-between flex-1 pb-10">
        <nav className="text-preset-3 pr-6">
          {navItems.map(({ link, Icon, title }) => {
            const isActive = pathname === link;
            return (
              <Link
                key={link}
                href={link}
                className={cn(
                  "group flex items-center gap-4 py-4 px-8 rounded-r-xl border-l-4 transition-colors",
                  "text-white border-l-transparent",
                  "hover:bg-secondary hover:text-primary hover:border-l-green",
                  isActive && "bg-secondary text-primary border-l-green",
                )}
              >
                <Icon
                  size={24}
                  weight="fill"
                  className={cn(
                    "transition-colors group-hover:text-green",
                    isActive ? "text-green" : "text-white",
                  )}
                />
                {title}
              </Link>
            );
          })}
        </nav>
        <div className="px-8">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
