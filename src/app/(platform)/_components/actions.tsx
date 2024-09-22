"use client";

import { LogOut } from "lucide-react";

import { usePathname } from "next/navigation";
import { ActionButton } from "./action-button";
import { Button } from "@/components/ui/button";
import { Logout } from "@/app/auth/auth.actions";

export const Actions = () => {
  const pathname = usePathname();
  return (
    <div className="relative">
      <div className="absolute top-0 right-0 flex space-x-4 p-4">
        {pathname === "/main" ? null : (
          <button className="">
            <ActionButton />
          </button>
        )}
        <Button
          onClick={() => Logout()}
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
        >
          <LogOut className="size-5" />
        </Button>
      </div>
    </div>
  );
};
