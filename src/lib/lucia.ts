import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { cache } from "react";

import { prisma } from "@/prisma";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "missions-auth-cookie",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return null;

  try {
    const { session, user } = await lucia.validateSession(sessionId);

    if (session && session.fresh) {
      const newSession = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(newSession.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    } else if (!session) {
      const blankSessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes,
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: { name: true, email: true, id: true },
    });

    return dbUser;
  } catch (error) {
    console.error("Error during session validation or user fetching:", error);
    return null;
  }
});
