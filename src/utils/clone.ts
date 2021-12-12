import { isObject, isArray } from './type-checkers';

export function clone(value: any): any {
  if (isObject(value)) {
    return cloneObject(value);
  } else if (isArray(value)) {
    return cloneArray(value);
  } else {
    return value;
  }
}

function cloneObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const item of Object.entries(obj)) {
    const [key, value] = item;
    result[key] = clone(value);
  }

  return result;
}

function cloneArray(arr: Array<any>): Array<any> {
  const result: Array<any> = [];

  for (const item of arr) {
    result.push(clone(item));
  }

  return result;
}
