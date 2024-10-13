# RabbitMQ Fastify Example

This project demonstrates a simple setup using Fastify to create an API that sends messages to a RabbitMQ queue and a separate service that consumes those messages.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [License](#license)

## Installation

1. Clone the repository:

```
git clone <repository-url>
cd rabbit-mq
```

   ### Install the dependencies:

```
    npm install
```
   ### Ensure you have RabbitMQ running locally or adjust the connection string in the code.

## Usage

To run the main API server:

```bash
npm run dev
```

### To run the consumer service:

```
npm run service:dev
```

### API Endpoints

1. Send a Message

   POST /message
   Request Body:

   ```bash
   {
       "message": "Your message here"
   }
   ```

   Response:
   ```json
   200 OK: { "message": "Message sent to queue" }
   400 Bad Request: { "message": "Message is required" }
   ```
2. Health Check

   GET /

   Response:
   ```json
   200 OK: { "message": "Hello World" }
   ```
3. Consumer Service

The consumer service runs on port 3001 and will periodically check the RabbitMQ queue for messages, logging any received messages to the console.
Architecture

    Main API (index.ts):
        Receives requests and publishes messages to RabbitMQ.
        Validates incoming messages and handles errors.

    Consumer Service (reciever_service.ts):
        Consumes messages from RabbitMQ and processes them.
        Logs messages received from the queue.

# Technologies

    Fastify: A fast and low-overhead web framework for Node.js.
    RabbitMQ: A message broker that enables applications to communicate with each other.
    TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.

# Package.json

The package.json file includes the necessary dependencies and scripts for running the project:

```json
{
  "name": "rabbit-mq",
  "version": "1.0.0",
  "type": "module",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node --import=tsx index.ts",
    "service:dev": "node --import=tsx reciever_service.ts"
  },
  "devDependencies": {
    "@types/node": "^22.7.5",
    "tsx": "^4.19.1"
  },
  "dependencies": {
    "fastify": "^5.0.0",
    "nodemon": "^3.1.7",
    "rabbitmq-client": "^5.0.0"
  }
}
```

# License

This project is licensed under the ISC License - see the LICENSE file for details.

### Instructions

- Replace `<repository-url>` with the actual URL of your GitHub repository.
- Adjust any sections as needed based on your project specifics or additional features.
