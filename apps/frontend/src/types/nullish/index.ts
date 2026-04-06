import type { Dictionary } from "../dictionary";

export type Nullable<T> = { [K in keyof T]: null | T[K] };
export type NullableExcept<T, K extends keyof T> = Prettify<
  Nullable<Omit<T, K>> & Pick<T, K>
>;

export type Nullish<T extends Dictionary, Except extends keyof T = never> = {
  [K in keyof T]: [K] extends [Except] ? T[K] : null | T[K];
};

export type Prettify<T> = { [K in keyof T]: T[K] } & {};
