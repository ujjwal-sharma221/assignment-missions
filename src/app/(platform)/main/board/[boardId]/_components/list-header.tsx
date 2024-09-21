"use client";

import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { toast } from "sonner";

import { FormInput } from "@/app/(platform)/_components/form-input";
import { useAction } from "@/hooks/use-action";
import { UpdateList } from "@/actions/update-list";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [editing, setEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setEditing(false);
  };

  const { execute } = useAction(UpdateList, {
    onSuccess: (data) => {
      toast.success(`Renamed list title to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => toast.error(error),
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) return disableEditing();

    execute({ title, id, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") formRef.current?.requestSubmit();
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm   font-semibold flex justify-between items-start gap-x-2">
      {editing ? (
        <>
          <form ref={formRef} action={handleSubmit} className="flex-1 px-[2px]">
            <input hidden id="id" name="id" value={data.id} />
            <input hidden id="boardId" name="boardId" value={data.boardId} />
            <FormInput
              ref={inputRef}
              onBlur={onBlur}
              id="title"
              placeholder="Enter list title"
              defaultValue={title}
              className="text-sm px-[7px] py-1 h-7 font-medium hover:border-input border-transparent focus:border-input transition truncate bg-blend-saturation focus:bg-neutral-200"
            />
            <button type="submit" hidden />
          </form>
        </>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full px-2.5 text-sm py-1 h-7  font-semibold"
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
