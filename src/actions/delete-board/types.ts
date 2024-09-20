import { z } from "zod";
import { Boards } from "@prisma/client";

import { deleteBoardSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof deleteBoardSchema>;
export type ReturnType = ActionState<InputType, Boards>;
