import { RPCHandler } from "@orpc/server/fetch";

import { createContext } from "@/server/api/context";
import { appRouter } from "@/server/api/router";
import { auth, logger } from "@/server/auth/instance";

const handler = new RPCHandler(appRouter);

async function handleRequest(request: Request) {
  const context = await createContext({
    auth,
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
}

export const GET = handleRequest;
export const POST = handleRequest;
