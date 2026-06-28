import { expectType } from 'tsd';

import type { Split } from '#/utils.js';

declare const
  dynamicString: string,
  lowercaseString: Lowercase<string>;


expectType<'hello'>(('Hello' as const).toLowerCase());
expectType<'HELLO'>(('Hello' as const).toUpperCase());
expectType<''>(('' as const).toLowerCase());

expectType<Lowercase<string>>(dynamicString.toLowerCase());
expectType<Uppercase<string>>(dynamicString.toUpperCase());


expectType<[]>('hello'.split(',', 0));
expectType<[]>(dynamicString.split('abc', 0));

expectType<['hello']>(('hello' as const).split());
expectType<['hello']>(('hello' as const).split());
expectType<[string]>(dynamicString.split());
expectType<[Lowercase<string>]>(lowercaseString.split());


const splitComma = ('a,b,c' as const).split(',');
expectType<Split<'a,b,c', ','>>(splitComma);

const splitDynamicString = dynamicString.split(',');
expectType<Split<string, ','>>(splitDynamicString);

const splitDynamicSep = ('a,b,c' as const).split(dynamicString);
expectType<Split<'a,b,c', string>>(splitDynamicSep);

const splitWithLimit = ('a,b,c' as const).split(',', 2);
expectType<Split<'a,b,c', ',', 2>>(splitWithLimit);

const splitWithDynamicLimit = ('a,b,c' as const).split(',', dynamicString.length);
expectType<Split<'a,b,c', ','>>(splitWithDynamicLimit);