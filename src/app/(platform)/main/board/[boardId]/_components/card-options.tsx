"use client";

import { Card } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { DeleteCard } from "@/actions/delete-card";

interface CardOptionProps {
  data: Card;
}

export const CardOptions = ({ data }: CardOptionProps) => {
  const params = useParams();
  const { execute, loading } = useAction(DeleteCard, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
    },
    onError: (error) => toast.error(error),
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = params.boardId as string;

    execute({ id, boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="size-auto p-2" variant="ghost">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Card Actions
        </div>

        <PopoverClose asChild>
          <Button
            className="size-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <form action={onDelete} className="mt-2">
          <input hidden name="id" id="id" value={data.id} />

          <Button
            disabled={loading}
            className="w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Delete this Card
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
