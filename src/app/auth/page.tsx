import { redirect } from "next/navigation";

import { getUser } from "@/lib/lucia";
import { SignInForm } from "./_components/signin-form";
import { SignUpForm } from "./_components/signup-form";
import { TabSwitcher } from "./_components/tab-switcher";

const AuthPage = async () => {
  const user = await getUser();
  if (user) return redirect("/main");

  return (
    <div className="relative flex h-screen w-full bg-background">
      <div className="max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
      </div>
    </div>
  );
};
export default AuthPage;
