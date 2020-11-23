import * as express from 'express';
import { Application } from 'express';
import UsersRouter from './routers/UsersRouter';
import GroupsRouter from './routers/GroupsRouter';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

let app: Application = express();

app.use(morgan('dev'));
app.use(bodyParser.text());

app.use('/users', new UsersRouter().getExpressRouter());
app.use('/groups', new GroupsRouter().getExpressRouter());

app.listen(2000, () => {
    console.log('Server running');
});