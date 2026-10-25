# JavaScript Array Methods: A Detailed Guide

This guide covers the built-in static methods on `Array` and the standard methods available on `Array.prototype`. Examples use modern JavaScript. A few newer methods (`findLast`, `toSorted`, `toSpliced`, `with`, and `fromAsync`) may not be available in older browsers or runtimes.

## Quick reference

| Goal | Methods |
| --- | --- |
| Add or remove items (mutates) | `push`, `pop`, `unshift`, `shift`, `splice` |
| Change or reorder items (mutates) | `fill`, `copyWithin`, `reverse`, `sort` |
| Change or reorder items (returns a new array) | `toReversed`, `toSorted`, `toSpliced`, `with` |
| Select or combine items | `slice`, `concat`, `flat`, `flatMap` |
| Find or check items | `at`, `includes`, `indexOf`, `lastIndexOf`, `find`, `findIndex`, `findLast`, `findLastIndex`, `some`, `every` |
| Transform or calculate | `map`, `filter`, `reduce`, `reduceRight` |
| Visit or iterate | `forEach`, `entries`, `keys`, `values` |
| Convert to a string | `join`, `toString`, `toLocaleString` |
| Create or check arrays (static) | `Array.from`, `Array.fromAsync`, `Array.isArray`, `Array.of` |

## 1. Creating arrays

### `Array.from(items, mapFunction?, thisArg?)`

Creates a **new array** from an iterable or array-like value. The optional mapping function runs once for each created element.

```js
const letters = Array.from("hello");
console.log(letters); // ["h", "e", "l", "l", "o"]

const doubled = Array.from([1, 2, 3], (number) => number * 2);
console.log(doubled); // [2, 4, 6]

const positions = Array.from({ length: 3 }, (_, index) => index);
console.log(positions); // [0, 1, 2]
```

Useful for converting `Set`, `Map` keys/values, strings, and many DOM collections to arrays. Unlike `Array(3)`, `Array.from({ length: 3 })` creates three actual `undefined` elements, so a mapping function can fill them.

### `Array.fromAsync(items, mapFunction?, thisArg?)`

Asynchronously creates an array from an async iterable, iterable, or array-like value. It awaits values as it consumes them and returns a `Promise` for the new array.

```js
const asyncValues = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const values = await Array.fromAsync(asyncValues, (number) => number * 10);
console.log(values); // [10, 20, 30]
```

Use this when the source produces values asynchronously. It is newer than `Array.from` and requires runtime support for `Array.fromAsync`.

### `Array.isArray(value)`

Returns `true` when `value` is an array and `false` otherwise.

```js
console.log(Array.isArray([1, 2])); // true
console.log(Array.isArray("hello")); // false
console.log(Array.isArray({ length: 2 })); // false
```

Prefer this over `typeof value === "object"`: `typeof []` is `"object"`, just like many non-array objects.

### `Array.of(...items)`

Creates a new array containing the supplied arguments.

```js
console.log(Array.of(7)); // [7]
console.log(Array.of(1, 2, 3)); // [1, 2, 3]
```

This avoids a surprising `Array` constructor behavior: `Array(3)` creates an empty array with length `3`, while `Array.of(3)` creates `[3]`.

## 2. Accessing elements

### `at(index)`

Returns the element at an index. Negative indexes count backward from the end. It does not modify the array.

```js
const browsers = ["Chrome", "Firefox", "Safari"];

console.log(browsers.at(0)); // "Chrome"
console.log(browsers.at(-1)); // "Safari"
console.log(browsers.at(-4)); // undefined
```

Use bracket access (`array[index]`) when you do not need negative indexes.

### Bracket access and `length`

Bracket access is JavaScript syntax rather than an array method. It reads or writes a position directly:

```js
const scores = [80, 90, 100];
console.log(scores[1]); // 90

scores[1] = 95;
console.log(scores); // [80, 95, 100]
console.log(scores.length); // 3
```

