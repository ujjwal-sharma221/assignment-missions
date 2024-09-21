"use client";

import { CircleFadingPlus, X } from "lucide-react";
import { useRef, useState, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { ListWrapper } from "./list-wrapper";
import { FormInput } from "@/app/(platform)/_components/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { CreateList } from "@/actions/create-list";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();
  const [editing, setEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") disableEditing();
  };

  const { fieldError, execute } = useAction(CreateList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({ title, boardId });
  };

  if (editing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md space-y-4 shadow-md"
        >
          <FormInput
            placeholder="Enter list title"
            errors={fieldError}
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
          ></FormInput>
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <Button type="submit">Add a list</Button>
            <Button
              className=""
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X className="size-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="font-semibold  bg-[#FAF3F0] w-full rounded-md p-3 flex items-center text-sm"
      >
        <CircleFadingPlus className="size-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
