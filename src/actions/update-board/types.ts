import { z } from "zod";
import { Boards } from "@prisma/client";

import { updateBoardSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof updateBoardSchema>;
export type ReturnType = ActionState<InputType, Boards>;
