import { messages } from '../constants';
import type { TDataTypes } from '../types';

export type TBaseOptions = {
  type: { value: TDataTypes; strict: boolean; message: string };
  required?: { value: boolean; message: string };
};

export abstract class BaseSchema<T extends TBaseOptions> {
  protected readonly schema: T;

  constructor(type: TDataTypes, message?: string) {
    this.schema = {
      type: {
        value: type,
        strict: false,
        message: message ?? messages.type,
      },
    } as T;
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
}
