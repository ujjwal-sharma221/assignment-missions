import { z } from "zod";

export const createCardSchema = z.object({
  title: z
    .string({ required_error: "title is required" })
    .min(1, { message: "Atleast 1 characters are required " }),
  boardId: z.string(),
  listId: z.string(),
});
