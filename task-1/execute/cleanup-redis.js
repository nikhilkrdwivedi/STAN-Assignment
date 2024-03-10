import { redis } from '../connections/redis.js';

const cleanUpRedisKeys = async () => {
    try {
        const existingKeys = await redis.keys("*");
        console.log('Before Clean up Keys: ', existingKeys);

        const result = await redis.flushall();
        console.log('Clean up Result: ', result);

        const afterKeys = await redis.keys("*");
        console.log('After Clean up Keys: ', afterKeys);
    } catch (error) {
        console.log("ERROR_WHILE_DOING_CLEAN_UP_FOR_REDIS_KEYS: ", error)
    } finally {
        process.exit()
    }
}

cleanUpRedisKeys()