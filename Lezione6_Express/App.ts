import { Application, Request, Response } from 'express';
import * as express from 'express';
import { readFileSync } from 'fs';

let app: Application = express();

app.use((req: Request, res: Response, next) => {
    console.log(req.headers);
    let userAgent = req.headers["user-agent"];
    if (userAgent?.startsWith('Postman')) {
        res.locals.isUsingPostman = true;
    } else {
        res.locals.isUsingPostman = false;
    }
    next();
});

app.use((req: Request, res: Response, next) => {
    console.log(res.locals.isUsingPostman);
    if(res.locals.isUsingPostman == true) {
        res.status(500);
        res.end();
    } else {
        next();
    }
});
app.get('/html', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html');
    let file = readFileSync('./test.html', 'utf-8');
    res.status(200);
    res.send(file);
    res.end();
});

app.get('/img', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'image/jpeg');
    let image = readFileSync('./img.jpg');
    res.status(200);
    res.send(image);
    res.end();
});

app.listen(2000, () => {
    console.log('Server listening');
});