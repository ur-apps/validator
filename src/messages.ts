import type { TValidationMessages } from './types';

export const messages: TValidationMessages = {
  type: 'Invalid data type',
  required: 'required field',
  length: (length: number) => `field length must be ${length} characters`,
  short: (length: number) => `minimum field length ${length} characters`,
  long: (length: number) => `maximum field length ${length} characters`,
  small: (min: number) => `minimum value is greater than or equal to ${min}`,
  large: (max: number) => `the maximum value is less than or equal to ${max}`,
  format: 'field is invalid',
  unequal: (relField: string) => `field must match ${relField} field`,
};
