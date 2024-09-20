import "../globals.css";
import { Navbar } from "./_components/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-full">
        <Navbar />
        <main className="pt-40 pb-20 "> {children} </main>
      </div>
    </>
  );
}
