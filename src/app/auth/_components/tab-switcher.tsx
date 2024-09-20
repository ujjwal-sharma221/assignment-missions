"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabSwitcherProps = {
  SignUpTab: React.ReactNode;
  SignInTab: React.ReactNode;
};

export const TabSwitcher = (props: TabSwitcherProps) => {
  return (
    <Tabs defaultValue="sign-in" className="">
      <TabsList>
        <TabsTrigger value="sign-in" className="text-black font-semibold">
          Sign In
        </TabsTrigger>
        <TabsTrigger className="text-black font-semibold" value="sign-up">
          Sign Up
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sign-up">{props.SignUpTab}</TabsContent>
      <TabsContent value="sign-in">{props.SignInTab}</TabsContent>
    </Tabs>
  );
};
