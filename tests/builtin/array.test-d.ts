import { expectType } from 'tsd';

declare const
  stringArray: string[],
  lowercaseArray: Lowercase<string>[],
  mixedTuple: [string, string],
  lowercaseTuple: [Lowercase<string>, Lowercase<string>],
  mixedPatternTuple: [Lowercase<string>, string],
  emptyArray: never[],
  explicitEmptyTuple: [],

  nullableStringArray: (string | undefined)[],
  complexFalsyArray: (number | null | undefined | false)[];

expectType<'a,b'>((['a', 'b'] as const).join(','));
expectType<'ab'>((['a', 'b'] as const).join(''));
expectType<'a,B'>((['a', 'B'] as const).join(','));
expectType<'aab'>((['a', 'b'] as const).join('a'));
expectType<'aAb'>((['a', 'b'] as const).join('A'));
expectType<'a,b,c'>((['a', 'b', 'c'] as const).join(','));

expectType<Lowercase<string>>(lowercaseArray.join(','));
expectType<Lowercase<string>>(lowercaseArray.join(''));
expectType<string>(stringArray.join(','));
expectType<string>(lowercaseArray.join('A'));
expectType<Lowercase<string>>(lowercaseArray.join('a' as Lowercase<string>));
expectType<string>(lowercaseArray.join('a' as string));
expectType<string>(stringArray.join('a' as Lowercase<string>));

expectType<`${string}a${string}`>(mixedTuple.join('a'));
expectType<`${Lowercase<string>}a${string}`>(mixedPatternTuple.join('a'));
expectType<`${Lowercase<string>}a${Lowercase<string>}`>(lowercaseTuple.join('a'));
expectType<string>(lowercaseTuple.join('a' as string));
expectType<Lowercase<string>>(lowercaseTuple.join('a' as Lowercase<string>));

expectType<''>(emptyArray.join(','));
expectType<''>(emptyArray.join(''));
expectType<''>(emptyArray.join('a'));
expectType<''>(explicitEmptyTuple.join('-'));

const readonlyLiteral = ['a', 'b'] as const;
expectType<'a,b'>(readonlyLiteral.join(','));

const readonlyLowercase: readonly Lowercase<string>[] = ['a', 'b'];
expectType<Lowercase<string>>(readonlyLowercase.join(','));

const readonlyEmpty: readonly never[] = [];
expectType<''>(readonlyEmpty.join('X'));


expectType<string[]>(nullableStringArray.filter(Boolean));
expectType<number[]>(complexFalsyArray.filter(Boolean));

const readonlyNullable: readonly (string | null)[] = ['a', null, 'b'];
expectType<string[]>(readonlyNullable.filter(Boolean));

declare const mixedTypesArray: (string | number | undefined)[];
expectType<(string | number)[]>(mixedTypesArray.filter(Boolean));