/**
 * Omit keys K from each member of the union type T.
 * This ensures that the omission is applied to each variant in the union.
 */
export type DistributiveOmit<T, K extends keyof T> = T extends any
  ? Omit<T, K>
  : never;
