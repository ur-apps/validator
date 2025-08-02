import { array, boolean, messages, number, object, string } from '../src';

describe('Schema: ArraySchema / method: validate()', () => {
  test('default messages: simple', () => {
    expect(array().validate([])).toEqual({
      valid: true,
      value: [],
      error: '',
    });

    expect(array().validate([1, 'text', true, {}])).toEqual({
      valid: true,
      value: [1, 'text', true, {}],
      error: '',
    });

    expect(array().of(boolean()).validate([true])).toEqual({
      valid: true,
      value: [true],
      error: '',
    });

    expect(array().of(boolean()).validate([1])).toEqual({
      valid: true,
      value: [true],
      error: '',
    });

    expect(array().of(number()).validate([123])).toEqual({
      valid: true,
      value: [123],
      error: '',
    });

    expect(array().of(number()).validate(['123'])).toEqual({
      valid: true,
      value: [123],
      error: '',
    });

    expect(array().of(string()).validate(['text'])).toEqual({
      valid: true,
      value: ['text'],
      error: '',
    });

    expect(array().of(string()).validate([123])).toEqual({
      valid: true,
      value: ['123'],
      error: '',
    });

    expect(
      array()
        .of(array().of(string()))
        .validate([
          [123, 124, 125],
          ['text1', 'text2'],
        ])
    ).toEqual({
      valid: true,
      value: [
        ['123', '124', '125'],
        ['text1', 'text2'],
      ],
      error: '',
    });

    expect(
      array()
        .of(
          object().entries({
            array: array().of(string()),
            boolean: boolean(),
            number: number(),
            string: string(),
            object: object().required().entries({ number: number() }),
          })
        )
        .validate([
          {
            array: ['text1', 'text2'],
            boolean: true,
            number: 123,
            string: 'text',
            object: {
              number: 123,
            },
          },
        ])
    ).toEqual({
      valid: true,
      value: [
        {
          array: ['text1', 'text2'],
          boolean: true,
          number: 123,
          string: 'text',
          object: {
            number: 123,
          },
        },
      ],
      error: '',
    });

    expect(array().validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(array().validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    expect(array().validate(true)).toEqual({
      valid: false,
      value: true,
      error: messages.array,
    });

    expect(array().validate(123)).toEqual({
      valid: false,
      value: 123,
      error: messages.array,
    });

    expect(array().validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: messages.array,
    });

    expect(array().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.array,
    });

    expect(array().of(boolean()).validate(['text', true, 123])).toEqual({
      valid: false,
      value: ['text', true, 123],
      error: {
        '0': messages.boolean,
        '2': messages.boolean,
      },
    });

    expect(array().of(number()).validate([true, 123, 'text'])).toEqual({
      valid: false,
      value: [true, 123, 'text'],
      error: {
        '0': messages.number,
        '2': messages.number,
      },
    });

    expect(array().of(string()).validate([true, 'text', '123'])).toEqual({
      valid: false,
      value: [true, 'text', '123'],
      error: {
        '0': messages.string,
      },
    });

    expect(
      array()
        .of(array().of(number()))
        .validate([
          [123, 124, 125],
          ['text1', 'text2'],
        ])
    ).toEqual({
      valid: false,
      value: [
        [123, 124, 125],
        ['text1', 'text2'],
      ],
      error: {
        '1': {
          '0': messages.number,
          '1': messages.number,
        },
      },
    });

    expect(
      array()
        .of(
          object().entries({
            array: array().of(string()),
            boolean: boolean(),
            number: number(),
            string: string(),
            object: object().required().entries({ number: number() }),
          })
        )
        .validate([
          {
            array: [true, false],
            boolean: 'text',
            number: '123px',
            string: true,
            object: {
              number: '123px',
            },
          },
        ])
    ).toEqual({
      valid: false,
      value: [
        {
          array: [true, false],
          boolean: 'text',
          number: '123px',
          string: true,
          object: {
            number: '123px',
          },
        },
      ],
      error: {
        0: {
          array: {
            '0': messages.string,
            '1': messages.string,
          },
          boolean: messages.boolean,
          number: messages.number,
          string: messages.string,
          object: {
            number: messages.number,
          },
        },
      },
    });
  });

  test('default messages: required', () => {
    expect(array().required().validate([])).toEqual({
      valid: true,
      value: [],
      error: '',
    });

    expect(array().required().validate(undefined)).toEqual({
      valid: false,
      value: undefined,
      error: messages.required,
    });

    expect(array().required().validate(null)).toEqual({
      valid: false,
      value: null,
      error: messages.required,
    });

    expect(array().required().validate('')).toEqual({
      valid: false,
      value: '',
      error: messages.array,
    });

    expect(array().required().validate({})).toEqual({
      valid: false,
      value: {},
      error: messages.array,
    });
  });

  test('default messages: length', () => {
    expect(array().length(4).validate([1, 2, 3, 4])).toEqual({
      valid: true,
      value: [1, 2, 3, 4],
      error: '',
    });

    expect(array().length(5).validate([1, 2, 3, 4])).toEqual({
      valid: false,
      value: [1, 2, 3, 4],
      error: messages.arrayLength(5),
    });

    expect(array().length(2).validate([1, 2, 3, 4])).toEqual({
      valid: false,
      value: [1, 2, 3, 4],
      error: messages.arrayLength(2),
    });
  });

  test('default messages: minLength', () => {
    expect(array().minLength(4).validate([1, 2, 3, 4])).toEqual({
      valid: true,
      value: [1, 2, 3, 4],
      error: '',
    });

    expect(array().minLength(5).validate([1, 2, 3, 4])).toEqual({
      valid: false,
      value: [1, 2, 3, 4],
      error: messages.arrayShort(5),
    });
  });

  test('default messages: maxLength', () => {
    expect(array().maxLength(4).validate([1, 2, 3, 4])).toEqual({
      valid: true,
      value: [1, 2, 3, 4],
      error: '',
    });

    expect(array().maxLength(2).validate([1, 2, 3, 4])).toEqual({
      valid: false,
      value: [1, 2, 3, 4],
      error: messages.arrayLong(2),
    });
  });

  test('custom messages: simple', () => {
    expect(array('custom type message').validate([])).toEqual({
      valid: true,
      value: [],
      error: '',
    });

    expect(array('custom type message').validate([1, 'text', true, {}])).toEqual({
      valid: true,
      value: [1, 'text', true, {}],
      error: '',
    });

    expect(array('custom type message').of(boolean()).validate([true])).toEqual({
      valid: true,
      value: [true],
      error: '',
    });

    expect(array('custom type message').of(boolean()).validate([1])).toEqual({
      valid: true,
      value: [true],
      error: '',
    });

    expect(array('custom type message').of(number()).validate([123])).toEqual({
      valid: true,
      value: [123],
      error: '',
    });

    expect(array('custom type message').of(number()).validate(['123'])).toEqual({
      valid: true,
      value: [123],
      error: '',
    });

    expect(array('custom type message').of(string()).validate(['text'])).toEqual({
      valid: true,
      value: ['text'],
      error: '',
    });

    expect(array('custom type message').of(string()).validate([123])).toEqual({
      valid: true,
      value: ['123'],
      error: '',
    });

    expect(
      array('custom type message')
        .of(array('custom type message').of(string()))
        .validate([
          [123, 124, 125],
          ['text1', 'text2'],
        ])
    ).toEqual({
      valid: true,
      value: [
        ['123', '124', '125'],
        ['text1', 'text2'],
      ],
      error: '',
    });

    expect(
      array('custom type message')
        .of(
          object().entries({
            array: array('custom type message').of(string()),
            boolean: boolean(),
            number: number(),
            string: string(),
            object: object().required('custom required message').entries({ number: number() }),
          })
        )
        .validate([
          {
            array: ['text1', 'text2'],
            boolean: true,
            number: 123,
            string: 'text',
            object: {
              number: 123,
            },
          },
        ])
    ).toEqual({
      valid: true,
      value: [
        {
          array: ['text1', 'text2'],
          boolean: true,
          number: 123,
          string: 'text',
          object: {
            number: 123,
          },
        },
      ],
      error: '',
    });

    expect(array('custom type message').validate(undefined)).toEqual({
      valid: true,
      value: undefined,
      error: '',
    });

    expect(array('custom type message').validate(null)).toEqual({
      valid: true,
      value: null,
      error: '',
    });

    expect(array('custom type message').validate(true)).toEqual({
      valid: false,
      value: true,
      error: 'custom type message',
    });

    expect(array('custom type message').validate(123)).toEqual({
      valid: false,
      value: 123,
      error: 'custom type message',
    });

    expect(array('custom type message').validate('text')).toEqual({
      valid: false,
      value: 'text',
      error: 'custom type message',
    });

    expect(array('custom type message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom type message',
    });

    expect(array('custom type message').of(boolean()).validate(['text', true, 123])).toEqual({
      valid: false,
      value: ['text', true, 123],
      error: {
        '0': messages.boolean,
        '2': messages.boolean,
      },
    });

    expect(array('custom type message').of(number()).validate([true, 123, 'text'])).toEqual({
      valid: false,
      value: [true, 123, 'text'],
      error: {
        '0': messages.number,
        '2': messages.number,
      },
    });

    expect(array('custom type message').of(string()).validate([true, 'text', '123'])).toEqual({
      valid: false,
      value: [true, 'text', '123'],
      error: {
        '0': messages.string,
      },
    });

    expect(
      array('custom type message')
        .of(array('custom type message').of(number()))
        .validate([
          [123, 124, 125],
          ['text1', 'text2'],
        ])
    ).toEqual({
      valid: false,
      value: [
        [123, 124, 125],
        ['text1', 'text2'],
      ],
      error: {
        '1': {
          '0': messages.number,
          '1': messages.number,
        },
      },
    });

    expect(
      array('custom type message')
        .of(
          object().entries({
            array: array('custom type message').of(string()),
            boolean: boolean(),
            number: number(),
            string: string(),
            object: object().required('custom required message').entries({ number: number() }),
          })
        )
        .validate([
          {
            array: [true, false],
            boolean: 'text',
            number: '123px',
            string: true,
            object: {
              number: '123px',
            },
          },
        ])
    ).toEqual({
      valid: false,
      value: [
        {
          array: [true, false],
          boolean: 'text',
          number: '123px',
          string: true,
          object: {
            number: '123px',
          },
        },
      ],
      error: {
        0: {
          array: {
            '0': messages.string,
            '1': messages.string,
          },
          boolean: messages.boolean,
          number: messages.number,
          string: messages.string,
          object: {
            number: messages.number,
          },
        },
      },
    });
  });

  test('custom messages: required', () => {
    expect(array('custom type message').required('custom required message').validate([])).toEqual({
      valid: true,
      value: [],
      error: '',
    });

    expect(array('custom type message').required('custom required message').validate(undefined)).toEqual({
      valid: false,
      value: undefined,
      error: 'custom required message',
    });

    expect(array('custom type message').required('custom required message').validate(null)).toEqual({
      valid: false,
      value: null,
      error: 'custom required message',
    });

    expect(array('custom type message').required('custom required message').validate('')).toEqual({
      valid: false,
      value: '',
      error: 'custom type message',
    });

    expect(array('custom type message').required('custom required message').validate({})).toEqual({
      valid: false,
      value: {},
      error: 'custom type message',
    });
  });

  test('custom messages: length', () => {
    expect(array('custom type message').length(4, 'custom length message').validate([1, 2, 3, 4])).toEqual({
      valid: true,
      value: [1, 2, 3, 4],
      error: '',
    });

    expect(array('custom type message').length(5, 'custom length message').validate([1, 2, 3, 4])).toEqual({
      valid: false,
      value: [1, 2, 3, 4],
      error: 'custom length message',
    });

    expect(array('custom type message').length(2, 'custom length message').validate([1, 2, 3, 4])).toEqual({
      valid: false,
      value: [1, 2, 3, 4],
      error: 'custom length message',
    });
  });

  test('custom messages: minLength', () => {
    expect(array('custom type message').minLength(4, 'custom minLength message').validate([1, 2, 3, 4])).toEqual({
      valid: true,
      value: [1, 2, 3, 4],
      error: '',
    });

    expect(array('custom type message').minLength(5, 'custom minLength message').validate([1, 2, 3, 4])).toEqual({
      valid: false,
      value: [1, 2, 3, 4],
      error: 'custom minLength message',
    });
  });

  test('custom messages: maxLength', () => {
    expect(array('custom type message').maxLength(4, 'custom maxLength message').validate([1, 2, 3, 4])).toEqual({
      valid: true,
      value: [1, 2, 3, 4],
      error: '',
    });

    expect(array('custom type message').maxLength(2, 'custom maxLength message').validate([1, 2, 3, 4])).toEqual({
      valid: false,
      value: [1, 2, 3, 4],
      error: 'custom maxLength message',
    });
  });
});

