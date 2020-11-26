import * as express from 'express';
import { Application, Request, Response } from 'express';
import UsersRouter from './routers/UsersRouter';
import GroupsRouter from './routers/GroupsRouter';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

export default class MyWebServer {

    private app: Application;
    
    constructor() {
        this.app = express();

        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use((req: Request, res: Response, next) => {
            if (req.headers.accept == undefined) {
                req.headers.accept = 'application/json';
            }

            if (req.headers.accept == 'application/json' || req.headers.accept == 'text/plain') {
                next();
            } else {
                res.status(400);
                res.json({
                    message: 'Only text/plain and application/json are allowed for accept header'
                });
            }
        });

        this.app.use('/users', new UsersRouter().getExpressRouter());
        this.app.use('/groups', new GroupsRouter().getExpressRouter());
    }

    public startServer(): void {
        this.app.listen(2000, () => {
            console.log('Server running');
        });
    }
}