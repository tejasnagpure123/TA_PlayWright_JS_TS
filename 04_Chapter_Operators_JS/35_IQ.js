let statusCode = 404
let categoryCode =
    statusCode < 300 ? "Success" :
        statusCode < 400 ? "Redirect" :
            statusCode < 500 ? "Client Error" : "Server Error"

console.log(`Status ${statusCode}:${categoryCode}`);