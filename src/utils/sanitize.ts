import { type Defined, isDefined } from "./is-defined";

export type Sanitize<T> = {
  [K in keyof T]: Defined<T[K]>;
};

export function sanitize<T extends object>(input: T) {
  const result: Partial<Sanitize<T>> = {};

  for (const key in input) {
    const value = input[key];
    if (isDefined(value)) result[key] = value;
  }

  return result as Sanitize<T>;
}
