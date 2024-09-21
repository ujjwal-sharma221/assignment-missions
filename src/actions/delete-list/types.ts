import { z } from "zod";
import { List } from "@prisma/client";

import { deleteListSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof deleteListSchema>;
export type ReturnType = ActionState<InputType, List>;
