import { z } from "zod";

import { createBoard } from "./schema";
import { ActionState } from "@/lib/use-action";
import { Boards } from "@prisma/client";

export type InputType = z.infer<typeof createBoard>;
export type ReturnType = ActionState<InputType, Boards>;
