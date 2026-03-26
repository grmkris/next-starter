# Project Index — TODO: Project Name

> Single source of truth for infrastructure, services, and deployment.

## Identifiers

| Service | Identifier |
|---------|-----------|
| GitHub repo | TODO: org/repo-name |
| Vercel project | TODO: project-name |
| Vercel project ID | TODO: prj_xxx |
| Vercel org | TODO: team_xxx |
| Neon project | TODO: project-name (neon-id) |
| Neon branch | production (TODO: br-xxx) |
| Neon region | TODO: AWS region |

## URLs

| Environment | URL |
|-------------|-----|
| Production | TODO: https://project.vercel.app |
| Vercel dashboard | TODO: https://vercel.com/org/project |
| Neon console | TODO: https://console.neon.tech/app/projects/xxx |
| GitHub | TODO: https://github.com/org/repo |

## External Services

| Service | Provider | Package | Notes |
|---------|----------|---------|-------|
| Database | Neon (PostgreSQL 17) | `pg` + `drizzle-orm` | Pooled connection via `-pooler` endpoint |
| Auth | Better Auth | `better-auth` | Email/password + admin plugin |
| Hosting | Vercel | Next.js 16 | Auto-deploy on push to main |
| UI | shadcn/ui | `shadcn` | Tailwind v4 |
| Linting | ultracite | `oxlint` + `oxfmt` | Replaces ESLint/Prettier |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon pooled PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Yes | Auth signing key (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | No | App base URL (default: http://localhost:3000) |

Validated at startup by `server/env.ts` (Zod schema).

## Local Development

```bash
bun run db:start     # PostgreSQL on port 54324
bun run dev          # Next.js on port 3000
bun run db:studio    # Drizzle Studio
```

Docker Compose: PostgreSQL 17 on `localhost:54324` (user: postgres, pass: postgres, db: app)

## Deployment Flow

1. Push to `main` on GitHub
2. Vercel auto-deploys (GitHub integration)
3. Build: `drizzle-kit migrate && next build`
4. Migrations applied against Neon production DB during build
