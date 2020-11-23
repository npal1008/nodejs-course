import { Request, Response } from 'express';
import * as fs from 'fs';
import AbstractCustomRouter from './AbstractCustomRouter';

export default class GroupsRouter extends AbstractCustomRouter {
    
    constructor() {
        super();
        this.resourceName = 'Group';
        
        this.router.get('', (req: Request, res: Response) => {
            res.setHeader('Content-Type', 'text/plain');
            let groupsReadStream = fs.createReadStream('./groups.txt', 'utf-8');
            res.status(200);
            groupsReadStream.pipe(res);
        });
        
        this.router.post('', (req: Request, res: Response) => {
            console.log(req.body);
            let groups: string = fs.readFileSync('./groups.txt', 'utf-8').trim();
            let groupsArray: Array<string> = groups.split('\n');
            let groupId: string;
            if (groupsArray.length == 1 && groupsArray[0] == ''){
                groupId = '1';
            } else {
                let lastGroup: any = groupsArray.pop();
                let lastGroupId = lastGroup.charAt(0);
                groupId = (parseInt(lastGroupId) + 1).toString();
            }
            groupId = groupId + ' ';
            fs.appendFileSync('./groups.txt', groupId, 'utf-8');
            fs.appendFileSync('./groups.txt', req.body, 'utf-8');
            fs.appendFileSync('./groups.txt', '\n', 'utf-8');
            res.status(201);
            res.end();
        });
        
        this.router.delete('/:id', (req: Request, res: Response) => {
            let groupId: string = req.params.id;
            let groupsArray: Array<string> = fs.readFileSync('./groups.txt', 'utf-8').trim().split('\n');
        
            let deletedGroup: boolean = false;
            for (let i=0; i<groupsArray.length; i++){
                if(groupsArray[i].startsWith(groupId)) {
                    groupsArray.splice(i, 1);
                    deletedGroup = true;
                }
            }
        
            if (deletedGroup == true) {
                let newGroupsFile: string = groupsArray.join('\n') + '\n';
                fs.writeFileSync('./groups.txt', newGroupsFile);
                res.status(201);
                res.send('Group succesfully deleted');
                res.end();
            } else {
                this.notFoundError(req, res);
            }
        });
    }
}