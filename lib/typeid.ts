import { fromString, getType, TypeID, toUUID, typeid } from "typeid-js";
import { z } from "zod";

const typeIdLength = 26;

export const idTypesMapNameToPrefix = {
  // Auth (Better Auth tables)
  user: "usr",
  session: "ses",
  account: "acc",
  verification: "ver",

  // Add new entity prefixes here:
  // example: "exm",
} as const;

type IdTypesMapNameToPrefix = typeof idTypesMapNameToPrefix;

type IdTypesMapPrefixToName = {
  [K in keyof IdTypesMapNameToPrefix as IdTypesMapNameToPrefix[K]]: K;
};

const idTypesMapPrefixToName = Object.fromEntries(
  Object.entries(idTypesMapNameToPrefix).map(([x, y]) => [y, x])
) as IdTypesMapPrefixToName;

export type IdTypePrefixNames = keyof typeof idTypesMapNameToPrefix;

export type TypeIdString<T extends IdTypePrefixNames> =
  `${(typeof idTypesMapNameToPrefix)[T]}_${string}`;

export const typeIdValidator = <const T extends IdTypePrefixNames>(prefix: T) =>
  z
    .string()
    .startsWith(`${idTypesMapNameToPrefix[prefix]}_`)
    .length(typeIdLength + idTypesMapNameToPrefix[prefix].length + 1)
    .refine(
      (input) => {
        try {
          TypeID.fromString(input).asType(idTypesMapNameToPrefix[prefix]);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: `Invalid ${prefix} TypeID format`,
      }
    ) as z.ZodType<TypeIdString<T>, TypeIdString<T>>;

export const typeIdGenerator = <const T extends IdTypePrefixNames>(prefix: T) =>
  typeid(idTypesMapNameToPrefix[prefix]).toString() as TypeIdString<T>;

export const typeIdFromUuid = <const T extends IdTypePrefixNames>(
  prefix: T,
  uuid: string
) => {
  const actualPrefix = idTypesMapNameToPrefix[prefix];
  return TypeID.fromUUID(actualPrefix, uuid).toString() as TypeIdString<T>;
};

export const typeIdToUuid = <const T extends IdTypePrefixNames>(
  input: TypeIdString<T>
) => {
  const id = fromString(input);
  return {
    uuid: toUUID(id).toString(),
    prefix: getType(id),
  };
};

export const validateTypeId = <const T extends IdTypePrefixNames>(
  prefix: T,
  data: unknown
): data is TypeIdString<T> => typeIdValidator(prefix).safeParse(data).success;

export const inferTypeId = <T extends keyof IdTypesMapPrefixToName>(
  input: `${T}_${string}`
) =>
  idTypesMapPrefixToName[
    TypeID.fromString(input).getType() as T
  ] as unknown as T;

// Exported validators and types
export const UserId = typeIdValidator("user");
export type UserId = z.infer<typeof UserId>;

export const SessionId = typeIdValidator("session");
export type SessionId = z.infer<typeof SessionId>;

export const AccountId = typeIdValidator("account");
export type AccountId = z.infer<typeof AccountId>;

export const VerificationId = typeIdValidator("verification");
export type VerificationId = z.infer<typeof VerificationId>;
