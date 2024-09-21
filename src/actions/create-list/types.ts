import { z } from "zod";
import { List } from "@prisma/client";

import { createListSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof createListSchema>;
export type ReturnType = ActionState<InputType, List>;
