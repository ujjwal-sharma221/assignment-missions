import { z } from "zod";

export const createBoard = z.object({
  title: z.string({ required_error: "Title is required" }).min(3, {
    message: "The title of the board should be atleast 3 characters long",
  }),
  image: z.string({ required_error: "Title is required" }),
});
