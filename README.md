# Next Starter

AI-agent-ready Next.js 16 template with Better Auth, oRPC, Drizzle, shadcn/ui, and TypeID.

## Quick Start

```bash
# Clone and install
bun install

# Set up environment
cp .env.example .env.local
# Edit .env.local — set BETTER_AUTH_SECRET (run: openssl rand -base64 32)

# Start local PostgreSQL
bun run db:start

# Generate and apply initial migration
bun run db:generate
bun run db:migrate

# Start dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## AI Agent Setup

This template ships pre-configured for Claude Code:

- **`.claude/CLAUDE.md`** — Context router with stack details and conventions
- **`.claude/PROJECT_INDEX.md`** — Infrastructure facts (fill in after deploying)
- **`.claude/settings.json`** — Pre-approved permissions for common commands
- **`.claude/rules/`** — Path-scoped rules for database, oRPC, and TypeID patterns
- **`.mcp.json`** — 5 MCP servers (context7, shadcn, next-devtools, better-auth, Neon)
- **`skills-lock.json`** — 11 pre-pinned skills for Next.js, React, auth, testing, linting

After deploying, update `.claude/PROJECT_INDEX.md` with your Vercel/Neon/GitHub identifiers.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Runtime | Bun |
| Database | PostgreSQL + Drizzle ORM |
| Auth | Better Auth (email/password + admin) |
| API | oRPC (type-safe RPC) |
| UI | shadcn/ui + Tailwind CSS v4 |
| IDs | TypeID (UUID in DB, typed prefixes in app) |
| Validation | Zod |
| State | TanStack Query |
| Linting | ultracite (oxlint + oxfmt) |

## Adding a Domain

1. Create schema: `server/db/schema/{domain}/{domain}.db.ts` + `{domain}.relations.ts`
2. Export from `server/db/schema/schema.ts`
3. Register TypeID prefix in `lib/typeid.ts`
4. Create service: `server/services/{domain}.service.ts`
5. Create router: `server/api/routers/{domain}.router.ts`
6. Add to `server/api/router.ts`
7. Run `bun run db:generate` to create migration

## Deploy

Push to GitHub with Vercel integration. Set env vars in Vercel dashboard.
