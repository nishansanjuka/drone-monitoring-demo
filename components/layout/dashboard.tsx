import { cn } from "@/lib/utils";
import DashboardAside from "./dashboard-aside";
import DashboadHeader from "./dashboardheader";

export function Dashboard({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string | undefined;
}>) {
  return (
    <main
      className={cn("flex min-h-screen w-full flex-col", className)}
    >
      <DashboardAside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboadHeader />
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </div>
      </div>
    </main>
  );
}
