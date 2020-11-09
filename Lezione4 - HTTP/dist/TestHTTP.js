"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
let options = {
    host: 'www.google.it',
    port: 80,
    method: 'POST',
    path: '/',
    headers: {
        'Content-Type': 'text/plain'
    }
};
let request = http.request(options, (response) => {
    let body = '';
    response.on('data', (chunk) => {
        body += chunk;
    });
    response.on('end', () => {
        console.log('Status Code: ' + response.statusCode);
        console.log(response.headers);
        console.log(body);
    });
});
request.write('Test');
request.end();
//# sourceMappingURL=TestHTTP.js.map