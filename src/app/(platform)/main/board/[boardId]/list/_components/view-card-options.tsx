"use client";

import { Card, Priority } from "@prisma/client";
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
import { Separator } from "@/components/ui/separator";
import { ChangePriorityLow } from "@/actions/change-priority-low";
import { ChangePriorityHigh } from "@/actions/change-priority-high";
import { ChangePriorityMedium } from "@/actions/change-priority-medium";

interface CardOptionProps {
  data: Card;
  priority: Priority;
}

export const ViewCardOptions = ({ data, priority }: CardOptionProps) => {
  const params = useParams();
  const { execute: executeDelete, loading: loadingDelete } = useAction(
    DeleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
      },
      onError: (error) => toast.error(error),
    },
  );

  const { execute: executeLow, loading: loadingLow } = useAction(
    ChangePriorityLow,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" priority changed`);
      },
      onError: (error) => toast.error(error),
    },
  );

  const { execute: executeHigh, loading: loadingHigh } = useAction(
    ChangePriorityHigh,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" priority changed`);
      },
      onError: (error) => toast.error(error),
    },
  );

  const { execute: executeMedium, loading: loadingMedium } = useAction(
    ChangePriorityMedium,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" priority changed`);
      },
      onError: (error) => toast.error(error),
    },
  );

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = params.boardId as string;

    executeDelete({ id, boardId });
  };

  const onChangeLow = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = params.boardId as string;

    executeLow({ id, boardId });
  };

  const onChangeHigh = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = params.boardId as string;

    executeHigh({ id, boardId });
  };

  const onChangeMedium = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = params.boardId as string;

    executeMedium({ id, boardId });
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
            disabled={loadingDelete}
            className="w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Delete this Card
          </Button>
        </form>

        <Separator />

        <div className="text-sm mt-2 font-medium text-center text-neutral-600 pb-4">
          Change Priority
        </div>
        {priority === "Low" ? null : (
          <form action={onChangeLow} className="">
            <input hidden name="id" id="id" value={data.id} />

            <Button
              disabled={loadingLow}
              className="w-full h-auto p-2 px-5 justify-start font-normal text-sm"
              variant="ghost"
            >
              Change to Low
            </Button>
          </form>
        )}

        {priority === "High" ? null : (
          <form action={onChangeHigh} className="">
            <input hidden name="id" id="id" value={data.id} />

            <Button
              disabled={loadingHigh}
              className="w-full h-auto p-2 px-5 justify-start font-normal text-sm"
              variant="ghost"
            >
              Change to High
            </Button>
          </form>
        )}

        {priority === "Medium" ? null : (
          <form action={onChangeMedium} className="">
            <input hidden name="id" id="id" value={data.id} />

            <Button
              disabled={loadingMedium}
              className="w-full h-auto p-2 px-5 justify-start font-normal text-sm"
              variant="ghost"
            >
              Change to Medium
            </Button>
          </form>
        )}
      </PopoverContent>
    </Popover>
  );
};
