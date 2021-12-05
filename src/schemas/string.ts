import { messages } from '../constants';
import { TBaseOptions, BaseSchema } from './base';

export type TStringOptions = TBaseOptions & {
  length?: { value: number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  match?: { value: RegExp; message: string };
  equalField?: { name: string; message: string };
};

class StringSchema extends BaseSchema<TStringOptions> {
  constructor(message?: string) {
    super('string', message);
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

  match(regexp: RegExp, message?: string) {
    this.schema.match = {
      value: regexp,
      message: message ?? messages.format,
    };
    return this;
  }

  equalsTo(fieldName: string, message?: string) {
    this.schema.equalField = {
      name: fieldName,
      message: message ?? messages.unequal(fieldName),
    };
    return this;
  }
}

export function string(message?: string) {
  return new StringSchema(message);
}
