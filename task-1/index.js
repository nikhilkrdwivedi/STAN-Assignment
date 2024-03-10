
import { redis } from './connections/redis.js'
import { dequeueUpdate } from './utils/redis-utils.js';
redis.llen('updates_queue', async (err, length) => {
    if (err) {
        console.error('Error getting queue length:', err);
    } else {
        console.log(`Queue length: ${length}`);
    }
    // const result = await dequeueUpdate()
    // console.log('👉🏻 Line 11 : ', result);

    // Close the Redis connection
    redis.quit();
});
// // Key for the shared resource
// const sharedResourceKey = 'sharedResource';

// // Function to simulate a race condition
// async function updateSharedResource() {
//     // Get the current value of the shared resource
//     redis.get(sharedResourceKey, async (err, value) => {
//         if (err) throw err;

//         // Simulate some processing time
//         await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

//         // Increment the value
//         const newValue = (parseInt(value) || 0) + 1;

//         // Update the shared resource in Redis
//         redis.set(sharedResourceKey, newValue, (err) => {
//             if (err) throw err;
//             console.log(`Updated shared resource to ${newValue}`);
//         });
//     });
// }

// // Simulate multiple concurrent updates
// const numUpdates = 10;
// for (let i = 0; i < numUpdates; i++) {
//     updateSharedResource();
// }

// const value = await redis.get(sharedResourceKey);
// console.log(value)