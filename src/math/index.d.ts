type BuildArray<L extends number, Acc extends unknown[] = []>
  = Acc['length'] extends L
    ? Acc
    : BuildArray<L, [...Acc, unknown]>;

/* eslint-disable-next-line unicorn/require-module-specifiers -- required */
export {};

declare global {
  type Add<A extends number, N extends number>
    = ([...BuildArray<A>, ...BuildArray<N>]['length']) & number;

  type Subtract<A extends number, N extends number>
    = BuildArray<A> extends [...BuildArray<N>, ...infer Rest]
      ? Rest['length']
      : never;

  type Multiply<
    A extends number, B extends number,
    Counter extends unknown[] = BuildArray<B>,
    Acc extends unknown[] = []
  > = Counter['length'] extends 0
    ? Acc['length']
    : Multiply<
      A, B,
      Counter extends [unknown, ...infer Rest] ? Rest : [],
      [...Acc, ...BuildArray<A>]
    >;

  type Divide<
    A extends number, B extends number,
    Current extends unknown[] = BuildArray<A>,
    Counter extends unknown[] = []
  > = B extends 0
    ? never
    : Current extends [...BuildArray<B>, ...infer Rest]
      ? Divide<A, B, Rest, [...Counter, unknown]>
      : Counter['length'] & number;
}