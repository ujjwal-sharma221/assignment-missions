"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/lucia";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/prisma";
import { SafeAction } from "@/lib/use-action";
import { createBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getUser();
  if (!user)
    return {
      error: "Unauthorized",
    };

  const userId = user.id;

  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageUsername, imageLinkHTML] =
    image.split("|");
  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUsername ||
    !imageLinkHTML
  )
    return {
      error: "Invalid fields, failed to create board",
    };

  console.log({
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageUsername,
    imageLinkHTML,
  });

  let board;

  try {
    board = await prisma.boards.create({
      data: {
        title,
        userId,
        imageId,
        imageFullUrl,
        imageLinkHTML,
        imageThumbUrl,
        imageUsername,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "failed to create" };
  }

  revalidatePath("/main");
  return { data: board };
};

export const CreateBoard = SafeAction(createBoard, handler);
