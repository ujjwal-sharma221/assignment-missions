import { z } from "zod";
import { Card } from "@prisma/client";

import { changePriorityHighSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof changePriorityHighSchema>;
export type ReturnType = ActionState<InputType, Card>;
