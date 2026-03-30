import type { Nullish } from "@/types/nullish";

/**
 * nullify(keys)(obj)
 *
 * - `keys` is an array of keys of T that will be set to null.
 * - `obj` MUST contain all remaining keys of T (those NOT in `keys`).
 * - `obj` may provide any subset of T while preserving the same key-level nullification behavior.
 */
export function nullify<T extends object>() {
  return function <D extends Partial<T>>(obj: D) {
    return function <
      const NullKeys extends ReadonlyArray<Exclude<keyof T, keyof D>>,
    >(nullKeys: NullKeys): Nullish<T> {
      return nullKeys.reduce((acc, key) => ({ ...acc, [key]: null }), {
        ...obj,
      } as Nullish<T>);
    };
  };
}
