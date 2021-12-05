import { messages } from '../constants';
import { TBaseOptions, BaseSchema } from './base';

export type TBooleanOptions = TBaseOptions & {
  equalField?: { name: string; message?: string };
};

class BooleanSchema extends BaseSchema<TBooleanOptions> {
  constructor(message?: string) {
    super('boolean', message);
  }

  equalsTo(fieldName: string, message?: string) {
    this.schema.equalField = {
      name: fieldName,
      message: message ?? messages.unequal(fieldName),
    };
    return this;
  }
}

export function boolean(message?: string) {
  return new BooleanSchema(message);
}
