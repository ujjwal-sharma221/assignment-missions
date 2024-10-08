import { z } from "zod";
import { Boards } from "@prisma/client";

import { createBoard } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof createBoard>;
export type ReturnType = ActionState<InputType, Boards>;
