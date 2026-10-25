let arr = [1, 2, 3];
console.log(arr);

// Add to END
arr.push(4);
console.log(arr);

// Remove from END
arr.pop();
console.log(arr);

arr.push(5, 6);
console.log(arr);

// Add to BEGINNING
arr.unshift(0);
console.log(arr);

// Remove from BEGINNING
arr.shift();
console.log(arr);

// [ 1, 2, 3, 5, 6 ]
arr.splice(2, 1);
//At Second index-> Remove one element 
console.log(arr);

arr.splice(2, 0, 99);
//At Second index-> Remove Zero element and add  99
// arr.splice(2, 1, 99);
// arr.splice(2, 2, 99);
console.log(arr);

// [ 1, 2, 99, 5, 6 ]
arr.splice(1, 2, 10, 20);
//At First index remove 2 elements and replace it by 10, 20
console.log(arr);