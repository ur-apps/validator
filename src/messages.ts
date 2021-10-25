import type { TValidationMessages } from './types';

export const messages: TValidationMessages = {
  type: (name: string) => `${name} field is invalid`,
  required: (name: string) => `${name} is a required field`,
  length: (name: string, length: number) => `${name} must be exactly ${length} characters`,
  short: (name: string, length: number) => `${name} must be at least ${length} characters`,
  long: (name: string, length: number) => `${name} must be at most ${length} characters`,
  small: (name: string, min: number) => `${name} must be greater than or equal to ${min}`,
  large: (name: string, max: number) => `${name} must be less than or equal to ${max}`,
  format: (name: string) => `${name} field is invalid`,
  unequal: (name: string, relField: string) => `${name} field must equal ${relField} field`,
};
