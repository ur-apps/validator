import { messages, string } from '../src';

const oneOfList = ['test1', 'test2', 'test3', '123'];

describe('Schema: StringSchema / method: validate()', () => {
  test('default messages: not strict', () => {
    expect(string().validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string().validate(0)).toEqual({
      valid: true,
      value: '0',
      error: '',
    });

    expect(string().validate(123)).toEqual({
      valid: true,
      value: '123',
      error: '',
    });

    expect(string().validate(-10)).toEqual({
      valid: true,
      value: '-10',
      error: '',
    });

    expect(string().validate(Infinity)).toEqual({
      valid: true,
      value: 'Infinity',
      error: '',
    });

    expect(string().validate(-Infinity)).toEqual({
      valid: true,
      value: '-Infinity',
      error: '',
    });

    expect(string().validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: messages.string,
    });

    expect(string().validate(true)).toEqual({
      valid: false,
      value: true,
      error: messages.string,
    });

    expect(string().validate(false)).toEqual({
      valid: false,
      value: false,
      error: messages.string,
    });

    expect(string().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.string,
    });

    expect(string().validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: messages.string,
    });

    expect(string().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.string,
    });

    expect(string().validate([0])).toEqual({
      valid: false,
      value: [0],
      error: messages.string,
    });

    expect(string().validate([1])).toEqual({
      valid: false,
      value: [1],
      error: messages.string,
    });

    expect(string().validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: messages.string,
    });

    const symbol = Symbol('a');
    expect(string().validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: messages.string,
    });

    expect(string().validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(string().validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    expect(string().validate('')).toEqual({
      valid: true,
      value: '',
      error: '',
    });
  });

  test('default messages: strict', () => {
    expect(string().strict().validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string().strict().validate(0)).toEqual({
      valid: false,
      value: 0,
      error: messages.string,
    });

    expect(string().strict().validate(123)).toEqual({
      valid: false,
      value: 123,
      error: messages.string,
    });

    expect(string().strict().validate(Infinity)).toEqual({
      valid: false,
      value: Infinity,
      error: messages.string,
    });

    expect(string().strict().validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: messages.string,
    });

    expect(string().strict().validate(true)).toEqual({
      valid: false,
      value: true,
      error: messages.string,
    });

    expect(string().strict().validate(false)).toEqual({
      valid: false,
      value: false,
      error: messages.string,
    });

    expect(string().strict().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.string,
    });

    expect(string().strict().validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: messages.string,
    });

    expect(string().strict().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.string,
    });

    expect(string().strict().validate([0])).toEqual({
      valid: false,
      value: [0],
      error: messages.string,
    });

    expect(string().strict().validate([1])).toEqual({
      valid: false,
      value: [1],
      error: messages.string,
    });

    expect(string().strict().validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: messages.string,
    });

    const symbol = Symbol('a');
    expect(string().strict().validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: messages.string,
    });

    expect(string().strict().validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(string().strict().validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    expect(string().strict().validate('')).toEqual({
      valid: true,
      value: '',
      error: '',
    });
  });

  test('default messages: required', () => {
    expect(string().required().validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string().required().validate('0')).toEqual({
      valid: true,
      value: '0',
      error: '',
    });

    expect(string().required().validate(' ')).toEqual({
      valid: true,
      value: ' ',
      error: '',
    });

    expect(string().required().validate(0)).toEqual({
      valid: true,
      value: '0',
      error: '',
    });

    expect(string().required().validate(1)).toEqual({
      valid: true,
      value: '1',
      error: '',
    });

    expect(string().required().validate('-10')).toEqual({
      valid: true,
      value: '-10',
      error: '',
    });

    expect(string().required().validate(Infinity)).toEqual({
      valid: true,
      value: 'Infinity',
      error: '',
    });

    expect(string().required().validate(-Infinity)).toEqual({
      valid: true,
      value: '-Infinity',
      error: '',
    });

    expect(string().required().validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: messages.string,
    });

    expect(string().required().validate(true)).toEqual({
      valid: false,
      value: true,
      error: messages.string,
    });

    expect(string().required().validate(false)).toEqual({
      valid: false,
      value: false,
      error: messages.string,
    });

    expect(string().required().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.string,
    });

    expect(string().required().validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: messages.string,
    });

    expect(string().required().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.string,
    });

    expect(string().required().validate([0])).toEqual({
      valid: false,
      value: [0],
      error: messages.string,
    });

    expect(string().required().validate([1])).toEqual({
      valid: false,
      value: [1],
      error: messages.string,
    });

    expect(string().required().validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: messages.string,
    });

    const symbol = Symbol('a');
    expect(string().required().validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: messages.string,
    });

    expect(string().required().validate(undefined)).toEqual({
      valid: false,
      value: undefined,
      error: messages.required,
    });

    expect(string().required().validate(null)).toEqual({
      valid: false,
      value: null,
      error: messages.required,
    });

    expect(string().required().validate('')).toEqual({
      valid: false,
      value: '',
      error: messages.required,
    });
  });

  test('default messages: length', () => {
    expect(string().length(4).validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string().length(4).validate('')).toEqual({
      valid: true,
      value: '',
      error: '',
    });

    expect(string().length(5).validate(10000)).toEqual({
      valid: true,
      value: '10000',
      error: '',
    });

    expect(string().length(2).validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: messages.length(2),
    });

    expect(string().length(2).validate(10000)).toEqual({
      valid: false,
      value: 10000,
      error: messages.length(2),
    });
  });

  test('default messages: minLength', () => {
    expect(string().minLength(4).validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string().minLength(5).validate(10000)).toEqual({
      valid: true,
      value: '10000',
      error: '',
    });

    expect(string().minLength(5).validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: messages.short(5),
    });

    expect(string().minLength(5).validate(1000)).toEqual({
      valid: false,
      value: 1000,
      error: messages.short(5),
    });
  });

  test('default messages: maxLength', () => {
    expect(string().maxLength(4).validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string().maxLength(5).validate(10000)).toEqual({
      valid: true,
      value: '10000',
      error: '',
    });

    expect(string().maxLength(4).validate('long text')).toEqual({
      valid: false,
      value: 'long text',
      error: messages.long(4),
    });

    expect(string().maxLength(5).validate(100000)).toEqual({
      valid: false,
      value: 100000,
      error: messages.long(5),
    });
  });

  test('default messages: match', () => {
    expect(string().match(/text/).validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string().match(/1234/).validate(1234)).toEqual({
      valid: true,
      value: '1234',
      error: '',
    });

    expect(string().match(/text/).validate('another')).toEqual({
      valid: false,
      value: 'another',
      error: messages.format,
    });

    expect(string().match(/1234/).validate(4321)).toEqual({
      valid: false,
      value: 4321,
      error: messages.format,
    });
  });

  test('default messages: oneOf', () => {
    expect(string().oneOf(oneOfList).validate('test1')).toEqual({
      valid: true,
      value: 'test1',
      error: '',
    });

    expect(string().oneOf(oneOfList).validate(123)).toEqual({
      valid: true,
      value: '123',
      error: '',
    });

    expect(string().minLength(10).oneOf(oneOfList).validate('test1')).toEqual({
      valid: false,
      value: 'test1',
      error: 'minimum field length 10 characters',
    });

    expect(string().oneOf(oneOfList).validate('test4')).toEqual({
      valid: false,
      value: 'test4',
      error: messages.oneOf(oneOfList),
    });
  });

  test('custom messages: not strict', () => {
    expect(string('custom type message').validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string('custom type message').validate(0)).toEqual({
      valid: true,
      value: '0',
      error: '',
    });

    expect(string('custom type message').validate(123)).toEqual({
      valid: true,
      value: '123',
      error: '',
    });

    expect(string('custom type message').validate(-10)).toEqual({
      valid: true,
      value: '-10',
      error: '',
    });

    expect(string('custom type message').validate(Infinity)).toEqual({
      valid: true,
      value: 'Infinity',
      error: '',
    });

    expect(string('custom type message').validate(-Infinity)).toEqual({
      valid: true,
      value: '-Infinity',
      error: '',
    });

    expect(string('custom type message').validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: 'custom type message',
    });

    expect(string('custom type message').validate(true)).toEqual({
      valid: false,
      value: true,
      error: 'custom type message',
    });

    expect(string('custom type message').validate(false)).toEqual({
      valid: false,
      value: false,
      error: 'custom type message',
    });

    expect(string('custom type message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom type message',
    });

    expect(string('custom type message').validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: 'custom type message',
    });

    expect(string('custom type message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom type message',
    });

    expect(string('custom type message').validate([0])).toEqual({
      valid: false,
      value: [0],
      error: 'custom type message',
    });

    expect(string('custom type message').validate([1])).toEqual({
      valid: false,
      value: [1],
      error: 'custom type message',
    });

    expect(string('custom type message').validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: 'custom type message',
    });

    const symbol = Symbol('a');
    expect(string('custom type message').validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: 'custom type message',
    });

    expect(string('custom type message').validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(string('custom type message').validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    expect(string('custom type message').validate('')).toEqual({
      valid: true,
      value: '',
      error: '',
    });
  });

  test('custom messages: strict', () => {
    expect(string('custom type message').strict('custom strict message').validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string('custom type message').strict('custom strict message').validate(0)).toEqual({
      valid: false,
      value: 0,
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate(123)).toEqual({
      valid: false,
      value: 123,
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate(Infinity)).toEqual({
      valid: false,
      value: Infinity,
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate(true)).toEqual({
      valid: false,
      value: true,
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate(false)).toEqual({
      valid: false,
      value: false,
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate([0])).toEqual({
      valid: false,
      value: [0],
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate([1])).toEqual({
      valid: false,
      value: [1],
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: 'custom strict message',
    });

    const symbol = Symbol('a');
    expect(string('custom type message').strict('custom strict message').validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: 'custom strict message',
    });

    expect(string('custom type message').strict('custom strict message').validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(string('custom strict message').strict('custom strict message').validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    expect(string('custom strict message').strict('custom strict message').validate('')).toEqual({
      valid: true,
      value: '',
      error: '',
    });
  });

  test('custom messages: required', () => {
    expect(string('custom type message').required('custom required message').validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string('custom type message').required('custom required message').validate('0')).toEqual({
      valid: true,
      value: '0',
      error: '',
    });

    expect(string('custom type message').required('custom required message').validate(' ')).toEqual({
      valid: true,
      value: ' ',
      error: '',
    });

    expect(string('custom type message').required('custom required message').validate(0)).toEqual({
      valid: true,
      value: '0',
      error: '',
    });

    expect(string('custom type message').required('custom required message').validate(1)).toEqual({
      valid: true,
      value: '1',
      error: '',
    });

    expect(string('custom type message').required('custom required message').validate('-10')).toEqual({
      valid: true,
      value: '-10',
      error: '',
    });

    expect(string('custom type message').required('custom required message').validate(Infinity)).toEqual({
      valid: true,
      value: 'Infinity',
      error: '',
    });

    expect(string('custom type message').required('custom required message').validate(-Infinity)).toEqual({
      valid: true,
      value: '-Infinity',
      error: '',
    });

    expect(string('custom type message').required('custom required message').validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: 'custom type message',
    });

    expect(string('custom type message').required('custom required message').validate(true)).toEqual({
      valid: false,
      value: true,
      error: 'custom type message',
    });

    expect(string('custom type message').required('custom required message').validate(false)).toEqual({
      valid: false,
      value: false,
      error: 'custom type message',
    });

    expect(string('custom type message').required('custom required message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom type message',
    });

    expect(string('custom type message').required('custom required message').validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: 'custom type message',
    });

    expect(string('custom type message').required('custom required message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom type message',
    });

    expect(string('custom type message').required('custom required message').validate([0])).toEqual({
      valid: false,
      value: [0],
      error: 'custom type message',
    });

    expect(string('custom type message').required('custom required message').validate([1])).toEqual({
      valid: false,
      value: [1],
      error: 'custom type message',
    });

    expect(string('custom type message').required('custom required message').validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: 'custom type message',
    });

    const symbol = Symbol('a');
    expect(string('custom type message').required('custom required message').validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: 'custom type message',
    });

    expect(string('custom type message').required('custom required message').validate(undefined)).toEqual({
      valid: false,
      value: undefined,
      error: 'custom required message',
    });

    expect(string('custom type message').required('custom required message').validate(null)).toEqual({
      valid: false,
      value: null,
      error: 'custom required message',
    });

    expect(string('custom type message').required('custom required message').validate('')).toEqual({
      valid: false,
      value: '',
      error: 'custom required message',
    });
  });

  test('custom messages: length', () => {
    expect(string('custom type message').length(4, 'custom length message').validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string('custom type message').length(5, 'custom length message').validate(10000)).toEqual({
      valid: true,
      value: '10000',
      error: '',
    });

    expect(string('custom type message').length(2, 'custom length message').validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: 'custom length message',
    });

    expect(string('custom type message').length(2, 'custom length message').validate(10000)).toEqual({
      valid: false,
      value: 10000,
      error: 'custom length message',
    });
  });

  test('custom messages: minLength', () => {
    expect(string('custom type message').minLength(4, 'custom minLength message').validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string('custom type message').minLength(5, 'custom minLength message').validate(10000)).toEqual({
      valid: true,
      value: '10000',
      error: '',
    });

    expect(string('custom type message').minLength(5, 'custom minLength message').validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: 'custom minLength message',
    });

    expect(string('custom type message').minLength(5, 'custom minLength message').validate(1000)).toEqual({
      valid: false,
      value: 1000,
      error: 'custom minLength message',
    });
  });

  test('custom messages: maxLength', () => {
    expect(string('custom type message').maxLength(4, 'custom maxLength message').validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string('custom type message').maxLength(5, 'custom maxLength message').validate(10000)).toEqual({
      valid: true,
      value: '10000',
      error: '',
    });

    expect(string('custom type message').maxLength(4, 'custom maxLength message').validate('long text')).toEqual({
      valid: false,
      value: 'long text',
      error: 'custom maxLength message',
    });

    expect(string('custom type message').maxLength(5, 'custom maxLength message').validate(100000)).toEqual({
      valid: false,
      value: 100000,
      error: 'custom maxLength message',
    });
  });

  test('custom messages: match', () => {
    expect(string('custom type message').match(/text/, 'custom match message').validate('text')).toEqual({
      valid: true,
      value: 'text',
      error: '',
    });

    expect(string('custom type message').match(/1234/, 'custom match message').validate(1234)).toEqual({
      valid: true,
      value: '1234',
      error: '',
    });

    expect(string('custom type message').match(/text/, 'custom match message').validate('another')).toEqual({
      valid: false,
      value: 'another',
      error: 'custom match message',
    });

    expect(string('custom type message').match(/1234/, 'custom match message').validate(4321)).toEqual({
      valid: false,
      value: 4321,
      error: 'custom match message',
    });
  });

  test('custom messages: oneOf', () => {
    expect(string('custom type message').oneOf(oneOfList, 'custom oneOf message').validate('test1')).toEqual({
      valid: true,
      value: 'test1',
      error: '',
    });

    expect(string('custom type message').oneOf(oneOfList, 'custom oneOf message').validate(123)).toEqual({
      valid: true,
      value: '123',
      error: '',
    });

    expect(string('custom type message').oneOf(oneOfList, 'custom oneOf message').validate('test1')).toEqual({
      valid: true,
      value: 'test1',
      error: '',
    });

    expect(string('custom type message').oneOf(oneOfList, 'custom oneOf message').validate('test4')).toEqual({
      valid: false,
      value: 'test4',
      error: 'custom oneOf message',
    });
  });
});

