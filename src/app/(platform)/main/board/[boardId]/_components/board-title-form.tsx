"use client";

import { Boards } from "@prisma/client";
import { useRef, useState, ElementRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/app/(platform)/_components/form-input";
import { useAction } from "@/hooks/use-action";
import { UpdateBoard } from "@/actions/update-board";

interface BoardTitleFormProps {
  data: Boards;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const { execute } = useAction(UpdateBoard, {
    onSuccess: (data) => {
      toast.success(`Board  updated to"${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => toast.error(error),
  });

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id: data.id });
  };

  if (editing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center border-2 border-zinc-600 rounded-md  gap-x-2 p-1"
      >
        <FormInput
          id="title"
          onBlur={onBlur}
          ref={inputRef}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 text-muted-foreground bg-transparent focus-visible::outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant="secondary"
    >
      {title}
    </Button>
  );
};
