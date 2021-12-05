import { messages } from '../constants';
import type { TDataTypes } from 'types';

export type TBaseOptions = {
  type: { value: TDataTypes; message: string };
  required?: { value: boolean; message: string };
};

export abstract class BaseSchema<T extends TBaseOptions> {
  protected readonly schema: T;

  constructor(type: TDataTypes, message?: string) {
    // @ts-ignore
    this.schema = {
      type: {
        value: type,
        message: message ?? messages.type,
      },
    };
  }

  required(message?: string) {
    this.schema.required = {
      value: true,
      message: message ?? messages.required,
    };
    return this;
  }

  notRequired(message?: string) {
    this.schema.required = {
      value: false,
      message: message ?? '',
    };
    return this;
  }

  end(): T {
    return this.schema;
  }
}
