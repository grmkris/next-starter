import { customType, timestamp } from "drizzle-orm/pg-core";

import {
  type IdTypePrefixNames,
  type TypeIdString,
  typeIdFromUuid,
  typeIdToUuid,
} from "@/lib/typeid";

/**
 * TypeID column type generator that stores as UUID in DB for performance
 * while providing type-safe TypeID strings in application code
 */
export const typeId = <const T extends IdTypePrefixNames>(
  prefix: T,
  columnName: string
) =>
  customType<{
    data: TypeIdString<T>;
    driverData: string;
  }>({
    dataType() {
      return "uuid";
    },
    fromDriver(input: string): TypeIdString<T> {
      return typeIdFromUuid(prefix, input);
    },
    toDriver(input: TypeIdString<T>): string {
      return typeIdToUuid(input).uuid;
    },
  })(columnName);

/**
 * Creates a timestamp field with timezone support
 */
export const createTimestampField = (name?: string) => {
  if (!name) {
    return timestamp({ withTimezone: true, mode: "date" });
  }
  return timestamp(name, { withTimezone: true, mode: "date" });
};

/**
 * Standard entity fields for createdAt/updatedAt with auto-update
 */
export const baseEntityFields = {
  createdAt: createTimestampField("created_at").defaultNow().notNull(),
  updatedAt: createTimestampField("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};
