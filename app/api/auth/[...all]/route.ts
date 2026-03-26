import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/server/auth/instance";

export const { GET, POST } = toNextJsHandler(auth);