describe('Schema: StringSchema / method: isValid()', () => {
  test('simple validation', () => {
    expect(string().isValid('valid text')).toEqual(true);

    expect(string().isValid({})).toEqual(false);
  });
});

describe('Schema: StringSchema / method: cast()', () => {
  test('data casting', () => {
    expect(string().cast('text')).toEqual('text');
    expect(string().cast(1234)).toEqual('1234');
    expect(() => string().strict().cast(10)).toThrow(new TypeError(messages.string));
    expect(() => string().strict().cast({})).toThrow(new TypeError(messages.string));
    expect(() => string().strict().cast(undefined)).toThrow(new TypeError(messages.string));
    expect(() => string().strict().cast(null)).toThrow(new TypeError(messages.string));
  });
});

// describe('Schema: StringSchema / method: end()', () => {
//   test('default messages', () => {
//     expect(string().end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: messages.string,
//       },
//     });

//     expect(string().strict().end()).toEqual({
//       type: {
//         value: 'string',
//         strict: true,
//         message: messages.string,
//       },
//     });

//     expect(string().required().end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: messages.string,
//       },
//       required: {
//         value: true,
//         message: messages.required,
//       },
//     });

//     expect(string().notRequired().end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: messages.string,
//       },
//       required: {
//         value: false,
//         message: '',
//       },
//     });

