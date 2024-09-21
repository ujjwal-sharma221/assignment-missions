import { z } from "zod";
import { Card } from "@prisma/client";

import { createCardSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof createCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
