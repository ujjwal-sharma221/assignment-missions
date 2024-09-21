"use server";

import { getUser } from "@/lib/lucia";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { SafeAction } from "@/lib/use-action";
import { updateListOrderSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user) return { error: "Unauhtorized" };

  const userId = user.id;

  const { items, boardId } = data;
  let lists;

  try {
    const transaction = items.map((list) =>
      prisma.list.update({
        where: {
          id: list.id,
          board: { userId },
        },
        data: {
          order: list.order,
        },
      }),
    );

    lists = await prisma.$transaction(transaction);
  } catch (error) {
    console.error(error);
    return { error: "Failed to reorder" };
  }

  revalidatePath(`/main/board/${boardId}`);
  return { data: lists };
};

export const UpdateListOrder = SafeAction(updateListOrderSchema, handler);
