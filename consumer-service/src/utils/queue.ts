import amqp, {Connection} from 'amqplib';

let connection: Connection = null;

export const getChannel = async () => {
    try {
        if (connection == null) {
            connection = await amqp.connect(process.env.QUEUE_URL);
        }
        const channel = await connection.createChannel();
        await channel.assertQueue(process.env.QUEUE_NAME);

        channel.on('close', () => {
            console.log('Channel has been closed!');
        });

        return channel;
    } catch (err) {
        return process.exit(1);
    }
};
