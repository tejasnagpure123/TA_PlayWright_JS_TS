// function add(a, b, c) {
//     return a + b + c;
// }

// let num = [1, 2, 3, 5];
// console.log(add(...num));

// ----
function hasError(...codes) {
    return codes.some(c => c >= 400);
}

let responseCodes = [200, 201, 404];
let responseCodes2 = [200, 201, 404, 500];
hasError(...responseCodes);


console.log(hasError(...responseCodes2))


function isValidStatusCode(...codes) {
    return codes.every(code => code >= 200 && code < 300);
}
let respCodes = [200, 201, 215]
console.log(isValidStatusCode(...respCodes))