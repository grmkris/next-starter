import { createDb } from "@/server/db/db";
import { env } from "@/server/env";
import { createLogger } from "@/server/logger";

import { createAuth } from "./auth";

const logger = createLogger("app");

export const db = createDb({
  databaseUrl: env.DATABASE_URL,
});

export const auth = createAuth({
  db,
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
});

export { logger };
