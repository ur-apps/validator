import { boolean, messages } from '../src';

describe('Schema: BooleanSchema / method: validate()', () => {
  test('default messages: not strict', () => {
    expect(boolean().validate(true)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean().validate(false)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean().validate(0)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean().validate(1)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean().validate(-1)).toEqual({
      valid: false,
      value: -1,
      error: messages.boolean,
    });

    expect(boolean().validate(2)).toEqual({
      valid: false,
      value: 2,
      error: messages.boolean,
    });

    expect(boolean().validate('')).toEqual({
      valid: false,
      value: '',
      error: messages.boolean,
    });

    expect(boolean().validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: messages.boolean,
    });

    expect(boolean().validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: messages.boolean,
    });

    expect(boolean().validate(Infinity)).toEqual({
      valid: false,
      value: Infinity,
      error: messages.boolean,
    });

    expect(boolean().validate(-Infinity)).toEqual({
      valid: false,
      value: -Infinity,
      error: messages.boolean,
    });

    expect(boolean().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.boolean,
    });

    expect(boolean().validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: messages.boolean,
    });

    expect(boolean().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.boolean,
    });

    expect(boolean().validate([0])).toEqual({
      valid: false,
      value: [0],
      error: messages.boolean,
    });

    expect(boolean().validate([1])).toEqual({
      valid: false,
      value: [1],
      error: messages.boolean,
    });

    expect(boolean().validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: messages.boolean,
    });

    const symbol = Symbol('a');
    expect(boolean().validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: messages.boolean,
    });

    expect(boolean().validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(boolean().validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });
  });

  test('default messages: strict', () => {
    expect(boolean().strict().validate(true)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean().strict().validate(false)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean().strict().validate(0)).toEqual({
      valid: false,
      value: 0,
      error: messages.boolean,
    });

    expect(boolean().strict().validate(1)).toEqual({
      valid: false,
      value: 1,
      error: messages.boolean,
    });

    expect(boolean().strict().validate(-1)).toEqual({
      valid: false,
      value: -1,
      error: messages.boolean,
    });

    expect(boolean().strict().validate(2)).toEqual({
      valid: false,
      value: 2,
      error: messages.boolean,
    });

    expect(boolean().strict().validate('')).toEqual({
      valid: false,
      value: '',
      error: messages.boolean,
    });

    expect(boolean().strict().validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: messages.boolean,
    });

    expect(boolean().strict().validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: messages.boolean,
    });

    expect(boolean().strict().validate(Infinity)).toEqual({
      valid: false,
      value: Infinity,
      error: messages.boolean,
    });

    expect(boolean().strict().validate(-Infinity)).toEqual({
      valid: false,
      value: -Infinity,
      error: messages.boolean,
    });

    expect(boolean().strict().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.boolean,
    });

    expect(boolean().strict().validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: messages.boolean,
    });

    expect(boolean().strict().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.boolean,
    });

    expect(boolean().strict().validate([0])).toEqual({
      valid: false,
      value: [0],
      error: messages.boolean,
    });

    expect(boolean().strict().validate([1])).toEqual({
      valid: false,
      value: [1],
      error: messages.boolean,
    });

    expect(boolean().strict().validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: messages.boolean,
    });

    const symbol = Symbol('a');
    expect(boolean().strict().validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: messages.boolean,
    });

    expect(boolean().strict().validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(boolean().strict().validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });
  });

  test('default messages: required', () => {
    expect(boolean().required().validate(true)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean().required().validate(false)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean().required().validate(1)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean().required().validate(0)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean().required().validate('')).toEqual({
      valid: false,
      value: '',
      error: messages.boolean,
    });

    expect(boolean().required().validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: messages.boolean,
    });

    expect(boolean().required().validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: messages.boolean,
    });

    expect(boolean().required().validate(Infinity)).toEqual({
      valid: false,
      value: Infinity,
      error: messages.boolean,
    });

    expect(boolean().required().validate(-Infinity)).toEqual({
      valid: false,
      value: -Infinity,
      error: messages.boolean,
    });

    expect(boolean().required().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.boolean,
    });

    expect(boolean().required().validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: messages.boolean,
    });

    expect(boolean().required().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.boolean,
    });

    expect(boolean().required().validate([0])).toEqual({
      valid: false,
      value: [0],
      error: messages.boolean,
    });

    expect(boolean().required().validate([1])).toEqual({
      valid: false,
      value: [1],
      error: messages.boolean,
    });

    expect(boolean().required().validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: messages.boolean,
    });

    const symbol = Symbol('a');
    expect(boolean().required().validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: messages.boolean,
    });

    expect(boolean().required().validate(undefined)).toEqual({
      valid: false,
      value: undefined,
      error: messages.required,
    });
    expect(boolean().required().validate(null)).toEqual({
      valid: false,
      value: null,
      error: messages.required,
    });
  });

  test('default messages: isTrue', () => {
    expect(boolean().isTrue().validate(true)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean().isTrue().validate(1)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean().isTrue().validate(false)).toEqual({
      valid: false,
      value: false,
      error: messages.true,
    });

    expect(boolean().isTrue().validate(0)).toEqual({
      valid: false,
      value: 0,
      error: messages.true,
    });

    expect(boolean().isFalse().isTrue().validate(true)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean().isFalse().isTrue().validate(false)).toEqual({
      valid: false,
      value: false,
      error: messages.true,
    });
  });

  test('default messages: isFalse', () => {
    expect(boolean().isFalse().validate(false)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean().isFalse().validate(0)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean().isFalse().validate(true)).toEqual({
      valid: false,
      value: true,
      error: messages.false,
    });

    expect(boolean().isFalse().validate(1)).toEqual({
      valid: false,
      value: 1,
      error: messages.false,
    });

    expect(boolean().isTrue().isFalse().validate(false)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean().isTrue().isFalse().validate(true)).toEqual({
      valid: false,
      value: true,
      error: messages.false,
    });
  });

  test('custom messages: not strict', () => {
    expect(boolean('custom type message').validate(true)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean('custom type message').validate(false)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean('custom type message').validate(0)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean('custom type message').validate(1)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean('custom type message').validate(-1)).toEqual({
      valid: false,
      value: -1,
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate(2)).toEqual({
      valid: false,
      value: 2,
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate('')).toEqual({
      valid: false,
      value: '',
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate(Infinity)).toEqual({
      valid: false,
      value: Infinity,
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate(-Infinity)).toEqual({
      valid: false,
      value: -Infinity,
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate([0])).toEqual({
      valid: false,
      value: [0],
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate([1])).toEqual({
      valid: false,
      value: [1],
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: 'custom type message',
    });

    const symbol = Symbol('a');
    expect(boolean('custom type message').validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: 'custom type message',
    });

    expect(boolean('custom type message').validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(boolean('custom type message').validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });
  });

  test('custom messages: strict', () => {
    expect(boolean('custom type message').strict('custom strict message').validate(true)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean('custom type message').strict('custom strict message').validate(false)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean('custom type message').strict('custom strict message').validate(0)).toEqual({
      valid: false,
      value: 0,
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate(1)).toEqual({
      valid: false,
      value: 1,
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate(-1)).toEqual({
      valid: false,
      value: -1,
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate(2)).toEqual({
      valid: false,
      value: 2,
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate('')).toEqual({
      valid: false,
      value: '',
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate(Infinity)).toEqual({
      valid: false,
      value: Infinity,
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate(-Infinity)).toEqual({
      valid: false,
      value: -Infinity,
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate([0])).toEqual({
      valid: false,
      value: [0],
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate([1])).toEqual({
      valid: false,
      value: [1],
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: 'custom strict message',
    });

    const symbol = Symbol('a');
    expect(boolean('custom type message').strict('custom strict message').validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: 'custom strict message',
    });

    expect(boolean('custom type message').strict('custom strict message').validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(boolean('custom type message').strict('custom strict message').validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });
  });

  test('custom messages: required', () => {
    expect(boolean('custom type message').required('custom required  message').validate(true)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean('custom type message').required('custom required message').validate(false)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean('custom type message').required('custom required message').validate(1)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean('custom type message').required('custom required message').validate(0)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean('custom type message').required('custom required message').validate('')).toEqual({
      valid: false,
      value: '',
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate(Infinity)).toEqual({
      valid: false,
      value: Infinity,
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate(-Infinity)).toEqual({
      valid: false,
      value: -Infinity,
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate([0])).toEqual({
      valid: false,
      value: [0],
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate([1])).toEqual({
      valid: false,
      value: [1],
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: 'custom type message',
    });

    const symbol = Symbol('a');
    expect(boolean('custom type message').required('custom required message').validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: 'custom type message',
    });

    expect(boolean('custom type message').required('custom required message').validate(undefined)).toEqual({
      valid: false,
      value: undefined,
      error: 'custom required message',
    });

    expect(boolean('custom type message').required('custom required message').validate(null)).toEqual({
      valid: false,
      value: null,
      error: 'custom required message',
    });
  });

  test('custom messages: isTrue', () => {
    expect(boolean('custom type message').isTrue('custom isTrue message').validate(true)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean('custom type message').isTrue('custom isTrue message').validate(1)).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(boolean('custom type message').isTrue('custom isTrue message').validate(false)).toEqual({
      valid: false,
      value: false,
      error: 'custom isTrue message',
    });

    expect(boolean('custom type message').isTrue('custom isTrue message').validate(0)).toEqual({
      valid: false,
      value: 0,
      error: 'custom isTrue message',
    });

    expect(
      boolean('custom type message').isFalse('custom isFalse message').isTrue('custom isTrue message').validate(true)
    ).toEqual({
      valid: true,
      value: true,
      error: '',
    });

    expect(
      boolean('custom type message').isFalse('custom isFalse message').isTrue('custom isTrue message').validate(false)
    ).toEqual({
      valid: false,
      value: false,
      error: 'custom isTrue message',
    });
  });

  test('custom messages: isFalse', () => {
    expect(boolean('custom type message').isFalse('custom isFalse message').validate(false)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean('custom type message').isFalse('custom isFalse message').validate(0)).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(boolean('custom type message').isFalse('custom isFalse message').validate(true)).toEqual({
      valid: false,
      value: true,
      error: 'custom isFalse message',
    });

    expect(boolean('custom type message').isFalse('custom isFalse message').validate(1)).toEqual({
      valid: false,
      value: 1,
      error: 'custom isFalse message',
    });

    expect(
      boolean('custom type message').isTrue('custom isTrue message').isFalse('custom isFalse message').validate(false)
    ).toEqual({
      valid: true,
      value: false,
      error: '',
    });

    expect(
      boolean('custom type message').isTrue('custom isTrue message').isFalse('custom isFalse message').validate(true)
    ).toEqual({
      valid: false,
      value: true,
      error: 'custom isFalse message',
    });
  });
});

describe('Schema: BooleanSchema / method: isValid()', () => {
  test('simple validation', () => {
    expect(boolean().isValid(true)).toEqual(true);

    expect(boolean().isValid('invalid data')).toEqual(false);
  });
});

describe('Schema: BooleanSchema / method: cast()', () => {
  test('data casting', () => {
    expect(boolean().cast(true)).toEqual(true);
    expect(boolean().cast(false)).toEqual(false);
    expect(boolean().cast(1)).toEqual(true);
    expect(boolean().cast(0)).toEqual(false);
    expect(() => boolean().strict().cast(0)).toThrow(new TypeError(messages.boolean));
    expect(() => boolean().strict().cast(1)).toThrow(new TypeError(messages.boolean));
    expect(() => boolean().cast(undefined)).toThrow(new TypeError(messages.boolean));
    expect(() => boolean().cast(null)).toThrow(new TypeError(messages.boolean));
    expect(() => boolean().cast('string')).toThrow(new TypeError(messages.boolean));
    expect(() => boolean().cast({})).toThrow(new TypeError(messages.boolean));
  });
});

// describe('Schema: BooleanSchema / method: end()', () => {
//   test('default messages', () => {
//     expect(boolean().end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: messages.boolean,
//       },
//     });

//     expect(boolean().strict().end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: true,
//         message: messages.boolean,
//       },
//     });

//     expect(boolean().required().end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: messages.boolean,
//       },
//       required: {
//         value: true,
//         message: messages.required,
//       },
//     });

//     expect(boolean().notRequired().end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: messages.boolean,
//       },
//       required: {
//         value: false,
//         message: '',
//       },
//     });

//     expect(boolean().required().notRequired().end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: messages.boolean,
//       },
//       required: {
//         value: false,
//         message: '',
//       },
//     });

//     expect(boolean().notRequired().required().end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: messages.boolean,
//       },
//       required: {
//         value: true,
//         message: messages.required,
//       },
//     });

//     expect(boolean().isTrue().end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: messages.boolean,
//       },
//       isTrue: {
//         value: true,
//         message: messages.true,
//       },
//     });

//     expect(boolean().isFalse().end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: messages.boolean,
//       },
//       isFalse: {
//         value: true,
//         message: messages.false,
//       },
//     });

//     expect(boolean().isTrue().isFalse().end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: messages.boolean,
//       },
//       isTrue: {
//         value: false,
//         message: messages.true,
//       },
//       isFalse: {
//         value: true,
//         message: messages.false,
//       },
//     });

//     expect(boolean().isFalse().isTrue().end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: messages.boolean,
//       },
//       isFalse: {
//         value: false,
//         message: messages.false,
//       },
//       isTrue: {
//         value: true,
//         message: messages.true,
//       },
//     });
//   });

//   test('custom messages', () => {
//     expect(boolean('custom type message').end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: 'custom type message',
//       },
//     });

//     expect(boolean('custom type message').strict('custom strict message').end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: true,
//         message: 'custom strict message',
//       },
//     });

//     expect(boolean('custom type message').required('custom requred message').end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: 'custom type message',
//       },
//       required: {
//         value: true,
//         message: 'custom requred message',
//       },
//     });

//     expect(boolean('custom type message').notRequired('custom not requred message').end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: 'custom type message',
//       },
//       required: {
//         value: false,
//         message: 'custom not requred message',
//       },
//     });

//     expect(
//       boolean('custom type message').required('custom requred message').notRequired('custom not requred message').end()
//     ).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: 'custom type message',
//       },
//       required: {
//         value: false,
//         message: 'custom not requred message',
//       },
//     });

//     expect(
//       boolean('custom type message').notRequired('custom not requred message').required('custom requred message').end()
//     ).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: 'custom type message',
//       },
//       required: {
//         value: true,
//         message: 'custom requred message',
//       },
//     });

//     expect(boolean('custom type message').isTrue('custom isTrue message').end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: 'custom type message',
//       },
//       isTrue: {
//         value: true,
//         message: 'custom isTrue message',
//       },
//     });

//     expect(boolean('custom type message').isFalse('custom isFalse message').end()).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: 'custom type message',
//       },
//       isFalse: {
//         value: true,
//         message: 'custom isFalse message',
//       },
//     });

//     expect(
//       boolean('custom type message').isTrue('custom isTrue message').isFalse('custom isFalse message').end()
//     ).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: 'custom type message',
//       },
//       isTrue: {
//         value: false,
//         message: 'custom isTrue message',
//       },
//       isFalse: {
//         value: true,
//         message: 'custom isFalse message',
//       },
//     });

//     expect(
//       boolean('custom type message').isFalse('custom isFalse message').isTrue('custom isTrue message').end()
//     ).toEqual({
//       type: {
//         value: 'boolean',
//         strict: false,
//         message: 'custom type message',
//       },
//       isFalse: {
//         value: false,
//         message: 'custom isFalse message',
//       },
//       isTrue: {
//         value: true,
//         message: 'custom isTrue message',
//       },
//     });
//   });
// });
