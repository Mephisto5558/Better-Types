import type { BooleanOptions, ResolveBooleanResult } from './index.js';
import type { AllKeys } from '#/utils.js';

/* eslint-disable-next-line unicorn/require-module-specifiers -- required */
export {};

declare global {
  /** Non-distributive version of {@link IfExtends}. */
  type IfExtendsStrict<T, Type, Options extends BooleanOptions> = Prettify<
    [T] extends [NoInfer<Type>]
      ? ResolveBooleanResult<Options, 'ifTrue'>
      : ResolveBooleanResult<Options, 'ifFalse'>
  >;

  /** Non-Object version of {@link IfExtendsStrict} to support use of `this`. */
  type IfExtendsStrictD<T, Type, IfTrue, IfFalse>
    = [T] extends [NoInfer<Type>] ? IfTrue : IfFalse;

  /** Shortcut of {@link IfExtendsStrict} to check if a type extends never. */
  type IfExtendsNever<T, Options extends BooleanOptions> = [T] extends [never]
    ? ResolveBooleanResult<Options, 'ifTrue'>
    : ResolveBooleanResult<Options, 'ifFalse'>;

  /** Non-distributive version of {@link Extends}. */
  type ExtendsStrict<T, Type> = [T] extends [NoInfer<Type>] ? true : false;

  /** Shortcut of {@link ExtendsStrict} to check if a type extends never. */
  type ExtendsNever<T> = [T] extends [never] ? true : false;

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
    BASE,
    KEYS extends readonly BASE[],
    Cases extends readonly (readonly [BASE, unknown])[]
  > = Prettify<
    { [I in keyof KEYS]: ExtendsMatchStrict<KEYS[I], NoInfer<Cases>> }[number]
  >;

  /**
   * Strict version of {@link Pick}. Validates that all keys in `Target` exist in `Base`.
   * Keys not present in `Base` are resolved to `never`. */
  type StrictPick<Target, Base> = {
    [K in keyof Target]: K extends keyof Base ? Target[K] : never;
  };

  /** Strict Version of {@link GetAll} that does not allow `K` to be optional. */
  type GetAllStrict<T, K extends AllKeys<T>> = Extract<T, Record<K, unknown>>;

  // /**
  //  * A stricter version of `Omit` that preserves modifiers better by using a mapped type.
  //  *
  //  * {@link https://github.com/microsoft/TypeScript/issues/54451#issue-1732749888 More info} */
  // type StrictOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };

  /** A stricter version of `Omit` that keeps interfaces' identity using `Pick` and `Exclude`. */
  type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
}