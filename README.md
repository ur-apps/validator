# gvalid

**gvalid** is a lightweight JavaScript / TypeScript library for data validation.
The library is based on popular JavaScript libraries, from which the best solutions are taken and to which their own improvements have been added. The library can validate, cast data to the specified type, and also clean objects from unnecessary data.

## Сontents

- [Installation](#installation)
- [Connection](#connection)
- [Usage examples](#usage-examples)
- [Schemas](#schemas)
  - [g](#g)
  - [string](#string)
  - [number](#number)
  - [boolean](#boolean)
  - [array](#array)
  - [object](#object)
- [Utils](#Schemas)
  - [clone](#clone)
  - [type checkers](#type-checkers)

## Installation

```sh
npm install gvalid
```

## Connection

```js
import g from 'gvalid'; // g includes object, array, string, number, boolean schemas
// or
import { g } from 'gvalid';
// or
import { object, array, string, number, boolean } from 'gvalid';
```

## Usage examples

First, we need to generate a schema, then we can validate the data.

```js
import { object, array, string, number, boolean } from 'gvalid';

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

### g

```js
import g from 'gvalid';
// or
import { g } from 'gvalid';

g.array();
g.boolean();
g.number();
g.object();
g.string();
```

### string

#### `validate()`

```js
import { string } from 'gvalid';

string().validate('valid text'); // { valid: true, value: 'valid text', error: '' }
string().validate(''); // { valid: true, value: '', error: '' }
string().validate(12345); // { valid: true, value: '12345', error: '' }
string().validate(true); // { valid: false, value: true, error: 'expected string value' }
```

#### `isValid()`

```js
import { string } from 'gvalid';

string().isValid('valid text'); // true
string().isValid(12345); // true
string().isValid(true); // false
```

#### `cast()`

```js
import { string } from 'gvalid';

string().cast('valid text'); // 'valid text'
string().cast(12345); // '12345'
string().cast(true); // TypeError: expected string value
```

#### `strict()`

```js
import { string } from 'gvalid';

string().strict().validate('valid text'); // { valid: true, value: 'valid text', error: '' }
string().strict().validate(12345); // { valid: true, value: '12345', error: '' }
string().strict().validate(12345); // { valid: false, value: 12345, error: 'expected string value' }
```

#### `required()`

```js
import { string } from 'gvalid';

string().required().validate('valid text'); // { valid: true, value: 'valid text', error: '' }
string().required().validate(''); // { valid: false, value: '', error: 'required field' }
string().required().required().validate(undefined); // { valid: false, value: undefined, error: 'required field' }
string().required().required().validate(null); // { valid: false, value: null, error: 'required field' }
```

#### `notRequired()`

#### `length()`

```js
import { string } from 'gvalid';

string().length(4).validate('text'); // { valid: true, value: 'text', error: '' }
string().length(4).validate(''); // { valid: true, value: '', error: '' }
string().length(4).validate('long text'); // { valid: true, value: 'long text', error: 'field length must be 4 characters' }
string().length(40).validate('short text'); // { valid: false, value: 'short text', error: 'field length must be 40 characters' }
```
