---
paths:
  - "server/db/**"
---

# Drizzle + PostgreSQL

- **Engine**: PostgreSQL at `DATABASE_URL`
- **ORM**: Drizzle with `pg` (node-postgres) driver
- **Schema**: domain-based at `server/db/schema/{domain}/`

## Column helpers (`server/db/utils.ts`)

- `typeId("prefix", "column_name")` — uuid column with TypeID encoding/decoding
- `baseEntityFields` — `createdAt` + `updatedAt` (timestamp with timezone, `defaultNow()`)
- `createTimestampField(name?)` — timestamp with timezone helper

## Schema pattern

```typescript
import { pgTable, text } from "drizzle-orm/pg-core";
import { typeIdGenerator, type MyEntityId } from "@/lib/typeid";
import { baseEntityFields, typeId } from "../../utils";

export const myTable = pgTable("my_table", {
  id: typeId("myEntity", "id")
    .primaryKey()
    .$defaultFn(() => typeIdGenerator("myEntity"))
    .$type<MyEntityId>(),
  parentId: typeId("parent", "parent_id")
    .notNull()
    .references(() => parent.id, { onDelete: "cascade" })
    .$type<ParentId>(),
  name: text("name").notNull(),
  ...baseEntityFields,
});
```

## Key conventions

- TypeID stored as native `uuid` type — custom driver encodes/decodes
- Timestamps use `timestamp with timezone` mode `"date"`
- `.$type<BrandedId>()` required on TypeID columns
- Domain-based schema: `server/db/schema/{domain}/` with `.db.ts` (tables) + `.relations.ts`
- Barrel export in `server/db/schema/schema.ts`
