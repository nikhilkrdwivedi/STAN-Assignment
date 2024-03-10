import { redis } from '../connections/redis.js';
const key = 'counter';

const updateCounter = async () => {
    try {
        let loopCounts = 50;
        for (let index = 0; index < loopCounts; index++) {
            // Add some processing time in case have some business logic
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

            // Get and update the counter value
            const value = await redis.get("counter");
            const newValue = (parseInt(value) || 0) + 1;
            await redis.set(key, newValue);

            console.log(`Process ID: ${process.pid} Index: ${index + 1}`);
        }
    } catch (error) {
        console.log("ERROR_WHILE_UPDATING_COUNTER_VALUE: ", error);
    } finally {
        const finalValue = await redis.get("counter");
        console.log(`Final Value After All Updates: ${finalValue}`);
    }
}
updateCounter();
