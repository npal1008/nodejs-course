import { Request, Response } from 'express';
import * as fs from 'fs';
import AbstractCustomRouter from './AbstractCustomRouter'; 

export default class UsersRouter extends AbstractCustomRouter {

    constructor() {
        super();
        this.resourceName = 'User';

        this.router.get('', (req: Request, res: Response) => {
            res.setHeader('Content-Type', 'text/plain');
            let usersReadStream = fs.createReadStream('./users.txt', 'utf-8');
            res.status(200);
            usersReadStream.pipe(res);
        });
        
        this.router.get('/:id', (req: Request, res: Response) => {
            let userId: string = req.params.id;
        
            try{
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
                    this.notFoundError(req, res);
                }
            } catch (error) {
                res.status(500);
                res.send('An error occured');
            }
            res.end();
        });
        
        this.router.post('', (req: Request, res: Response) => {
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
        
        this.router.put('/:id', (req: Request, res: Response) => {
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
                this.notFoundError(req, res);
            }
        });
        
        this.router.delete('/:id', (req: Request, res: Response) => {
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
                this.notFoundError(req, res);
            }
        });
    }
}