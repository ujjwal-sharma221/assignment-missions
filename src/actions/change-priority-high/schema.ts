import { z } from "zod";

export const changePriorityHighSchema = z.object({
  boardId: z.string(),
  id: z.string(),
});
