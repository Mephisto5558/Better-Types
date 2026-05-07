/* eslint-disable-next-line import-x/prefer-default-export */
export const globals = Object.freeze(Object.fromEntries([
  'Snowflake',
  'GenericFunction',
  'GenericConstructor',
  'OmitFirstParameters',
  'StrictOmit',
  'ReplaceMethod',
  'Prettify',
  'ShallowPrettify',

  // logicShortcuts/normal.ts
  'If',
  'IfExtends',
  'AddIf',
  'Extends',
  'And',
  'Or',
  'Not',
  'Match',
  'ExtendsMatch',
  'ExtendsMultiMatch',
  'Fn',
  'IsEmptyArray',

  // logicShortcuts/strict.ts
  'IfExtendsStrict',
  'ExtendsStrict',
  'ExtendsMatchStrict',
  'ExtendsMultiMatchStrict',
  'StrictPick',

  // better-typescript-lib
  'JSONPrimitive',
  'JSONComposite',
  'JSONValueF',
  'JSONValue',
  'JSONObject',
  'JSONHolder',
  'ToJSON',
  'SomeExtends',

  // "SomeFunction", // use GenericFunction instead
  'SomeConstructor',
  'UndefinedDomain',
  'StringifyResultT',
  'StringifyResult'
].map(e => [e, 'readonly'])));