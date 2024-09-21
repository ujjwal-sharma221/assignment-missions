"use client";

import { cn } from "@/lib/utils";
import { Card } from "@prisma/client";
import { ViewCardOptions } from "./view-card-options";

interface CardItemProps {
  data: Card;
}

export const ViewCardItem = ({ data }: CardItemProps) => {
  return (
    <div
      role="button"
      className="bg-white truncate w-full border-[0.4px] border-muted-foreground py-2 px-3 text-sm rounded-md flex justify-between"
    >
      <div> {data.title}</div>
      <div className="flex">
        <div
          className={cn(
            "underline font-bold px-2 flex h-full justify-center text-black items-center rounded-full",
          )}
        >
          {data.priority}
        </div>
        <div className="ml-2">
          <ViewCardOptions data={data} priority={data.priority || "High"} />
        </div>
      </div>
    </div>
  );
};
