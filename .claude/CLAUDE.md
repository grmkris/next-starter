## Infrastructure

See `PROJECT_INDEX.md` for all service IDs, URLs, env vars, and deployment details.

## Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Runtime**: Bun
- **Database**: PostgreSQL with Drizzle ORM (node-postgres driver)
- **Auth**: Better Auth (email/password + admin plugin)
- **API**: oRPC (type-safe RPC with context injection)
- **UI**: shadcn/ui, Tailwind CSS v4, Lucide icons
- **IDs**: TypeID (UUID in DB, typed prefixes in app code)
- **Validation**: Zod
- **State**: TanStack Query
- **Linting**: ultracite (oxlint + oxfmt) — NO ESLint/Prettier

## Commands

| Command | What |
|---------|------|
| `bun run dev` | Dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run typecheck` | TypeScript check |
| `bun run fix:unsafe` | Auto-fix lint + format |
| `bun run db:generate` | Generate Drizzle migrations |
| `bun run db:migrate` | Apply migrations |
| `bun run db:start` | Start PostgreSQL (Docker) |
| `bun run db:studio` | Drizzle Studio UI |

**NEVER auto-run:** db:push (use generate + migrate instead)

## Architecture

Single Next.js app:

- `app/(app)/*` — Protected routes (auth guard in layout)
- `app/(public)/*` — Public routes (login, onboarding)
- `app/api/rpc/[...rest]` — oRPC API endpoint
- `app/api/auth/[...all]` — Better Auth endpoint

### Directory Structure

- `app/` — Next.js routes (App Router)
- `components/` — React components (`ui/` for shadcn)
- `lib/` — Shared utilities (typeid, orpc client, constants, types)
- `hooks/` — React hooks
- `server/` — Server-side code
  - `db/` — Drizzle schema + connection
  - `auth/` — Better Auth config + singleton instance
  - `api/` — oRPC context, procedures, routers
  - `services/` — Business logic (factory pattern)
  - `logger.ts` — Logger factory

## Key Patterns

1. **TypeID**: UUIDs stored in DB, typed strings in app (`usr_xxx`). Register in `lib/typeid.ts`.
2. **Factory services**: `createXxxService({ db, logger })` — object params, DI for testability.
3. **Object params**: ALL functions use `(props: { ... })` pattern, never positional args.
4. **oRPC procedures**: `publicProcedure` -> `protectedProcedure` (auth) -> `adminProcedure` (admin role).
5. **Context injection**: Services injected via oRPC context, created once in `server/auth/instance.ts`.
6. **Domain schemas**: `server/db/schema/{domain}/` — `.db.ts` (tables) + `.relations.ts`.

## Context Router

- Product specification: `SPEC.md`
- Infrastructure: `.claude/PROJECT_INDEX.md`
- Database conventions: `.claude/rules/database-postgres.md`
- oRPC patterns: `.claude/rules/orpc.md`
- TypeID conventions: `.claude/rules/typeid.md`
