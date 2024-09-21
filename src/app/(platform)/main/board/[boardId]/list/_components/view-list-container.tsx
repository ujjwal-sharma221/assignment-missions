"use client";

import { ListWithCards } from "@/types";
import { ViewListItem } from "./view-list-item";
import { ListForm } from "../../_components/list-form";

interface ViewListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ViewListContainer = ({ data }: ViewListContainerProps) => {
  return (
    <ol className="flex gap-y-3 h-full flex-col">
      {data.map((list) => (
        <ViewListItem data={list} key={list.id} />
      ))}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
