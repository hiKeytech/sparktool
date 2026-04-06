export type Defined<T> = Exclude<T, null | undefined>;

export function isDefined<T>(value: T): value is Defined<T> {
  return value !== undefined && value !== null;
}
