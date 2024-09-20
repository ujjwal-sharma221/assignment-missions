"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
  await prisma.boards.delete({ where: { id } });
  revalidatePath("/main");
}
