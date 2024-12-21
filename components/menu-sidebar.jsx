"use client";
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import {
  AudioWaveform,
  ChevronsUpDown,
  Command,
  GalleryVerticalEnd,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};
export default function MenuSidebar() {
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    <Link href={"/"}>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <AudioWaveform className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">Acme Corp.</span>
          <span className="truncate text-xs">Startup</span>
        </div>
        {/* <ChevronsUpDown className="ml-auto" /> */}
      </SidebarMenuButton>
    </Link>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent
    //     className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
    //     align="start"
    //     side="bottom"
    //     sideOffset={4}
    //   >
    //     <DropdownMenuLabel className="text-xs text-muted-foreground">
    //       Teams
    //     </DropdownMenuLabel>
    //     {data.teams.map((team, index) => (
    //       <DropdownMenuItem
    //         key={team.name}
    //         onClick={() => setActiveTeam(team)}
    //         className="gap-2 p-2"
    //       >
    //         <div className="flex size-6 items-center justify-center rounded-sm border">
    //           <team.logo className="size-4 shrink-0" />
    //         </div>
    //         {team.name}
    //         <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
    //       </DropdownMenuItem>
    //     ))}
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem className="gap-2 p-2">
    //       <div className="flex size-6 items-center justify-center rounded-md border bg-background">
    //         <Plus className="size-4" />
    //       </div>
    //       <div className="font-medium text-muted-foreground">Add team</div>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
