import { clone, isNullish, isObject } from '@ur-apps/common';

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
  constructor(entries?: TObjectEntries);
  constructor(message?: string);
  constructor(entries?: TObjectEntries, message?: string);
  constructor(entriesOrMessage?: TObjectEntries | string, message?: string) {
    if (typeof entriesOrMessage === 'string' || entriesOrMessage === undefined) {
      super('object', entriesOrMessage ?? messages.object);
    } else {
      super('object', message ?? messages.object);
      this.schema.entries = entriesOrMessage;
    }
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

    if (!isNullish(value)) {
      if (!this.validateType(value)) {
        result.valid = false;
        result.error = this.schema.type.message;

        return result;
      }

      if (this.schema.entries) {
        result.value = clone(value);

        const entriesResult = this.validateEntries(result.value, options);

        result.valid = entriesResult.valid;
        result.value = entriesResult.value;
        result.error = entriesResult.error;
      }
    }

    if (result.valid && options?.clean) {
      result.value = this._clean(result.value);
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

  private _clean<T extends Record<string, any>>(value: T) {
    if (!this.schema.entries || !isObject(value)) return value;

    const result = clone(value);

    for (const key of Object.keys(value)) {
      if (!this.schema.entries[key]) {
        delete result[key];
      }
    }

    return result;
  }

  private validateType(value: any): boolean {
    return isObject(value);
  }

  private validateEntries(value: any, options?: TValidateOptions) {
    const result: TValidationResult = {
      valid: true,
      value: clone(value),
      error: '',
    };

    for (const key in this.schema.entries) {
      const entryResult = this.schema.entries[key].validate(result.value[key], options);

      if (entryResult.valid) {
        result.value[key] = entryResult.value;
      } else {
        if (typeof result.error === 'string') {
          result.error = {};
        }

        result.valid = false;
        result.error[key] = entryResult.error;
      }
    }

    return result;
  }
}

export function object(message?: string) {
  return new ObjectSchema(message);
}
