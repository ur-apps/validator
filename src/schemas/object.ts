import { clone, isObject } from '@ur-apps/common';

import { messages } from '../constants';
import type { ArraySchema, BooleanSchema, NumberSchema, StringSchema } from '../schemas';
import type { TValidationResult } from '../types';

import { BaseSchema, TBaseOptions } from './base';

export type TObjectOptions = TBaseOptions & {
  entries?: TObjectEntries;
};

type TObjectEntries = Record<string, ArraySchema | BooleanSchema | NumberSchema | StringSchema | ObjectSchema>;

type TValidateOptions = {
  /**
   * Cleans properties that are not in the schema
   * @default false
   */
  clean?: boolean;
};

export class ObjectSchema extends BaseSchema<TObjectOptions> {
  constructor(message?: string) {
    super('object', message ?? messages.object);
  }

  entries(entries: TObjectEntries) {
    this.schema.entries = entries;
    return this;
  }

  /**
   * Validates value and returns the validation result in TValidationResult format
   * @param value any
   * @returns { TValidationResult } { isValid: boolean, value: cast value (if valid), error: error message or object with property errors (if invalid) }
   */
  validate(value: any, options?: TValidateOptions): TValidationResult {
    const withClean = options?.clean ?? false;
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

      if (this.schema.entries) {
        result.value = clone(value);

        for (const key in this.schema.entries) {
          const entryResult = this.schema.entries[key].validate(result.value[key], options);

          if (entryResult.valid) {
            result.value[key] = entryResult.value;
          } else {
            if (typeof result.error === 'string') result.error = {};

            result.valid = false;
            result.error[key] = entryResult.error;
          }
        }
      }
    }

    if (result.valid) {
      if (withClean) result.value = this._clean(result.value);
    } else {
      result.value = value;
    }

    return result;
  }

  /**
   * Validates value and returns the validation result in boolean format
   * @param value any
   * @returns {boolean} true or false
   */
  isValid(value: any): boolean {
    return this.validate(value).valid;
  }

  /**
   * Casts the object and its values to the format specified in the schema (if strict mode is not enabled)
   * @param value an object with data that can be cast to the format specified in the schema
   * @returns object with cast data or an error if the data is not valid
   */
  cast(value: any) {
    if (isObject(value)) {
      const validation = this.validate(value);

      if (validation.valid) {
        return validation.value;
      }

      throw TypeError(
        typeof validation.error === 'string' ? validation.error : JSON.stringify(validation.error, undefined, 2)
      );
    }

    throw TypeError(messages.object);
  }

  /**
   * Validates, cleans and casts the object and its values to the format specified in the schema
   * @param value an object with data that can be cleaned and cast to the format specified in the schema
   * @returns object with cleaned and cast data or an error if the data is not valid
   */
  clean(value: any) {
    if (isObject(value)) {
      const validation = this.validate(value, { clean: true });

      if (validation.valid) {
        return validation.value;
      }

      throw TypeError(
        typeof validation.error === 'string' ? validation.error : JSON.stringify(validation.error, undefined, 2)
      );
    }

    throw TypeError(messages.object);
  }

  private _clean(value: any) {
    let result: undefined | Record<string, any> = isObject(value) ? {} : undefined;

    if (this.schema.entries && isObject(value)) {
      if (typeof result === 'undefined') result = {};

      for (const key in this.schema.entries) {
        // @ts-ignore
        if (value[key] !== undefined && value[key] !== null) {
          // @ts-ignore
          result[key] = value[key];
        }
      }
    } else {
      result = value;
    }

    return result;
  }

  private validateType(value: any): boolean {
    return isObject(value);
  }

  private validateRequired(value: any): boolean {
    return value !== undefined && value !== null;
  }
}

export function object(message?: string) {
  return new ObjectSchema(message);
}
