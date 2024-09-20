import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Actions } from "./_components/actions";

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (!user) return redirect("/auth");

  return (
    <main className="p-4">
      <Actions />
      <div className="mt-20"> {children}</div>
    </main>
  );
};

export default PlatformLayout;