describe('Schema: ArraySchema / method: isValid()', () => {
  test('simple validation', () => {
    expect(array().isValid([])).toEqual(true);

    expect(array().isValid({})).toEqual(false);
  });
});

describe('Schema: ArraySchema / method: cast()', () => {
  test('data casting', () => {
    expect(array().of(string()).cast(['1', '6', 'text', '3'])).toEqual(['1', '6', 'text', '3']);
    expect(array().of(string()).cast([1, 6, 'text', 3])).toEqual(['1', '6', 'text', '3']);
    expect(array().of(string()).cast([])).toEqual([]);
    expect(
      array()
        .of(
          object().entries({
            array: array().of(string()),
            boolean: boolean(),
            number: number(),
            string: string(),
            object: object().required().entries({ number: number() }),
          })
        )
        .cast([
          {
            array: [123, 124],
            boolean: 1,
            number: '123',
            string: 123,
            object: {
              number: '123',
            },
          },
        ])
    ).toEqual([
      {
        array: ['123', '124'],
        boolean: true,
        number: 123,
        string: '123',
        object: {
          number: 123,
        },
      },
    ]);
    expect(array().cast([])).toEqual([]);

    expect(() => array().cast(10)).toThrow(new TypeError(messages.array));

    expect(() => array().cast({})).toThrow(new TypeError(messages.array));

    expect(() => array().cast(undefined)).toThrow(new TypeError(messages.array));

    expect(() => array().cast(null)).toThrow(new TypeError(messages.array));
    expect(() => array().of(string().strict()).cast([1, 6, 'text', 3])).toThrow(
      new TypeError(JSON.stringify({ 0: messages.string, 1: messages.string, 3: messages.string }, undefined, 2))
    );
    expect(() => array().of(string()).cast([true])).toThrow(
      new TypeError(JSON.stringify({ 0: messages.string }, undefined, 2))
    );
    expect(() => array().of(array().of(number())).cast(['not array'])).toThrow(
      new TypeError(JSON.stringify({ 0: messages.array }, undefined, 2))
    );
    expect(() =>
      array()
        .of(array().of(number()))
        .cast([['text', 123]])
    ).toThrow(new TypeError(JSON.stringify({ 0: { 0: messages.number } }, undefined, 2)));
  });
});

