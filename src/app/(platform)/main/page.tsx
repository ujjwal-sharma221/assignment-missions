import { Suspense } from "react";
import { BoardList } from "../_components/board-list";
import { Blend } from "lucide-react";

const MainPage = async () => {
  return (
    <div className="w-full mb-20">
      <div className="px-2 md:px-4">
        <Suspense
          fallback={
            <div className="h-screen w-full flex items-center justify-center">
              <Blend className="size-4 animate-spin" />
            </div>
          }
        >
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};
export default MainPage;
