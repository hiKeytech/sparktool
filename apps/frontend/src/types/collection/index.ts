export type Collection<T> = Array<Omit<T, "id">>;

export interface DocumentReference<T> {
  id: string;
  readonly __type?: T;
}
