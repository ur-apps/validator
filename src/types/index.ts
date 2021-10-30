export type TValidationSchema<TValues extends Record<string, any> = Record<string, any>> = {
  [key in keyof TValues]?: TFieldOptions;
};

export type TFieldOptions = {
  type: { value: 'string' | 'number'; message?: string };
  required?: { value: boolean; message?: string };
  legnth?: { value: number; message?: string };
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

export type TValidationResult<TValues> = {
  valid: boolean;
  errors: {
    [key in keyof TValues]?: string;
  };
  values: TValues;
};
