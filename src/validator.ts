import { messages as defaultMessages } from './messages';
import type { TValidationSchema, TFieldOptions, TValidationResult, TValidationMessages } from './types';

export class Validator<TValues extends Record<string, any>> {
  private readonly schema: TValidationSchema<TValues>;

  private readonly messages: TValidationMessages = defaultMessages;

  constructor(schema: TValidationSchema<TValues>, customMessages?: Partial<TValidationMessages>) {
    this.schema = schema;
    if (customMessages) this.messages = { ...defaultMessages, ...customMessages };
  }

  validateOne(value: any, name: string, fieldSchema: TFieldOptions, relatedValue?: any) {
    const result = {
      value,
      error: '',
      valid: true,
    };

    if (fieldSchema.required) {
      if (!this.validateRequired(value)) {
        result.error = this.getErrorMessage('required', name);
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
                result.error = this.getErrorMessage('type', name);
                result.valid = false;
                return result;
              }
            }
            break;

          case 'length':
            if (this.validateLength(value, fieldSchema.legnth!.value)) break;
            result.error = this.getErrorMessage('legnth', name, fieldSchema.legnth?.value);
            result.valid = false;
            return result;

          case 'minLength':
            if (this.validateMinLength(value, fieldSchema.minLength!.value)) break;
            result.error = this.getErrorMessage('minLength', name, fieldSchema.minLength?.value);
            result.valid = false;
            return result;

          case 'maxLength':
            if (this.validateMaxLength(value, fieldSchema.maxLength!.value)) break;
            result.error = this.getErrorMessage('maxLength', name, fieldSchema.maxLength?.value);
            result.valid = false;
            return result;

          case 'min':
            if (this.validateMin(value, fieldSchema.min!.value)) break;
            result.error = this.getErrorMessage('min', name, fieldSchema.min?.value);
            result.valid = false;
            return result;

          case 'max':
            if (this.validateMax(value, fieldSchema.max!.value)) break;
            result.error = this.getErrorMessage('max', name, fieldSchema.max!.value);
            result.valid = false;
            return result;

          case 'pattern':
            if (this.validatePattern(value, fieldSchema.pattern!.value)) break;
            result.error = this.getErrorMessage('pattern', name);
            result.valid = false;
            return result;

          case 'equalField':
            if (relatedValue === undefined) break;
            if (this.validateEqual(value, relatedValue)) break;
            result.error = this.getErrorMessage('equalField', name, fieldSchema.equalField!.name);
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
        name,
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
        name as string,
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

  private getErrorMessage(option: keyof TFieldOptions, fieldName: string, value?: number | string): string {
    const message = this.schema[fieldName]?.[option]?.message;
    if (message) return message;

    switch (option) {
      case 'type':
        return message || typeof this.messages.type === 'string'
          ? (this.messages.type as string)
          : this.messages.type(fieldName);

      case 'required':
        return message || typeof this.messages.required === 'string'
          ? (this.messages.required as string)
          : this.messages.required(fieldName);

      case 'legnth':
        return message || typeof this.messages.length === 'string'
          ? (this.messages.length as string)
          : this.messages.length(fieldName, value as number);

      case 'minLength':
        return message || typeof this.messages.short === 'string'
          ? (this.messages.short as string)
          : this.messages.short(fieldName, value as number);

      case 'maxLength':
        return message || typeof this.messages.long === 'string'
          ? (this.messages.long as string)
          : this.messages.long(fieldName, value as number);

      case 'min':
        return message || typeof this.messages.small === 'string'
          ? (this.messages.small as string)
          : this.messages.small(fieldName, value as number);

      case 'max':
        return message || typeof this.messages.large === 'string'
          ? (this.messages.large as string)
          : this.messages.large(fieldName, value as number);

      case 'pattern':
        return message || typeof this.messages.format === 'string'
          ? (this.messages.format as string)
          : this.messages.format(fieldName);

      case 'equalField':
        return message || typeof this.messages.unequal === 'string'
          ? (this.messages.unequal as string)
          : this.messages.unequal(fieldName, value as string);

      default:
        return '';
    }
  }
}

export default Validator;
