/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
/* eslint-disable @typescript-eslint/no-magic-numbers, unicorn/prefer-spread, @typescript-eslint/no-unused-vars */

// string#split
const

  // Group A: No Separator
  a1 = ''.split(), // ['']
  a2 = 'abc'.split(), // ['abc']

  // Group B: Empty String Separator
  b1 = ''.split(''), // []
  b2 = 'abc'.split(''), // ['a', 'b', 'c']

  // Group C: String Separator
  c1 = ''.split(','), // ['']
  c2 = ','.split(','), // ['', '']
  c3 = 'abc'.split('b'), // ['a', 'c']
  c4 = 'abcabc'.split('b'), // ['a', 'ca', 'c']
  c5 = 'abc'.split('a'), // ['', 'bc']
  c6 = 'abc'.split('c'), // ['ab', '']
  c7 = 'abc'.split('ab'), // ['', 'c']
  c8 = 'abc'.split('d'), // ['abc']

  // Group D: Limit
  d1 = 'abcabc'.split('b', 1), // ['a']
  d2 = 'abcabc'.split('b', 0), // []
  d3 = 'abcabc'.split('b', 20), // ['a', 'ca', 'c']
  d4 = 'abcabc'.split('b', -2), // ['a', 'ca', 'c']

  // Group E: Generic Types
  e1 = ('' as string).split('g'), // string[]
  e2 = 'abc'.split('' as string), // string[]
  e3 = ('' as string).split('' as string), // string[]
  e4 = 'abc'.split('' as string | undefined), // ['abc'] | string[]

  // Group F: Union Types
  f1 = 'abc'.split('b' as 'b' | undefined), // ['abc'] | ['a', 'c']
  f2 = 'abc'.split('b' as undefined | 'b'), // ['abc'] | ['a', 'c']
  f3 = 'abc'.split('b' as 'b' | 'c'), // ['a', 'c'] | ['ab', '']
  f4 = ('' as 'a_b' | 'c_d').split('_'), // ['a', 'b'] | ['c', 'd']

  // Group G: Advanced Types
  g1 = ('' as `${number}-${number}`).split('-'), // [`${number}`, `${number}`]
  g2 = 'abc'.split(/b/); // string[]