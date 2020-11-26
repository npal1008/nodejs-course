import { Router, Request, Response } from 'express';

export default abstract class AbstractCustomRouter {

    protected router: Router = Router();
    protected resourceName: string = '';

    constructor() {}

    protected notFoundError(req: Request, res: Response) {
        res.status(404);
        if(req.headers.accept == 'text/plain') {
            res.setHeader('Content-Type', 'text/plain');
            res.write(this.resourceName + ' Not Found');
            res.end();
        } else {
            res.json({
                message: this.resourceName + ' Not Found'
            });
        }
    }

    protected badRequestError(req: Request, res: Response) {
        res.status(400);
        if(req.headers.accept == 'text/plain') {
            res.setHeader('Content-Type', 'text/plain');
            res.write('Bad Request');
            res.end();
        } else {
            res.json({
                message: 'Bad Request'
            });
        } 
    }

    public getExpressRouter(): Router {
        return this.router;
    }
}