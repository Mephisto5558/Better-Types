/* eslint-disable-next-line import-x/prefer-default-export -- easier import */
export const globals = Object.freeze(Object.fromEntries([
  'Snowflake',
  'GenericFunction',
  'GenericConstructor',
  'OmitFirstParameters',
  'ReplaceMethods',
  'Prettify',
  'ShallowPrettify',

  // logicShortcuts/normal.ts
  'If',
  'IfD',
  'IfEquals',
  'IfExtends',
  'IfExtendsD',
  'AddIf',
  'Extends',
  'GetAll',
  'And',
  'Or',
  'Not',
  'Match',
  'ExtendsMatch',
  'ExtendsMultiMatch',
  'Fn',
  'IsEmptyArray',
  'LooseOmit',

  // logicShortcuts/strict.ts
  'IfExtendsStrict',
  'IfExtendsStrictD',
  'IfExtendsNever',
  'ExtendsStrict',
  'ExtendsNever',
  'ExtendsMatchStrict',
  'ExtendsMultiMatchStrict',
  'StrictPick',
  'GetAllStrict',
  'StrictOmit',

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