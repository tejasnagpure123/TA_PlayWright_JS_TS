# TA Playwright JS/TS

This repository is a chapter-based collection of JavaScript learning examples. The numbered folders progress from basic syntax through arrays, with most lessons implemented as small, standalone `.js` files. Some filenames are abbreviated or retain their original spelling.

## Project folders

| Folder | Topics and contents |
| --- | --- |
| [`01_Chapter_basic`](./01_Chapter_basic/) | Getting started with JavaScript. Contains `HelloWorld.js`, the introductory example. |
| [`02_Chapter_JS_Keyword_Identifiers`](./02_Chapter_JS_Keyword_Identifiers/) | JavaScript engine basics, `let`, keywords and identifiers, identifier rules, comments, and a question/practice example. |
| [`03_Chapter_JS_Literals`](./03_Chapter_JS_Literals/) | Literal values, numbers, special values, `null`, and `undefined`, with examples covering the distinctions between these values. |
| [`04_Chapter_Operators_JS`](./04_Chapter_Operators_JS/) | Assignment and arithmetic operators, comparisons, logical operators, ternary expressions, strings, `typeof`, and practice questions. Also contains [`ReadmeEqualityInequality.md`](./04_Chapter_Operators_JS/ReadmeEqualityInequality.md), a focused note on equality and inequality. |
| [`05_Chapter_Incre_Decre`](./05_Chapter_Incre_Decre/) | Increment and decrement operations, including prefix/postfix-style examples, practice questions, and a nullish-related example. |
| [`06_Chapter_Statement_Condition`](./06_Chapter_Statement_Condition/) | Conditional statements, including `if`-style conditions, ternary conditions, and multiple-condition examples. |
| [`07_Chapter_Switch`](./07_Chapter_Switch/) | `switch` statements, grouped cases, API-related switch examples, and practice questions. Includes a file named `52` without a file extension. |
| [`08_Chapter_UserInput`](./08_Chapter_UserInput/) | Reading user input and working with Node.js input/prompt and synchronous file-reading examples. |
| [`09_Chapter_loops`](./09_Chapter_loops/) | Loop fundamentals and `for`-loop examples, including additional practice files. |
| [`10_Chapter_While`](./10_Chapter_While/) | Examples for `while` loops and related exercises. |
| [`11_Chapter_Do_While`](./11_Chapter_Do_While/) | `do...while` loops, nested examples, and practice questions. |
| [`12_Chapter_Array`](./12_Chapter_Array/) | The array chapter directory. It is currently empty; no examples have been added yet. |

## Running an example

Install [Node.js](https://nodejs.org/) and run an individual JavaScript file from the repository root:

```powershell
node .\01_Chapter_basic\HelloWorld.js
```

Replace the path with the example you want to run. Input-related examples may require interactive terminal input. These lessons are standalone examples; there is currently no root-level package manifest or common test command.
