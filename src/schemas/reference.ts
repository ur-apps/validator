import { get, isArray, isString } from '@ur-apps/common';

import { TValidationContext } from '../types';

export class Reference {
  private path: string | string[] = '';
  private isRoot: boolean = false;

  constructor(path: string | string[]) {
    if (isArray(path) && path.length && path[0].startsWith('$')) {
      this.path = [path[0].slice(1), ...path.slice(1)];
      this.isRoot = true;
    } else if (isArray(path)) {
      this.path = path;
    } else if (isString(path) && path.startsWith('$')) {
      this.path = path.slice(1);
      this.isRoot = true;
    } else {
      this.path = path;
    }
  }

  getPath(): string | string[] {
    return this.path;
  }

  getValue(context: TValidationContext): any {
    if (this.isRoot && context.root) {
      return get(context.root, this.path);
    }

    if (!this.isRoot && context.parent) {
      return get(context.parent, this.path);
    }

    return undefined;
  }
}

export function ref(path: string | string[]): Reference {
  return new Reference(path);
}
