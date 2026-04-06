import type { NullableExcept, Nullish } from "../nullish";

export type Log<Tag extends string> = Nullish<{
  [K in Field<Tag>]: K extends `${Tag}ByMeta`
    ? Nullish<{
        name: string;
        photoUrl: string;
      }>
    : K extends `${Tag}At`
    ? number
    : string;
}>;

export type LogEntry = NullableExcept<
  {
    at: number;
    by: string;
    name: string;
    photoUrl: string;
  },
  "at" | "by"
>;

type Field<Tag extends string> = `${Tag}At` | `${Tag}By` | `${Tag}ByMeta`;
