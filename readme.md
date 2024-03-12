### STAN Assignment
##### Task-1
- Task Description:
Create a Node.js application that simulates a race condition when updating a shared resource. Use Redis for managing the shared resource and RabbitMQ for communication between different parts of the application. Implement a FIFO queue to manage the order of updates.

##### What is a race condition?
- A race condition is an undesirable situation that occurs when a device or system attempts to perform two or more operations at the same time, but because of the nature of the device or system, the operations must be done in the proper sequence to be done correctly.
##### Demo of race condition:
- Add environment variable given in `task-1/sample.env` to `.env`
- Go to Task-1 folder and install node_modules
-   ```sh
    cd task-1
    npm i
    ```
- then split your terminal and run following commands:
- Run below command to cleanup redis  
-   ```sh
    node execute/cleanup-redis.js
    ```
- Run below command in two terminal at the same time to increment counter value 
- Terminal 1
-  ```sh
   node execute/race-conditions-with-problems.js
    ```
- Terminal 2
-  ```sh
   node execute/race-conditions-with-problems.js
    ```
- Finally, run the below command to see final value of counter
-  ``` sh 
   node execute/counter.js 
    ```
- You will see incorrect value of counter
##### Screenshot of race condition:
![alt text](https://raw.githubusercontent.com/nikhilkrdwivedi/STAN-Assignment/master/task-1/screenshots/p1.png)
##### Result:
![alt text](https://raw.githubusercontent.com/nikhilkrdwivedi/STAN-Assignment/master/task-1/screenshots/p2.png)
- Now, we can see in image as well that counter value is incorrect. So, we have used Redis and RabbitMQ to fix this issue along with Redis transactions. 
- Now split your terminal and run following commands:
- Run below command to cleanup redis  
-   ```sh
    node execute/cleanup-redis.js
    ```
- Run below command to cleanup redis  
-   ```sh
    node execute/rabbitmq-consumer.js
    ```
- Run below command in two terminal at the same time to increment counter value 
- Terminal 1
-  ```sh
   node execute/race-conditions-with-solutions.js
    ```
- Terminal 2
-  ```sh
   node execute/race-conditions-with-solutions.js
    ```
- Finally, run the below command to see final value of counter
-  ``` sh 
   node execute/counter.js 
    ```
- Now, you can see correct value is coming.

##### Screenshot of race condition with solution:
![alt text](https://raw.githubusercontent.com/nikhilkrdwivedi/STAN-Assignment/master/task-1/screenshots/s1.png)
##### Result:
![alt text](https://raw.githubusercontent.com/nikhilkrdwivedi/STAN-Assignment/master/task-1/screenshots/s2.png)

##### Task-2
- Create CRUD API for user.
- Solution is under task-2 folder.
- You can find Postman json inside `task-2/postman`
-- Add environment variable given in `task-2/sample.env` to `.env`

#### Thank You!