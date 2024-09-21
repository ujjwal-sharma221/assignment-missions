"use server";

import { getUser } from "@/lib/lucia";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { SafeAction } from "@/lib/use-action";
import { deleteListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user) return { error: "Unauhtorized" };

  const userId = user.id;

  const { boardId, id } = data;
  let list;

  try {
    list = await prisma.list.delete({
      where: { id, boardId, board: { userId } },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete" };
  }

  revalidatePath(`/main/board/${boardId}`);
  return { data: list };
};

export const DeleteList = SafeAction(deleteListSchema, handler);
