"use client";

import { XCircle } from "lucide-react";
import { toast } from "sonner";
import { useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { FormInput } from "@/app/(platform)/_components/form-input";
import { useAction } from "@/hooks/use-action";
import { CreateBoard } from "@/actions/create-board";
import { FormPicker } from "./form-picker";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom" | undefined;
  align?: "start" | "center" | "end";
  sideOffSet?: number;
}

export const FormPopover = ({
  children,
  side = "left",
  align,
  sideOffSet = 0,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute, fieldError } = useAction(CreateBoard, {
    onSuccess: (data) => {
      toast.success("Board created");
      closeRef.current?.click();
      router.push(`/board/${data.id}/kanaban`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffSet}
      >
        <div className="text-sm font-semibold text-center  pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <XCircle className="size-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image"></FormPicker>
            <FormInput errors={fieldError} />
            <Button type="submit">Create</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
