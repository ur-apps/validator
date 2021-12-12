export function isString(value: any): boolean {
  return typeof value === 'string' || value instanceof String;
}

export function isNumber(value: any): boolean {
  return (typeof value === 'number' || value instanceof Number) && !Number.isNaN(+value);
}

export function isBoolean(value: any) {
  return typeof value === 'boolean' || value instanceof Boolean;
}

export function isObject(value: any): boolean {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}
