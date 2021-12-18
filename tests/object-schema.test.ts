import { array, boolean, number, object, string, messages } from '../lib';

describe('Schema: ObjectSchema / method: end()', () => {
  test('default messages', () => {
    expect(object().end()).toEqual({
      type: {
        value: 'object',
        strict: false,
        message: messages.object,
      },
    });

    expect(object().required().end()).toEqual({
      type: {
        value: 'object',
        strict: false,
        message: messages.object,
      },
      required: {
        value: true,
        message: messages.required,
      },
    });

    expect(object().notRequired().end()).toEqual({
      type: {
        value: 'object',
        strict: false,
        message: messages.object,
      },
      required: {
        value: false,
        message: '',
      },
    });

    expect(
      object()
        .entries({
          array: array(),
          boolean: boolean(),
          number: number(),
          object: object(),
          string: string(),
        })
        .end()
    ).toEqual({
      type: {
        value: 'object',
        strict: false,
        message: messages.object,
      },
      entries: {
        array: array(),
        boolean: boolean(),
        number: number(),
        object: object(),
        string: string(),
      },
    });
  });

  test('custom messages', () => {
    expect(object('custom type message').end()).toEqual({
      type: {
        value: 'object',
        strict: false,
        message: 'custom type message',
      },
    });

    expect(object('custom type message').required('custom requred message').end()).toEqual({
      type: {
        value: 'object',
        strict: false,
        message: 'custom type message',
      },
      required: {
        value: true,
        message: 'custom requred message',
      },
    });

    expect(object('custom type message').notRequired('custom not requred message').end()).toEqual({
      type: {
        value: 'object',
        strict: false,
        message: 'custom type message',
      },
      required: {
        value: false,
        message: 'custom not requred message',
      },
    });

    expect(
      object('custom type message')
        .entries({
          array: array(),
          boolean: boolean(),
          number: number(),
          object: object(),
          string: string(),
        })
        .end()
    ).toEqual({
      type: {
        value: 'object',
        strict: false,
        message: 'custom type message',
      },
      entries: {
        array: array(),
        boolean: boolean(),
        number: number(),
        object: object(),
        string: string(),
      },
    });
  });
});

