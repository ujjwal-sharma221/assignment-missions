import { z } from "zod";
import { Card } from "@prisma/client";

import { updateCardOrder } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof updateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>;
