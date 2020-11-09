import * as http from 'http';
import * as fs from 'fs';

/*let options = {
    host: 'www.google.it',
    port: 80,
    method: 'POST',
    path: '/'
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
request.end();*/

let server = http.createServer((req, res) => {
    /*console.log('Incoming request');
    console.log(req.method);
    console.log(req.headers);
    console.log(req.url);*/
    let calledURL = req.url;
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        if(req.method == 'GET' || req.method == 'HEAD') {
            switch (calledURL) {
                case '/html':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    let htmlPage = fs.readFileSync('./test.html');
                    res.write(htmlPage);
                    break;
                case '/image':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'image/jpeg');
                    res.write(fs.readFileSync('./img.jpg'));
                    break;
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    let html404Page = fs.readFileSync('./404.html');
                    res.write(html404Page);
                    break;
            }
        } else if (req.method == 'POST') {
            switch (calledURL) {
                case '/upload':
                    console.log('BODY: ' + body);
                    fs.appendFileSync('./uploaded.txt', body);
                    res.statusCode = 201;
                    break;
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    let html404Page = fs.readFileSync('./404.html');
                    res.write(html404Page);
                    break;
            }
        } else {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'text/plain');
            res.write('METHOD NOT ALLOWED');
        }
        res.end();
    });
});

server.listen(2000, () => {
    console.log('Server started');
});