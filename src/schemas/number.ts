import { messages } from '../constants';
import { isNumber, isString } from '../utils';
import { TBaseOptions, BaseSchema } from './base';

export type TNumberOptions = TBaseOptions & {
  min?: { value: number; message: string };
  max?: { value: number; message: string };
};

type TValidationResult = {
  valid: boolean;
  value: any;
  error: string;
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

  isValid(value: any): boolean {
    return this.validate(value).valid;
  }

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
    if (value !== undefined && value !== null && value !== '') return true;

    return false;
  }

  private validateMin(value: number, min: number): boolean {
    if (value >= min) return true;

    return false;
  }

  private validateMax(value: number, max: number): boolean {
    if (value <= max) return true;

    return false;
  }
}

export function number(message?: string) {
  return new NumberSchema(message);
}
