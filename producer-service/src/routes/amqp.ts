import Router, {IRouterOptions} from "koa-router";
import {Context} from 'koa';
import {getChannel} from "../utils/queue";
import {generateRandomMatrix, getRandomDimensionLength, MatrixObject} from "../utils/matrix";

const routeOptions: IRouterOptions = {
    prefix: '/amqp',
};
const router = new Router(routeOptions);

router.post('/', async (context: Context) => {
    const body = <MatrixObject>context.request.body;
    if (body.matrix1 == null || body.matrix2 == null) {
        context.throw(400, 'Assert another body: {matrix1: Array<Array<Number>>, matrix2: Array<Array<Number>>}');
        return;
    }

    if (body.matrix1.length === 0
        || body.matrix2.length === 0
        || body.matrix1.some(value => value.length === 0)
        || body.matrix2.some(value => value.length === 0)) {
        context.throw(400, 'Matrices must have length more than 0');
        return;
    }

    if (body.matrix1.length !== body.matrix2.length
        || body.matrix1.some((value, index, array) => value.length !== array[0].length)
        || body.matrix2.some((value, index, array) => value.length !== array[0].length)
        || Math.max.apply(Math, body.matrix1.map(value => value.length)) !== Math.max.apply(Math, body.matrix2.map(value => value.length))) {
        context.throw(400, 'Matrices must have equal length');
        return;
    }

    const channel = await getChannel();
    channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(JSON.stringify(body)));
    await channel.close();
    context.status = 204;
});

router.post('/random', async (context: Context) => {
    const channel = await getChannel();
    const dimension = getRandomDimensionLength();
    channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(
        JSON.stringify({matrix1: generateRandomMatrix(dimension), matrix2: generateRandomMatrix(dimension)})
    ));
    await channel.close();
    context.status = 204;
});

export default router;
