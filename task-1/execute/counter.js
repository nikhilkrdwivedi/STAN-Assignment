
import { getValueByKey } from '../utils/redis-utils.js';

const key = 'counter';

const counter = async () => {
    try {
        console.log("Getting Final Resource Value");

        const finalValue = await getValueByKey(key);

        console.log("Final Value After Resource Value Update: ", finalValue);
    } catch (error) {
        console.log('ERROR_WHILE_FETCHING_COUNTER_VALUE : ', error);
    } finally {
        process.exit();
    }
}
counter();