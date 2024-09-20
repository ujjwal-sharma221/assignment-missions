"use server";

import { z } from "zod";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";

import { signUpSchema } from "./_components/signup-form";
import { prisma } from "@/prisma";
import { lucia } from "@/lib/lucia";
import { signInSchema } from "./_components/signin-form";
import { redirect } from "next/navigation";

export const SignUp = async (values: z.infer<typeof signUpSchema>) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingUser) return { error: "User already exists", success: false };

    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        hashedPassword,
        name: values.name,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error while creating user!", success: false };
  }
};

export const SignIn = async (values: z.infer<typeof signInSchema>) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: values.email },
    });
    if (!user || !user.hashedPassword) {
      return { success: false, error: "Please check your mail or password" };
    }

    const passwordMatch = await new Argon2id().verify(
      user.hashedPassword,
      values.password,
    );
    if (!passwordMatch)
      return { success: false, error: "Please check your credentials" };

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error while creating user!", success: false };
  }
};

export const Logout = async () => {
  const blankSessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    blankSessionCookie.name,
    blankSessionCookie.value,
    blankSessionCookie.attributes,
  );
  return redirect("/");
};
