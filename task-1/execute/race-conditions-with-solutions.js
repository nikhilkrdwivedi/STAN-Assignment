import { enqueueUpdate } from '../utils/redis-utils.js';
import { connectToRabbitMQ } from '../connections/rabbitMQ.js';
const key = 'counter';

const updateCounter = async () => {
    try {
        let loopCounts = 50;
        const rabbitMQChannel = await connectToRabbitMQ();
        for (let index = 0; index < loopCounts; index++) {
            // Add some processing time in case have some business logic
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

            // Add action and key to queue
            await enqueueUpdate({ action: 'increment', key, timestamp: Date.now() });
            console.log(`Process ID: ${process.pid} Index: ${index + 1}`);

            // Publish message to RabbitMQ for consumer
            rabbitMQChannel.sendToQueue('my_test_queue', Buffer.from(`Update available for shared resource!`));
        }
    } catch (error) {
        console.log("ERROR_WHILE_UPDATING_QUEUES_VALUE: ", error);
    }
}
updateCounter();
