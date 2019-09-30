import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import amqlRoute from './routes/amqp';

require('dotenv').config();

const app = new Koa();

app.use(json());
app.use(bodyParser());

app.use(amqlRoute.routes());
app.use(amqlRoute.allowedMethods());

app.listen(process.env.SERVER_HOST);

console.log(`Server running on port ${process.env.SERVER_HOST}`);
