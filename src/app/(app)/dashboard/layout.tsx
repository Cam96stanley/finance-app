import DashNav from "@/ui/components/DashNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <DashNav />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
