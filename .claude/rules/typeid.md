---
paths:
  - "lib/typeid*"
  - "server/db/schema/**"
  - "server/db/utils*"
---

# TypeID Convention

All database primary keys use TypeID. Never use raw string/uuid columns.

## Adding a new entity

1. Register prefix in `lib/typeid.ts`:
   - Add to `idTypesMapNameToPrefix`: `myEntity: "mye"` (3-char prefix)
   - Export validator: `export const MyEntityId = typeIdValidator("myEntity")`
   - Export type: `export type MyEntityId = z.infer<typeof MyEntityId>`

2. In schema file, use the column helper:
   ```typescript
   typeId("myEntity", "id")
     .primaryKey()
     .$defaultFn(() => typeIdGenerator("myEntity"))
     .$type<MyEntityId>()
   ```

3. For foreign keys:
   ```typescript
   typeId("user", "user_id")
     .notNull()
     .references(() => user.id, { onDelete: "cascade" })
     .$type<UserId>()
   ```

## Column helpers

Located in `server/db/utils.ts`:
- `typeId(prefix, columnName)` — uuid column with TypeID encoding/decoding
- `baseEntityFields` — createdAt + updatedAt
