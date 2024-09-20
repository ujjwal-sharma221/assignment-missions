"use server";

import { getUser } from "@/lib/lucia";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { SafeAction } from "@/lib/use-action";
import { updateBoardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user) return { error: "Unauhtorized" };

  const { title, id } = data;
  let board;

  try {
    board = await prisma.boards.update({
      where: { id },
      data: { title },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to update" };
  }

  revalidatePath(`/main/board/${id}`);
  return { data: board };
};

export const UpdateBoard = SafeAction(updateBoardSchema, handler);
