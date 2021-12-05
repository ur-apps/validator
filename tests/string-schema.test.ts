import { string, messages } from '../lib';

describe('Schema: StringSchema', () => {
  test('default messages', () => {
    expect(string().end()).toEqual({
      type: {
        value: 'string',
        message: messages.type,
      },
    });
    expect(string().required().end()).toEqual({
      type: {
        value: 'string',
        message: messages.type,
      },
      required: {
        value: true,
        message: messages.required,
      },
    });
    expect(string().required().notRequired().required().required().end()).toEqual({
      type: {
        value: 'string',
        message: messages.type,
      },
      required: {
        value: true,
        message: messages.required,
      },
    });
    expect(string().required().notRequired().required().required().notRequired().end()).toEqual({
      type: {
        value: 'string',
        message: messages.type,
      },
      required: {
        value: false,
        message: '',
      },
    });
    expect(string().required().minLength(2).end()).toEqual({
      type: {
        value: 'string',
        message: messages.type,
      },
      required: {
        value: true,
        message: messages.required,
      },
      minLength: {
        value: 2,
        message: typeof messages.short === 'function' ? messages.short(2) : messages.short,
      },
    });
    expect(string().required().minLength(2).maxLength(20).end()).toEqual({
      type: {
        value: 'string',
        message: messages.type,
      },
      required: {
        value: true,
        message: messages.required,
      },
      minLength: {
        value: 2,
        message: typeof messages.short === 'function' ? messages.short(2) : messages.short,
      },
      maxLength: {
        value: 20,
        message: typeof messages.long === 'function' ? messages.long(20) : messages.long,
      },
    });
    expect(string().required().minLength(2).maxLength(20).length(10).end()).toEqual({
      type: {
        value: 'string',
        message: messages.type,
      },
      required: {
        value: true,
        message: messages.required,
      },
      minLength: {
        value: 2,
        message: typeof messages.short === 'function' ? messages.short(2) : messages.short,
      },
      maxLength: {
        value: 20,
        message: typeof messages.long === 'function' ? messages.long(20) : messages.long,
      },
      length: {
        value: 10,
        message: typeof messages.length === 'function' ? messages.length(10) : messages.length,
      },
    });
    expect(
      string()
        .required()
        .minLength(2)
        .maxLength(20)
        .length(10)
        .match(/regexp/)
        .end()
    ).toEqual({
      type: {
        value: 'string',
        message: messages.type,
      },
      required: {
        value: true,
        message: messages.required,
      },
      minLength: {
        value: 2,
        message: typeof messages.short === 'function' ? messages.short(2) : messages.short,
      },
      maxLength: {
        value: 20,
        message: typeof messages.long === 'function' ? messages.long(20) : messages.long,
      },
      length: {
        value: 10,
        message: typeof messages.length === 'function' ? messages.length(10) : messages.length,
      },
      match: {
        value: /regexp/,
        message: messages.format,
      },
    });
    expect(
      string()
        .required()
        .minLength(2)
        .maxLength(20)
        .length(10)
        .match(/regexp/)
        .equalsTo('testname')
        .end()
    ).toEqual({
      type: {
        value: 'string',
        message: messages.type,
      },
      required: {
        value: true,
        message: messages.required,
      },
      minLength: {
        value: 2,
        message: typeof messages.short === 'function' ? messages.short(2) : messages.short,
      },
      maxLength: {
        value: 20,
        message: typeof messages.long === 'function' ? messages.long(20) : messages.long,
      },
      length: {
        value: 10,
        message: typeof messages.length === 'function' ? messages.length(10) : messages.length,
      },
      match: {
        value: /regexp/,
        message: messages.format,
      },
      equalField: {
        name: 'testname',
        message: typeof messages.unequal === 'function' ? messages.unequal('testname') : messages.unequal,
      },
    });
  });

  test('custom messages', () => {
    expect(string('custom type message').end()).toEqual({
      type: {
        value: 'string',
        message: 'custom type message',
      },
    });
    expect(string('custom type message').required('custom required message').end()).toEqual({
      type: {
        value: 'string',
        message: 'custom type message',
      },
      required: {
        value: true,
        message: 'custom required message',
      },
    });
    expect(
      string('custom type message')
        .required('custom required message')
        .notRequired('custom not required message')
        .required('custom required message')
        .required('custom required message')
        .end()
    ).toEqual({
      type: {
        value: 'string',
        message: 'custom type message',
      },
      required: {
        value: true,
        message: 'custom required message',
      },
    });
    expect(
      string('custom type message')
        .required('custom required message')
        .notRequired('custom not required message')
        .required('custom required message')
        .required('custom required message')
        .notRequired('custom not required message')
        .end()
    ).toEqual({
      type: {
        value: 'string',
        message: 'custom type message',
      },
      required: {
        value: false,
        message: 'custom not required message',
      },
    });
    expect(
      string('custom type message').required('custom required message').minLength(2, 'custom min message').end()
    ).toEqual({
      type: {
        value: 'string',
        message: 'custom type message',
      },
      required: {
        value: true,
        message: 'custom required message',
      },
      minLength: {
        value: 2,
        message: 'custom min message',
      },
    });
    expect(
      string('custom type message')
        .required('custom required message')
        .minLength(2, 'custom min message')
        .maxLength(20, 'custom max message')
        .end()
    ).toEqual({
      type: {
        value: 'string',
        message: 'custom type message',
      },
      required: {
        value: true,
        message: 'custom required message',
      },
      minLength: {
        value: 2,
        message: 'custom min message',
      },
      maxLength: {
        value: 20,
        message: 'custom max message',
      },
    });
    expect(
      string('custom type message')
        .required('custom required message')
        .minLength(2, 'custom min message')
        .maxLength(20, 'custom max message')
        .length(10, 'custom length message')
        .end()
    ).toEqual({
      type: {
        value: 'string',
        message: 'custom type message',
      },
      required: {
        value: true,
        message: 'custom required message',
      },
      minLength: {
        value: 2,
        message: 'custom min message',
      },
      maxLength: {
        value: 20,
        message: 'custom max message',
      },
      length: {
        value: 10,
        message: 'custom length message',
      },
    });
    expect(
      string('custom type message')
        .required('custom required message')
        .minLength(2, 'custom min message')
        .maxLength(20, 'custom max message')
        .length(10, 'custom length message')
        .match(/regexp/, 'custom match message')
        .end()
    ).toEqual({
      type: {
        value: 'string',
        message: 'custom type message',
      },
      required: {
        value: true,
        message: 'custom required message',
      },
      minLength: {
        value: 2,
        message: 'custom min message',
      },
      maxLength: {
        value: 20,
        message: 'custom max message',
      },
      length: {
        value: 10,
        message: 'custom length message',
      },
      match: {
        value: /regexp/,
        message: 'custom match message',
      },
    });
    expect(
      string('custom type message')
        .required('custom required message')
        .minLength(2, 'custom min message')
        .maxLength(20, 'custom max message')
        .length(10, 'custom length message')
        .match(/regexp/, 'custom match message')
        .equalsTo('testname', 'custom equal message')
        .end()
    ).toEqual({
      type: {
        value: 'string',
        message: 'custom type message',
      },
      required: {
        value: true,
        message: 'custom required message',
      },
      minLength: {
        value: 2,
        message: 'custom min message',
      },
      maxLength: {
        value: 20,
        message: 'custom max message',
      },
      length: {
        value: 10,
        message: 'custom length message',
      },
      match: {
        value: /regexp/,
        message: 'custom match message',
      },
      equalField: {
        name: 'testname',
        message: 'custom equal message',
      },
    });
  });

  test('without .end() method', () => {
    expect(string()).toEqual({
      schema: {
        type: {
          value: 'string',
          message: messages.type,
        },
      },
    });
    expect(
      string()
        .required()
        .minLength(2)
        .maxLength(20)
        .length(10)
        .match(/regexp/)
        .equalsTo('testname')
    ).toEqual({
      schema: {
        type: {
          value: 'string',
          message: messages.type,
        },
        required: {
          value: true,
          message: messages.required,
        },
        minLength: {
          value: 2,
          message: typeof messages.short === 'function' ? messages.short(2) : messages.short,
        },
        maxLength: {
          value: 20,
          message: typeof messages.long === 'function' ? messages.long(20) : messages.long,
        },
        length: {
          value: 10,
          message: typeof messages.length === 'function' ? messages.length(10) : messages.length,
        },
        match: {
          value: /regexp/,
          message: messages.format,
        },
        equalField: {
          name: 'testname',
          message: typeof messages.unequal === 'function' ? messages.unequal('testname') : messages.unequal,
        },
      },
    });
  });
});
