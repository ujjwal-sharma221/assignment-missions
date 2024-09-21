"use server";

import { getUser } from "@/lib/lucia";
import { Priority } from "@prisma/client";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { SafeAction } from "@/lib/use-action";
import { changePriorityHighSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user) return { error: "Unauhtorized" };

  const userId = user.id;

  const { boardId, id } = data;
  let card;

  try {
    card = await prisma.card.update({
      where: { id, list: { board: { userId } } },
      data: { priority: Priority.High },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to change priority" };
  }

  revalidatePath(`/main/board/${boardId}/kanaban`);
  return { data: card };
};

export const ChangePriorityHigh = SafeAction(changePriorityHighSchema, handler);
