function test(item, callMeWhenDone) {
    console.log("HI Start the test case ", item)
    callMeWhenDone()
}

// First Way
function CompleteOrderPrint() {
    console.log("Normal Fn");
}

test("Burger", CompleteOrderPrint);


// Second Way
// test("Burger", function () {
//     console.log("Test is done");
// });
