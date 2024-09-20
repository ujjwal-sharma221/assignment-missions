import Link from "next/link";
import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col public-font">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 text-sm md:text-base flex items-center border shadow-sm p-4 rounded-full uppercase bg-[#181C14] text-[#ECDFCC]">
          <Medal className="size-6 mr-2" />
          Mange your tasks like completing missions
        </div>
        <h1 className="text-3xl md:text-6xl text-neutral-800 capitalize mb-6 text-center">
          Missions make work more possible!
        </h1>
        <div className="text-2xl underline-highlight">Work forward.</div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        Introducing Missions—because apparently, your to-do list won’t complete
        itself. Need to conquer those impossible tasks? We have got you covered.
        Organize, prioritize, and achieve... or at least try. Download Missions
        and finally get stuff done
      </div>
      <Button className="bg-[#FF6969] mt-6" asChild>
        <Link href="/sign-up">Onboarding</Link>
      </Button>
    </div>
  );
};
export default MarketingPage;
