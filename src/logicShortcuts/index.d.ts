export type BooleanOptions = { ifTrue?: unknown; ifFalse?: unknown };
export type ResolveBooleanResult<O extends BooleanOptions, K extends keyof BooleanOptions> = K extends keyof O ? O[K] : never;