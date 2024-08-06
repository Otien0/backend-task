# Node.js API Server

## Setup

1. Build Docker image:
    ```
    docker build -t api-server .
    ```

2. Run Docker container:
    ```
    docker run -p 3000:3000 api-server
    ```

## Endpoints

- `POST /query`
  - Body: `{ "model": "llama2", "question": "What is AI?" }`

- `GET /conversations`
  - List all conversations.

- `GET /conversations/:id`
  - Get details of a specific conversation.
