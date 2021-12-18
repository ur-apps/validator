import { TBaseOptions, BaseSchema } from './base';
import { clone, isObject } from '../utils';
import { messages } from '../constants';
import type { ArraySchema, BooleanSchema, NumberSchema, StringSchema } from '../schemas';
import type { TValidationResult } from '../types';

export type TObjectOptions = TBaseOptions & {
  entries?: TObjectEntries;
};

type TObjectEntries = Record<string, ArraySchema | BooleanSchema | NumberSchema | StringSchema | ObjectSchema>;

export class ObjectSchema extends BaseSchema<TObjectOptions> {
  constructor(message?: string) {
    super('object', message ?? messages.object);
  }

  entries(entries: TObjectEntries) {
    this.schema.entries = entries;
    return this;
  }

  validate(value: any) {
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
          const entryResult = this.schema.entries[key].validate(result.value[key]);

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

    if (!result.valid) result.value = value;
    return result;
  }

  isValid(value: any) {
    return this.validate(value).valid;
  }

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
