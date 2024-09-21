import { z } from "zod";
import { Card } from "@prisma/client";

import { deleteCardSchema } from "./schema";
import { ActionState } from "@/lib/use-action";

export type InputType = z.infer<typeof deleteCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
