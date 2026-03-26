import { RPCHandler } from "@orpc/server/fetch";

import { createContext } from "@/server/api/context";
import { appRouter } from "@/server/api/router";
import { auth, db, logger } from "@/server/auth/instance";

const handler = new RPCHandler(appRouter);

async function handleRequest(request: Request) {
  try {
    const context = await createContext({
      auth,
      db,
      headers: request.headers,
      logger,
    });

    const { matched, response } = await handler.handle(request, {
      prefix: "/api/rpc",
      context,
    });

    if (matched) {
      return response;
    }

    return new Response("Not found", { status: 404 });
  } catch (err) {
    logger.error("RPC handler error", err instanceof Error ? err : undefined);
    return new Response("Internal server error", { status: 500 });
  }
}

export const GET = handleRequest;
export const POST = handleRequest;
