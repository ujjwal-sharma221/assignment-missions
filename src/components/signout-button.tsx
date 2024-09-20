"use client";

import { Logout } from "@/app/auth/auth.actions";
import { Button } from "./ui/button";

export const SignOutButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button onClick={() => Logout()} className={className}>
      {children}
    </Button>
  );
};