An out-of-range read returns `undefined`. Assigning beyond the end increases `length` and leaves holes between elements.

## 3. Adding and removing elements

These methods change the original array.

### `push(...items)`

Adds one or more items to the end and returns the new length.

```js
const numbers = [1, 2];
const length = numbers.push(3, 4);

console.log(numbers); // [1, 2, 3, 4]
console.log(length); // 4
```

### `pop()`

Removes and returns the last item. Returns `undefined` when the array is empty.

```js
const numbers = [1, 2, 3];
const last = numbers.pop();

console.log(last); // 3
console.log(numbers); // [1, 2]
```

### `unshift(...items)`

Adds one or more items to the beginning and returns the new length.

```js
const numbers = [3, 4];
const length = numbers.unshift(1, 2);

console.log(numbers); // [1, 2, 3, 4]
console.log(length); // 4
```

### `shift()`

Removes and returns the first item. Returns `undefined` when the array is empty.

```js
const numbers = [1, 2, 3];
const first = numbers.shift();

console.log(first); // 1
console.log(numbers); // [2, 3]
```

### `splice(start, deleteCount, ...items)`

Removes, replaces, or inserts items at a position and returns an array of the removed items. It mutates the original array.

```js
const colors = ["red", "green", "blue", "yellow"];

const removed = colors.splice(1, 2);
console.log(removed); // ["green", "blue"]
console.log(colors); // ["red", "yellow"]

colors.splice(1, 0, "orange"); // Insert without removing
console.log(colors); // ["red", "orange", "yellow"]

colors.splice(2, 1, "purple"); // Replace one item
console.log(colors); // ["red", "orange", "purple"]
```

- `start` is the index where the change begins; a negative value counts from the end.
- `deleteCount` is the number of items to remove.
- Omitting `deleteCount` removes from `start` through the end.
- Use `splice(index, 0, item)` to insert without removing.

Use `slice` instead when you want a portion without changing the original array.

## 4. Copying and combining

### `slice(start?, end?)`

Returns a **shallow copy** of a portion of an array; the original is unchanged. The `end` index is excluded.

```js
const letters = ["a", "b", "c", "d"];

console.log(letters.slice(1, 3)); // ["b", "c"]
console.log(letters.slice(2)); // ["c", "d"]
console.log(letters.slice(-2)); // ["c", "d"]
console.log(letters); // ["a", "b", "c", "d"]
```

Because the copy is shallow, nested objects are still shared references.

### `concat(...values)`

Returns a new array made by joining the original array with other arrays or values. It does not mutate the original.

```js
const first = [1, 2];
const combined = first.concat([3, 4], 5);

console.log(combined); // [1, 2, 3, 4, 5]
console.log(first); // [1, 2]
```

The spread syntax is another common way to combine arrays: `[...first, ...second]`.

### `flat(depth?)`

Returns a new array with nested arrays flattened up to `depth`. The default depth is `1`.

```js
const nested = [1, [2, [3, [4]]]];

console.log(nested.flat()); // [1, 2, [3, [4]]]
console.log(nested.flat(2)); // [1, 2, 3, [4]]
console.log(nested.flat(Infinity)); // [1, 2, 3, 4]
```

`flat` also removes empty slots at the levels it flattens.

### `flatMap(callback(element, index, array), thisArg?)`

Maps each element with a callback and flattens the result by one level. It returns a new array.

```js
const sentences = ["Arrays are useful", "JavaScript is flexible"];
const words = sentences.flatMap((sentence) => sentence.split(" "));

console.log(words);
// ["Arrays", "are", "useful", "JavaScript", "is", "flexible"]
```

Use `map` when each input should produce one output; use `flatMap` when an input may produce zero, one, or several outputs.

## 5. Searching and checking

### `includes(searchElement, fromIndex?)`

Returns `true` if the array contains the value, otherwise `false`. It uses SameValueZero comparison, so it can find `NaN`.

