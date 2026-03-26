---
paths:
  - "server/api/**"
---

# oRPC Patterns

## Procedure hierarchy

- `publicProcedure` — no auth required
- `protectedProcedure` — requires valid session (throws `ORPCError("UNAUTHORIZED")`)
- `adminProcedure` — requires admin role (throws `ORPCError("FORBIDDEN")`)

## Router composition

Each file in `server/api/routers/` exports a router -> composed in `server/api/router.ts`.

## Pattern

```typescript
const get = protectedProcedure
  .input(z.object({ id: MyEntityId }))
  .handler(async ({ context, input }) => {
    // context.session, context.userId, context.logger available
    const row = await db.query.myTable.findFirst({ ... });
    if (!row) {
      throw new ORPCError("NOT_FOUND", { message: "Entity not found" });
    }
    return row;
  });
```

## Conventions

- Input validation: inline Zod schemas in `.input(z.object({...}))`
- Object params everywhere — never positional args
- Only throw `ORPCError` for auth/permission/not-found failures
- Context carries session + services (injected via `server/api/context.ts`)
