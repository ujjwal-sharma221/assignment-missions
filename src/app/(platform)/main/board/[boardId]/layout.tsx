import { getUser } from "@/lib/lucia";
import { prisma } from "@/prisma";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";

const BoardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const user = await getUser();
  if (!user) redirect("/auth");

  const userId = user.id;

  const board = await prisma.boards.findUnique({
    where: { id: params.boardId, userId },
  });
  if (!board) notFound();

  return (
    <div>
      <BoardNavbar data={board} />
      {children}
    </div>
  );
};

export default BoardLayout;
