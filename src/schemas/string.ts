import { messages } from '../constants';
import { TBaseOptions, BaseSchema } from './base';

export type TStringOptions = TBaseOptions & {
  length?: { value: number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  match?: { value: RegExp; message: string };
};

type TValidationResult = {
  valid: boolean;
  value: any;
  error: string;
};

export class StringSchema extends BaseSchema<TStringOptions> {
  constructor(message?: string) {
    super('string', message ?? messages.string);
  }

  strict(message?: string) {
    this.schema.type.strict = true;
    this.schema.type.message = message ?? messages.string;

    return this;
  }

  length(value: number, message?: string) {
    this.schema.length = {
      value,
      message: message ?? messages.length(value),
    };
    return this;
  }

  minLength(value: number, message?: string) {
    this.schema.minLength = {
      value,
      message: message ?? messages.short(value),
    };
    return this;
  }

  maxLength(value: number, message?: string) {
    this.schema.maxLength = {
      value,
      message: message ?? messages.long(value),
    };
    return this;
  }

  match(value: RegExp, message?: string) {
    this.schema.match = {
      value,
      message: message ?? messages.format,
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
        result.value = String(value);
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

          case 'length':
            if (this.validateLength(result.value, this.schema.length!.value)) break;
            result.valid = false;
            result.value = value;
            result.error = this.schema.length!.message;
            return result;

          case 'minLength':
            if (this.validateMinLength(result.value, this.schema.minLength!.value)) break;
            result.valid = false;
            result.value = value;
            result.error = this.schema.minLength!.message;
            return result;

          case 'maxLength':
            if (this.validateMaxLength(result.value, this.schema.maxLength!.value)) break;
            result.valid = false;
            result.value = value;
            result.error = this.schema.maxLength!.message;
            return result;

          case 'match':
            if (this.validateMatch(result.value, this.schema.match!.value)) break;
            result.valid = false;
            result.value = value;
            result.error = this.schema.match!.message;
            return result;

          default:
            break;
        }
      }
    }
    return result;
  }

  isValid(value: any): boolean {
    return this.validate(value).valid;
  }

  cast(value: any): string {
    const valid = this.validateType(value);

    if (valid) {
      return String(value);
    }

    throw new TypeError(messages.string);
  }

  protected validateRequired(value: any): boolean {
    if (value !== undefined && value !== null && value !== '') return true;

    return false;
  }

  private validateType(value: any): boolean {
    if (this.isString(value)) return true;
    if (!this.schema.type.strict && this.isNumber(value)) return true;

    return false;
  }

  private validateLength(value: string, length: number): boolean {
    if (value.length === length) return true;

    return false;
  }

  private validateMinLength(value: string, min: number): boolean {
    if (value.length >= min) return true;

    return false;
  }

  private validateMaxLength(value: string, max: number): boolean {
    if (value.length <= max) return true;

    return false;
  }

  private validateMatch(value: string, regexp: RegExp): boolean {
    return regexp.test(value);
  }
}

export function string(message?: string) {
  return new StringSchema(message);
}
