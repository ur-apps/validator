import type { Reference } from '../schemas';
import type { TDefaultMessages } from '../types';

export const messages: TDefaultMessages = {
  type: 'invalid data type',
  string: 'expected string value',
  number: 'expected number value',
  boolean: 'expected boolean value',
  object: 'expected object',
  array: 'expected array',
  required: 'required field',
  length: (length: number) => `field length must be ${length} characters`,
  short: (length: number) => `minimum field length ${length} characters`,
  long: (length: number) => `maximum field length ${length} characters`,
  arrayLength: (length: number) => `field length must be ${length} characters`,
  arrayShort: (length: number) => `minimum field length ${length} characters`,
  arrayLong: (length: number) => `maximum field length ${length} characters`,
  small: (min: number) => `minimum value is greater than or equal to ${min}`,
  large: (max: number) => `the maximum value is less than or equal to ${max}`,
  oneOf: (values: Array<string | Reference>) =>
    `value must be equal to one of the following values: ${values.join(', ')}`,
  format: 'invalid data format',
  unequal: (relField: string) => `field must match ${relField} field`,
  true: 'value must be "true"',
  false: 'value must be "false"',
};
