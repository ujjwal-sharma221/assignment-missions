"use client";

import { ElementRef, forwardRef, useRef } from "react";
import { PlusCircle, X } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { CreateCard } from "@/actions/create-card";
import { toast } from "sonner";
import FormTextarea from "@/components/form-textarea";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldError } = useAction(CreateCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);
        formRef.current?.reset();
      },
      onError: (error) => toast.error(error),
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    const textAreaKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
      e,
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      console.log({ title, listId, boardId });

      execute({ title, listId, boardId });
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    if (isEditing) {
      return (
        <form
          className="m-1 py-0.5 px-1 space-y-4"
          ref={formRef}
          action={onSubmit}
        >
          <FormTextarea
            id="title"
            name="title"
            ref={ref}
            onKeyDown={textAreaKeyDown}
            placeholder="Enter title for this card..."
            errors={fieldError}
          />
          <input hidden id="listId" name="listId" value={listId} />

          <div className="flex items-center gap-x-1">
            <Button type="submit">Add Card</Button>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="size-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2 ">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
        >
          <PlusCircle className="size-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";
