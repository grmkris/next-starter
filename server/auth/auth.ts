import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

import { DB_SCHEMA, type Database } from "@/server/db/db";

export interface AuthConfig {
  db: Database;
  secret: string;
  baseURL: string;
  trustedOrigins?: string[];
}

export const createAuth = (config: AuthConfig) => {
  return betterAuth({
    database: drizzleAdapter(config.db, {
      provider: "pg",
      schema: DB_SCHEMA,
    }),
    secret: config.secret,
    baseURL: config.baseURL,
    trustedOrigins: config.trustedOrigins ?? [config.baseURL],
    emailAndPassword: {
      enabled: true,
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    advanced: {
      database: {
        generateId: false,
      },
      defaultCookieAttributes: {
        sameSite: "lax",
        secure: config.baseURL.startsWith("https"),
        httpOnly: true,
      },
    },
    plugins: [
      admin({
        defaultRole: "user",
      }),
    ],
  });
};

export type Auth = ReturnType<typeof createAuth>;
