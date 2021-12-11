import { number, messages } from '../lib';

describe('Schema: NumberSchema / method: end()', () => {
  test('default messages', () => {
    expect(number().end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: messages.number,
      },
    });

    expect(number().strict().end()).toEqual({
      type: {
        value: 'number',
        strict: true,
        message: messages.number,
      },
    });

    expect(number().required().end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: messages.number,
      },
      required: {
        value: true,
        message: messages.required,
      },
    });

    expect(number().notRequired().end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: messages.number,
      },
      required: {
        value: false,
        message: '',
      },
    });

    expect(number().required().notRequired().end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: messages.number,
      },
      required: {
        value: false,
        message: '',
      },
    });

    expect(number().notRequired().required().end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: messages.number,
      },
      required: {
        value: true,
        message: messages.required,
      },
    });

    expect(number().min(2).end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: messages.number,
      },
      min: {
        value: 2,
        message: messages.small(2),
      },
    });

    expect(number().max(20).end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: messages.number,
      },
      max: {
        value: 20,
        message: messages.large(20),
      },
    });
  });

  test('custom messages', () => {
    expect(number('custom type message').end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: 'custom type message',
      },
    });

    expect(number('custom type message').strict('custom strict message').end()).toEqual({
      type: {
        value: 'number',
        strict: true,
        message: 'custom strict message',
      },
    });

    expect(number('custom type message').required('custom requred message').end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: 'custom type message',
      },
      required: {
        value: true,
        message: 'custom requred message',
      },
    });

    expect(number('custom type message').notRequired('custom not requred message').end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: 'custom type message',
      },
      required: {
        value: false,
        message: 'custom not requred message',
      },
    });

    expect(
      number('custom type message').required('custom requred message').notRequired('custom not requred message').end()
    ).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: 'custom type message',
      },
      required: {
        value: false,
        message: 'custom not requred message',
      },
    });

    expect(
      number('custom type message').notRequired('custom not requred message').required('custom requred message').end()
    ).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: 'custom type message',
      },
      required: {
        value: true,
        message: 'custom requred message',
      },
    });

    expect(number('custom type message').min(2, 'custom min message').end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: 'custom type message',
      },
      min: {
        value: 2,
        message: 'custom min message',
      },
    });

    expect(number('custom type message').max(20, 'custom max message').end()).toEqual({
      type: {
        value: 'number',
        strict: false,
        message: 'custom type message',
      },
      max: {
        value: 20,
        message: 'custom max message',
      },
    });
  });
});

