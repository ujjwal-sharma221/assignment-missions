"use server";

import { getUser } from "@/lib/lucia";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { SafeAction } from "@/lib/use-action";
import { updateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user) return { error: "Unauhtorized" };

  const userId = user.id;

  const { items, boardId } = data;
  let updatedCards;

  try {
    const transaction = items.map((card) =>
      prisma.card.update({
        where: { id: card.id, list: { board: { userId } } },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    );

    updatedCards = await prisma.$transaction(transaction);
  } catch (error) {
    console.error(error);
    return { error: "Failed to reorder" };
  }

  revalidatePath(`/main/board/${boardId}`);
  return { data: updatedCards };
};

export const UpdateCardOrder = SafeAction(updateCardOrder, handler);
