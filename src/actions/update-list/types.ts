import { z } from "zod";
import { List } from "@prisma/client";

import { updateListSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof updateListSchema>;
export type ReturnType = ActionState<InputType, List>;
