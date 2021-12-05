import { TBaseOptions, BaseSchema } from './base';
import type { TArrayOptions, TBooleanOptions, TNumberOptions, TStringOptions } from 'schemas';

export type TObjectOptions = TBaseOptions & {
  entries?: TObjectEntries;
};

type TObjectEntries = Record<
  string,
  TArrayOptions | TBooleanOptions | TNumberOptions | TObjectOptions | TStringOptions
>;

class ObjectSchema extends BaseSchema<TObjectOptions> {
  constructor(message?: string) {
    super('object', message);
  }

  entries(entries: TObjectEntries) {
    this.schema.entries = entries;
    return this;
  }
}

export function object(message?: string) {
  return new ObjectSchema(message);
}
