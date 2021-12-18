import { TBaseOptions, BaseSchema } from './base';
import { isNumber, isString } from '../utils';
import { messages } from '../constants';
import type { TPrimitiveValidationResult as TValidationResult } from '../types';

export type TNumberOptions = TBaseOptions & {
  min?: { value: number; message: string };
  max?: { value: number; message: string };
};

export class NumberSchema extends BaseSchema<TNumberOptions> {
  constructor(message?: string) {
    super('number', message ?? messages.number);
  }

  strict(message?: string) {
    this.schema.type.strict = true;
    this.schema.type.message = message ?? messages.number;

    return this;
  }

  min(value: number, message?: string) {
    this.schema.min = {
      value,
      message: message ?? messages.small(value),
    };
    return this;
  }

  max(value: number, message?: string) {
    this.schema.max = {
      value,
      message: message ?? messages.large(value),
    };
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

    if (value !== undefined && value !== null && value !== '') {
      if (this.validateType(value)) {
        result.value = Number(value);
      } else {
        result.valid = false;
        result.error = this.schema.type.message;
        return result;
      }
    }

    for (const option in this.schema) {
      switch (option) {
        case 'type':
        case 'requred':
          break;

        case 'min':
          if (this.validateMin(result.value, this.schema.min!.value)) break;
          result.valid = false;
          result.value = value;
          result.error = this.schema.min!.message;
          return result;

        case 'max':
          if (this.validateMax(result.value, this.schema.max!.value)) break;
          result.valid = false;
          result.value = value;
          result.error = this.schema.max!.message;
          return result;

        default:
          break;
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
   * Casts the value to the number format (if strict mode is not enabled)
   * @description the cast method can cast only string with numbers (no letters or symbols)
   * @param {number | string} value  that can be cast to a number (if strict mode is not enabled)
   * @returns number or an error if the value is not valid
   */
  cast(value: any): number {
    const valid = this.validateType(value);

    if (valid) {
      return Number(value);
    }

    throw new TypeError(messages.number);
  }

  private validateType(value: any): boolean {
    if (isNumber(value)) return true;
    if (!this.schema.type.strict && isString(value) && value.trim() && !Number.isNaN(+value)) return true;

    return false;
  }

  private validateRequired(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  private validateMin(value: number, min: number): boolean {
    return value >= min;
  }

  private validateMax(value: number, max: number): boolean {
    return value <= max;
  }
}

export function number(message?: string) {
  return new NumberSchema(message);
}
