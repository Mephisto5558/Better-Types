import { expectType } from 'tsd';
import type { KeyToString } from '#/utils.js';

declare const
  strictObj: { a: string; b: number; '1': boolean },
  optionalObj: { a: string; b?: number },
  explicitUndefinedObj: { a: string; b: number | undefined },
  pureUndefinedObj: { a: undefined; b: undefined },
  dynamicRecord: Record<string, unknown>;

declare enum Color {
  Red = 'RED',
  Green = 'GREEN',
  /* eslint-disable-next-line @typescript-eslint/no-mixed-enums -- for testing */
  Blue = 0
}


expectType<('a' | 'b' | '1')[]>(Object.keys(strictObj));
expectType<('a' | 'b')[]>(Object.keys(optionalObj));

expectType<KeyToString<keyof typeof Color>[]>(Object.keys(Color));

expectType<(string | number | boolean)[]>(Object.values(strictObj));
expectType<(string | number)[]>(Object.values(optionalObj));

expectType<(Color.Red | Color.Green | Color.Blue)[]>(Object.values(Color));


expectType<['a' | 'b' | '1', string | number | boolean][]>(Object.entries(strictObj));
expectType<['a' | 'b', string | number][]>(Object.entries(optionalObj));
expectType<['Red' | 'Green' | 'Blue', Color.Red | Color.Green | Color.Blue][]>(Object.entries(Color));

declare const emptyObj: Record<never, never>;
expectType<never[]>(Object.keys(emptyObj));
expectType<never[]>(Object.values(emptyObj));
expectType<[never, never][]>(Object.entries(emptyObj));

expectType<string[]>(Object.keys(dynamicRecord));
expectType<unknown[]>(Object.values(dynamicRecord));
expectType<[string, unknown][]>(Object.entries(dynamicRecord));

expectType<(string | number | undefined)[]>(Object.values(explicitUndefinedObj));
expectType<undefined[]>(Object.values(pureUndefinedObj));

expectType<['a' | 'b', string | number | undefined][]>(Object.entries(explicitUndefinedObj));
expectType<['a' | 'b', undefined][]>(Object.entries(pureUndefinedObj));