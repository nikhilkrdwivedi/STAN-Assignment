import { redis } from '../connections/redis.js';

export const getValueByKey = async (key) => {
    try {
        const value = await redis.get(key);
        return value;
    } catch (error) {
        console.log("Error: ", error)
        throw new Error("ERROR_WHILE_FETCHING_VALUE_FROM_REDIS")
    }
}

export const setValueByKey = async (key, value) => {
    try {
        const result = await redis.set(key, value);
        return result;
    } catch (error) {
        console.log("Error: ", error)
        throw new Error("ERROR_WHILE_FETCHING_VALUE_FROM_REDIS")
    }
}

// Implement FIFO Queue in Redis
export async function enqueueUpdate(update) {
    const result = await redis.lpush('updates_queue', JSON.stringify(update));
    return JSON.parse(result);
}

export async function dequeueUpdate() {
    const update = await redis.rpop('updates_queue');
    return JSON.parse(update);
}


export default { getValueByKey, setValueByKey, enqueueUpdate, dequeueUpdate, }