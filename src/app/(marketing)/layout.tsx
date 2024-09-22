import { redirect } from "next/navigation";

import { getUser } from "@/lib/lucia";
import "../globals.css";
import { Navbar } from "./_components/navbar";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (user) redirect("/main");
  return (
    <>
      <div className="h-full">
        <Navbar />
        <main className="pt-40 pb-20 "> {children} </main>
      </div>
    </>
  );
}
