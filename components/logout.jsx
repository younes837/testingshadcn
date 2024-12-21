"use client";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Logout() {
  const handleSignout = () => {
    signOut({ callbackUrl: "/", redirect: true });
    // console.log("hhhhh");
  };
  return (
    <DropdownMenuItem onClick={handleSignout}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
