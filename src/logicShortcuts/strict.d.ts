/* eslint-disable jsdoc/no-undefined-types -- todo */

import type { BooleanOptions, ResolveBooleanResult } from './index.js';

/* eslint-disable-next-line unicorn/require-module-specifiers -- required */
export {};

declare global {
  /** Non-distributive version of {@link IfExtends}. */
  type IfExtendsStrict<T, Type, Options extends BooleanOptions> = Prettify<
    [T] extends [NoInfer<Type>]
      ? ResolveBooleanResult<Options, 'ifTrue'>
      : ResolveBooleanResult<Options, 'ifFalse'>
  >;

  /** Non-distributive version of {@link Extends}. */
  type ExtendsStrict<T, Type> = [T] extends [NoInfer<Type>] ? true : false;

  /** Non-distributive version of {@link ExtendsMatch}. */
  type ExtendsMatchStrict<T, Cases extends readonly (readonly [unknown, unknown])[], Default = never>
    = Cases extends readonly [readonly [infer Condition, infer Result], ...infer Rest]
      ? [T] extends [NoInfer<Condition>]
          ? Result
          : Rest extends readonly (readonly [unknown, unknown])[]
            ? ExtendsMatchStrict<T, Rest, Default>
            : Default
      : Default;

  /** Non-distributive version of {@link ExtendsMultiMatch}. */
  type ExtendsMultiMatchStrict<
    KEYS extends readonly unknown[],
    Cases extends readonly (readonly [NoInfer<KEYS[number]>, unknown])[]
  > = Prettify<
    { [I in keyof KEYS]: ExtendsMatchStrict<KEYS[I], NoInfer<Cases>> }[number]
  >;

  /**
   * Strict version of {@link Pick}. Validates that all keys in `Target` exist in `Base`.
   * Keys not present in `Base` are resolved to `never`. */
  type StrictPick<Target, Base> = {
    [K in keyof Target]: K extends keyof Base ? Target[K] : never;
  };
}