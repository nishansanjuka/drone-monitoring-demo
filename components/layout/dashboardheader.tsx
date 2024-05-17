"use client";
import Link from "next/link";
import { LineChart, Package2, PanelLeft, Search, icons } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "../ui/button";
import { routes } from "@/constants";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
export default function DashboadHeader() {
  const pathName = usePathname();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:bg-transparent sm:px-6 sm:pb-3">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>

            {routes.map((route) => (
              <Link
                key={`href-${route.href}`}
                href={route.href}
                className={cn(
                  "flex items-center gap-4 px-2.5",
                  pathName === route.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {React.createElement(icons[route.icon], {
                  className: "h-5 w-5",
                })}
                {route.name}
              </Link>
            ))}
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex items-center gap-4 px-2.5",
                pathName === "/dashboard/settings"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LineChart className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className=" w-full flex sm:justify-between items-center justify-end">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            {pathName.split("/").map((route, index) => (
              <div key={`bread-crumb-${route} `} className=" flex items-center">
                {index !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    {index === pathName.split("/").length - 1 ? (
                      <Link
                        href={"#"}
                        className=" capitalize text-foreground font-semibold cursor-default"
                      >
                        {route ? route : "Drone Monitoring System"}
                      </Link>
                    ) : (
                      <Link href={"#"} className=" capitalize cursor-default">
                        {route}
                      </Link>
                    )}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
