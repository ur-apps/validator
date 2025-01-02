# ur-validator

**ur-validator** is a lightweight and flexible JavaScript/TypeScript library designed for data validation. It draws inspiration from popular JavaScript libraries, incorporating their best practices while adding unique enhancements. The library provides robust functionality to validate, cast, and clean data, ensuring it meets specified criteria.

Key Features

- **Validation**: Validate data against predefined schemas to ensure it meets the required format and constraints.
- **Casting**: Automatically cast data to the specified type, making it easier to work with different data formats.
- **Cleaning**: Remove unnecessary data from objects, keeping only the relevant fields as defined by the schema.
- **Schema-based**: Define schemas for various data types including strings, numbers, booleans, arrays, and objects.
- **Customizable**: Easily extend and customize validation rules to fit specific use cases.

## Сontents

- [Installation](#installation)
- [Connection](#connection)
- [Usage examples](#usage-examples)
- [Schemas](#schemas)
  - [uv](#uv)
  - [string](#string)
  - [number](#number)
  - [boolean](#boolean)
  - [array](#array)
  - [object](#object)
- [Utils](#utils)
  - [clone](#clone)
  - [type checkers](#type-checkers)
- [Documentation](#documentation)
- [License](#license)

## Installation

```sh
npm install ur-validator
```

## Connection

```js
import uv from 'ur-validator'; // uv includes object, array, string, number, boolean schemas
// or
import { uv } from 'ur-validator';
// or
import { object, array, string, number, boolean } from 'ur-validator';
```

## Usage examples

First, we need to generate a schema, then we can validate the data.

```js
import { object, array, string, number, boolean } from 'ur-validator';

string().minLength(4).validate('example text'); // { valid: true, value: 'example text', error: ''}
nubmer().min(5).max(100).isValid(22); // true
boolean().cast(1); // true (will cast true and 1 to true and false and 0 to false if strict mode is not enabled)

const objectData = object()
  .required()
  .entries({
    stringData: string().required('custom required message'),
    numberData: number().min(20),
    booleanData: boolean().isTrue(),
    arrayData: array().of(string().minLength(2)),
    objectData: object().required(),
  });

objectData.validate({
  stringData: 'string data',
  numberData: 50,
  booleanData: true,
  arrayData: ['text1', 'text2', 'text3'],
  objectData: { name: 'John', age: 25 },
}); // { valid: true, value: {...}, error: ''}

const arrayData = array().of(number());

arrayData.validate([123, '124', 125]); // { valid: true, value: [123, 124, 125], error: ''}
```

## Schemas

### uv

```js
import uv from 'ur-validator';
// or
import { uv } from 'ur-validator';

uv.array();
uv.boolean();
uv.number();
uv.object();
uv.string();
```

### string

#### `validate()`

```js
import { string } from 'ur-validator';

string().validate('valid text'); // { valid: true, value: 'valid text', error: '' }
string().validate(''); // { valid: true, value: '', error: '' }
string().validate(12345); // { valid: true, value: '12345', error: '' }
string().validate(true); // { valid: false, value: true, error: 'expected string value' }
```

#### `isValid()`

```js
import { string } from 'ur-validator';

string().isValid('valid text'); // true
string().isValid(12345); // true
string().isValid(true); // false
```

#### `cast()`

```js
import { string } from 'ur-validator';

string().cast('valid text'); // 'valid text'
string().cast(12345); // '12345'
string().cast(true); // TypeError: expected string value
```

#### `strict()`

```js
import { string } from 'ur-validator';

string().strict().validate('valid text'); // { valid: true, value: 'valid text', error: '' }
string().strict().validate(12345); // { valid: false, value: 12345, error: 'expected string value' }
```

#### `required()`

```js
import { string } from 'ur-validator';

string().required().validate('valid text'); // { valid: true, value: 'valid text', error: '' }
string().required().validate(''); // { valid: false, value: '', error: 'required field' }
string().required().required().validate(undefined); // { valid: false, value: undefined, error: 'required field' }
string().required().required().validate(null); // { valid: false, value: null, error: 'required field' }
```

#### `notRequired()`

```js
import { string } from 'ur-validator';

string().notRequired().validate(undefined); // { valid: true, value: undefined, error: '' }
string().required().notRequired().validate(undefined); // { valid: true, value: undefined, error: '' }
```

#### `length()`

```js
import { string } from 'ur-validator';

string().length(4).validate('text'); // { valid: true, value: 'text', error: '' }
string().length(4).validate(''); // { valid: true, value: '', error: '' }
string().length(4).validate('long text'); // { valid: true, value: 'long text', error: 'field length must be 4 characters' }
string().length(40).validate('short text'); // { valid: false, value: 'short text', error: 'field length must be 40 characters' }
```

## Documentation

For detailed documentation and more examples, visit the [GitHub](https://github.com/ur-apps/validator#readme) repository.

## License

This project is licensed under the ISC License. See the LICENSE file for more details.
