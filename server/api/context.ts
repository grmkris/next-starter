import { UserId } from "@/lib/typeid";
import type { Database } from "../db/db";
import type { Auth } from "../auth/auth";
import type { Logger } from "../logger";

export async function createContext(options: {
  auth: Auth;
  headers: Headers;
  logger: Logger;
  db: Database;
}) {
  const session = await options.auth.api.getSession({
    headers: options.headers,
  });

  let userId: ReturnType<typeof UserId.parse> | undefined;
  if (session?.user.id) {
    const result = UserId.safeParse(session.user.id);
    if (result.success) {
      userId = result.data;
    } else {
      options.logger.error("Invalid user ID format in session", { id: session.user.id });
    }
  }

  const typedSession = session && userId
    ? {
        ...session,
        user: {
          ...session.user,
          id: userId,
        },
      }
    : null;

  return {
    session: typedSession,
    logger: options.logger,
    db: options.db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