//     expect(string().required().notRequired().end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: messages.string,
//       },
//       required: {
//         value: false,
//         message: '',
//       },
//     });

//     expect(string().notRequired().required().end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: messages.string,
//       },
//       required: {
//         value: true,
//         message: messages.required,
//       },
//     });

//     expect(string().length(2).end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: messages.string,
//       },
//       length: {
//         value: 2,
//         message: messages.length(2),
//       },
//     });

//     expect(string().minLength(2).end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: messages.string,
//       },
//       minLength: {
//         value: 2,
//         message: messages.short(2),
//       },
//     });

//     expect(string().maxLength(20).end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: messages.string,
//       },
//       maxLength: {
//         value: 20,
//         message: messages.long(20),
//       },
//     });

//     expect(string().match(/test/).end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: messages.string,
//       },
//       match: {
//         value: /test/,
//         message: messages.format,
//       },
//     });
//   });

//   test('custom messages', () => {
//     expect(string('custom type message').end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: 'custom type message',
//       },
//     });

//     expect(string('custom type message').strict('custom strict message').end()).toEqual({
//       type: {
//         value: 'string',
//         strict: true,
//         message: 'custom strict message',
//       },
//     });

//     expect(string('custom type message').required('custom required message').end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: 'custom type message',
//       },
//       required: {
//         value: true,
//         message: 'custom required message',
//       },
//     });

