/* eslint-disable sonarjs/no-built-in-override */

/* eslint-disable-next-line unicorn/require-module-specifiers -- required */
export {};

type ISODate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
type ISOTime = `${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}`;
type ISODateTime = `${ISODate}T${ISOTime}Z`;

type KeyToString<K extends PropertyKey> = K extends string ? K : K extends number ? `${K}` : never;

declare global {
  // #region Buildins
  /* eslint-disable @typescript-eslint/consistent-type-definitions */
  namespace NodeJS {
    interface Require {
      /* eslint-disable-next-line @typescript-eslint/prefer-function-type -- overwriting only the function signature */
      (id: string): unknown;
    }
  }

  interface String {
    toLowerCase<T extends string>(this: T): Lowercase<T>;
    toUpperCase<T extends string>(this: T): Uppercase<T>;
  }

  interface BigInt {
    toString(radix?: 10): `${bigint}`;
  }

  interface ObjectConstructor {
    keys<K extends PropertyKey, V>(o: [K, V] extends [never, never] ? never : Record<K, V>): KeyToString<K>[]; // handles things like enums
    keys<T>(o: T): KeyToString<keyof T>[];

    values<K extends PropertyKey, V>(o: [K, V] extends [never, never] ? never : Record<K, V>): V[]; // handles things like enums
    values<T>(o: T): ({
      [K in keyof T]: undefined extends T[K] ? T[K] : Required<T>[K]
    } extends { [_ in keyof T]: infer V } ? V : never)[];

    entries<K extends PropertyKey, V>(o: [K, V] extends [never, never] ? never : Record<K, V>): [KeyToString<K>, V][]; // handles things like enums
    entries<T>(o: T): ({
      [K in keyof T]: undefined extends T[K] ? T[K] : Required<T>[K]
    } extends { [_ in keyof T]: infer V } ? [KeyToString<keyof T>, V] : never)[];
  }

  interface Date {
    /**
     * Give a more precise return type to the method `toISOString()`:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString */
    toISOString(): ISODateTime;
  }

  type Snowflake = `${bigint}`;

  /* eslint-enable @typescript-eslint/consistent-type-definitions */

  // #region useful Generics
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any -- used only as generic constraint */
  type GenericFunction<Ret = any> = (...args: any) => Ret;

  type OmitFirstParameters<
    T extends GenericFunction, N extends number = 1, Acc extends unknown[] = []
  > = Acc['length'] extends N ? Parameters<T> extends [...Acc, ...infer Rest] ? Rest : never : OmitFirstParameters<T, N, [...Acc, unknown]>;

  /**
   * A stricter version of `Omit` that preserves modifiers better by using a mapped type.
   *
   * {@link https://github.com/microsoft/TypeScript/issues/54451#issue-1732749888 More info} */
  type StrictOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };

  type ReplaceMethod<T, K extends keyof T, This, Args extends unknown[] = Parameters<T[K]>> = StrictOmit<T, K> & {
    [P in K]: Exclude<T[P], GenericFunction> | ((this: This, ...args: Args) => ReturnType<Extract<T[P], GenericFunction>>);
  };
}