describe('Schema: NumberSchema / method: validate()', () => {
  test('default messages: not strict', () => {
    expect(number().validate(0)).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number().validate(1)).toEqual({
      valid: true,
      value: 1,
      error: '',
    });

    expect(number().validate(10)).toEqual({
      valid: true,
      value: 10,
      error: '',
    });

    expect(number().validate(-10)).toEqual({
      valid: true,
      value: -10,
      error: '',
    });

    expect(number().validate(Infinity)).toEqual({
      valid: true,
      value: Infinity,
      error: '',
    });

    expect(number().validate(-Infinity)).toEqual({
      valid: true,
      value: -Infinity,
      error: '',
    });

    expect(number().validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: messages.number,
    });

    expect(number().validate('0')).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number().validate('10')).toEqual({
      valid: true,
      value: 10,
      error: '',
    });

    expect(number().validate('-10')).toEqual({
      valid: true,
      value: -10,
      error: '',
    });

    expect(number().validate('10px')).toEqual({
      valid: false,
      value: '10px',
      error: messages.number,
    });

    expect(number().validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: messages.number,
    });

    expect(number().validate(true)).toEqual({
      valid: false,
      value: true,
      error: messages.number,
    });

    expect(number().validate(false)).toEqual({
      valid: false,
      value: false,
      error: messages.number,
    });

    expect(number().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.number,
    });

    expect(number().validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: messages.number,
    });

    expect(number().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.number,
    });

    expect(number().validate([0])).toEqual({
      valid: false,
      value: [0],
      error: messages.number,
    });

    expect(number().validate([1])).toEqual({
      valid: false,
      value: [1],
      error: messages.number,
    });

    expect(number().validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: messages.number,
    });

    const symbol = Symbol('a');
    expect(number().validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: messages.number,
    });

    expect(number().validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(number().validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    expect(number().validate('')).toEqual({
      valid: true,
      value: '',
      error: '',
    });
  });

  test('default messages: strict', () => {
    expect(number().strict().validate(0)).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number().strict().validate(1)).toEqual({
      valid: true,
      value: 1,
      error: '',
    });

    expect(number().strict().validate(10)).toEqual({
      valid: true,
      value: 10,
      error: '',
    });

    expect(number().strict().validate(-10)).toEqual({
      valid: true,
      value: -10,
      error: '',
    });

    expect(number().strict().validate(Infinity)).toEqual({
      valid: true,
      value: Infinity,
      error: '',
    });

    expect(number().strict().validate(-Infinity)).toEqual({
      valid: true,
      value: -Infinity,
      error: '',
    });

    expect(number().strict().validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: messages.number,
    });

    expect(number().strict().validate('0')).toEqual({
      valid: false,
      value: '0',
      error: messages.number,
    });

    expect(number().strict().validate('10')).toEqual({
      valid: false,
      value: '10',
      error: messages.number,
    });

    expect(number().strict().validate('-10')).toEqual({
      valid: false,
      value: '-10',
      error: messages.number,
    });

    expect(number().strict().validate('10px')).toEqual({
      valid: false,
      value: '10px',
      error: messages.number,
    });

    expect(number().strict().validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: messages.number,
    });

    expect(number().strict().validate(true)).toEqual({
      valid: false,
      value: true,
      error: messages.number,
    });

    expect(number().strict().validate(false)).toEqual({
      valid: false,
      value: false,
      error: messages.number,
    });

    expect(number().strict().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.number,
    });

    expect(number().strict().validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: messages.number,
    });

    expect(number().strict().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.number,
    });

    expect(number().strict().validate([0])).toEqual({
      valid: false,
      value: [0],
      error: messages.number,
    });

    expect(number().strict().validate([1])).toEqual({
      valid: false,
      value: [1],
      error: messages.number,
    });

    expect(number().strict().validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: messages.number,
    });

    const symbol = Symbol('a');
    expect(number().strict().validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: messages.number,
    });

    expect(number().strict().validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(number().strict().validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    expect(number().strict().validate('')).toEqual({
      valid: true,
      value: '',
      error: '',
    });
  });

  test('default messages: required', () => {
    expect(number().required().validate(0)).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number().required().validate(1)).toEqual({
      valid: true,
      value: 1,
      error: '',
    });

    expect(number().required().validate(-10)).toEqual({
      valid: true,
      value: -10,
      error: '',
    });

    expect(number().required().validate(Infinity)).toEqual({
      valid: true,
      value: Infinity,
      error: '',
    });

    expect(number().required().validate(-Infinity)).toEqual({
      valid: true,
      value: -Infinity,
      error: '',
    });

    expect(number().required().validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: messages.number,
    });

    expect(number().required().validate('0')).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number().required().validate('-10')).toEqual({
      valid: true,
      value: -10,
      error: '',
    });

    expect(number().required().validate('10px')).toEqual({
      valid: false,
      value: '10px',
      error: messages.number,
    });

    expect(number().required().validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: messages.number,
    });

    expect(number().required().validate(true)).toEqual({
      valid: false,
      value: true,
      error: messages.number,
    });

    expect(number().required().validate(false)).toEqual({
      valid: false,
      value: false,
      error: messages.number,
    });

    expect(number().required().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.number,
    });

    expect(number().required().validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: messages.number,
    });

    expect(number().required().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.number,
    });

    expect(number().required().validate([0])).toEqual({
      valid: false,
      value: [0],
      error: messages.number,
    });

    expect(number().required().validate([1])).toEqual({
      valid: false,
      value: [1],
      error: messages.number,
    });

    expect(number().required().validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: messages.number,
    });

    const symbol = Symbol('a');
    expect(number().required().validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: messages.number,
    });

    expect(number().required().validate(undefined)).toEqual({
      valid: false,
      value: undefined,
      error: messages.required,
    });

    expect(number().required().validate(null)).toEqual({
      valid: false,
      value: null,
      error: messages.required,
    });

    expect(number().required().validate('')).toEqual({
      valid: false,
      value: '',
      error: messages.required,
    });
  });

  test('default messages: min', () => {
    expect(number().min(2).validate(2)).toEqual({
      valid: true,
      value: 2,
      error: '',
    });

    expect(number().min(2).validate(10)).toEqual({
      valid: true,
      value: 10,
      error: '',
    });

    expect(number().min(2).validate(Infinity)).toEqual({
      valid: true,
      value: Infinity,
      error: '',
    });

    expect(number().min(2).validate('2')).toEqual({
      valid: true,
      value: 2,
      error: '',
    });

    expect(number().min(2).validate(0)).toEqual({
      valid: false,
      value: 0,
      error: messages.small(2),
    });

    expect(number().min(2).validate(-10)).toEqual({
      valid: false,
      value: -10,
      error: messages.small(2),
    });

    expect(number().min(2).validate(-Infinity)).toEqual({
      valid: false,
      value: -Infinity,
      error: messages.small(2),
    });

    expect(number().min(2).validate('-2')).toEqual({
      valid: false,
      value: '-2',
      error: messages.small(2),
    });
  });

  test('default messages: max', () => {
    expect(number().max(20).validate(0)).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number().max(20).validate(10)).toEqual({
      valid: true,
      value: 10,
      error: '',
    });

    expect(number().max(20).validate(-Infinity)).toEqual({
      valid: true,
      value: -Infinity,
      error: '',
    });

    expect(number().max(20).validate('2')).toEqual({
      valid: true,
      value: 2,
      error: '',
    });

    expect(number().max(20).validate(200)).toEqual({
      valid: false,
      value: 200,
      error: messages.large(20),
    });

    expect(number().max(20).validate(Infinity)).toEqual({
      valid: false,
      value: Infinity,
      error: messages.large(20),
    });

    expect(number().max(20).validate('22')).toEqual({
      valid: false,
      value: '22',
      error: messages.large(20),
    });
  });

  test('custom messages: not strict', () => {
    expect(number('custom type message').validate(0)).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number('custom type message').validate(1)).toEqual({
      valid: true,
      value: 1,
      error: '',
    });

    expect(number('custom type message').validate(10)).toEqual({
      valid: true,
      value: 10,
      error: '',
    });

    expect(number('custom type message').validate(-10)).toEqual({
      valid: true,
      value: -10,
      error: '',
    });

    expect(number('custom type message').validate(Infinity)).toEqual({
      valid: true,
      value: Infinity,
      error: '',
    });

    expect(number('custom type message').validate(-Infinity)).toEqual({
      valid: true,
      value: -Infinity,
      error: '',
    });

    expect(number('custom type message').validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: 'custom type message',
    });

    expect(number('custom type message').validate('0')).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number('custom type message').validate('10')).toEqual({
      valid: true,
      value: 10,
      error: '',
    });

    expect(number('custom type message').validate('-10')).toEqual({
      valid: true,
      value: -10,
      error: '',
    });

    expect(number('custom type message').validate('10px')).toEqual({
      valid: false,
      value: '10px',
      error: 'custom type message',
    });

    expect(number('custom type message').validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: 'custom type message',
    });

    expect(number('custom type message').validate(true)).toEqual({
      valid: false,
      value: true,
      error: 'custom type message',
    });

    expect(number('custom type message').validate(false)).toEqual({
      valid: false,
      value: false,
      error: 'custom type message',
    });

    expect(number('custom type message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom type message',
    });

    expect(number('custom type message').validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: 'custom type message',
    });

    expect(number('custom type message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom type message',
    });

    expect(number('custom type message').validate([0])).toEqual({
      valid: false,
      value: [0],
      error: 'custom type message',
    });

    expect(number('custom type message').validate([1])).toEqual({
      valid: false,
      value: [1],
      error: 'custom type message',
    });

    expect(number('custom type message').validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: 'custom type message',
    });

    const symbol = Symbol('a');
    expect(number('custom type message').validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: 'custom type message',
    });

    expect(number('custom type message').validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(number('custom type message').validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    expect(number('custom type message').validate('')).toEqual({
      valid: true,
      value: '',
      error: '',
    });
  });

  test('custom messages: strict', () => {
    expect(number('custom type message').strict('custom strict message').validate(0)).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number('custom type message').strict('custom strict message').validate(1)).toEqual({
      valid: true,
      value: 1,
      error: '',
    });

    expect(number('custom type message').strict('custom strict message').validate(10)).toEqual({
      valid: true,
      value: 10,
      error: '',
    });

    expect(number('custom type message').strict('custom strict message').validate(-10)).toEqual({
      valid: true,
      value: -10,
      error: '',
    });

    expect(number('custom type message').strict('custom strict message').validate(Infinity)).toEqual({
      valid: true,
      value: Infinity,
      error: '',
    });

    expect(number('custom type message').strict('custom strict message').validate(-Infinity)).toEqual({
      valid: true,
      value: -Infinity,
      error: '',
    });

    expect(number('custom type message').strict('custom strict message').validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate('0')).toEqual({
      valid: false,
      value: '0',
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate('10')).toEqual({
      valid: false,
      value: '10',
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate('-10')).toEqual({
      valid: false,
      value: '-10',
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate('10px')).toEqual({
      valid: false,
      value: '10px',
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate(true)).toEqual({
      valid: false,
      value: true,
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate(false)).toEqual({
      valid: false,
      value: false,
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate([0])).toEqual({
      valid: false,
      value: [0],
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate([1])).toEqual({
      valid: false,
      value: [1],
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: 'custom strict message',
    });

    const symbol = Symbol('a');
    expect(number('custom type message').strict('custom strict message').validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: 'custom strict message',
    });

    expect(number('custom type message').strict('custom strict message').validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(number('custom type message').strict('custom strict message').validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    expect(number('custom type message').strict('custom strict message').validate('')).toEqual({
      valid: true,
      value: '',
      error: '',
    });
  });

  test('custom messages: required', () => {
    expect(number('custom type message').required('custom required  message').validate(0)).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number('custom type message').required('custom required  message').validate(1)).toEqual({
      valid: true,
      value: 1,
      error: '',
    });

    expect(number('custom type message').required('custom required  message').validate(-10)).toEqual({
      valid: true,
      value: -10,
      error: '',
    });

    expect(number('custom type message').required('custom required  message').validate(Infinity)).toEqual({
      valid: true,
      value: Infinity,
      error: '',
    });

    expect(number('custom type message').required('custom required  message').validate(-Infinity)).toEqual({
      valid: true,
      value: -Infinity,
      error: '',
    });

    expect(number('custom type message').required('custom required  message').validate(NaN)).toEqual({
      valid: false,
      value: NaN,
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate('0')).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number('custom type message').required('custom required  message').validate('-10')).toEqual({
      valid: true,
      value: -10,
      error: '',
    });

    expect(number('custom type message').required('custom required  message').validate('10px')).toEqual({
      valid: false,
      value: '10px',
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate(true)).toEqual({
      valid: false,
      value: true,
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate(false)).toEqual({
      valid: false,
      value: false,
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate({ a: 1 })).toEqual({
      valid: false,
      value: { a: 1 },
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate([0])).toEqual({
      valid: false,
      value: [0],
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate([1])).toEqual({
      valid: false,
      value: [1],
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate([1, 2, 3])).toEqual({
      valid: false,
      value: [1, 2, 3],
      error: 'custom type message',
    });

    const symbol = Symbol('a');
    expect(number('custom type message').required('custom required  message').validate(symbol)).toEqual({
      valid: false,
      value: symbol,
      error: 'custom type message',
    });

    expect(number('custom type message').required('custom required  message').validate(undefined)).toEqual({
      valid: false,
      value: undefined,
      error: 'custom required  message',
    });

    expect(number('custom type message').required('custom required  message').validate(null)).toEqual({
      valid: false,
      value: null,
      error: 'custom required  message',
    });

    expect(number('custom type message').required('custom required  message').validate('')).toEqual({
      valid: false,
      value: '',
      error: 'custom required  message',
    });
  });

  test('custom messages: min', () => {
    expect(number('custom type message').min(2, 'custom min message').validate(2)).toEqual({
      valid: true,
      value: 2,
      error: '',
    });

    expect(number('custom type message').min(2, 'custom min message').validate(10)).toEqual({
      valid: true,
      value: 10,
      error: '',
    });

    expect(number('custom type message').min(2, 'custom min message').validate(Infinity)).toEqual({
      valid: true,
      value: Infinity,
      error: '',
    });

    expect(number('custom type message').min(2, 'custom min message').validate('2')).toEqual({
      valid: true,
      value: 2,
      error: '',
    });

    expect(number('custom type message').min(2, 'custom min message').validate(0)).toEqual({
      valid: false,
      value: 0,
      error: 'custom min message',
    });

    expect(number('custom type message').min(2, 'custom min message').validate(-10)).toEqual({
      valid: false,
      value: -10,
      error: 'custom min message',
    });

    expect(number('custom type message').min(2, 'custom min message').validate(-Infinity)).toEqual({
      valid: false,
      value: -Infinity,
      error: 'custom min message',
    });

    expect(number('custom type message').min(2, 'custom min message').validate('-2')).toEqual({
      valid: false,
      value: '-2',
      error: 'custom min message',
    });
  });

  test('custom messages: max', () => {
    expect(number('custom type message').max(20, 'custom max message').validate(0)).toEqual({
      valid: true,
      value: 0,
      error: '',
    });

    expect(number('custom type message').max(20, 'custom max message').validate(10)).toEqual({
      valid: true,
      value: 10,
      error: '',
    });

    expect(number('custom type message').max(20, 'custom max message').validate(-Infinity)).toEqual({
      valid: true,
      value: -Infinity,
      error: '',
    });

    expect(number('custom type message').max(20, 'custom max message').validate('2')).toEqual({
      valid: true,
      value: 2,
      error: '',
    });

    expect(number('custom type message').max(20, 'custom max message').validate(200)).toEqual({
      valid: false,
      value: 200,
      error: 'custom max message',
    });

    expect(number('custom type message').max(20, 'custom max message').validate(Infinity)).toEqual({
      valid: false,
      value: Infinity,
      error: 'custom max message',
    });

    expect(number('custom type message').max(20, 'custom max message').validate('22')).toEqual({
      valid: false,
      value: '22',
      error: 'custom max message',
    });
  });
});

describe('Schema: NumberSchema / method: isValid()', () => {
  test('simple validation', () => {
    expect(number().isValid(123)).toEqual(true);

    expect(number().isValid('invalid data')).toEqual(false);
  });
});

describe('Schema: NumberSchema / method: cast()', () => {
  test('data casting', () => {
    expect(number().cast(10)).toEqual(10);
    expect(number().cast('10')).toEqual(10);
    expect(() => number().strict().cast('10')).toThrowError(new TypeError(messages.number));
    expect(() => number().strict().cast({})).toThrowError(new TypeError(messages.number));
    expect(() => number().strict().cast(undefined)).toThrowError(new TypeError(messages.number));
    expect(() => number().strict().cast(null)).toThrowError(new TypeError(messages.number));
  });
});
