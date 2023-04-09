# Register-Login-Profile
   A simple website that has complete flow from Registration -> Login -> Profile implemented.

## Tech Stack
  * HTML
  * CSS
  * JS
  * PHP
  * Redis
  * MySQL
  * MongoDB

## How To Run
  1. Clone the repository 
      ```
      git clone https://github.com/Suriya-2422/Guvi-Task.git
      ```
  2. Install redis [here](https://redis.io/docs/getting-started/installation/)
  3. Connect PHP with Redis using [phpredis](https://github.com/phpredis/phpredis) or [predis](https://github.com/predis/predis)
  4. Start the Redis server
      ```
      redis-cli
      ```
  5. Install MongoDB [here](https://www.mongodb.com/docs/manual/administration/install-community/)
  6. Connect PHP with MongoDB using [driver](https://github.com/mongodb/mongo-php-driver)
  7. Start the MongoDB server
      ```
      mongod
      ```
  8. Install MySQL [here](https://dev.mysql.com/downloads/mysql/)
  9. To connect PHP with MySQL using driver, remove semicolon from `;extension=mysqli` in php.ini
  10. Start MySQL server using credentials
      ```
      mysql -u user -p password
      ```
  11. Change the credentials for MySQL in the program or configure them as environment variables
  12. Start the server using Apache
      ~~~~
      httpd
      ~~~~
  13. Go to `localhost:8000` or the configured address

## Screenshots

#### Registration
![image](https://user-images.githubusercontent.com/128062071/230780019-a043dd46-2dc3-4893-9583-e0a31fbce246.png)

#### Login
![image](https://user-images.githubusercontent.com/128062071/230780272-cb83558f-bcb2-4ce7-8ba9-3290292a4985.png)


#### Profile
![image](https://user-images.githubusercontent.com/128062071/230780072-2a03b246-6b6b-410d-804a-6dee33a87590.png)



