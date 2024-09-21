"use server";

import { getUser } from "@/lib/lucia";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { SafeAction } from "@/lib/use-action";
import { deleteCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user) return { error: "Unauhtorized" };

  const userId = user.id;

  const { boardId, id } = data;
  let card;

  try {
    card = await prisma.card.delete({
      where: { id, list: { board: { userId } } },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to delte" };
  }

  revalidatePath(`/main/board/${boardId}/kanaban`);
  return { data: card };
};

export const DeleteCard = SafeAction(deleteCardSchema, handler);
