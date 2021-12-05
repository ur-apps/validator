import { TBooleanOptions, TNumberOptions, TObjectOptions, TStringOptions } from 'schemas';
import { messages } from '../constants';
import { TBaseOptions, BaseSchema } from './base';

export type TArrayOptions = TBaseOptions & {
  length?: { value: number; message?: string };
  minLength?: { value: number; message?: string };
  maxLength?: { value: number; message?: string };
  entries?: TArrayEntries;
};

type TArrayEntries =
  | Array<TArrayOptions | TBooleanOptions | TNumberOptions | TObjectOptions | TStringOptions>
  | TArrayOptions
  | TBooleanOptions
  | TNumberOptions
  | TObjectOptions
  | TStringOptions;

class ArraySchema extends BaseSchema<TArrayOptions> {
  constructor(message?: string) {
    super('array', message);
  }

  length(value: number, message?: string) {
    this.schema.length = {
      value,
      message: message ?? messages.arrayLength(value),
    };
    return this;
  }

  minLength(value: number, message?: string) {
    this.schema.minLength = {
      value,
      message: message ?? messages.arrayShort(value),
    };
    return this;
  }

  maxLength(value: number, message?: string) {
    this.schema.maxLength = {
      value,
      message: message ?? messages.arrayLong(value),
    };
    return this;
  }

  entries(entries: TArrayEntries) {
    this.schema.entries = entries;
    return this;
  }
}

export function array(message?: string) {
  return new ArraySchema(message);
}
