import * as express from 'express';
import { Request, Response, Application } from 'express';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';

let app: Application = express();

app.use(bodyParser.text());

app.get('/users', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/plain');
    let usersReadStream = fs.createReadStream('./users.txt', 'utf-8');
    res.status(200);
    usersReadStream.pipe(res);
});

app.get('/users/:id', (req: Request, res: Response) => {
    let userId: string = req.params.id;
    let userArray: Array<string> = fs.readFileSync('./users.txt', 'utf-8').trim().split('\n');

    let foundUser;
    for (let i=0; i<userArray.length; i++){
        if(userArray[i].startsWith(userId)) {
            foundUser = userArray[i];
        }
    }

    if(foundUser != undefined) {
        res.status(200);
        res.send(foundUser);
    } else {
        res.status(404);
        res.send('Not Found');
    }
    res.end();
});

app.post('/users', (req: Request, res: Response) => {
    console.log(req.body);
    let users: string = fs.readFileSync('./users.txt', 'utf-8').trim();
    let usersArray: Array<string> = users.split('\n');
    let userId: string;
    if (usersArray.length == 1 && usersArray[0] == ''){
        userId = '1';
    } else {
        let lastUser: any = usersArray.pop();
        let lastUserId = lastUser.charAt(0);
        userId = (parseInt(lastUserId) + 1).toString();
    }
    userId = userId + ' ';
    fs.appendFileSync('./users.txt', userId, 'utf-8');
    fs.appendFileSync('./users.txt', req.body, 'utf-8');
    fs.appendFileSync('./users.txt', '\n', 'utf-8');
    res.status(201);
    res.end();
});

app.put('/users/:id', (req: Request, res: Response) => {
    let userId: string = req.params.id;
    let userArray: Array<string> = fs.readFileSync('./users.txt', 'utf-8').trim().split('\n');

    let modifiedUser: boolean = false;
    for (let i=0; i<userArray.length; i++){
        if(userArray[i].startsWith(userId)) {
            userArray[i] = userId + ' ' + req.body;
            modifiedUser = true;
        }
    }

    if (modifiedUser == true) {
        let newUserFile: string = userArray.join('\n') + '\n';
        fs.writeFileSync('./users.txt', newUserFile);
        res.status(201);
        res.send('User succesfully modified');
        res.end();
    } else {
        res.status(404);
        res.send('Not Found');
    }
});

app.delete('/users/:id', (req: Request, res: Response) => {
    let userId: string = req.params.id;
    let userArray: Array<string> = fs.readFileSync('./users.txt', 'utf-8').trim().split('\n');

    let deletedUser: boolean = false;
    for (let i=0; i<userArray.length; i++){
        if(userArray[i].startsWith(userId)) {
            userArray.splice(i, 1);
            deletedUser = true;
        }
    }

    if (deletedUser == true) {
        let newUserFile: string = userArray.join('\n') + '\n';
        fs.writeFileSync('./users.txt', newUserFile);
        res.status(201);
        res.send('User succesfully deleted');
        res.end();
    } else {
        res.status(404);
        res.send('Not Found');
    }
});

app.listen(2000, () => {
    console.log('Server running');
});