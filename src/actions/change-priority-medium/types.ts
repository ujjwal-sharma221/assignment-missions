import { z } from "zod";
import { Card } from "@prisma/client";

import { changePriorityMediumSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof changePriorityMediumSchema>;
export type ReturnType = ActionState<InputType, Card>;
