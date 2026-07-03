declare global {
  interface Map<K, V> {
    getOrInsert(key: K, value: V): V;
    getOrInsertComputed(key: K, callback: (key: K) => V): V;
  }

  interface IteratorHelper<T> extends Iterator<T, undefined, unknown> {
    [Symbol.iterator](): IteratorHelper<T>;
  }

  interface IteratorConstructor {
    concat<T extends readonly unknown[]>(...iterables: { [K in keyof T]: Iterable<T[K]> }): IteratorHelper<T[number]>;
  }
}