```js
const values = [10, 20, NaN];

console.log(values.includes(20)); // true
console.log(values.includes(10, 1)); // false (search starts at index 1)
console.log(values.includes(NaN)); // true
```

For objects, `includes` checks reference identity, not whether two objects have equal properties.

### `indexOf(searchElement, fromIndex?)` and `lastIndexOf(searchElement, fromIndex?)`

Return the first or last matching index, or `-1` if no match exists. These use strict equality and do not find `NaN`.

```js
const values = ["a", "b", "a"];

console.log(values.indexOf("a")); // 0
console.log(values.lastIndexOf("a")); // 2
console.log(values.indexOf("missing")); // -1
```

Use `includes` when you only need a yes/no result.

### `find(callback(element, index, array), thisArg?)`

Returns the first element for which the callback returns a truthy value, or `undefined` if none matches.

```js
const users = [
  { name: "Mia", active: false },
  { name: "Noah", active: true },
];

const user = users.find((item) => item.active);
console.log(user); // { name: "Noah", active: true }
```

### `findIndex(callback(element, index, array), thisArg?)`

Returns the index of the first element matching the callback, or `-1` if none matches.

```js
const scores = [42, 67, 91];
console.log(scores.findIndex((score) => score >= 80)); // 2
```

### `findLast(callback(element, index, array), thisArg?)`

Like `find`, but searches from the end and returns the last matching element.

```js
const values = [4, 9, 12, 15];
console.log(values.findLast((value) => value % 2 === 0)); // 12
```

### `findLastIndex(callback(element, index, array), thisArg?)`

Like `findIndex`, but searches from the end and returns the last matching index.

```js
const values = [4, 9, 12, 15];
console.log(values.findLastIndex((value) => value % 2 === 0)); // 2
```

### `some(callback(element, index, array), thisArg?)`

Returns `true` if at least one element makes the callback return a truthy value. Returns `false` for an empty array.

```js
const scores = [45, 72, 88];
console.log(scores.some((score) => score >= 80)); // true
```

### `every(callback(element, index, array), thisArg?)`

Returns `true` if every element makes the callback return a truthy value. Returns `true` for an empty array.

```js
const scores = [82, 91, 88];
console.log(scores.every((score) => score >= 50)); // true
```

`some` and `every` stop as soon as the result is known. Use them instead of manually building a boolean in a loop.

## 6. Transforming and calculating

### `map(callback(element, index, array), thisArg?)`

Calls a callback for each present element and returns a new array containing the callback results. It does not change the original array.

```js
const prices = [10, 20, 30];
const withTax = prices.map((price) => price * 1.1);

console.log(withTax); // [11, 22, 33]
console.log(prices); // [10, 20, 30]
```

### `filter(callback(element, index, array), thisArg?)`

Returns a new array containing the elements for which the callback returns a truthy value.

```js
const scores = [45, 82, 67, 91];
const passingScores = scores.filter((score) => score >= 70);

console.log(passingScores); // [82, 91]
```

### `reduce(callback(accumulator, currentValue, index, array), initialValue?)`

Processes elements from left to right, passing an accumulated result from one callback call to the next. It returns the final accumulator.

```js
const numbers = [1, 2, 3, 4];
const total = numbers.reduce((sum, number) => sum + number, 0);

console.log(total); // 10
```

The optional `initialValue` is strongly recommended. Without it, the first array element becomes the initial accumulator, and reducing an empty array throws a `TypeError`.

`reduce` can build values other than numbers, but use `map`, `filter`, or a loop when those express the goal more clearly.

### `reduceRight(callback(accumulator, currentValue, index, array), initialValue?)`

Works like `reduce`, but processes elements from right to left.

```js
const parts = ["learn", "to", "code"];
const phrase = parts.reduceRight((result, part) => `${result} ${part}`);

console.log(phrase); // "code to learn"
```

As with `reduce`, provide an initial value when the logic needs one or the array might be empty.

