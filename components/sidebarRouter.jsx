"use client";
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { DashboardIcon } from "@radix-ui/react-icons";
import { BoxIcon, Umbrella, Users2Icon, UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: DashboardIcon,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users2Icon,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: BoxIcon,
    },
  ],
};
export default function SidebarRouter() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {data.navMain.map((item) => (
        <SidebarMenuItem key={item.title}>
          <Link href={item.url}>
            <SidebarMenuButton
              tooltip={item.title}
              className={cn(
                "relative",
                pathname === item.url && "bg-accent text-accent-foreground"
              )}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              {pathname === item.url && (
                <span className="absolute left-0 h-full w-1 bg-primary rounded-r-lg" />
              )}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
