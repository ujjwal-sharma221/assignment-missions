"use client";

import { ElementRef, useState, useRef } from "react";
import { ListWithCards } from "@/types"; // ListWithCards has the 'Card' relation included
import { ListHeader } from "../../_components/list-header";
import { cn } from "@/lib/utils";
import { ViewCardItem } from "./view-list-card-item";
import { CardForm } from "../../_components/card-form";
import { Separator } from "@/components/ui/separator";

export const ViewListItem = ({ data }: { data: ListWithCards }) => {
  const [editing, setEditing] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<
    "Low" | "Medium" | "High" | "All"
  >("All");
  const textAreaRef = useRef<ElementRef<"textarea">>(null);

  const disableEditing = () => {
    setEditing(false);
  };

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const filteredCards = data.Card.filter((card) => {
    if (priorityFilter === "All") return true;
    return card.priority === priorityFilter;
  });

  return (
    <li className="shrink-0 h-full w-full select-none rounded-md">
      <div className="w-full rounded-md pb-2">
        <div className="mb-2 pt-2 px-2 text-sm text-muted-foreground font-semibold flex justify-between items-start gap-x-2">
          <label htmlFor="priorityFilter">Filter by Priority:</label>
          <select
            id="priorityFilter"
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(
                e.target.value as "Low" | "Medium" | "High" | "All",
              )
            }
            className="ml-2 p-1 border rounded"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <ListHeader onAddCard={enableEditing} data={data} />
        <ol
          className={cn(
            "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
            filteredCards.length > 0 ? "mt-2" : "",
          )}
        >
          {filteredCards.map((card) => (
            <ViewCardItem key={card.id} data={card} />
          ))}
        </ol>
        <CardForm
          ref={textAreaRef}
          isEditing={editing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          listId={data.id}
        />
      </div>
      <Separator />
    </li>
  );
};
