import { TArrayOptions, TBooleanOptions, TNumberOptions, TObjectOptions, TStringOptions } from '../schemas';

export { TArrayOptions, TBooleanOptions, TNumberOptions, TObjectOptions, TStringOptions };

export type TDataTypes = 'array' | 'boolean' | 'number' | 'object' | 'string';

export type TError =
  | string
  | {
      [key: string]: TError;
    };

export type TValidationResult = {
  valid: boolean;
  value: any;
  error: TError;
};

export type TPrimitiveValidationResult = {
  valid: boolean;
  value: any;
  error: string;
};

export type TDefaultMessages = {
  type: string;
  string: string;
  number: string;
  boolean: string;
  object: string;
  array: string;
  required: string;
  length: (length: number) => string;
  short: (length: number) => string;
  long: (length: number) => string;
  arrayLength: (length: number) => string;
  arrayShort: (length: number) => string;
  arrayLong: (length: number) => string;
  small: (min: number) => string;
  large: (max: number) => string;
  format: string;
  unequal: (relField: string) => string;
  true: string;
  false: string;
};
