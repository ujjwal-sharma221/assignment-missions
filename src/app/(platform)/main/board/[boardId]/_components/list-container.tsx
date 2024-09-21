"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { reorder } from "@/lib/utils";
import { useAction } from "@/hooks/use-action";
import { UpdateListOrder } from "@/actions/update-list-order";
import { UpdateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  const { execute: executeUpdateListOrder } = useAction(UpdateListOrder, {
    onSuccess: () => toast.success("List reordered"),
    onError: (error) => toast.error(error),
  });
  const { execute: executeUpdateCardOrder } = useAction(UpdateCardOrder, {
    onSuccess: () => toast.success("card reordered"),
    onError: (error) => toast.error(error),
  });
  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const OnDragEnd = (res: DropResult) => {
    const { destination, source, type } = res;
    if (!destination) return;

    // Dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // List is moved
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    // Card is moved
    if (type === "card") {
      const newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destList) return;

      // check if card exist on the source and destination list
      if (!sourceList.Card) sourceList.Card = [];
      if (!destList.Card) destList.Card = [];

      // moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.Card,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.Card = reorderedCards;
        setOrderedData(newOrderedData);
        executeUpdateCardOrder({ boardId, items: reorderedCards });
      } else {
        // card is moved to another list
        const [movedCard] = sourceList.Card.splice(source.index, 1);
        movedCard.listId = destination.droppableId;

        destList.Card.splice(destination.index, 0, movedCard);
        sourceList.Card.forEach((card, idx) => {
          card.order = idx;
        });

        destList.Card.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({ boardId, items: destList.Card });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={OnDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, idx) => (
              <ListItem key={list.id} index={idx} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
