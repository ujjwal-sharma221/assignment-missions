import { z } from "zod";

export const changePriorityMediumSchema = z.object({
  boardId: z.string(),
  id: z.string(),
});
