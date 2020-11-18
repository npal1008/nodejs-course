import * as http from 'http';
import * as fs from 'fs';

function notFound(res: http.ServerResponse) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    let html404Page = fs.readFileSync('./404.html');
    res.write(html404Page);
}

export let server = http.createServer((req, res) => {
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
                case '/download':
                    try {
                        let fileContent = fs.readFileSync('./uploaded.txt', 'utf-8');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        res.write(fileContent);
                    } catch (error) {
                        if(error.errno == -4058) {
                            notFound(res);
                        } else {
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'text/plain');
                            res.write('Internal Server Error');
                        }
                    }
                    break;
                default:
                    notFound(res);
                    break;
            }
        } else if (req.method == 'POST') {
            switch (calledURL) {
                case '/upload':
                    fs.appendFileSync('./uploaded.txt', body);
                    res.statusCode = 201;
                    break;
                default:
                    notFound(res);
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