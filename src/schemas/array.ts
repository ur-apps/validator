import { TBaseOptions, BaseSchema } from './base';
import { clone, isArray } from '../utils';
import { messages } from '../constants';
import type { BooleanSchema, NumberSchema, ObjectSchema, StringSchema } from '../schemas';

export type TArrayOptions = TBaseOptions & {
  length?: { value: number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  entry?: TArrayEntry;
};

type TArrayEntry = ArraySchema | BooleanSchema | NumberSchema | ObjectSchema | StringSchema;

type TError =
  | string
  | {
      [key: string]: TError;
    };

type TValidationResult = {
  valid: boolean;
  value: any;
  error: TError;
};

export class ArraySchema extends BaseSchema<TArrayOptions> {
  constructor(message?: string) {
    super('array', message ?? messages.array);
  }

  length(value: number, message?: string) {
    this.schema.length = {
      value,
      message: message ?? messages.arrayLength(value),
    };
    return this;
  }

  minLength(value: number, message?: string) {
    this.schema.minLength = {
      value,
      message: message ?? messages.arrayShort(value),
    };
    return this;
  }

  maxLength(value: number, message?: string) {
    this.schema.maxLength = {
      value,
      message: message ?? messages.arrayLong(value),
    };
    return this;
  }

  of(entry: TArrayEntry) {
    this.schema.entry = entry;
    return this;
  }

  validate(value: Array<any>) {
    const result: TValidationResult = {
      valid: true,
      value: value,
      error: '',
    };

    if (this.schema.required?.value && !this.validateRequired(value)) {
      result.valid = false;
      result.error = this.schema.required.message;
      return result;
    }

    if (value !== undefined && value !== null) {
      if (!this.validateType(value)) {
        result.valid = false;
        result.error = this.schema.type.message;
        return result;
      }

      for (const option in this.schema) {
        switch (option) {
          case 'type':
          case 'requred':
          case 'entry':
            break;

          case 'length':
            if (this.validateLength(result.value, this.schema.length!.value)) break;
            result.valid = false;
            result.error = this.schema.length!.message;
            return result;

          case 'minLength':
            if (this.validateMinLength(result.value, this.schema.minLength!.value)) break;
            result.valid = false;
            result.error = this.schema.minLength!.message;
            return result;

          case 'maxLength':
            if (this.validateMaxLength(result.value, this.schema.maxLength!.value)) break;
            result.valid = false;
            result.error = this.schema.maxLength!.message;
            return result;

          default:
            break;
        }
      }

      if (this.schema.entry) {
        result.value = clone(value);

        for (let i = 0; i < value.length; i++) {
          const entryResult = this.schema.entry.validate(result.value[i]);

          if (entryResult.valid) {
            result.value[i] = entryResult.value;
          } else {
            if (typeof result.error === 'string') result.error = {};
            result.valid = false;
            result.error[i] = entryResult.error;
          }
        }
      }
    }

    if (!result.valid) result.value = value;
    return result;
  }

  isValid(values: any[]) {
    return this.validate(values).valid;
  }

  cast(value: any[]) {
    if (isArray(value)) {
      const validation = this.validate(value);

      if (validation.valid) {
        return validation.value;
      }

      throw TypeError(
        typeof validation.error === 'string' ? validation.error : JSON.stringify(validation.error, undefined, 2)
      );
    }

    throw TypeError(messages.array);
  }

  private validateType(value: any): boolean {
    return isArray(value);
  }

  private validateRequired(value: any): boolean {
    return value !== undefined && value !== null;
  }

  private validateLength(value: any[], length: number): boolean {
    return value.length === length;
  }

  private validateMinLength(value: any[], min: number): boolean {
    return value.length >= min;
  }

  private validateMaxLength(value: any[], max: number): boolean {
    return value.length <= max;
  }
}

export function array(message?: string) {
  return new ArraySchema(message);
}
