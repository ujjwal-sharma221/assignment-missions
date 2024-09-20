"use client";

import { Settings2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ActionButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const changePath = (path: string) => {
    const pathParts = pathname.split("/");
    pathParts[pathParts.length - 1] = path;
    const newPath = pathParts.join("/");

    router.push(newPath);
  };
  const [position, setPosition] = useState("Kanaban");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Settings2 className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>View</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem
            onClick={() => changePath("kanaban")}
            className="cursor-pointer"
            value="Kanaban"
          >
            Kanaban
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="cursor-pointer"
            value="list"
            onClick={() => changePath("list")}
          >
            List
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
