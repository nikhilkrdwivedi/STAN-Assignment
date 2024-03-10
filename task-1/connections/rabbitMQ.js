import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

const RABBIT_MQ_URL = process.env.RABBIT_MQ_URL || '';

export async function connectToRabbitMQ() {
    try {

        if (!RABBIT_MQ_URL?.length) {
            console.log("RABBIT_MQ_URL_IS_MISSING")
            process.exit();
        }
        const connection = await amqp.connect(RABBIT_MQ_URL);
        let rabbitMQChannel = await connection.createChannel();
        return rabbitMQChannel
    } catch (error) {
        console.log('ERROR_WHILE_CONNECTING_RABBIT_MQ: ', error);
        throw new Error("ERROR_WHILE_CONNECTING_RABBIT_MQ")
    }
}

export default { connectToRabbitMQ }