// describe('Schema: ArraySchema / method: end()', () => {
//   test('default messages', () => {
//     expect(array().end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: messages.array,
//       },
//     });

//     expect(array().required().end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: messages.array,
//       },
//       required: {
//         value: true,
//         message: messages.required,
//       },
//     });

//     expect(array().notRequired().end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: messages.array,
//       },
//       required: {
//         value: false,
//         message: '',
//       },
//     });

//     expect(array().length(2).end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: messages.array,
//       },
//       length: {
//         value: 2,
//         message: messages.length(2),
//       },
//     });

//     expect(array().minLength(2).end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: messages.array,
//       },
//       minLength: {
//         value: 2,
//         message: messages.short(2),
//       },
//     });

//     expect(array().maxLength(20).end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: messages.array,
//       },
//       maxLength: {
//         value: 20,
//         message: messages.long(20),
//       },
//     });

//     expect(array().of(string()).end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: messages.array,
//       },
//       entry: string(),
//     });
//   });

//   test('custom messages', () => {
//     expect(array('custom type message').end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: 'custom type message',
//       },
//     });

//     expect(array('custom type message').required('custom required message').end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: 'custom type message',
//       },
//       required: {
//         value: true,
//         message: 'custom required message',
//       },
//     });

//     expect(array('custom type message').notRequired('custom not required message').end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: 'custom type message',
//       },
//       required: {
//         value: false,
//         message: 'custom not required message',
//       },
//     });

//     expect(array('custom type message').length(2, 'custom length message').end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: 'custom type message',
//       },
//       length: {
//         value: 2,
//         message: 'custom length message',
//       },
//     });

//     expect(array('custom type message').minLength(2, 'custom minLength message').end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: 'custom type message',
//       },
//       minLength: {
//         value: 2,
//         message: 'custom minLength message',
//       },
//     });

//     expect(array('custom type message').maxLength(20, 'custom maxLength message').end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: 'custom type message',
//       },
//       maxLength: {
//         value: 20,
//         message: 'custom maxLength message',
//       },
//     });

//     expect(array('custom type message').of(string()).end()).toEqual({
//       type: {
//         value: 'array',
//         strict: false,
//         message: 'custom type message',
//       },
//       entry: string(),
//     });
//   });
// });
