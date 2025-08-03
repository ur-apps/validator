# UR Validator

[![npm version](https://badge.fury.io/js/ur-validator.svg)](https://badge.fury.io/js/ur-validator)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**ur-validator** is a powerful and lightweight TypeScript/JavaScript library for robust data validation. Inspired by popular validation libraries like Yup and Joi, it combines their best practices with unique enhancements to provide comprehensive data validation, type casting, and data cleaning capabilities.

## ✨ Key Features

- 🔍 **Schema-based Validation**: Type-safe validation for strings, numbers, booleans, arrays, and objects
- 🔄 **Automatic Type Casting**: Intelligently convert data types with optional strict mode
- 🧹 **Data Cleaning**: Remove unwanted properties from objects automatically
- 🔗 **Cross-field References**: Validate fields against other fields using the `ref()` system
- 📦 **Nested Object Support**: Deep validation of complex nested data structures
- 🎯 **TypeScript First**: Full TypeScript support with comprehensive type definitions
- ⚡ **Lightweight**: Minimal dependencies with excellent performance
- 🛠️ **Highly Customizable**: Extensible validation rules and custom error messages

## 📖 Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Core Concepts](#-core-concepts)
- [API Reference](#-api-reference)
  - [Schema Types](#schema-types)
  - [String Schema](#string-schema)
  - [Number Schema](#number-schema)
  - [Boolean Schema](#boolean-schema)
  - [Array Schema](#array-schema)
  - [Object Schema](#object-schema)
  - [Reference System](#reference-system)
- [Advanced Usage](#-advanced-usage)
- [Error Handling](#️-error-handling)
- [TypeScript Support](#-typescript-support)
- [Development](#️-development)
- [Contributing](#-contributing)
- [License](#-license)

## 📦 Installation

```bash
npm install ur-validator
```

```bash
yarn add ur-validator
```

```bash
pnpm add ur-validator
```

## 🚀 Quick Start

```typescript
import uv from 'ur-validator'; // uv includes object, array, string, number, boolean schemas
// or
import { uv } from 'ur-validator';
// or
import { object, array, string, number, boolean } from 'ur-validator';

// Simple validation
const nameResult = string().minLength(2).validate('John');
console.log(nameResult); // { valid: true, value: 'John', error: '' }

// Type casting
const ageResult = number().cast('25'); // Returns: 25 (number)

// Complex object validation
const userSchema = object({
  name: string().required().minLength(2),
  age: number().min(18).max(120),
  email: string().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  isActive: boolean().default(true),
  tags: array().of(string().minLength(1)),
});

const userData = {
  name: 'John Doe',
  age: '25', // Will be cast to number
  email: 'john@example.com',
  isActive: 1, // Will be cast to boolean
  tags: ['developer', 'javascript'],
};

const result = userSchema.validate(userData);

if (result.valid) {
  console.log('Validated data:', result.value);
} else {
  console.log('Validation errors:', result.error);
}
```

## 🧭 Core Concepts

### Validation Result

All validation methods return a consistent result object:

```typescript
type ValidationResult = {
  valid: boolean; // Whether validation passed
  value: any; // The validated/cast value
  error: string | object; // Error message(s) if validation failed
};
```

### Schema Methods

Every schema provides three core methods:

- **`validate(value)`**: Returns full validation result
- **`isValid(value)`**: Returns boolean validation status
- **`cast(value)`**: Attempts to cast value, throws on failure

### Strict vs Non-Strict Mode

- **Non-strict** (default): Allows type coercion (e.g., '123' → 123)
- **Strict**: Requires exact type match

```typescript
// Non-strict (allows casting)
string().validate(123); // { valid: true, value: '123', error: '' }

// Strict mode
string().strict().validate(123); // { valid: false, value: 123, error: 'expected string value' }
```

## 📚 API Reference

### Schema Types

#### UR Validator (uv)

Access all schemas through the main export:

```typescript
import uv from 'ur-validator';
// or
import { uv } from 'ur-validator';

const schema = uv.object({
  name: uv.string().required(),
  age: uv.number().min(0),
  active: uv.boolean(),
});
```

#### Individual Schema Imports

```typescript
import { array, boolean, number, object, ref, string } from 'ur-validator';
```

### String Schema

Validates and processes string values with comprehensive validation rules.

#### Basic Usage

```typescript
import { string } from 'ur-validator';

// Simple validation
string().validate('hello'); // { valid: true, value: 'hello', error: '' }

// Type casting (non-strict mode)
string().validate(123); // { valid: true, value: '123', error: '' }

// Strict mode
string().strict().validate(123); // { valid: false, value: 123, error: 'expected string value' }
```

#### Validation Methods

**`required(message?: string)`**

```typescript
string().required().validate(''); // { valid: false, value: '', error: 'required field' }
string().required('Name is required').validate(null); // { valid: false, value: null, error: 'Name is required' }
```

**`length(value: number, message?: string)`**

```typescript
string().length(5).validate('hello'); // { valid: true, value: 'hello', error: '' }
string().length(3).validate('hello'); // { valid: false, value: 'hello', error: 'field length must be 3 characters' }
```

**`minLength(value: number, message?: string)`**

```typescript
string().minLength(3).validate('hi'); // { valid: false, value: 'hi', error: 'minimum field length 3 characters' }
```

**`maxLength(value: number, message?: string)`**

```typescript
string().maxLength(10).validate('very long text');
// { valid: false, value: 'very long text', error: 'maximum field length 10 characters' }
```

**`match(regexp: RegExp, message?: string)`**

```typescript
string()
  .match(/^[A-Z]/)
  .validate('hello');
// { valid: false, value: 'hello', error: 'invalid data format' }
```

**`oneOf(values: Array<string | Reference>, message?: string)`**

```typescript
string().oneOf(['red', 'green', 'blue']).validate('yellow');
// { valid: false, value: 'yellow', error: 'value must be equal to one of the following values: red, green, blue' }
```

**`equals(value: string | Reference, message?: string)`**

```typescript
string().equals('exact').validate('exact'); // { valid: true, value: 'exact', error: '' }
```

### Number Schema

Validates numeric values with range and type checking.

#### Basic Usage

```typescript
import { number } from 'ur-validator';

number().validate(42); // { valid: true, value: 42, error: '' }
number().validate('42'); // { valid: true, value: 42, error: '' } (auto-cast)
number().strict().validate('42'); // { valid: false, value: '42', error: 'expected number value' }
```

#### Validation Methods

**`min(value: number, message?: string)`**

```typescript
number().min(0).validate(-5);
// { valid: false, value: -5, error: 'minimum value is greater than or equal to 0' }
```

**`max(value: number, message?: string)`**

```typescript
number().max(100).validate(150);
// { valid: false, value: 150, error: 'the maximum value is less than or equal to 100' }
```

### Boolean Schema

Validates boolean values with true/false constraints.

#### Basic Usage

```typescript
import { boolean } from 'ur-validator';

boolean().validate(true); // { valid: true, value: true, error: '' }
boolean().validate(1); // { valid: true, value: true, error: '' } (auto-cast)
boolean().strict().validate(1); // { valid: false, value: 1, error: 'expected boolean value' }
```

#### Validation Methods

**`isTrue(message?: string)`**

```typescript
boolean().isTrue().validate(false);
// { valid: false, value: false, error: 'value must be "true"' }
```

**`isFalse(message?: string)`**

```typescript
boolean().isFalse().validate(true);
// { valid: false, value: true, error: 'value must be "false"' }
```

### Array Schema

Validates arrays with element type checking and length constraints.

#### Basic Usage

```typescript
import { array, number, string } from 'ur-validator';

// Array of any type
array().validate([1, 'hello', true]); // { valid: true, value: [1, 'hello', true], error: '' }

// Typed array
array().of(string()).validate(['hello', 'world']);
// { valid: true, value: ['hello', 'world'], error: '' }

// Mixed with casting
array().of(number()).validate([1, '2', 3]);
// { valid: true, value: [1, 2, 3], error: '' }
```

#### Validation Methods

**`of(schema: Schema)`**

```typescript
array().of(string().minLength(2)).validate(['a', 'hello']);
// { valid: false, value: ['a', 'hello'], error: { 0: 'minimum field length 2 characters' } }
```

**`length(value: number, message?: string)`**

```typescript
array().length(3).validate([1, 2]);
// { valid: false, value: [1, 2], error: 'field length must be 3 characters' }
```

**`minLength(value: number, message?: string)`** / **`maxLength(value: number, message?: string)`**

```typescript
array().minLength(2).validate([1]);
// { valid: false, value: [1], error: 'minimum field length 2 characters' }
```

### Object Schema

Validates object structures with typed properties.

#### Basic Usage

```typescript
import { number, object, string } from 'ur-validator';

// Simple object
const userSchema = object({
  name: string().required(),
  age: number().min(0),
});

userSchema.validate({ name: 'John', age: 25 });
// { valid: true, value: { name: 'John', age: 25 }, error: '' }
```

#### Advanced Features

**Data Cleaning**

```typescript
const schema = object({
  name: string(),
  age: number(),
});

const result = schema.validate({ name: 'John', age: 25, extra: 'removed' }, { clean: true });
// { valid: true, value: { name: 'John', age: 25 }, error: '' }

// Or use the clean method directly
const cleaned = schema.clean({ name: 'John', age: 25, extra: 'removed' });
// Returns: { name: 'John', age: 25 }
```

**Nested Objects**

```typescript
const schema = object({
  user: object({
    profile: object({
      name: string().required(),
      email: string().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    }),
  }),
});
```

### Reference System

Create cross-field validations using the `ref()` function.

#### Basic References

```typescript
import { object, ref, string } from 'ur-validator';

const schema = object({
  password: string().minLength(8),
  confirmPassword: string().equals(ref('password'), 'Passwords must match'),
});

schema.validate({
  password: 'secret123',
  confirmPassword: 'secret123',
}); // { valid: true, ... }

schema.validate({
  password: 'secret123',
  confirmPassword: 'different',
}); // { valid: false, error: { confirmPassword: 'Passwords must match' } }
```

#### Root References

Use `$` prefix to reference from the root object:

```typescript
const schema = object({
  settings: object({
    theme: string().oneOf(ref('$themes')), // References root.themes
  }),
  themes: array().of(string()),
});
```

## 🔥 Advanced Usage

### Complex Validation Scenarios

#### Conditional Validation

```typescript
import { boolean, number, object, string } from 'ur-validator';

const conditionalSchema = object({
  type: string().oneOf(['individual', 'company']),
  name: string().required(),
  // Additional fields based on type would need custom validation logic
});
```

#### Dynamic Schema Building

```typescript
function createUserSchema(isAdmin: boolean) {
  const baseSchema = {
    name: string().required(),
    email: string()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .required(),
  };

  if (isAdmin) {
    return object({
      ...baseSchema,
      permissions: array().of(string()).required(),
    });
  }

  return object(baseSchema);
}
```

#### Custom Error Messages

```typescript
const schema = object({
  username: string()
    .required('Username is required')
    .minLength(3, 'Username must be at least 3 characters')
    .maxLength(20, 'Username cannot exceed 20 characters')
    .match(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  age: number()
    .required('Age is required')
    .min(13, 'You must be at least 13 years old')
    .max(120, 'Please enter a valid age'),
});
```

### Performance Optimization

#### Schema Reuse

```typescript
// Define schemas once and reuse
const emailSchema = string().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format');
const passwordSchema = string().minLength(8, 'Password must be at least 8 characters');

const registerSchema = object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: string().equals(ref('password'), 'Passwords must match'),
});

const loginSchema = object({
  email: emailSchema,
  password: passwordSchema,
});
```

## ⚠️ Error Handling

### Understanding Error Objects

#### Primitive Schema Errors

```typescript
const result = string().minLength(5).validate('hi');
// result.error: "minimum field length 5 characters"
```

#### Object Schema Errors

```typescript
const result = object({
  name: string().required(),
  age: number().min(0),
}).validate({ name: '', age: -5 });

/* result.error: {
  name: "required field",
  age: "minimum value is greater than or equal to 0"
} */
```

#### Array Schema Errors

```typescript
const result = array().of(string().minLength(2)).validate(['a', 'hello', 'b']);

/* result.error: {
  0: "minimum field length 2 characters",
  2: "minimum field length 2 characters"
} */
```

### Error Handling Patterns

#### Simple Error Checking

```typescript
const result = schema.validate(data);

if (!result.valid) {
  console.error('Validation failed:', result.error);

  return;
}
// Use result.value safely
```

#### Detailed Error Processing

```typescript
function processErrors(error: string | object, path: string = ''): string[] {
  if (typeof error === 'string') {
    return [`${path}: ${error}`];
  }

  const errors: string[] = [];

  for (const [key, value] of Object.entries(error)) {
    const currentPath = path ? `${path}.${key}` : key;

    errors.push(...processErrors(value, currentPath));
  }

  return errors;
}

const result = schema.validate(data);

if (!result.valid) {
  const errorMessages = processErrors(result.error);

  console.log('Validation errors:', errorMessages);
}
```

## 🔷 TypeScript Support

ur-validator is built with TypeScript-first approach, providing excellent type safety and IntelliSense support.

### Type Inference

```typescript
import { array, number, object, string } from 'ur-validator';

const userSchema = object({
  name: string().required(),
  age: number().min(0),
  tags: array().of(string()),
});

// TypeScript can infer the validated type
type User = {
  name: string;
  age: number;
  tags: string[];
};

const result = userSchema.validate(someData);
if (result.valid) {
  // result.value is properly typed as User
  console.log(result.value.name); // TypeScript knows this is a string
}
```

### Custom Type Guards

```typescript
function isValidUser(data: unknown): data is User {
  return userSchema.isValid(data);
}

// Usage
if (isValidUser(unknownData)) {
  // unknownData is now typed as User
  console.log(unknownData.name);
}
```

### Schema Type Extraction

```typescript
// Extract the validated type from a schema
type SchemaType<T> = T extends { validate(value: any): { valid: true; value: infer U } } ? U : never;

type UserType = SchemaType<typeof userSchema>;
// UserType is automatically inferred as { name: string; age: number; tags: string[] }
```

## 🛠️ Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/ur-apps/validator.git
cd validator

# Install dependencies
npm install

# Build the project
npm run build
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
7. Push to the branch (`git push origin feat/amazing-feature`)
8. Open a Pull Request

### Code Style

This project uses ESLint and Prettier for code formatting. Run `npm run lint:fix` and `npm run format:fix` before committing.

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Yup](https://github.com/jquense/yup) and [Joi](https://github.com/sideway/joi)
- Built with ❤️ by the ur-apps team

## 📞 Support

- 📚 [Documentation](https://github.com/ur-apps/validator#readme)
- 🐛 [Issue Tracker](https://github.com/ur-apps/validator/issues)
- 💬 [Discussions](https://github.com/ur-apps/validator/discussions)

---

Made with ❤️ by [UR Apps](https://github.com/ur-apps)