## 7. Iterating

### `forEach(callback(element, index, array), thisArg?)`

Runs a callback for each present element and returns `undefined`.

```js
["Chrome", "Firefox"].forEach((browser, index) => {
  console.log(`${index}: ${browser}`);
});
```

Use `forEach` for side effects such as logging. It is not a replacement for `map` when you need a new array, and `break` or `continue` cannot exit its callback iteration.

### `keys()`, `values()`, and `entries()`

Return iterator objects over array indexes, values, or `[index, value]` pairs.

```js
const colors = ["red", "green"];

console.log([...colors.keys()]); // [0, 1]
console.log([...colors.values()]); // ["red", "green"]
console.log([...colors.entries()]); // [[0, "red"], [1, "green"]]

for (const [index, color] of colors.entries()) {
  console.log(index, color);
}
```

An iterator is consumed as it is read. The spread syntax above collects its values into a new array.

### `Symbol.iterator`

Arrays are iterable, and `array[Symbol.iterator]()` returns an iterator over their values. This is what enables `for...of` and spread syntax.

```js
const numbers = [1, 2, 3];

for (const number of numbers) {
  console.log(number);
}

const copy = [...numbers];
```

In everyday code, use `for...of` or spread rather than calling `Symbol.iterator` directly.

## 8. Sorting, reversing, filling, and copying

### `sort(compareFunction?)`

Sorts the array **in place** and returns that same array. Without a comparator, values are converted to strings and sorted by UTF-16 code units, which is not numeric order.

```js
const words = ["pear", "apple", "orange"];
words.sort();
console.log(words); // ["apple", "orange", "pear"]

const numbers = [40, 5, 100, 25];
numbers.sort((a, b) => a - b);
console.log(numbers); // [5, 25, 40, 100]

numbers.sort((a, b) => b - a);
console.log(numbers); // [100, 40, 25, 5]
```

The comparator should return a negative number when `a` comes first, a positive number when `b` comes first, or `0` when their order should be unchanged. Modern JavaScript guarantees a stable sort.

### `reverse()`

Reverses the elements **in place** and returns the same array.

```js
const letters = ["a", "b", "c"];
letters.reverse();

console.log(letters); // ["c", "b", "a"]
```

### `toSorted(compareFunction?)`

Returns a sorted copy, leaving the original array unchanged. It uses the same ordering rules as `sort`.

```js
const numbers = [40, 5, 100];
const sorted = numbers.toSorted((a, b) => a - b);

console.log(sorted); // [5, 40, 100]
console.log(numbers); // [40, 5, 100]
```

For older runtimes, copy first and then sort: `[...numbers].sort((a, b) => a - b)`.

### `toReversed()`

Returns a reversed copy without changing the original array.

```js
const letters = ["a", "b", "c"];
console.log(letters.toReversed()); // ["c", "b", "a"]
console.log(letters); // ["a", "b", "c"]
```

For older runtimes, use `[...letters].reverse()`.

### `fill(value, start?, end?)`

Replaces elements in a range with the same value and returns the modified array.

```js
const numbers = [1, 2, 3, 4];
numbers.fill(0, 1, 3);

console.log(numbers); // [1, 0, 0, 4]
```

The `end` index is excluded. If `value` is an object, each filled position refers to that same object.

### `copyWithin(target, start, end?)`

Copies part of an array to another position in the same array, without changing its length. It mutates the array and returns it.

```js
const letters = ["a", "b", "c", "d", "e"];
letters.copyWithin(0, 3);

console.log(letters); // ["d", "e", "c", "d", "e"]
```

Here, values from index `3` through the end are copied starting at index `0`. The source `end` index, when provided, is excluded.

### `with(index, value)`

Returns a copy with one element replaced. The original is unchanged. Negative indexes count from the end; an out-of-range index throws a `RangeError`.

