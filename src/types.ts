import { Prisma } from "@prisma/client";

export type ListWithCards = Prisma.ListGetPayload<{
  include: {
    Card: true;
  };
}>;
