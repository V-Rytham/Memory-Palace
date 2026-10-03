# Memory Palace

Memory Palace is a personal memory app where you can save notes and ask questions to find relevant details later. I built it to explore how retrieval-based AI can make saved information easier to revisit, and to practise designing a full-stack app as separate services.

## What it does

- Create and store personal memories
- Retrieve relevant memories in response to a question
- Generate an answer from retrieved context
- Sign up and log in through a dedicated authentication service

## How it is put together

- **Frontend:** React, Vite, Redux Toolkit
- **API gateway:** Express, routes requests to the backend services
- **Auth service:** Express, MongoDB, Redis, JWT
- **Palace service:** Express, MongoDB, Hugging Face embeddings, Groq
- **Local infrastructure:** Docker Compose and Nginx for the service containers

The backend is split into gateway, authentication, and memory retrieval services. The gateway is the frontend's API entry point.

## Run locally

You’ll need Node.js, npm, Docker, and Docker Compose. The backend services also need MongoDB, Redis, and API credentials.

1. Clone the repository and install the root and frontend dependencies:

```bash
npm install
cd frontend
npm install
cd ..
```

2. Copy each service’s example environment file and fill in the required values:

- `backend/auth-service/service/.env.example`
- `backend/api-gateway-service/service/.env.example`
- `backend/palace-service/service/.env.example`

The auth service needs MongoDB and JWT secrets; the gateway needs the service URLs and access-token secret; the palace service needs MongoDB, a Groq API key, and a Hugging Face token.

3. Start the services and frontend:

```bash
npm run dev
```

The root script is intended to start all services together. Its API-gateway path currently differs from the checked-in folder name (`api-gateway` vs `api-gateway-service`), so that script may need correcting before it runs. The Compose files are also organized per service, so local deployment setup may need adjustment.

## Notes

This is a learning project and is still being developed. The service boundaries, retrieval flow, and local deployment setup reflect the areas I wanted to practise.