import { z } from "zod";

export const updateCardOrder = z.object({
  boardId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
    }),
  ),
});
