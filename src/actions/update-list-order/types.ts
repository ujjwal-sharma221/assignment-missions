import { z } from "zod";
import { List } from "@prisma/client";

import { updateListOrderSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof updateListOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
