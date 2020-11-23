import { Router, Request, Response } from 'express';

export default abstract class AbstractCustomRouter {

    protected router: Router = Router();
    protected resourceName: string = '';

    constructor() {}

    protected notFoundError(req: Request, res: Response) {
        res.status(404);
        res.send(this.resourceName + ' Not Found');
        res.end();
    }

    public getExpressRouter(): Router {
        return this.router;
    }
}