import { UserId } from "@/lib/typeid";

import type { Auth } from "../auth/auth";
import type { Logger } from "../logger";

export async function createContext(options: {
  auth: Auth;
  headers: Headers;
  logger: Logger;
}) {
  const session = await options.auth.api.getSession({
    headers: options.headers,
  });

  const userId = session?.user.id ? UserId.parse(session.user.id) : undefined;

  const typedSession = session
    ? {
        ...session,
        user: {
          ...session.user,
          id: userId!,
        },
      }
    : null;

  return {
    session: typedSession,
    logger: options.logger,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