```js
const statuses = ["pass", "fail", "skip"];
const corrected = statuses.with(1, "pass");

console.log(corrected); // ["pass", "pass", "skip"]
console.log(statuses); // ["pass", "fail", "skip"]
```

Use this when you want immutable single-index updates.

### `toSpliced(start, deleteCount, ...items)`

Returns a copy with elements removed, replaced, or inserted. Unlike `splice`, it does not mutate the original array.

```js
const colors = ["red", "green", "blue"];
const updated = colors.toSpliced(1, 1, "orange");

console.log(updated); // ["red", "orange", "blue"]
console.log(colors); // ["red", "green", "blue"]
```

## 9. Converting arrays to strings

### `join(separator?)`

Joins array elements into a string. The default separator is a comma. `null` and `undefined` elements become empty strings.

```js
const words = ["Learn", "JavaScript"];
console.log(words.join(" ")); // "Learn JavaScript"
console.log([1, null, 3].join("-")); // "1--3"
```

### `toString()`

Returns a string representation of the array, usually equivalent to `join(",")`.

```js
console.log([1, 2, 3].toString()); // "1,2,3"
```

Use `join` when you want to choose a separator explicitly.

### `toLocaleString(locales?, options?)`

Converts each element using its own `toLocaleString` method and joins the results with commas. The locale and options can affect values such as dates and numbers.

```js
const values = [1000, new Date("2024-01-01T00:00:00Z")];
console.log(values.toLocaleString("en-US"));
// Example output: "1,000, 1/1/2024"
```

Exact date formatting can vary by runtime and locale settings.

## 10. Mutation and copying summary

| Mutates the original array | Returns a new array or a value without mutating |
| --- | --- |
| `copyWithin`, `fill`, `pop`, `push`, `reverse`, `shift`, `sort`, `splice`, `unshift` | `concat`, `filter`, `flat`, `flatMap`, `map`, `slice`, `toReversed`, `toSorted`, `toSpliced`, `with` |
|  | `at`, `entries`, `every`, `find`, `findIndex`, `findLast`, `findLastIndex`, `includes`, `indexOf`, `join`, `keys`, `lastIndexOf`, `reduce`, `reduceRight`, `some`, `toLocaleString`, `toString`, `values` |

Methods such as `forEach` perform a callback for side effects and return `undefined`. The static methods create or check arrays rather than operating on an existing array.

## 11. Important callback and reference notes

### Callback arguments

Many methods accept a callback with these arguments:

```js
array.method((element, index, array) => {
  // Return value matters for map, filter, find, some, every, and related methods.
});
```

The optional `thisArg` parameter sets the callback's `this` value for methods that support it. Arrow functions do not receive `this` from `thisArg`; they capture `this` from their surrounding scope.

### Shallow copies

Methods that return copies generally copy only the array structure, not nested objects:

```js
const original = [{ name: "Mia" }];
const copy = original.slice();

copy[0].name = "Noah";
console.log(original[0].name); // "Noah"
```

The two arrays are different arrays, but both contain a reference to the same object.

### Sparse arrays

An array can contain empty slots (holes), for example `const values = Array(3)`. Many callback methods such as `map`, `filter`, `forEach`, and `some` skip holes. Other methods, such as `find`, visit each index and treat a hole as `undefined`. Prefer dense arrays unless you specifically need sparse-array behavior.

## 12. Choosing the right method

- Need to add or remove items in the original array? Use `push`, `pop`, `shift`, `unshift`, or `splice`.
- Need a range without changing the original? Use `slice`.
- Need a transformed array? Use `map`.
- Need only matching values? Use `filter`.
- Need one matching value or its position? Use `find` or `findIndex` (or the `findLast` variants).
- Need to check whether any or all values match? Use `some` or `every`.
- Need one accumulated result? Use `reduce`, with an initial value.
- Need to sort numbers? Pass a numeric comparator, such as `(a, b) => a - b`.
- Need to transform without mutating? Prefer `toSorted`, `toReversed`, `toSpliced`, or `with` where supported.
