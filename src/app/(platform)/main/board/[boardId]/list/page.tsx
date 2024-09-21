import { prisma } from "@/prisma";
import { ListWithCards } from "@/types";
import { ViewListContainer } from "./_components/view-list-container";

interface ListPageProps {
  params: { boardId: string };
}

const ListPage = async ({ params }: ListPageProps) => {
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
      <ViewListContainer data={lists} boardId={params.boardId} />
    </div>
  );
};

export default ListPage;
