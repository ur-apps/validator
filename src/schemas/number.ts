import { messages } from '../constants';
import { TBaseOptions, BaseSchema } from './base';

export type TNumberOptions = TBaseOptions & {
  min?: { value: number; message?: string };
  max?: { value: number; message?: string };
  match?: { value: RegExp; message?: string };
  equalField?: { name: string; message?: string };
};

class NumberSchema extends BaseSchema<TNumberOptions> {
  constructor(message?: string) {
    super('number', message);
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

export function number(message?: string) {
  return new NumberSchema(message);
}