//     expect(string('custom type message').notRequired('custom not required message').end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: 'custom type message',
//       },
//       required: {
//         value: false,
//         message: 'custom not required message',
//       },
//     });

//     expect(
//       string('custom type message').required('custom required message').notRequired('custom not required message').end()
//     ).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: 'custom type message',
//       },
//       required: {
//         value: false,
//         message: 'custom not required message',
//       },
//     });

//     expect(
//       string('custom type message').notRequired('custom not required message').required('custom required message').end()
//     ).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: 'custom type message',
//       },
//       required: {
//         value: true,
//         message: 'custom required message',
//       },
//     });

//     expect(string('custom type message').length(2, 'custom length message').end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: 'custom type message',
//       },
//       length: {
//         value: 2,
//         message: 'custom length message',
//       },
//     });

//     expect(string('custom type message').minLength(2, 'custom minLength message').end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: 'custom type message',
//       },
//       minLength: {
//         value: 2,
//         message: 'custom minLength message',
//       },
//     });

//     expect(string('custom type message').maxLength(20, 'custom maxLength message').end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: 'custom type message',
//       },
//       maxLength: {
//         value: 20,
//         message: 'custom maxLength message',
//       },
//     });

//     expect(string('custom type message').match(/test/, 'custom match message').end()).toEqual({
//       type: {
//         value: 'string',
//         strict: false,
//         message: 'custom type message',
//       },
//       match: {
//         value: /test/,
//         message: 'custom match message',
//       },
//     });
//   });
// });
