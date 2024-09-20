"use server";

import { getUser } from "@/lib/lucia";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

import { SafeAction } from "@/lib/use-action";
import { deleteBoardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user) return { error: "Unauhtorized" };

  const { id } = data;

  try {
    await prisma.boards.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete" };
  }

  redirect("/main");
};

export const DeleteBoard = SafeAction(deleteBoardSchema, handler);
