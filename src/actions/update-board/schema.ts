import { z } from "zod";

export const updateBoardSchema = z.object({
  title: z
    .string({ required_error: "title is required" })
    .min(3, { message: "Atleast 3 characters are required " }),
  id: z.string(),
});
