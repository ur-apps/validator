import { isBoolean, isNumber } from '@ur-apps/common';

import { messages } from '../constants';
import type { TPrimitiveValidationResult as TValidationResult } from '../types';

import { BaseSchema, TBaseOptions } from './base';

export type TBooleanOptions = TBaseOptions & {
  isTrue?: { value: boolean; message: string };
  isFalse?: { value: boolean; message: string };
};

export class BooleanSchema extends BaseSchema<TBooleanOptions> {
  constructor(message?: string) {
    super('boolean', message ?? messages.boolean);
  }

  strict(message?: string) {
    this.schema.type.strict = true;
    this.schema.type.message = message ?? messages.boolean;

    return this;
  }

  isTrue(message?: string) {
    this.schema.isTrue = {
      value: true,
      message: message ?? messages.true,
    };
    if (this.schema.isFalse) {
      this.schema.isFalse.value = false;
    }

    return this;
  }

  isFalse(message?: string) {
    this.schema.isFalse = {
      value: true,
      message: message ?? messages.false,
    };
    if (this.schema.isTrue) {
      this.schema.isTrue.value = false;
    }

    return this;
  }

  /**
   * Validates value and returns the validation result in TValidationResult format
   * @param value any
   * @returns { TValidationResult } { isValid: boolean, value: cast value (if valid), error: error message (if invalid) }
   */
  validate(value: any): TValidationResult {
    const result = {
      valid: true,
      value,
      error: '',
    };

    if (this.schema.required?.value && !this.validateRequired(value)) {
      result.valid = false;
      result.error = this.schema.required.message;
      return result;
    }

    if (value !== undefined && value !== null) {
      if (this.validateType(value)) {
        result.value = Boolean(value);
      } else {
        result.valid = false;
        result.error = this.schema.type.message;
        return result;
      }

      for (const option in this.schema) {
        switch (option) {
          case 'type':
          case 'requred':
            break;

          case 'isTrue':
            if (!this.schema.isTrue?.value) break;
            if (this.validateIsTrue(result.value)) break;
            result.valid = false;
            result.value = value;
            result.error = this.schema.isTrue!.message;
            return result;

          case 'isFalse':
            if (!this.schema.isFalse?.value) break;
            if (this.validateIsFalse(result.value)) break;
            result.valid = false;
            result.value = value;
            result.error = this.schema.isFalse!.message;
            return result;

          default:
            break;
        }
      }
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
   * Casts the value to the boolean format (if strict mode is not enabled)
   * @description the cast method can cast only number 1 (true) or 0 (false)
   * @param {boolean | 0 | 1} value  that can be cast to a boolean (if strict mode is not enabled)
   * @returns boolean or an error if the value is not valid
   */
  cast(value: any): boolean {
    const valid = this.validateType(value);

    if (valid) {
      return Boolean(value);
    }

    throw new TypeError(messages.boolean);
  }

  private validateType(value: any): boolean {
    if (isBoolean(value)) return true;
    if (!this.schema.type.strict && isNumber(value) && (+value === 0 || +value === 1)) return true;

    return false;
  }

  private validateRequired(value: any): boolean {
    return value !== undefined && value !== null;
  }

  private validateIsTrue(value: boolean) {
    return value === true;
  }

  private validateIsFalse(value: boolean) {
    return value === false;
  }
}

export function boolean(message?: string) {
  return new BooleanSchema(message);
}
