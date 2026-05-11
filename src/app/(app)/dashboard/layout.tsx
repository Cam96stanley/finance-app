import DashNav from "@/ui/components/DashNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full w-full">
      <DashNav />
      <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
    </div>
  );
}
