import { User2 } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { FormPopover } from "@/components/form-popover";
import { getUser } from "@/lib/lucia";
import { prisma } from "@/prisma";

export const BoardList = async () => {
  const user = await getUser();
  if (!user) redirect("/auth");

  const userId = user.id;

  const boards = await prisma.boards.findMany({
    where: { userId },
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="size-6 mr-2" />
        Your boards
      </div>

      <Separator />

      <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/main/board/${board.id}/kanaban`}
            key={board.id}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-red-200 rounded-sm h-full w-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0  group-hover:bg-black/40 transition"></div>
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffSet={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p>Create new Board</p>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};
