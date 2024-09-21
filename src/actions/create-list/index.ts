"use server";

import { getUser } from "@/lib/lucia";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { SafeAction } from "@/lib/use-action";
import { createListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user) return { error: "Unauhtorized" };

  const userId = user.id;

  const { title, boardId } = data;
  let list;

  try {
    const board = await prisma.boards.findUnique({
      where: { id: boardId, userId },
    });
    if (!board) return { error: "Board not found" };

    const lastList = await prisma.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await prisma.list.create({
      data: { title, boardId, order: newOrder },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to create" };
  }

  revalidatePath(`/main/board/${boardId}`);
  return { data: list };
};

export const CreateList = SafeAction(createListSchema, handler);
