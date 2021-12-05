import { TArrayOptions, TBooleanOptions, TNumberOptions, TObjectOptions, TStringOptions } from '../schemas';

export { TArrayOptions, TBooleanOptions, TNumberOptions, TObjectOptions, TStringOptions };

export type TDataTypes = 'string' | 'number' | 'boolean' | 'object' | 'array';

export type TValidationSchema<TValues extends Record<string, any> = Record<string, any>> = {
  [key in keyof TValues]?: TFieldOptions;
};

export type TFieldOptions = {
  type: { value: 'string' | 'number' | 'boolean'; message?: string };
  required?: { value: boolean; message?: string };
  length?: { value: number; message?: string };
  minLength?: { value: number; message?: string };
  maxLength?: { value: number; message?: string };
  min?: { value: number; message?: string };
  max?: { value: number; message?: string };
  pattern?: { value: RegExp; message?: string };
  equalField?: { name: string; message?: string };
};

export type TValidationMessages = {
  type: string;
  required: string;
  length: string | ((length: number) => string);
  short: string | ((length: number) => string);
  long: string | ((length: number) => string);
  small: string | ((min: number) => string);
  large: string | ((max: number) => string);
  format: string;
  unequal: string | ((relField: string) => string);
};

export type TDefaultMessages = {
  type: string;
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
};

export type TValidationResult<TValues> = {
  valid: boolean;
  errors: TErrors<TValues>;
  values: TValues;
};

export type TErrors<T = Record<string, string>> = {
  [key in keyof T]?: string;
};
