import { isObject, isArray } from './type-checkers';

export function clone<V>(value: V): V {
  if (isObject(value)) {
    return cloneObject(value);
  } else if (isArray(value)) {
    return cloneArray(value);
  } else {
    return value;
  }
}

function cloneObject<V extends Record<string, unknown>>(obj: V): V {
  const result: V = {} as V;

  for (const item of Object.entries(obj)) {
    const [key, value] = item;

    (result as Record<string, unknown>)[key] = clone(value);
  }

  return result;
}

function cloneArray<V extends Array<unknown>>(arr: V): V {
  const result: V = [] as unknown as V;

  for (const item of arr) {
    result.push(clone(item));
  }

  return result;
}
