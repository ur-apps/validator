export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

export function isNumber(value: unknown): value is number {
  return (typeof value === 'number' || value instanceof Number) && !Number.isNaN(+value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean' || value instanceof Boolean;
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export function isArray<V>(value: unknown): value is V[] {
  return Array.isArray(value);
}
