import { messages as defaultMessages } from './messages';
import type { TValidationSchema, TFieldOptions, TValidationResult, TValidationMessages } from './types';

export class Validator<TValues extends Record<string, any>> {
  private readonly schema: TValidationSchema<TValues>;

  private readonly messages: TValidationMessages = defaultMessages;

  constructor(schema: TValidationSchema<TValues>, customMessages?: Partial<TValidationMessages>) {
    this.schema = schema;
    if (customMessages) this.messages = { ...defaultMessages, ...customMessages };
  }

  validateOne(value: any, fieldSchema: TFieldOptions, relatedValue?: any) {
    const result = {
      valid: true,
      value,
      error: '',
    };

    if (fieldSchema.required) {
      if (!this.validateRequired(value)) {
        result.error = fieldSchema.required.message ?? this.getErrorMessage('required');
        result.valid = false;
        return result;
      }
    }

    if (value || value === 0) {
      for (const option in fieldSchema) {
        switch (option) {
          case 'required':
            break;

          case 'type':
            if (fieldSchema.type.value === 'number') {
              if (this.validateNumber(value)) {
                result.value = +value;
              } else {
                result.error = fieldSchema.type.message ?? this.getErrorMessage('type');
                result.valid = false;
                return result;
              }
            }
            break;

          case 'length':
            if (this.validateLength(value, fieldSchema.legnth!.value)) break;
            result.error = fieldSchema.legnth?.message ?? this.getErrorMessage('legnth', fieldSchema.legnth?.value);
            result.valid = false;
            return result;

          case 'minLength':
            if (this.validateMinLength(value, fieldSchema.minLength!.value)) break;
            result.error =
              fieldSchema.minLength?.message ?? this.getErrorMessage('minLength', fieldSchema.minLength?.value);
            result.valid = false;
            return result;

          case 'maxLength':
            if (this.validateMaxLength(value, fieldSchema.maxLength!.value)) break;
            result.error =
              fieldSchema.maxLength?.message ?? this.getErrorMessage('maxLength', fieldSchema.maxLength?.value);
            result.valid = false;
            return result;

          case 'min':
            if (this.validateMin(value, fieldSchema.min!.value)) break;
            result.error = fieldSchema.min?.message ?? this.getErrorMessage('min', fieldSchema.min?.value);
            result.valid = false;
            return result;

          case 'max':
            if (this.validateMax(value, fieldSchema.max!.value)) break;
            result.error = fieldSchema.max?.message ?? this.getErrorMessage('max', fieldSchema.max!.value);
            result.valid = false;
            return result;

          case 'pattern':
            if (this.validatePattern(value, fieldSchema.pattern!.value)) break;
            result.error = fieldSchema.pattern?.message ?? this.getErrorMessage('pattern');
            result.valid = false;
            return result;

          case 'equalField':
            if (relatedValue === undefined) break;
            if (this.validateEqual(value, relatedValue)) break;
            result.error =
              fieldSchema.equalField?.message ?? this.getErrorMessage('equalField', fieldSchema.equalField!.name);
            result.valid = false;
            return result;

          default:
            break;
        }
      }
    }

    return result;
  }

  validateAll(values: TValues): TValidationResult<TValues> {
    const result: TValidationResult<TValues> = {
      errors: {},
      values,
      valid: true,
    };

    for (const name in this.schema) {
      const value: TValues[keyof TValues] = values[name];
      const fieldSchema = this.schema[name];
      if (!fieldSchema) continue;

      const fieldResult = this.validateOne(
        value,
        fieldSchema,
        fieldSchema.equalField && values[fieldSchema.equalField.name]
      );

      if (!fieldResult.valid) {
        result.errors[name] = fieldResult.error;
        result.valid = false;
      }
      if (fieldResult.valid && fieldResult.value !== value) result.values[name] = fieldResult.value;
    }

    return result;
  }

  validateChosen(values: TValues, fields: Array<keyof TValues>): TValidationResult<TValues> {
    const result: TValidationResult<TValues> = {
      errors: {},
      values,
      valid: true,
    };

    for (const name of fields) {
      const value: TValues[keyof TValues] = values[name];
      const fieldSchema = this.schema[name];
      if (!fieldSchema) continue;

      const fieldResult = this.validateOne(
        value,
        fieldSchema,
        fieldSchema.equalField && values[fieldSchema.equalField.name]
      );

      if (!fieldResult.valid) {
        result.errors[name] = fieldResult.error;
        result.valid = false;
      }
      if (fieldResult.valid && fieldResult.value !== value) result.values[name] = fieldResult.value;
    }

    return result;
  }

  private validateNumber(value: number | string): boolean {
    return Number.isFinite(+value);
  }

  private validateRequired(value: string): boolean {
    if (typeof value === 'string' && value) return true;
    if (typeof value === 'number' && (value === 0 || value)) return true;

    return false;
  }

  private validateLength(value: string, length: number): boolean {
    if (typeof value === 'string' && value.length === length) return true;

    return false;
  }

  private validateMinLength(value: string, length: number): boolean {
    if (typeof value === 'string' && value.length >= length) return true;

    return false;
  }

  private validateMaxLength(value: string, length: number): boolean {
    if (typeof value === 'string' && value.length <= length) return true;

    return false;
  }

  private validateMin(value: string | number, min: number): boolean {
    if (typeof value === 'number' && value >= min) return true;
    if (typeof value === 'string' && value !== '' && +value >= min) return true;

    return false;
  }

  private validateMax(value: string | number, max: number): boolean {
    if (typeof value === 'number' && value <= max) return true;
    if (typeof value === 'string' && value !== '' && +value <= max) return true;

    return false;
  }

  private validatePattern(value: string, pattern: RegExp): boolean {
    return pattern.test(value);
  }

  private validateEqual(value: string | number, equalValue: string | number): boolean {
    return value === equalValue;
  }

  private getErrorMessage(option: keyof TFieldOptions, value?: number | string): string {
    switch (option) {
      case 'type':
        return this.messages.type;

      case 'required':
        return this.messages.required;

      case 'legnth':
        return typeof this.messages.length === 'string' ? this.messages.length : this.messages.length(value as number);

      case 'minLength':
        return typeof this.messages.short === 'string' ? this.messages.short : this.messages.short(value as number);

      case 'maxLength':
        return typeof this.messages.long === 'string' ? this.messages.long : this.messages.long(value as number);

      case 'min':
        return typeof this.messages.small === 'string' ? this.messages.small : this.messages.small(value as number);

      case 'max':
        return typeof this.messages.large === 'string' ? this.messages.large : this.messages.large(value as number);

      case 'pattern':
        return this.messages.format;

      case 'equalField':
        return typeof this.messages.unequal === 'string'
          ? this.messages.unequal
          : this.messages.unequal(value as string);

      default:
        return '';
    }
  }
}

export default Validator;
