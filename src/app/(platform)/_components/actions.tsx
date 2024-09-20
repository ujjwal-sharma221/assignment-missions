"use client";

import { usePathname } from "next/navigation";
import { ActionButton } from "./action-button";

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
        <button className="">Accounts Button</button>
      </div>
    </div>
  );
};
