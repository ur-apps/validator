import { TFieldOptions, Validator } from '../lib';

describe('Validator: validateOne', () => {
  const validator = new Validator({});

  test('type: string | number | boolean, requred: true, with default message', () => {
    const requredStringSchema: TFieldOptions = {
      type: { value: 'string' },
      required: { value: true },
    };
    const requredNumberSchema: TFieldOptions = {
      type: { value: 'number' },
      required: { value: true },
    };
    const requredBooleanSchema: TFieldOptions = {
      type: { value: 'boolean' },
      required: { value: true },
    };

    expect(validator.validateOne('string value', requredStringSchema)).toEqual({
      valid: true,
      value: 'string value',
      error: '',
    });
    expect(validator.validateOne(123, requredNumberSchema)).toEqual({
      valid: true,
      value: 123,
      error: '',
    });
    expect(validator.validateOne(0, requredNumberSchema)).toEqual({
      valid: true,
      value: 0,
      error: '',
    });
    expect(validator.validateOne(true, requredBooleanSchema)).toEqual({
      valid: true,
      value: true,
      error: '',
    });
    expect(validator.validateOne(false, requredBooleanSchema)).toEqual({
      valid: true,
      value: false,
      error: '',
    });
    expect(validator.validateOne('', requredStringSchema)).toEqual({
      valid: false,
      value: '',
      error: 'required field',
    });
    expect(validator.validateOne(' ', requredStringSchema)).toEqual({
      valid: false,
      value: ' ',
      error: 'required field',
    });
    expect(validator.validateOne(undefined, requredStringSchema)).toEqual({
      valid: false,
      value: undefined,
      error: 'required field',
    });
    expect(validator.validateOne(null, requredStringSchema)).toEqual({
      valid: false,
      value: null,
      error: 'required field',
    });
    expect(validator.validateOne(NaN, requredStringSchema)).toEqual({
      valid: false,
      value: NaN,
      error: 'required field',
    });
  });

  test('type: string | number | boolean, requred: true, with custom message', () => {
    const requredStringSchema: TFieldOptions = {
      type: { value: 'string' },
      required: { value: true, message: 'field is required' },
    };
    const requredNumberSchema: TFieldOptions = {
      type: { value: 'number' },
      required: { value: true, message: 'field is required' },
    };
    const requredBooleanSchema: TFieldOptions = {
      type: { value: 'boolean' },
      required: { value: true, message: 'field is required' },
    };

    expect(validator.validateOne('string value', requredStringSchema)).toEqual({
      valid: true,
      value: 'string value',
      error: '',
    });
    expect(validator.validateOne(123, requredNumberSchema)).toEqual({
      valid: true,
      value: 123,
      error: '',
    });
    expect(validator.validateOne(0, requredNumberSchema)).toEqual({
      valid: true,
      value: 0,
      error: '',
    });
    expect(validator.validateOne(true, requredBooleanSchema)).toEqual({
      valid: true,
      value: true,
      error: '',
    });
    expect(validator.validateOne(false, requredBooleanSchema)).toEqual({
      valid: true,
      value: false,
      error: '',
    });
    expect(validator.validateOne('', requredStringSchema)).toEqual({
      valid: false,
      value: '',
      error: 'field is required',
    });
    expect(validator.validateOne(' ', requredStringSchema)).toEqual({
      valid: false,
      value: ' ',
      error: 'field is required',
    });
    expect(validator.validateOne(undefined, requredStringSchema)).toEqual({
      valid: false,
      value: undefined,
      error: 'field is required',
    });
    expect(validator.validateOne(null, requredStringSchema)).toEqual({
      valid: false,
      value: null,
      error: 'field is required',
    });
    expect(validator.validateOne(NaN, requredStringSchema)).toEqual({
      valid: false,
      value: NaN,
      error: 'field is required',
    });
  });

  test('type: string, requred: false, with default message', () => {
    expect(validator.validateOne('string value', { type: { value: 'string' } })).toEqual({
      valid: true,
      value: 'string value',
      error: '',
    });
    expect(validator.validateOne(' ', { type: { value: 'string' } })).toEqual({
      valid: true,
      value: ' ',
      error: '',
    });
    expect(validator.validateOne('', { type: { value: 'string' } })).toEqual({
      valid: true,
      value: '',
      error: '',
    });
    expect(validator.validateOne(123, { type: { value: 'string' } })).toEqual({
      valid: true,
      value: '123',
      error: '',
    });
    expect(validator.validateOne(0, { type: { value: 'string' } })).toEqual({
      valid: true,
      value: '0',
      error: '',
    });
    expect(validator.validateOne(true, { type: { value: 'string' } })).toEqual({
      valid: false,
      value: true,
      error: 'invalid data type',
    });
    expect(validator.validateOne(false, { type: { value: 'string' } })).toEqual({
      valid: false,
      value: false,
      error: 'invalid data type',
    });
  });

  test('type: string, requred: false, with custom message', () => {
    expect(validator.validateOne('string value', { type: { value: 'string', message: 'invalid value type' } })).toEqual(
      {
        valid: true,
        value: 'string value',
        error: '',
      }
    );
    expect(validator.validateOne(123, { type: { value: 'string', message: 'invalid value type' } })).toEqual({
      valid: true,
      value: '123',
      error: '',
    });
    expect(validator.validateOne(true, { type: { value: 'string', message: 'invalid value type' } })).toEqual({
      valid: false,
      value: true,
      error: 'invalid value type',
    });
    expect(validator.validateOne(false, { type: { value: 'string', message: 'invalid value type' } })).toEqual({
      valid: false,
      value: false,
      error: 'invalid value type',
    });
  });

  test('type: number, requred: false, with default message', () => {
    expect(validator.validateOne(123, { type: { value: 'number' } })).toEqual({
      valid: true,
      value: 123,
      error: '',
    });
    expect(validator.validateOne(0, { type: { value: 'number' } })).toEqual({
      valid: true,
      value: 0,
      error: '',
    });
    expect(validator.validateOne('321', { type: { value: 'number' } })).toEqual({
      valid: true,
      value: 321,
      error: '',
    });
    expect(validator.validateOne('', { type: { value: 'number' } })).toEqual({
      valid: true,
      value: '',
      error: '',
    });
    expect(validator.validateOne('string value', { type: { value: 'number' } })).toEqual({
      valid: false,
      value: 'string value',
      error: 'invalid data type',
    });
    expect(validator.validateOne(' ', { type: { value: 'number' } })).toEqual({
      valid: false,
      value: ' ',
      error: 'invalid data type',
    });
    expect(validator.validateOne(true, { type: { value: 'number' } })).toEqual({
      valid: false,
      value: true,
      error: 'invalid data type',
    });
    expect(validator.validateOne(false, { type: { value: 'number' } })).toEqual({
      valid: false,
      value: false,
      error: 'invalid data type',
    });
  });

  test('type: boolean, requred: false, with default message', () => {
    expect(validator.validateOne(true, { type: { value: 'boolean' } })).toEqual({
      valid: true,
      value: true,
      error: '',
    });
    expect(validator.validateOne(false, { type: { value: 'boolean' } })).toEqual({
      valid: true,
      value: false,
      error: '',
    });
    expect(validator.validateOne(123, { type: { value: 'boolean' } })).toEqual({
      valid: false,
      value: 123,
      error: 'invalid data type',
    });
    expect(validator.validateOne(0, { type: { value: 'boolean' } })).toEqual({
      valid: false,
      value: 0,
      error: 'invalid data type',
    });
    expect(validator.validateOne('321', { type: { value: 'boolean' } })).toEqual({
      valid: false,
      value: '321',
      error: 'invalid data type',
    });
    expect(validator.validateOne('', { type: { value: 'boolean' } })).toEqual({
      valid: true,
      value: '',
      error: '',
    });
    expect(validator.validateOne('string value', { type: { value: 'boolean' } })).toEqual({
      valid: false,
      value: 'string value',
      error: 'invalid data type',
    });
    expect(validator.validateOne(' ', { type: { value: 'boolean' } })).toEqual({
      valid: false,
      value: ' ',
      error: 'invalid data type',
    });
  });
});
