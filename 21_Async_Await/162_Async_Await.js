// An async function always returns a promise.
// await reads the resolved value inside another async function.

function apiRequest() {
    return new Promise(function (resolve) {
        resolve({ status: 200 });
    });
}


async function runAPIRequest() {
    let response = await apiRequest();
    console.log("API status:", response.status);
}

runAPIRequest();


function apiRequest400() {
    return new Promise(function (resolve) {
        resolve({ status: 400 });
    });
}

async function runApiRequest400() {
    let response = await apiRequest400();
}