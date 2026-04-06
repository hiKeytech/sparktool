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
    value: any;
  }>;
  queryOrder?: Array<{
    field: keyof DocumentType;
    value: OrderByDirection;
  }>;
}
