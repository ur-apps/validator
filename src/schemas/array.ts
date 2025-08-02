import { clone, isArray, isNullish } from '@ur-apps/common';

import { messages } from '../constants';
import type { BooleanSchema, NumberSchema, ObjectSchema, StringSchema } from '../schemas';
import type { TValidationResult } from '../types';

import { BaseSchema, TBaseOptions } from './base';

export type TArrayOptions = TBaseOptions & {
  length?: { value: number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  entry?: TArrayEntry;
};

type TArrayEntry = ArraySchema | BooleanSchema | NumberSchema | ObjectSchema | StringSchema;

type TValidateOptions = {
  /**
   * Cleans properties that are not in the schema
   * @default false
   */
  clean?: boolean;
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

  /**
   * Validates value and returns the validation result in TValidationResult format
   * @param value any
   * @returns { TValidationResult } { isValid: boolean, value: cast value (if valid), error: error message or object with items errors (if invalid) }
   */
  validate(value: any, options?: TValidateOptions): TValidationResult {
    const result: TValidationResult = {
      valid: true,
      value,
      error: '',
    };

    if (this.schema.required?.value && isNullish(value)) {
      result.valid = false;
      result.error = this.schema.required.message;

      return result;
    }

    if (isNullish(value)) {
      return result;
    }

    if (!this.validateType(value)) {
      result.valid = false;
      result.error = this.schema.type.message;

      return result;
    }

    for (const option in this.schema) {
      switch (option) {
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
        const entryResult = this.schema.entry.validate(result.value[i], options);

        if (entryResult.valid) {
          result.value[i] = entryResult.value;
        } else {
          if (typeof result.error === 'string') {
            result.error = {};
          }

          result.valid = false;
          result.error[i] = entryResult.error;
        }
      }
    }

    if (!result.valid) {
      result.value = value;
    }

    return result;
  }

  /**
   * Validates value and returns the validation result in boolean format
   * @param value any
   * @returns {boolean} true or false
   */
  isValid(values: any): boolean {
    return this.validate(values).valid;
  }

  /**
   * Casts the array and its values to the format specified in the schema (if strict mode is not enabled)
   * @param value an array with data that can be cast to the type specified in the schema
   * @returns array with cast data or an error if the data is not valid
   */
  cast(value: any) {
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
