import {getChannel} from "./utils/queue";
import {ConsumeMessage} from "amqplib";
import {MatrixObject, multiplyMatrix} from "./utils/matrix";
require('dotenv').config();

(async () => {
    const channel = await getChannel();
    await channel.prefetch(1);
    await channel.consume(process.env.QUEUE_NAME, (message: ConsumeMessage) => {
        try {
            console.time('MultiplyMatrix');
            const obj: MatrixObject = JSON.parse(message.content.toString('utf-8'));
            const matrix = multiplyMatrix(obj);
            process.env.DEBUG_MODE === 'true' && console.table(matrix);
            channel.ack(message);
            console.timeEnd('MultiplyMatrix');
        } catch (e) {
            console.error(e);
            channel.reject(message, true);
        }
    }, {noAck: false});
    console.log('Consumer has been connected!')
})();
