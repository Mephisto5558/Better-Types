type ISODate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
type ISOTime = `${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}`;
export type ISODateTime = `${ISODate}T${ISOTime}Z`;

export type KeyToString<K extends PropertyKey> = K extends string ? K : K extends number ? `${K}` : never;

export type Split<S extends string, SEP extends string | undefined, L extends number = number, Acc extends string[] = []> = SEP extends unknown
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

type ProbablyDiscordJs = { client: unknown };
type ShouldSkip<T> = [T] extends [object]
  ? T extends ProbablyDiscordJs | GenericFunction | GenericConstructor | { constructor: GenericConstructor }
    ? true
    : false
  : true;

export type _Prettify<T, Deep extends boolean, Depth extends unknown[] = []>
  = ShouldSkip<T> extends true ? T
  : Depth['length'] extends __MAX_PRETTIFY_DEPTH ? T : {
    [K in keyof T]: Deep extends true
      ? _Prettify<T[K], Deep, [...Depth, unknown]>
      : T[K]
  } & {};

export type StripExtension<T extends string, Ext extends string | undefined>
  = Ext extends string
    ? T extends `${infer R}${Ext}`
      ? R
      : T
    : T;

export type AllKeys<T> = T extends unknown ? keyof T : never;

export type AssignThis<F, This> = F extends (...args: infer Args) => infer Return
  ? (this: This, ...args: Args) => Return
  : F;

export type Join<AnArray, T, Sep extends string, ActualSep extends string>
  = [T] extends [never]
    ? ''
    : [AnArray] extends [readonly []]
        ? ''
        : T extends string
          ? string extends Sep
            ? string
            : AnArray extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
              ? JoinTuple<Head, Tail, ActualSep>
              : JoinArrayWithSep<T, ActualSep>
          : string;

type JoinTuple<Head extends string, Tail extends readonly string[], Sep extends string>
  = Tail extends []
    ? Head
    : Concat<Head, Sep, JoinTuple<Tail[0], Tail extends readonly [unknown, ...infer Rest extends readonly string[]] ? Rest : [], Sep>>;

type JoinArrayWithSep<T extends string, Sep extends string>
  = string extends T
    ? string
    : string extends Sep
      ? string
      : [`${T}${Sep}${T}`] extends [T]
          ? T
          : string;

type IsInfiniteLowercase<T extends string> = Lowercase<string> extends T ? true : false;
type IsInfiniteUppercase<T extends string> = Uppercase<string> extends T ? true : false;

type Concat<Head extends string, Sep extends string, Tail extends string>
  = [IsInfiniteLowercase<Head>, IsInfiniteLowercase<Sep>, IsInfiniteLowercase<Tail>] extends [true, true, true]
    ? Lowercase<string>
    : [IsInfiniteUppercase<Head>, IsInfiniteUppercase<Sep>, IsInfiniteUppercase<Tail>] extends [true, true, true]
        ? Uppercase<string>
        : `${Head}${Sep}${Tail}`;

export type Falsy = false | 0 | 0n | '' | null | undefined;