"use server";

import { getUser } from "@/lib/lucia";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { SafeAction } from "@/lib/use-action";
import { createCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user) return { error: "Unauhtorized" };

  const userId = user.id;

  const { title, boardId, listId } = data;
  let card;

  try {
    const list = await prisma.list.findUnique({
      where: { id: listId, board: { userId } },
    });
    if (!list) return { error: "List not found" };

    const lastCard = await prisma.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await prisma.card.create({
      data: { title, listId, order: newOrder },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to create" };
  }

  revalidatePath(`/main/board/${boardId}/kanaban`);
  return { data: card };
};

export const CreateCard = SafeAction(createCardSchema, handler);
