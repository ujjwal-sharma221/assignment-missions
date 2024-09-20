import { Boards } from "@prisma/client";

import { BoardTitleForm } from "./board-title-form";

interface BoardNavbarProps {
  data: Boards;
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-auto flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
    </div>
  );
};
