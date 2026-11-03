function greet(name) {
    return `Hello, ${name}`;
}

const greet1 = function (name) {
    return `Hello, ${name}`;
}

// Arrow Fn
const greet2 = (name2) => `Hello, ${name2}`;
// If you want to make a normal function to arrow function.
// Remove the keyword function, remove the keyword return, remove the curly braces, and use the =>

const greetCuss = function (object) {
    return `Shit Man, ${object}`;
}

const greetCuss1 = (object) => `Shit Man, ${object}`
console.log(greetCuss1("Tejas"))

const greetFlp = (obj) => `Flip, ${obj}`
console.log(greetFlp("Tejas"))