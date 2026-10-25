# JavaScript Equality and Inequality

JavaScript has four equality and inequality operators:

| Operator | Meaning | Performs type coercion? |
|---|---|---|
| `===` | Strict equality | No |
| `!==` | Strict inequality | No |
| `==` | Loose equality | Yes, in specific cases |
| `!=` | Loose inequality | Yes, in specific cases |

The inequality operators are the logical opposites of their corresponding
equality operators:

```js
!(left == right)   // equivalent result to: left != right
!(left === right)  // equivalent result to: left !== right
```

## Strict equality: `===` and `!==`

Strict equality does not convert values from one type to another. Values of
different types are not strictly equal, even if they look similar:

```js
5 === 5;       // true: same type (number) and value
5 === "5";     // false: number and string are different types
true === 1;    // false: boolean and number are different types
null === undefined; // false: different types

5 !== "5";     // true: the values are not strictly equal
5 !== 5;       // false: the values are strictly equal
```

For primitive values of the same type, strict equality compares their values.
For objects, it compares identity (whether both operands refer to the same
object), not their contents.

```js
"hello" === "hello"; // true

const first = { score: 10 };
const second = { score: 10 };
const sameObject = first;

first === second;     // false: two separate objects
first === sameObject; // true: both variables refer to the same object

[1, 2] === [1, 2];    // false: two separate arrays
```

### Special number cases with strict equality

`NaN` is not equal to itself. Positive zero and negative zero are equal with
`===`:

```js
NaN === NaN; // false
0 === -0;    // true
```

To check whether a value is `NaN`, use `Number.isNaN`:

```js
Number.isNaN(NaN); // true
Number.isNaN("NaN"); // false
```

## Loose equality: `==` and `!=`

Loose equality may convert operands before comparing them. The conversion
depends on the operand types; it does **not** simply ignore type or compare
only the written values.

```js
5 == "5";  // true: the string is converted to the number 5
5 != "5";  // false: after conversion, 5 and 5 are equal

5 === "5"; // false: strict equality does not convert types
5 !== "5"; // true
```

### Common loose-equality conversion rules

#### 1. Same-type operands

If both operands have the same type, loose equality uses the same comparison
result as strict equality:

```js
7 == 7;                 // true
"cat" == "cat";         // true
true == true;           // true
({}) == ({});           // false: different object identities
NaN == NaN;             // false
```

#### 2. Number and string

When one operand is a number and the other is a string, JavaScript converts the
string to a number and compares the results:

```js
5 == "5";       // true
5 == "05";      // true
5 == "5.0";     // true
5 == " 5 ";     // true: surrounding whitespace is allowed
5 == "hello";   // false: "hello" converts to NaN
0 == "";        // true: an empty string converts to 0
0 == "  ";      // true: a whitespace-only string converts to 0
```

The original string is not changed; this conversion happens only during the
comparison.

#### 3. Boolean operands

When either operand is a boolean, JavaScript converts the boolean to a number:
`false` becomes `0` and `true` becomes `1`. The comparison may then apply
another conversion rule:

```js
true == 1;       // true
false == 0;      // true
true == "1";     // true: true -> 1, then "1" -> 1
false == "";     // true: false -> 0, then "" -> 0
true == 2;       // false
```

This is one reason loose equality can be surprising. A non-empty string is
truthy, but that does not mean it is loosely equal to `true`:

```js
Boolean("hello"); // true
"hello" == true; // false: true -> 1, "hello" -> NaN
```

#### 4. `null` and `undefined`

`null` and `undefined` are loosely equal to each other, and to no other value:

```js
null == undefined; // true
null == 0;         // false
undefined == 0;    // false
null == false;     // false

null === undefined; // false
```

Use `value == null` only when you intentionally want to match either `null` or
`undefined`. Use `value === null` to match only `null`.

#### 5. BigInt

When compared loosely with a number, a BigInt is equal only if both represent
the same mathematical integer. A BigInt can also be compared with a string
that can be parsed as a BigInt:

```js
1n == 1;       // true
1n === 1;      // false: BigInt and number are different types
1n == "1";     // true
1n == "1.5";   // false: not a valid integer representation for this comparison
1n == "hello"; // false
```

The number side is not rounded to make it match a BigInt. Large numbers may
already have lost precision when represented as JavaScript numbers:

```js
9007199254740993n == 9007199254740993; // false
```

#### 6. Objects compared with primitives

When an object is compared with a primitive using `==`, JavaScript converts
the object to a primitive and then applies the relevant primitive comparison
rule. For arrays, the primitive conversion commonly produces a string:

```js
[] == "";       // true: [] converts to ""
[] == 0;        // true: [] -> "", then "" -> 0
[5] == 5;       // true: [5] -> "5", then "5" -> 5
[] == false;    // true: false -> 0, [] -> "", then "" -> 0

[] === "";      // false: array and string are different types
[5] === 5;      // false
[] == [];       // false: separate objects are not equal
```

An object's conversion can be customized with methods such as `valueOf` or
`toString`. Avoid relying on object-to-primitive coercion in application
logic; make the intended conversion explicit instead.

#### 7. Symbols and other unmatched types

Symbols compare equal only when they are the same symbol. A symbol does not
loosely equal a string or number:

```js
const symbol = Symbol("id");

symbol == symbol;      // true
Symbol("id") == symbol; // false: each Symbol() call creates a new symbol
symbol == "id";        // false
symbol == 1;           // false
```

If none of the specific conversion rules apply, loosely compared values of
different types are not equal.

## A common pitfall: loose equality is not transitive

With `==`, two comparisons can both be true even though a comparison between
the other pair is false:

```js
"" == 0;    // true: "" converts to 0
"0" == 0;   // true: "0" converts to 0
"" == "0";  // false: both are strings, so their contents are compared
```

This behavior is another reason to prefer strict equality.

## Quick comparison table

| Expression | Result | Reason |
|---|---:|---|
| `5 == "5"` | `true` | String converts to number |
| `5 === "5"` | `false` | Different types |
| `5 != "5"` | `false` | Loose equality is true, so its opposite is false |
| `5 !== "5"` | `true` | Strict equality is false, so its opposite is true |
| `false == 0` | `true` | Boolean converts to number |
| `null == undefined` | `true` | Special loose-equality rule |
| `null === undefined` | `false` | Different types |
| `NaN == NaN` | `false` | NaN is unequal to every value, including itself |
| `[1] == 1` | `true` | Array converts to `"1"`, then to number `1` |
| `[1] === 1` | `false` | Different types |

## Which operator should you use?

Use `===` and `!==` by default. They avoid implicit type conversion and make
the comparison easier to reason about:

```js
if (userInput === 5) {
  // Matches the number 5, not the string "5".
}
```

Use `==` or `!=` only when you deliberately want JavaScript's conversion
rules, such as checking whether a value is either `null` or `undefined`:

```js
if (value == null) {
  // Matches null or undefined.
}
```
