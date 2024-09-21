"use server";

import { getUser } from "@/lib/lucia";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { SafeAction } from "@/lib/use-action";
import { updateListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user) return { error: "Unauhtorized" };

  const userId = user.id;

  const { title, id, boardId } = data;
  let list;

  try {
    list = await prisma.list.update({
      where: { id, boardId, board: { userId } },
      data: { title },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to update" };
  }

  revalidatePath(`/main/board/${boardId}`);
  return { data: list };
};

export const UpdateList = SafeAction(updateListSchema, handler);
