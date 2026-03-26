import { ORPCError, os } from "@orpc/server";

import type { UserId } from "@/lib/typeid";

import type { Context } from "./context";

export const o = os.$context<Context>();

export const publicProcedure = o;

const requireAuth = o.middleware(({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED");
  }
  return next({
    context: {
      session: context.session,
      userId: context.session.user.id as UserId,
    },
  });
});

export const protectedProcedure = publicProcedure.use(requireAuth);

export const adminProcedure = protectedProcedure.use(({ context, next }) => {
  if (context.session.user.role !== "admin") {
    throw new ORPCError("FORBIDDEN", {
      message: "Admin access required",
    });
  }
  return next();
});
