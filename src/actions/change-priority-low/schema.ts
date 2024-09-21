import { z } from "zod";

export const changePriorityLowSchema = z.object({
  boardId: z.string(),
  id: z.string(),
});
