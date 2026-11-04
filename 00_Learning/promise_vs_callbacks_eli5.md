# Promises vs. Callbacks (ELI5)

Imagine you order a pizza.

- **Callback:** You give the shop your phone number and say, “Call me when it’s ready.” The shop calls a function you gave it.
- **Promise:** The shop gives you a claim ticket. It represents the pizza that is still being made. Later, the ticket is either fulfilled (pizza ready) or rejected (something went wrong).

Both let JavaScript continue doing other work while waiting. The difference is how you organize the result.

## Callback example

You pass a function to another function. That function is called when the work finishes:

```js
function getPizza(callback) {
    setTimeout(function () {
        callback(null, "Pizza is ready!");
    }, 1000);
}

getPizza(function (error, pizza) {
    if (error) {
        console.log("Could not get pizza:", error);
        return;
    }

    console.log(pizza);
});
```

In this common Node.js style, the callback receives an error first. If there is no error, it receives the result.

With several steps, callbacks can become deeply nested:

```js
function getPizza(callback) {
    setTimeout(function () {
        callback(null, "Pizza");
    }, 1000);
}

function eatPizza(pizza, callback) {
    setTimeout(function () {
        callback(null, "Finished eating the " + pizza);
    }, 1000);
}

getPizza(function (error, pizza) {
    if (error) return console.log(error);

    eatPizza(pizza, function (error, result) {
        if (error) return console.log(error);

        console.log(result);
    });
});
```

## Promise example

A Promise is an object that will eventually provide a result or an error. You use `.then()` for success and `.catch()` for failure:

```js
function getPizza() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Pizza is ready!");
        }, 1000);
    });
}

getPizza()
    .then(function (pizza) {
        console.log(pizza);
    })
    .catch(function (error) {
        console.log("Could not get pizza:", error);
    });
```

When a Promise succeeds, it is **fulfilled** (often called *resolved*). When it fails, it is **rejected**. A Promise can settle only once.

Steps can be chained without putting each step inside the previous one:

```js
function getPizza() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve("Pizza");
        }, 1000);
    });
}

function eatPizza(pizza) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve("Finished eating the " + pizza);
        }, 1000);
    });
}

getPizza()
    .then(function (pizza) {
        return eatPizza(pizza);
    })
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.log(error);
    });
```

## The important difference

| Callback | Promise |
|:--|:--|
| A function you pass in to be called later | An object representing a future success or failure |
| You decide how the callback receives its result and errors | Uses `.then()` for success and `.catch()` for failure |
| Many nested steps can get hard to follow | Chained steps are usually easier to read |

**A Promise still uses callbacks:** the functions passed to `.then()` and `.catch()` are callbacks. Promises provide a standard way to manage the eventual result and chain asynchronous steps.

**Rule of thumb:** callbacks are fine for one small notification; Promises are often easier to manage when an operation can fail or has several asynchronous steps. `async`/`await` is another, often more readable, way to use Promises.
