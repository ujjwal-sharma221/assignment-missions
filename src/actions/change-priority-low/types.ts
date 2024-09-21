import { z } from "zod";
import { Card } from "@prisma/client";

import { changePriorityLowSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof changePriorityLowSchema>;
export type ReturnType = ActionState<InputType, Card>;
