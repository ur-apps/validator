import {
  array,
  ArraySchema,
  boolean,
  BooleanSchema,
  number,
  NumberSchema,
  object,
  ObjectSchema,
  string,
  StringSchema,
} from './schemas';

export { array, boolean, number, object, string, ArraySchema, BooleanSchema, NumberSchema, ObjectSchema, StringSchema };
export * from './constants';
export * from './types';
export const uv = {
  array,
  boolean,
  number,
  object,
  string,
};

export default uv;
