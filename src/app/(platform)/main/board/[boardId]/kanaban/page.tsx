import { prisma } from "@/prisma";
import { ListContainer } from "../_components/list-container";
import { ListWithCards } from "@/types";

interface KanbanPageProps {
  params: { boardId: string };
}
const KanbanPage = async ({ params }: KanbanPageProps) => {
  const lists: ListWithCards[] = await prisma.list.findMany({
    where: { boardId: params.boardId },
    include: {
      Card: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer data={lists} boardId={params.boardId} />
    </div>
  );
};
export default KanbanPage;
