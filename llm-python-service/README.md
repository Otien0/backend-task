# Python LLM Service

## Setup

1. Build Docker image:
    ```
    docker build -t llm-service .
    ```

2. Run Docker container:
    ```
    docker run -p 5000:5000 llm-service
    ```

## Endpoints

- `POST /select_model`
  - Body: `{ "model": "llama2" }`

- `POST /query`
  - Body: `{ "question": "What is AI?" }`
