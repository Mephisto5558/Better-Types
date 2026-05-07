/* eslint-disable-next-line @typescript-eslint/triple-slash-reference -- required to load before this file when this lib is loaded locally */
/// <reference types="node" />

/* eslint-disable @typescript-eslint/triple-slash-reference, @stylistic/multiline-comment-style
  -- required to load other globals without affecting the global scope */
/// <reference path="./logicShortcuts/normal.d.ts" />
/// <reference path="./logicShortcuts/strict.d.ts" />
/* eslint-enable @typescript-eslint/triple-slash-reference, @stylistic/multiline-comment-style */

/* eslint-disable sonarjs/no-built-in-override */

/* eslint-disable-next-line unicorn/require-module-specifiers -- required */
export {};

type ISODate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
type ISOTime = `${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}`;
type ISODateTime = `${ISODate}T${ISOTime}Z`;

type KeyToString<K extends PropertyKey> = K extends string ? K : K extends number ? `${K}` : never;

type Split<S extends string, SEP extends string | undefined, L extends number = number, Acc extends string[] = []> = SEP extends unknown
  ? [L] extends [Acc['length']] ? Acc
    : SEP extends undefined ? [S]
    : string extends S | SEP ? string[]
    : SEP extends ''
      ? S extends `${infer Head}${infer Tail}`
        ? Split<Tail, SEP, L, [...Acc, Head]>
        : Acc
      : S extends `${infer Head}${SEP}${infer Tail}`
        ? Split<Tail, SEP, L, [...Acc, Head]>
        : [...Acc, S]
  : never;

type ShouldSkip<T> = [T] extends [object]
  ? T extends GenericFunction | GenericConstructor ? true
  : T extends { constructor: { prototype: unknown } }
    ? true
    : false
  : true;

type _Prettify<T, Deep extends boolean, Depth extends unknown[] = []>
  = ShouldSkip<T> extends true ? T
  : Depth['length'] extends __MAX_PRETTIFY_DEPTH ? T : {
    [K in keyof T]: Deep extends true
      ? _Prettify<T[K], Deep, [...Depth, unknown]>
      : T[K]
  } & {};

declare global {
  /** The maximum depth for {@link Prettify}. Change with caution. */
  type __MAX_PRETTIFY_DEPTH = 1;

  // #region Buildins
  /* eslint-disable @typescript-eslint/consistent-type-definitions -- overwriting interfaces */
  namespace NodeJS {
    interface Require {
      /* eslint-disable-next-line @typescript-eslint/prefer-function-type -- overwriting only the function signature */
      (id: string): unknown;
    }
  }

  interface String {
    split(separator?: string, limit: 0): [];
    split<T extends string>(this: T, separator?: undefined, limit?: number): [T];
    split<T extends string, SEP extends string | undefined, L extends number = number>(
      this: T, separator: SEP, limit?: L
    ): Split<T, SEP, L>;

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

  // #endregion Buildins

  type Snowflake = `${bigint}`;

  /* eslint-enable @typescript-eslint/consistent-type-definitions */

  // #region useful Generics
  /* eslint-disable @typescript-eslint/no-explicit-any -- used only as generic constraint */

  /** A function with some parameters and some return type. */
  type GenericFunction<Ret = any> = (...args: any[]) => Ret;

  /** A potentially abstract class or declared class. */
  type GenericConstructor<Ret = object> = { prototype: Ret };

  /* eslint-enable @typescript-eslint/no-explicit-any */

  type OmitFirstParameters<
    T extends GenericFunction, N extends number = 1, Acc extends unknown[] = []
  > = Acc['length'] extends N ? Parameters<T> extends [...Acc, ...infer Rest] ? Rest : never : OmitFirstParameters<T, N, [...Acc, unknown]>;

  /**
   * A stricter version of `Omit` that preserves modifiers better by using a mapped type.
   *
   * {@link https://github.com/microsoft/TypeScript/issues/54451#issue-1732749888 More info} */
  type StrictOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };

  type ReplaceMethod<
    T, K extends keyof T, This,
    Args extends unknown[] = T[K] extends GenericFunction ? Parameters<T[K]> : never
  > = StrictOmit<T, K> & {
    [P in K]: Exclude<T[P], GenericFunction> | (T[P] extends GenericFunction ? (this: This, ...args: Args) => ReturnType<T[P]> : never);
  };

  type Prettify<T> = _Prettify<T, true>;
  type ShallowPrettify<T> = _Prettify<T, false>;
}


declare module 'discord-api-types/v10' {
  export type Snowflake = globalThis.Snowflake;
}