import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:divide-opacity-75 transition items-center hidden md:flex">
        <p className="logo-font pb-1 text-lg text-neutral-700 font-semibold">
          Missions
        </p>
      </div>
    </Link>
  );
};
