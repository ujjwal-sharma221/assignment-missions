"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { CardOptions } from "./card-options";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="bg-white flex justify-between truncate border-2 border-transparent hover:border-none border-black py-2 px-3 text-sm rounded-md shadow-sm"
        >
          <div> {data.title}</div>
          <div>
            <CardOptions data={data} />
          </div>
        </div>
      )}
    </Draggable>
  );
};
