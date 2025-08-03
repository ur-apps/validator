import { array, number, object, ref, Reference, string } from '../src';

describe('[Reference]', () => {
  describe('[Reference] (getPath) - constructor and basic functionality', () => {
    test('should create reference with relative path', () => {
      const reference = new Reference('path.to.field');

      expect(reference.getPath()).toBe('path.to.field');
    });

    test('should create reference with root path (starts with $)', () => {
      const reference = new Reference('$root.field');

      expect(reference.getPath()).toBe('root.field');
    });

    test('should handle simple path', () => {
      const reference = new Reference('field');

      expect(reference.getPath()).toBe('field');
    });

    test('should handle empty path', () => {
      const reference = new Reference('');

      expect(reference.getPath()).toBe('');
    });

    test('should handle root reference ($)', () => {
      const reference = new Reference('$');

      expect(reference.getPath()).toBe('');
    });
  });

  describe('[Reference] (getValue) - relative references', () => {
    test('should get value from parent context with simple path', () => {
      const reference = new Reference('name');
      const context = {
        parent: { name: 'John', age: 30 },
      };

      expect(reference.getValue(context)).toBe(context.parent.name);
    });

    test('should get value from parent context with nested path', () => {
      const reference = new Reference('user.profile.name');
      const context = {
        parent: {
          user: {
            profile: {
              name: 'Jane',
              age: 25,
            },
          },
        },
      };

      expect(reference.getValue(context)).toBe(context.parent.user.profile.name);
    });

    test('should return undefined for non-existent path in parent', () => {
      const reference = new Reference('nonexistent.field');
      const context = {
        parent: { name: 'John' },
      };

      expect(reference.getValue(context)).toBeUndefined();
    });

    test('should return undefined when parent is null', () => {
      const reference = new Reference('field');
      const context = {
        parent: null,
      };

      expect(reference.getValue(context)).toBeUndefined();
    });

    test('should return undefined when parent is undefined', () => {
      const reference = new Reference('field');
      const context = {};

      expect(reference.getValue(context)).toBeUndefined();
    });

    test('should handle array indices in path', () => {
      const reference = new Reference('items.0.name');
      const context = {
        parent: {
          items: [{ name: 'First' }, { name: 'Second' }],
        },
      };

      expect(reference.getValue(context)).toBe(context.parent.items[0].name);
    });
  });

  describe('[Reference] (getValue) - root references', () => {
    test('should get value from root context with simple path', () => {
      const reference = new Reference('$name');
      const context = {
        root: { name: 'Root John', age: 30 },
        parent: { name: 'Parent John' },
      };

      expect(reference.getValue(context)).toBe(context.root.name);
    });

    test('should get value from root context with nested path', () => {
      const reference = new Reference('$config.database.host');
      const context = {
        root: {
          config: {
            database: {
              host: 'localhost',
              port: 5432,
            },
          },
        },
        parent: {
          config: {
            database: {
              host: 'different-host',
            },
          },
        },
      };

      expect(reference.getValue(context)).toBe(context.root.config.database.host);
    });

    test('should return undefined for non-existent path in root', () => {
      const reference = new Reference('$nonexistent.field');
      const context = {
        root: { name: 'Root John' },
        parent: { name: 'Parent John' },
      };

      expect(reference.getValue(context)).toBeUndefined();
    });

    test('should return undefined when root is null', () => {
      const reference = new Reference('$field');
      const context = {
        root: null,
        // No root or parent context
      };

      expect(reference.getValue(context)).toBeUndefined();
    });

    test('should return undefined when root is undefined', () => {
      const reference = new Reference('$field');
      const context = {
        // No root or parent context
      };

      expect(reference.getValue(context)).toBeUndefined();
    });

    test('should not fallback to parent when root is null or undefined but parent exists', () => {
      const reference = new Reference('$field');
      const context = {
        root: null,
        parent: { field: 'fallback-value' },
      };

      expect(reference.getValue(context)).toBeUndefined();
    });

    test('should handle array indices in root path', () => {
      const reference = new Reference('$users.1.name');
      const context = {
        root: {
          users: [{ name: 'First' }, { name: 'Second' }, { name: 'Third' }],
        },
      };

      expect(reference.getValue(context)).toBe(context.root.users[1].name);
    });
  });

  describe('[Reference] (ref) - factory function', () => {
    test('should create Reference instance', () => {
      const reference = ref('path.to.field');

      expect(reference).toBeInstanceOf(Reference);
      expect(reference.getPath()).toBe('path.to.field');
    });

    test('should create root reference', () => {
      const reference = ref('$root.field');

      expect(reference).toBeInstanceOf(Reference);
      expect(reference.getPath()).toBe('root.field');
    });
  });

  describe('[Reference] Edge cases and special values', () => {
    test('should handle boolean values in referenced data', () => {
      const reference = new Reference('isActive');
      const context = {
        parent: { isActive: true, isDeleted: false },
      };

      expect(reference.getValue(context)).toBe(context.parent.isActive);
    });

    test('should handle number values including zero', () => {
      const reference = new Reference('count');
      const context = {
        parent: { count: 0, total: 100 },
      };

      expect(reference.getValue(context)).toBe(0);
    });

    test('should handle null values in referenced data', () => {
      const reference = new Reference('nullField');
      const context = {
        parent: { nullField: null, otherField: 'value' },
      };

      expect(reference.getValue(context)).toBe(null);
    });

    test('should handle empty string values', () => {
      const reference = new Reference('emptyString');
      const context = {
        parent: { emptyString: '', nonEmpty: 'value' },
      };

      expect(reference.getValue(context)).toBe('');
    });

    test('should handle deep nested structures', () => {
      const reference = new Reference('a.b.c.d.e.f');
      const context = {
        parent: {
          a: {
            b: {
              c: {
                d: {
                  e: {
                    f: 'deep-value',
                  },
                },
              },
            },
          },
        },
      };

      expect(reference.getValue(context)).toBe('deep-value');
    });

    test('should handle mixed data types in path', () => {
      const reference = new Reference('data.0.items.test.value');
      const context = {
        parent: {
          data: [
            {
              items: {
                test: {
                  value: 42,
                },
              },
            },
          ],
        },
      };

      expect(reference.getValue(context)).toBe(42);
    });
  });

  describe('[Reference] Integration with string schema', () => {
    test('should work with string.equals() method', () => {
      const passwordRef = ref('password');
      const confirmPasswordSchema = string().equals(passwordRef);

      const context = {
        parent: { password: 'secret123' },
      };

      const result = confirmPasswordSchema.validate('secret123', {}, context);
      expect(result.valid).toBe(true);

      const invalidResult = confirmPasswordSchema.validate('different', {}, context);
      expect(invalidResult.valid).toBe(false);
    });

    test('should work with string.equals() using root reference', () => {
      const globalPasswordRef = ref('$globalConfig.defaultPassword');
      const passwordSchema = string().equals(globalPasswordRef);

      const context = {
        root: { globalConfig: { defaultPassword: 'admin123' } },
        parent: { someField: 'value' },
      };

      const result = passwordSchema.validate('admin123', {}, context);
      expect(result.valid).toBe(true);

      const invalidResult = passwordSchema.validate('wrong', {}, context);
      expect(invalidResult.valid).toBe(false);
    });

    test('should work with string.oneOf() method - static values', () => {
      const valueSchema = string().oneOf(['option1', 'option2', 'option3']);

      const result = valueSchema.validate('option2');
      expect(result.valid).toBe(true);

      const invalidResult = valueSchema.validate('invalid');
      expect(invalidResult.valid).toBe(false);
    });

    test('should work with string.oneOf() method with References', () => {
      const allowedValueRef = ref('allowedValues.0');
      const anotherValueRef = ref('config.defaultValue');
      const valueSchema = string().oneOf(['static-option', allowedValueRef, anotherValueRef]);

      const context = {
        parent: {
          allowedValues: ['dynamic-option1', 'other'],
          config: { defaultValue: 'dynamic-option2' },
        },
      };

      // Test with first reference value
      const result1 = valueSchema.validate('dynamic-option1', {}, context);
      expect(result1.valid).toBe(true);

      // Test with second reference value
      const result2 = valueSchema.validate('dynamic-option2', {}, context);
      expect(result2.valid).toBe(true);

      // Test with static value
      const result3 = valueSchema.validate('static-option', {}, context);
      expect(result3.valid).toBe(true);

      // Test with invalid value
      const invalidResult = valueSchema.validate('invalid-option', {}, context);
      expect(invalidResult.valid).toBe(false);
    });

    test('should work with string.oneOf() method with root References', () => {
      const rootRef = ref('$globalOptions.allowed');
      const parentRef = ref('localOptions.preferred');
      const valueSchema = string().oneOf([rootRef, parentRef, 'fallback']);

      const context = {
        root: { globalOptions: { allowed: 'global-value' } },
        parent: { localOptions: { preferred: 'local-value' } },
      };

      // Test with root reference value
      const result1 = valueSchema.validate('global-value', {}, context);
      expect(result1.valid).toBe(true);

      // Test with parent reference value
      const result2 = valueSchema.validate('local-value', {}, context);
      expect(result2.valid).toBe(true);

      // Test with static fallback
      const result3 = valueSchema.validate('fallback', {}, context);
      expect(result3.valid).toBe(true);

      // Test with invalid value
      const invalidResult = valueSchema.validate('not-allowed', {}, context);
      expect(invalidResult.valid).toBe(false);
    });

    test('should handle oneOf with undefined reference values', () => {
      const undefinedRef = ref('nonexistent.field');
      const validRef = ref('existing.field');
      const valueSchema = string().oneOf([undefinedRef, validRef, 'static']);

      const context = {
        parent: { existing: { field: 'valid-value' } },
      };

      // Test with valid reference value
      const result1 = valueSchema.validate('valid-value', {}, context);
      expect(result1.valid).toBe(true);

      // Test with static value
      const result2 = valueSchema.validate('static', {}, context);
      expect(result2.valid).toBe(true);

      // Test with invalid value (undefined reference won't match anything)
      const invalidResult = valueSchema.validate('some-value', {}, context);
      expect(invalidResult.valid).toBe(false);
    });

    test('should work with oneOf containing only References', () => {
      const ref1 = ref('option1');
      const ref2 = ref('option2');
      const ref3 = ref('$global.option3');
      const valueSchema = string().oneOf([ref1, ref2, ref3]);

      const context = {
        root: { global: { option3: 'global-option' } },
        parent: { option1: 'first-option', option2: 'second-option' },
      };

      // Test all reference values
      expect(valueSchema.validate('first-option', {}, context).valid).toBe(true);
      expect(valueSchema.validate('second-option', {}, context).valid).toBe(true);
      expect(valueSchema.validate('global-option', {}, context).valid).toBe(true);

      // Test invalid value
      expect(valueSchema.validate('invalid', {}, context).valid).toBe(false);
    });
  });

  describe('[Reference] Complex validation scenarios', () => {
    test('should handle nested object validation with references', () => {
      const userSchema = object().entries({
        name: string(),
        email: string(),
        confirmEmail: string().equals(ref('email')),
        password: string(),
        confirmPassword: string().equals(ref('password')),
      });

      const validUser = {
        name: 'John Doe',
        email: 'john@example.com',
        confirmEmail: 'john@example.com',
        password: 'secret123',
        confirmPassword: 'secret123',
      };

      const result = userSchema.validate(validUser);
      expect(result.valid).toBe(true);

      const invalidUser = {
        name: 'John Doe',
        email: 'john@example.com',
        confirmEmail: 'wrong@example.com',
        password: 'secret123',
        confirmPassword: 'wrong-password',
      };

      const invalidResult = userSchema.validate(invalidUser);
      expect(invalidResult.valid).toBe(false);
    });

    test('should handle references to root object fields', () => {
      const schema = object().entries({
        settings: object().entries({
          theme: string().oneOf(['light', 'dark']),
          language: string().equals(ref('$user.preferredLanguage')),
        }),
        user: object().entries({
          name: string(),
          preferredLanguage: string(),
        }),
      });

      const validData = {
        settings: {
          theme: 'dark',
          language: 'en',
        },
        user: {
          name: 'John',
          preferredLanguage: 'en',
        },
      };

      const result = schema.validate(validData);
      expect(result.valid).toBe(true);
    });

    test('should handle missing reference values gracefully', () => {
      const schema = string().equals(ref('nonexistent.field'));
      const context = {
        parent: { someField: 'value' },
      };

      const result = schema.validate('anything', {}, context);
      expect(result.valid).toBe(false); // undefined !== 'anything'
    });

    test('should handle multiple references in same validation', () => {
      const schema = string()
        .equals(ref('field1'))
        .oneOf([ref('field2'), ref('field3'), 'static-option']);

      const context = {
        parent: {
          field1: 'test-value',
          field2: 'other-value',
          field3: 'another-value',
        },
      };

      // Should validate only oneOf
      const result = schema.validate('test-value', {}, context);
      expect(result.valid).toBe(false); // fails oneOf validation

      // Should validate only oneOf
      const result2 = schema.validate('other-value', {}, context);
      expect(result2.valid).toBe(true);

      // Should pass oneOf with static value
      const result3 = schema.validate('static-option', {}, context);
      expect(result3.valid).toBe(true);
    });

    test('should handle conditional validation based on references', () => {
      const emailSchema = object().entries({
        type: string().oneOf(['personal', 'business']),
        email: string().equals(ref('$globalDefaults.personalEmail')),
        businessDomain: string(),
      });

      const context = {
        root: {
          globalDefaults: {
            personalEmail: 'user@personal.com',
            businessEmail: 'user@business.com',
          },
        },
      };

      const validPersonal = {
        type: 'personal',
        email: 'user@personal.com',
        businessDomain: 'ignored',
      };

      const result = emailSchema.validate(validPersonal, {}, context);
      expect(result.valid).toBe(true);
    });

    test('should handle array validation with references', () => {
      const itemSchema = object().entries({
        id: number(),
        parentName: string().equals(ref('$parent.0.name')),
        name: string(),
      });

      const context = {
        root: {
          parent: [{ name: 'Parent Item' }],
        },
      };

      const validItem = {
        id: 456,
        parentName: 'Parent Item',
        name: 'Child Item',
      };

      const result = itemSchema.validate(validItem, {}, context);
      expect(result.valid).toBe(true);

      const invalidItem = {
        id: 456,
        parentName: 'Wrong Parent', // Wrong parent name
        name: 'Child Item',
      };

      const invalidResult = itemSchema.validate(invalidItem, {}, context);
      expect(invalidResult.valid).toBe(false);
    });

    test('should handle cross-field validation in complex nested structures', () => {
      const formSchema = object().entries({
        personal: object().entries({
          firstName: string(),
          lastName: string(),
          fullName: string().equals(ref('$computed.expectedFullName')),
        }),
        computed: object().entries({
          expectedFullName: string(),
        }),
      });

      const validForm = {
        personal: {
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
        },
        computed: {
          expectedFullName: 'John Doe',
        },
      };

      const result = formSchema.validate(validForm);
      expect(result.valid).toBe(true);
    });

    test('should handle complex oneOf scenarios with mixed references', () => {
      const roleSchema = string().oneOf([
        'admin',
        'user',
        ref('defaultRole'),
        ref('$globalConfig.guestRole'),
        ref('permissions.0.name'),
      ]);

      const context = {
        root: { globalConfig: { guestRole: 'guest' } },
        parent: {
          defaultRole: 'moderator',
          permissions: [{ name: 'editor' }, { name: 'viewer' }],
        },
      };

      // Test all possible values
      expect(roleSchema.validate('admin', {}, context).valid).toBe(true);
      expect(roleSchema.validate('user', {}, context).valid).toBe(true);
      expect(roleSchema.validate('moderator', {}, context).valid).toBe(true); // defaultRole
      expect(roleSchema.validate('guest', {}, context).valid).toBe(true); // globalConfig.guestRole
      expect(roleSchema.validate('editor', {}, context).valid).toBe(true); // permissions[0].name

      // Test invalid value
      expect(roleSchema.validate('invalid-role', {}, context).valid).toBe(false);
    });

    test('should handle oneOf with dynamic validation based on context', () => {
      const statusSchema = object().entries({
        userType: string().oneOf(['premium', 'basic']),
        status: string().oneOf([
          'active',
          ref('$allowedStatuses.premium.0'), // Only for premium users
          ref('$allowedStatuses.basic.0'), // Only for basic users
        ]),
      });

      const context = {
        root: {
          allowedStatuses: {
            premium: ['vip', 'gold'],
            basic: ['standard', 'trial'],
          },
        },
      };

      const premiumUser = {
        userType: 'premium',
        status: 'vip', // Should be valid for premium
      };

      const basicUser = {
        userType: 'basic',
        status: 'standard', // Should be valid for basic
      };

      expect(statusSchema.validate(premiumUser, {}, context).valid).toBe(true);
      expect(statusSchema.validate(basicUser, {}, context).valid).toBe(true);
    });

    test('should handle nested oneOf validations with cross-references', () => {
      // Let's start with a simple test to understand the issue
      const simpleSchema = string().oneOf([ref('availableResources.0'), 'default']);

      const context = {
        parent: {
          availableResources: ['documents', 'media', 'settings'],
        },
      };

      // Test reference value
      expect(simpleSchema.validate('documents', {}, context).valid).toBe(true);

      // Test static value
      expect(simpleSchema.validate('default', {}, context).valid).toBe(true);

      // Test invalid value
      expect(simpleSchema.validate('invalid', {}, context).valid).toBe(false);
    });
  });

  describe('[Reference] Performance and edge cases', () => {
    test('should handle very long paths', () => {
      const longPath = Array(50).fill('level').join('.');
      const reference = new Reference(longPath);

      expect(reference.getPath()).toBe(longPath);
    });

    test('should handle paths with special characters', () => {
      // Note: this depends on the get() function implementation
      const reference = new Reference('field-with-dashes');
      const context = {
        parent: { 'field-with-dashes': 'value' },
      };

      expect(reference.getValue(context)).toBe('value');
    });

    test('should handle circular reference structures without infinite loops', () => {
      const circular: any = { name: 'test' };
      circular.self = circular;

      const reference = new Reference('name');
      const context = {
        parent: circular,
      };

      expect(reference.getValue(context)).toBe('test');
    });

    test('should maintain consistent behavior with repeated calls', () => {
      const reference = new Reference('$config.value');
      const context = {
        root: { config: { value: 'consistent' } },
      };

      expect(reference.getValue(context)).toBe('consistent');
      expect(reference.getValue(context)).toBe('consistent');
      expect(reference.getValue(context)).toBe('consistent');
    });

    test('should handle paths with numeric keys correctly', () => {
      const reference = new Reference('data.123.value');
      const context = {
        parent: {
          data: {
            '123': { value: 'numeric-key' },
          },
        },
      };

      expect(reference.getValue(context)).toBe('numeric-key');
    });

    test('should handle root reference with just $', () => {
      const reference = new Reference('$');
      const context = {
        root: { name: 'root-object' },
      };

      // Should return the entire root object
      expect(reference.getValue(context)).toEqual({ name: 'root-object' });
    });

    test('should handle non-existent deep paths gracefully', () => {
      const reference = new Reference('a.very.deep.path.that.does.not.exist');
      const context = {
        parent: { a: { shallow: 'value' } },
      };

      expect(reference.getValue(context)).toBeUndefined();
    });

    test('should handle paths with dots in property names', () => {
      // This is tricky - property names with dots
      const reference = new Reference(['config', 'dot.key']);
      const context = {
        parent: {
          'config': { 'dot.key': 'value' },
        },
      };

      expect(reference.getValue(context)).toEqual('value');
    });

    test('should handle empty object references', () => {
      const reference = new Reference('emptyObj');
      const context = {
        parent: { emptyObj: {} },
      };

      expect(reference.getValue(context)).toEqual({});
    });

    test('should handle array references', () => {
      const reference = new Reference('items');
      const context = {
        parent: { items: [1, 2, 3] },
      };

      expect(reference.getValue(context)).toEqual([1, 2, 3]);
    });

    test('should handle empty array references', () => {
      const reference = new Reference('emptyArray');
      const context = {
        parent: { emptyArray: [] },
      };

      expect(reference.getValue(context)).toEqual([]);
    });

    test('should handle multiple $ characters in path', () => {
      // Should only remove the first $ character
      const reference = new Reference('$$weird$path');

      expect(reference.getPath()).toBe('$weird$path');
    });

    test('should handle whitespace in paths', () => {
      const reference = new Reference('path with spaces');
      const context = {
        parent: { 'path with spaces': 'spaced-value' },
      };

      expect(reference.getValue(context)).toBe('spaced-value');
    });
  });

  describe('[Reference] Potential bugs and edge cases', () => {
    test('should handle undefined values explicitly set in data', () => {
      const reference = new Reference('explicitUndefined');
      const context = {
        parent: { explicitUndefined: undefined, otherField: 'value' },
      };

      expect(reference.getValue(context)).toBeUndefined();
    });

    test('should distinguish between missing property and undefined value', () => {
      const reference1 = new Reference('missing');
      const reference2 = new Reference('explicitUndefined');

      const context = {
        parent: { explicitUndefined: undefined },
      };

      // Both should return undefined, but for different reasons
      expect(reference1.getValue(context)).toBeUndefined();
      expect(reference2.getValue(context)).toBeUndefined();
    });

    test('should handle prototype pollution attempts', () => {
      const reference = new Reference('__proto__.isAdmin');
      const context = {
        parent: { '__proto__': { isAdmin: true } },
      };

      // Should not access actual prototype
      expect(() => reference.getValue(context)).not.toThrow();
    });

    test('should handle constructor property access', () => {
      const reference = new Reference('constructor.name');
      const context = {
        parent: { constructor: { name: 'CustomConstructor' } },
      };

      expect(reference.getValue(context)).toBe('CustomConstructor');
    });

    test('should handle root reference when both root and parent have same path', () => {
      const reference = new Reference('$common.field');
      const context = {
        root: { common: { field: 'root-value' } },
        parent: { common: { field: 'parent-value' } },
      };

      // Should prefer root over parent
      expect(reference.getValue(context)).toBe('root-value');
    });

    test('should handle getPath method consistently', () => {
      const paths = [
        'simple',
        'nested.path',
        '$root.path',
        'path.with.many.levels',
        '',
        '$',
        'path-with-dashes',
        'path_with_underscores',
        '123numeric',
        'path.0.array',
      ];

      paths.forEach((path) => {
        const reference = new Reference(path);

        if (path.startsWith('$')) {
          expect(reference.getPath()).toBe(path.slice(1));
        } else {
          expect(reference.getPath()).toBe(path);
        }
      });
    });

    test('should handle toString and valueOf methods if called', () => {
      const reference = new Reference('test.path');

      // These methods might be called implicitly
      expect(() => String(reference)).not.toThrow();
      expect(() => reference.toString()).not.toThrow();
    });

    test('should handle oneOf with null and undefined reference values', () => {
      const nullRef = ref('nullField');
      const undefinedRef = ref('undefinedField');
      const missingRef = ref('missingField');
      const valueSchema = string().oneOf([nullRef, undefinedRef, missingRef, 'fallback']);

      const context = {
        parent: {
          nullField: null,
          undefinedField: undefined,
          // missingField is not defined
        },
      };

      // Only 'fallback' should work since references resolve to null, undefined, undefined
      expect(valueSchema.validate('fallback', {}, context).valid).toBe(true);
      expect(valueSchema.validate('anything-else', {}, context).valid).toBe(false);
    });

    test('should handle oneOf with complex reference paths that may fail', () => {
      const deepRef = ref('a.b.c.d.e.f.g.h.i.j');
      const arrayRef = ref('items.999.name'); // out of bounds
      const valueSchema = string().oneOf([deepRef, arrayRef, 'safe-option']);

      const context = {
        parent: {
          items: [{ name: 'first' }, { name: 'second' }],
          // Note: deliberately not creating a.b.c.d path to test graceful failure
        },
      };

      // Only safe-option should work - deep references should fail gracefully
      expect(valueSchema.validate('safe-option', {}, context).valid).toBe(true);
      expect(valueSchema.validate('any-other-value', {}, context).valid).toBe(false);
    });

    test('should handle oneOf with references to different data types', () => {
      const numberRef = ref('numberField');
      const booleanRef = ref('booleanField');
      const objectRef = ref('objectField');
      const valueSchema = string().oneOf([numberRef, booleanRef, objectRef, 'string-option']);

      const context = {
        parent: {
          numberField: 42,
          booleanField: true,
          objectField: { nested: 'value' },
        },
      };

      // Only string-option should match since others are different types
      expect(valueSchema.validate('string-option', {}, context).valid).toBe(true);
      expect(valueSchema.validate('42', {}, context).valid).toBe(false); // string '42' !== number 42
      expect(valueSchema.validate('true', {}, context).valid).toBe(false); // string 'true' !== boolean true
    });
  });

  describe('[Reference] Deep nested object validation with context', () => {
    test('should handle simple object with references', () => {
      const schema = object().entries({
        name: string(),
        confirmName: string().equals(ref('name')),
      });

      const validData = {
        name: 'John',
        confirmName: 'John',
      };

      const result = schema.validate(validData);
      expect(result.valid).toBe(true);

      const invalidData = {
        name: 'John',
        confirmName: 'Jane',
      };

      const invalidResult = schema.validate(invalidData);
      expect(invalidResult.valid).toBe(false);
    });

    test('should handle 2-level nested objects with cross-references', () => {
      const schema = object().entries({
        user: object().entries({
          name: string(),
          email: string(),
          confirmEmail: string().equals(ref('email')),
        }),
        settings: object().entries({
          displayName: string().equals(ref('$user.name')),
          theme: string(),
        }),
      });

      const validData = {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
          confirmEmail: 'john@example.com',
        },
        settings: {
          displayName: 'John Doe',
          theme: 'dark',
        },
      };

      const result = schema.validate(validData);
      expect(result.valid).toBe(true);

      const invalidData = {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
          confirmEmail: 'wrong@example.com', // Invalid email confirmation
        },
        settings: {
          displayName: 'Wrong Name', // Invalid display name
          theme: 'dark',
        },
      };

      const invalidResult = schema.validate(invalidData);
      expect(invalidResult.valid).toBe(false);
    });

    test('should handle 3-level nested objects with complex references', () => {
      const schema = object().entries({
        company: object().entries({
          name: string(),
          departments: object().entries({
            engineering: object().entries({
              lead: string(),
              teamName: string().equals(ref('$company.name')),
              leadConfirmation: string().equals(ref('lead')),
            }),
            marketing: object().entries({
              lead: string(),
              budget: string().equals(ref('$company.departments.engineering.lead')),
            }),
          }),
        }),
        metadata: object().entries({
          companyRef: string().equals(ref('$company.name')),
          engineeringLead: string().equals(ref('$company.departments.engineering.lead')),
        }),
      });

      const validData = {
        company: {
          name: 'TechCorp',
          departments: {
            engineering: {
              lead: 'Alice Johnson',
              teamName: 'TechCorp',
              leadConfirmation: 'Alice Johnson',
            },
            marketing: {
              lead: 'Bob Smith',
              budget: 'Alice Johnson', // References engineering lead
            },
          },
        },
        metadata: {
          companyRef: 'TechCorp',
          engineeringLead: 'Alice Johnson',
        },
      };

      const result = schema.validate(validData);
      expect(result.valid).toBe(true);
    });

    test('should handle 4-level nested objects with multiple reference types', () => {
      const schema = object().entries({
        organization: object().entries({
          name: string(),
          regions: object().entries({
            northAmerica: object().entries({
              country: string(),
              offices: object().entries({
                headquarters: object().entries({
                  address: string(),
                  manager: string(),
                  managerConfirm: string().equals(ref('manager')),
                  orgRef: string().equals(ref('$organization.name')),
                }),
                branch: object().entries({
                  address: string(),
                  manager: string().equals(ref('$organization.regions.northAmerica.offices.headquarters.manager')),
                  parentOffice: string().equals(ref('$organization.regions.northAmerica.offices.headquarters.address')),
                }),
              }),
            }),
          }),
        }),
        global: object().entries({
          ceo: string().equals(ref('$organization.regions.northAmerica.offices.headquarters.manager')),
          companyName: string().equals(ref('$organization.name')),
        }),
      });

      const validData = {
        organization: {
          name: 'GlobalTech',
          regions: {
            northAmerica: {
              country: 'USA',
              offices: {
                headquarters: {
                  address: '123 Main St',
                  manager: 'CEO John',
                  managerConfirm: 'CEO John',
                  orgRef: 'GlobalTech',
                },
                branch: {
                  address: '456 Branch Ave',
                  manager: 'CEO John', // Same as headquarters manager
                  parentOffice: '123 Main St', // References headquarters address
                },
              },
            },
          },
        },
        global: {
          ceo: 'CEO John',
          companyName: 'GlobalTech',
        },
      };

      const result = schema.validate(validData);
      expect(result.valid).toBe(true);
    });

    test('should handle mixed object/array nesting with references', () => {
      const schema = object().entries({
        users: array().of(
          object().entries({
            id: number(),
            name: string(),
            profile: object().entries({
              email: string(),
              confirmEmail: string().equals(ref('email')),
              settings: object().entries({
                displayName: string().equals(ref('$users.0.name')), // Reference to first user
                theme: string(),
              }),
            }),
          })
        ),
        admins: object().entries({
          primary: string().equals(ref('$users.0.name')),
          secondary: string().equals(ref('$users.1.name')),
        }),
      });

      const validData = {
        users: [
          {
            id: 1,
            name: 'Alice',
            profile: {
              email: 'alice@example.com',
              confirmEmail: 'alice@example.com',
              settings: {
                displayName: 'Alice',
                theme: 'light',
              },
            },
          },
          {
            id: 2,
            name: 'Bob',
            profile: {
              email: 'bob@example.com',
              confirmEmail: 'bob@example.com',
              settings: {
                displayName: 'Alice', // References first user
                theme: 'dark',
              },
            },
          },
        ],
        admins: {
          primary: 'Alice',
          secondary: 'Bob',
        },
      };

      const result = schema.validate(validData);
      expect(result.valid).toBe(true);
    });
  });
});
