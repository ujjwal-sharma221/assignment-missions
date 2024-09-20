"use client";

import { toast } from "sonner";

import { DeleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { BadgeX, X } from "lucide-react";

export const BoardOptions = ({ id }: { id: string }) => {
  const { execute, loading } = useAction(DeleteBoard, {
    onError: (error) => toast.error(error),
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="outline">
          <BadgeX className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-semibold text-center text-neutral-600 pb-4 ">
          Board Actions
        </div>

        <PopoverClose asChild>
          <Button
            className="size-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="size-3" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          disabled={loading}
          onClick={onDelete}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal"
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
