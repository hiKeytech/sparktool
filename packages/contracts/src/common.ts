// Shared utility types used across contracts

export type Timestamp = number;

export type WithId<T> = T & { id: string };

export type Nullable<T> = { [K in keyof T]: null | T[K] };
type Prettify<T> = { [K in keyof T]: T[K] } & {};
export type NullableExcept<T, K extends keyof T> = Prettify<
  Nullable<Omit<T, K>> & Pick<T, K>
>;

type Dictionary = Record<string, unknown>;
export type Nullish<T extends Dictionary, Except extends keyof T = never> = {
  [K in keyof T]: [K] extends [Except] ? T[K] : null | T[K];
};

export type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never;

export type OrderByDirection = "asc" | "desc";
export type WhereFilterOp =
  | "<"
  | "<="
  | "=="
  | "!="
  | ">"
  | ">="
  | "array-contains"
  | "array-contains-any"
  | "in"
  | "not-in";

export interface QueryFilters<DocumentType> {
  queryFilter?: Array<{
    field: keyof DocumentType;
    operator: WhereFilterOp;
    value: unknown;
  }>;
  queryOrder?: Array<{
    field: keyof DocumentType;
    value: OrderByDirection;
  }>;
}

export type LogEntry = NullableExcept<
  {
    at: number;
    by: string;
    name: string;
    photoUrl: string;
  },
  "at"
>;
