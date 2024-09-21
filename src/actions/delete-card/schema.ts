import { z } from "zod";

export const deleteCardSchema = z.object({
  boardId: z.string(),
  id: z.string(),
});
