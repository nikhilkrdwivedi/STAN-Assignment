import { connectToRabbitMQ } from '../connections/rabbitMQ.js'
import { dequeueUpdate } from '../utils/redis-utils.js';
import { redis } from '../connections/redis.js';

async function consumeUpdates() {
    try {
        const rabbitMQChannel = await connectToRabbitMQ()
        rabbitMQChannel.assertQueue('my_test_queue', { durable: true });
        rabbitMQChannel.consume('my_test_queue', async (msg) => {
            const { action, key } = await dequeueUpdate();
            if (action === 'increment' && key) {
                const multi = redis.multi();

                // Get the current value of the shared resource
                multi.get(key);

                // Increment the value by 1
                multi.incr(key || 1);

                // Execute the transaction
                multi.exec((err, replies) => {
                    if (err) throw err;

                    // Extract the current value from the transaction replies
                    const currentValue = parseInt(replies[1][1] || 0);

                    // Log the updated value
                    console.log(`Updated shared resource to ${currentValue}`);
                });
            }

            rabbitMQChannel.ack(msg);
        });
    } catch (error) {
        console.log("ERROR_WHILE_UPDATING_COUNTER_IN_REDIS_USING_RABBIT_MQ: ", error)
    }
}
consumeUpdates();