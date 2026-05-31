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