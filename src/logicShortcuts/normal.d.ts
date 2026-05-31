import type { BooleanOptions, ResolveBooleanResult } from './index.js';
import type { AllKeys } from '#/utils.js';

/* eslint-disable-next-line unicorn/require-module-specifiers -- required */
export {};

declare global {

  /**
   * Resolves to 'Options.ifTrue` if 'Condition` resolves to `true`,
   * otherwise to `Options.ifFalse`.
   *
   * Defaults to `never` for either result. */
  type If<Condition extends boolean, Options extends BooleanOptions>
    = Condition extends true
      ? ResolveBooleanResult<Options, 'ifTrue'>
      : ResolveBooleanResult<Options, 'ifFalse'>
  ;

  /** Non-Object version of {@link If} to support use of `this`. */
  type IfD<Condition extends boolean, IfTrue, IfFalse> = NoInfer<Condition> extends true ? IfTrue : IfFalse;

  type IfEquals<A, B, Options extends BooleanOptions> = Prettify<
    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- these are nessesary. */
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
      ? ResolveBooleanResult<Options, 'ifTrue'>
      : ResolveBooleanResult<Options, 'ifFalse'>
  >;

  /**
   * Resolves to `Options.ifTrue` if `T` extends `Type`,
   * otherwise to `Options.ifFalse`.
   *
   * Defaults to `never` for either result. */
  type IfExtends<T, Type, Options extends BooleanOptions> = Prettify<
    T extends NoInfer<Type>
      ? ResolveBooleanResult<Options, 'ifTrue'>
      : ResolveBooleanResult<Options, 'ifFalse'>
  >;

  /** Non-Object version of {@link IfExtends} to support use of `this`. */
  type IfExtendsD<T, Type, IfTrue, IfFalse> = T extends NoInfer<Type> ? IfTrue : IfFalse;

  /**
   * Adds `Options.ifTrue` to `Base` if `Condition` resolves to `true`,
   * otherwise adds `Options.ifFalse`.
   *
   * Defaults to `never` for either result. */
  type AddIf<Base, Condition extends boolean, Options extends BooleanOptions> = Prettify<
    NoInfer<Condition> extends true
      ? Base | ResolveBooleanResult<Options, 'ifTrue'>
      : Base | ResolveBooleanResult<Options, 'ifFalse'>
  >;

  /** Resolves to `true` if `T extends Type`, otherwise to `false`. */
  type Extends<T, Type> = T extends NoInfer<Type> ? true : false;

  /** Extract from `T` those types that have might have a property of key `K`. */
  type GetAll<T, K extends AllKeys<T>> = Extract<T, Partial<Record<K, unknown>>>;

  type And<T extends readonly [boolean, boolean, ...boolean[]]>
    = NoInfer<T>[number] extends true ? true : false;

  type Or<T extends readonly [boolean, boolean, ...boolean[]]>
    = true extends NoInfer<T>[number] ? true : false;

  type Not<T extends boolean> = NoInfer<T> extends true ? false : true;

  type Match<Cases extends readonly (readonly [boolean, unknown])[], Default = never>
    = Cases extends readonly [readonly [infer Condition, infer Result], ...infer Rest]
      ? NoInfer<Condition> extends true
        ? Result
        : Rest extends readonly (readonly [boolean, unknown])[]
          ? Match<Rest, Default>
          : Default
      : Default;

  type ExtendsMatch<T, Cases extends readonly (readonly [unknown, unknown])[], Default = never>
    = Cases extends readonly [readonly [infer Condition, infer Result], ...infer Rest]
      ? T extends NoInfer<Condition>
        ? Result
        : Rest extends readonly (readonly [unknown, unknown])[]
          ? ExtendsMatch<T, Rest, Default>
          : Default
      : Default;

  type ExtendsMultiMatch<
    BASE,
    KEYS extends readonly BASE[],
    Cases extends readonly (readonly [BASE, unknown])[]
  > = ShallowPrettify<
    { [I in keyof KEYS]: ExtendsMatch<KEYS[I], NoInfer<Cases>> }[number]
  >;

  type Fn<This, Args extends unknown[], Return> = Prettify<
    NoInfer<This> extends never
      ? (...args: NoInfer<Args>) => NoInfer<Return>
      : (this: This, ...args: NoInfer<Args>) => NoInfer<Return>
  >;

  /**
   * Resolves to `true` if the `Arr`'s length is `0`,
   * `false` if it's not, and `boolean` if we don't know. */
  type IsEmptyArray<Arr extends readonly unknown[]>
    = number extends Arr['length']
      ? boolean
      : [Arr['length']] extends [0] ? true : false;

  /** A loose implementation of {@link StrictOmit} that allows any `PropertyKey`s for `K`. */
  type LooseOmit<T, K extends PropertyKey> = Pick<T, Exclude<keyof T, K>>;
}