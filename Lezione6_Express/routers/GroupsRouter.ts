import { Request, Response } from 'express';
import * as fs from 'fs';
import AbstractCustomRouter from './AbstractCustomRouter';

export default class GroupsRouter extends AbstractCustomRouter {

    constructor() {
        super();
        this.resourceName = 'Group';

        this.router.get('', (req: Request, res: Response) => {
            if (req.headers.accept == 'text/plain') {
                let groupsReadStream = fs.createReadStream('./groups.txt', 'utf-8');
                res.status(200);
                groupsReadStream.pipe(res);
            } else {
                let groupsFileContent: string = fs.readFileSync('./groups.txt', 'utf-8').trim();
                let groupsArray: Array<string> = groupsFileContent.split('\n');
                let groupsArrayJSON: Array<any> = groupsArray.map((element, index) => {
                    let splittedElement: Array<string> = element.split(' ');
                    return {
                        id: parseInt(splittedElement[0]),
                        groupName: splittedElement[1]
                    }
                });

                res.status(200);
                res.json({
                    groups: groupsArrayJSON
                });
            }
        });

        this.router.post('', (req: Request, res: Response) => {
            console.log(req.body);
            let groups: string = fs.readFileSync('./groups.txt', 'utf-8').trim();
            let groupsArray: Array<string> = groups.split('\n');
            let groupId: string;
            if (groupsArray.length == 1 && groupsArray[0] == '') {
                groupId = '1';
            } else {
                let lastGroup: any = groupsArray.pop();
                let lastGroupId = lastGroup.charAt(0);
                groupId = (parseInt(lastGroupId) + 1).toString();
            }
            groupId = groupId + ' ';
            if (req.body.groupName !== undefined) {
                fs.appendFileSync('./groups.txt', groupId, 'utf-8');
                fs.appendFileSync('./groups.txt', req.body.groupName, 'utf-8');
                fs.appendFileSync('./groups.txt', '\n', 'utf-8');
                res.status(201);
                if (req.headers.accept == 'text/plain') {
                    res.setHeader('Content-Type', 'text/plain');
                    res.write('Group created');
                    res.end();
                } else {
                    res.json({
                        message: 'Group created'
                    });
                }
            } else {
                this.badRequestError(req, res);
            }
        });

        this.router.delete('/:id', (req: Request, res: Response) => {
            let groupId: string = req.params.id;
            let groupsArray: Array<string> = fs.readFileSync('./groups.txt', 'utf-8').trim().split('\n');

            let deletedGroup: boolean = false;
            for (let i = 0; i < groupsArray.length; i++) {
                if (groupsArray[i].startsWith(groupId)) {
                    groupsArray.splice(i, 1);
                    deletedGroup = true;
                }
            }

            if (deletedGroup == true) {
                let newGroupsFile: string = groupsArray.join('\n') + '\n';
                fs.writeFileSync('./groups.txt', newGroupsFile);
                res.status(201);
                if (req.headers.accept == 'text/plain') {
                    res.setHeader('Content-Type', 'text/plain');
                    res.write('Group deleted');
                    res.end();
                } else {
                    res.json({
                        message: 'Group succesfully deleted'
                    });
                }
            } else {
                this.notFoundError(req, res);
            }
        });
    }
}