describe('Schema: ObjectSchema / method: validate()', () => {
  test('default messages: simple', () => {
    expect(object().validate({})).toEqual({
      valid: true,
      value: {},
      error: '',
    });

    expect(object().validate({ a: 1, b: 2 })).toEqual({
      valid: true,
      value: { a: 1, b: 2 },
      error: '',
    });

    expect(
      object()
        .entries({
          array: array().of(number()),
          boolean: boolean(),
          number: number(),
          object: object().entries({
            a: number(),
            b: string(),
          }),
          string: string(),
        })
        .validate({
          array: [1, 2, 3],
          boolean: true,
          number: 123,
          object: { a: 1, b: 'text' },
          string: 'text',
        })
    ).toEqual({
      valid: true,
      value: {
        array: [1, 2, 3],
        boolean: true,
        number: 123,
        object: { a: 1, b: 'text' },
        string: 'text',
      },
      error: '',
    });

    expect(
      object()
        .entries({
          array: array().of(number()),
          boolean: boolean(),
          number: number(),
          object: object().entries({
            a: number(),
            b: string(),
          }),
          string: string(),
        })
        .validate({
          array: [1, '2', 3],
          boolean: 1,
          number: '123',
          object: { a: '1', b: 123 },
          string: 123,
        })
    ).toEqual({
      valid: true,
      value: {
        array: [1, 2, 3],
        boolean: true,
        number: 123,
        object: { a: 1, b: '123' },
        string: '123',
      },
      error: '',
    });

    // @ts-ignore
    expect(object().validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    // @ts-ignore
    expect(object().validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    // @ts-ignore
    expect(object().validate(true)).toEqual({
      valid: false,
      value: true,
      error: messages.object,
    });

    // @ts-ignore
    expect(object().validate(123)).toEqual({
      valid: false,
      value: 123,
      error: messages.object,
    });

    // @ts-ignore
    expect(object().validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: messages.object,
    });

    // @ts-ignore
    expect(object().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.object,
    });

    expect(
      object()
        .entries({
          array: array().of(number()),
          boolean: boolean(),
          number: number(),
          object: object().entries({
            a: number(),
            b: string(),
          }),
          string: string(),
        })
        .validate({
          array: [1, '12px', 3],
          boolean: 'true',
          number: true,
          object: { a: '13px', b: false },
          string: [],
        })
    ).toEqual({
      valid: false,
      value: {
        array: [1, '12px', 3],
        boolean: 'true',
        number: true,
        object: { a: '13px', b: false },
        string: [],
      },
      error: {
        array: {
          1: messages.number,
        },
        boolean: messages.boolean,
        number: messages.number,
        object: {
          a: messages.number,
          b: messages.string,
        },
        string: messages.string,
      },
    });
  });

  test('default messages: required', () => {
    expect(object().required().validate({})).toEqual({
      valid: true,
      value: {},
      error: '',
    });

    // @ts-ignore
    expect(object().required().validate(undefined)).toEqual({
      valid: false,
      value: undefined,
      error: messages.required,
    });

    // @ts-ignore
    expect(object().required().validate(null)).toEqual({
      valid: false,
      value: null,
      error: messages.required,
    });

    // @ts-ignore
    expect(object().required().validate('')).toEqual({
      valid: false,
      value: '',
      error: messages.object,
    });

    // @ts-ignore
    expect(object().required().validate([])).toEqual({
      valid: false,
      value: [],
      error: messages.object,
    });
  });

  test('custom messages: simple', () => {
    expect(object('custom type message').validate({})).toEqual({
      valid: true,
      value: {},
      error: '',
    });

    expect(object('custom type message').validate({ a: 1, b: 2 })).toEqual({
      valid: true,
      value: { a: 1, b: 2 },
      error: '',
    });

    expect(
      object('custom type message')
        .entries({
          array: array().of(number()),
          boolean: boolean(),
          number: number(),
          object: object('custom type message').entries({
            a: number(),
            b: string(),
          }),
          string: string(),
        })
        .validate({
          array: [1, 2, 3],
          boolean: true,
          number: 123,
          object: { a: 1, b: 'text' },
          string: 'text',
        })
    ).toEqual({
      valid: true,
      value: {
        array: [1, 2, 3],
        boolean: true,
        number: 123,
        object: { a: 1, b: 'text' },
        string: 'text',
      },
      error: '',
    });

    expect(
      object('custom type message')
        .entries({
          array: array().of(number()),
          boolean: boolean(),
          number: number(),
          object: object('custom type message').entries({
            a: number(),
            b: string(),
          }),
          string: string(),
        })
        .validate({
          array: [1, '2', 3],
          boolean: 1,
          number: '123',
          object: { a: '1', b: 123 },
          string: 123,
        })
    ).toEqual({
      valid: true,
      value: {
        array: [1, 2, 3],
        boolean: true,
        number: 123,
        object: { a: 1, b: '123' },
        string: '123',
      },
      error: '',
    });

    // @ts-ignore
    expect(object('custom type message').validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    // @ts-ignore
    expect(object('custom type message').validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    // @ts-ignore
    expect(object('custom type message').validate(true)).toEqual({
      valid: false,
      value: true,
      error: 'custom type message',
    });

    // @ts-ignore
    expect(object('custom type message').validate(123)).toEqual({
      valid: false,
      value: 123,
      error: 'custom type message',
    });

    // @ts-ignore
    expect(object('custom type message').validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: 'custom type message',
    });

    // @ts-ignore
    expect(object('custom type message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom type message',
    });

    expect(
      object('custom type message')
        .entries({
          array: array().of(number()),
          boolean: boolean(),
          number: number(),
          object: object('custom type message').entries({
            a: number(),
            b: string(),
          }),
          string: string(),
        })
        .validate({
          array: [1, '12px', 3],
          boolean: 'true',
          number: true,
          object: { a: '13px', b: false },
          string: [],
        })
    ).toEqual({
      valid: false,
      value: {
        array: [1, '12px', 3],
        boolean: 'true',
        number: true,
        object: { a: '13px', b: false },
        string: [],
      },
      error: {
        array: {
          1: messages.number,
        },
        boolean: messages.boolean,
        number: messages.number,
        object: {
          a: messages.number,
          b: messages.string,
        },
        string: messages.string,
      },
    });
  });

  test('custom messages: required', () => {
    expect(object('custom type message').required('custom required message').validate({})).toEqual({
      valid: true,
      value: {},
      error: '',
    });

    // @ts-ignore
    expect(object('custom type message').required('custom required message').validate(undefined)).toEqual({
      valid: false,
      value: undefined,
      error: 'custom required message',
    });

    // @ts-ignore
    expect(object('custom type message').required('custom required message').validate(null)).toEqual({
      valid: false,
      value: null,
      error: 'custom required message',
    });

    // @ts-ignore
    expect(object('custom type message').required('custom required message').validate('')).toEqual({
      valid: false,
      value: '',
      error: 'custom type message',
    });

    // @ts-ignore
    expect(object('custom type message').required('custom required message').validate([])).toEqual({
      valid: false,
      value: [],
      error: 'custom type message',
    });
  });
});

describe('Schema: ObjectSchema / method: isValid()', () => {
  test('simple validation', () => {
    expect(object().isValid({})).toEqual(true);

    // @ts-ignore
    expect(object().isValid([])).toEqual(false);
  });
});

describe('Schema: ObjectSchema / method: cast()', () => {
  test('data casting', () => {
    expect(object().cast({})).toEqual({});
    expect(
      object()
        .entries({
          array: array().of(number()),
          boolean: boolean(),
          number: number(),
          object: object().entries({
            a: number(),
            b: string(),
          }),
          string: string(),
        })
        .cast({})
    ).toEqual({});
    expect(
      object()
        .entries({
          array: array().of(number()),
          boolean: boolean(),
          number: number(),
          object: object().entries({
            a: number(),
            b: string(),
          }),
          string: string(),
        })
        .cast({
          array: [1, '2', 3],
          boolean: 1,
          number: '123',
          object: { a: '1', b: 123 },
          string: 123,
        })
    ).toEqual({
      array: [1, 2, 3],
      boolean: true,
      number: 123,
      object: { a: 1, b: '123' },
      string: '123',
    });
    // @ts-ignore
    expect(() => object().cast([])).toThrowError(new TypeError(messages.object));
    // @ts-ignore
    expect(() => object().cast(undefined)).toThrowError(new TypeError(messages.object));
    // @ts-ignore
    expect(() => object().cast(null)).toThrowError(new TypeError(messages.object));
    // @ts-ignore
    expect(() => object().cast(10)).toThrowError(new TypeError(messages.object));
    expect(() =>
      object()
        .entries({
          array: array().of(number().strict()),
          boolean: boolean().strict(),
          number: number().required(),
          object: object().entries({
            a: number().strict(),
            b: string().required(),
          }),
          string: string().strict(),
        })
        .cast({
          array: [1, '2', 3],
          boolean: 1,
          object: { a: '1' },
          string: 123,
        })
    ).toThrowError(
      new TypeError(
        JSON.stringify(
          {
            array: {
              1: messages.number,
            },
            boolean: messages.boolean,
            number: messages.required,
            object: {
              a: messages.number,
              b: messages.required,
            },
            string: messages.string,
          },
          undefined,
          2
        )
      )
    );
  });
});
