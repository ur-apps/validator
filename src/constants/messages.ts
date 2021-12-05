import type { TDefaultMessages } from '../types';

export const messages: TDefaultMessages = {
  type: 'invalid data type',
  required: 'required field',
  length: (length: number) => `field length must be ${length} characters`,
  short: (length: number) => `minimum field length ${length} characters`,
  long: (length: number) => `maximum field length ${length} characters`,
  arrayLength: (length: number) => `field length must be ${length} characters`,
  arrayShort: (length: number) => `minimum field length ${length} characters`,
  arrayLong: (length: number) => `maximum field length ${length} characters`,
  small: (min: number) => `minimum value is greater than or equal to ${min}`,
  large: (max: number) => `the maximum value is less than or equal to ${max}`,
  format: 'field is invalid',
  unequal: (relField: string) => `field must match ${relField} field`,
};
