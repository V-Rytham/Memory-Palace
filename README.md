# Memory Palace

> Personal knowledge base and semantic associative recall engine built with microservices, Hugging Face vector embeddings, Groq LLM extraction, and Nginx reverse proxies.

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)](https://nginx.org/)
[![Hugging Face](https://img.shields.io/badge/Hugging_Face-FFD21E?style=flat-square&logo=huggingface&logoColor=black)](https://huggingface.co/)
[![Groq](https://img.shields.io/badge/Groq_Inference-F05A28?style=flat-square)](https://groq.com/)

---

## Overview

Traditional note-taking tools require rigid folder structures and manual tags that quickly become unorganized. When you need to retrieve something, keyword search fails if you remember the concept rather than the exact phrasing.

I built **Memory Palace** as an associative second brain inspired by the classical Method of Loci:
- **Zero-Friction Ingestion**: Dump unformatted notes or thoughts. The ingestion pipeline summarizes, categorizes, and extracts entities using Groq, then computes dense vector embeddings with Hugging Face.
- **Associative Semantic Recall**: Ask natural-language questions to retrieve top-k semantically relevant notes and synthesize a grounded answer with citations to original entries.

---

## Preview

![Memory Palace Hero Interface](docs/hero.png)

---

## Architecture

```mermaid
flowchart TD
    Client["React + Vite Client (Redux + Tailwind)"]

    subgraph Infrastructure ["Gateway Layer"]
        GatewayNginx["Nginx Gateway Proxy (:80 / :8080)"]
        GatewaySvc["API Gateway Service (:3000)<br/>Central JWT Verification & Routing"]
    end

    subgraph Microservices ["Backend Microservices"]
        AuthSvc["Auth Service (:3001)<br/>User Accounts, Refresh Tokens, Redis"]
        PalaceSvc["Palace Service (:3002)<br/>Memory Creation & Semantic Retrieval"]
    end

    subgraph ExternalEngines ["AI & Vector Engines"]
        GroqLLM["Groq LLaMA 3 Inference"]
        HFEmbedding["Hugging Face Inference API"]
    end

    subgraph Persistence ["Data Stores"]
        MongoDB[("MongoDB Atlas")]
        Redis[("Redis Key-Value Cache")]
    end

    Client -->|HTTP / Cookies| GatewayNginx
    GatewayNginx --> GatewaySvc
    GatewaySvc -->|Route: /auth| AuthSvc
    GatewaySvc -->|Route: /palace| PalaceSvc

    AuthSvc --> MongoDB
    AuthSvc --> Redis

    PalaceSvc -->|Ingestion & Synthesis| GroqLLM
    PalaceSvc -->|Embedding Generation| HFEmbedding
    PalaceSvc -->|Store & Query Vectors| MongoDB
```

---

## Pipeline

```mermaid
flowchart LR
    subgraph Ingestion ["Ingestion Pipeline"]
        Raw["Raw Note / Thought"] --> GroqExtract["Groq Entity & Taxonomy Extraction"]
        GroqExtract --> HFEmbed["Hugging Face Vector Embedding"]
        HFEmbed --> MongoStore[("MongoDB: vectors, tags, entities")]
    end

    subgraph Recall ["Recall Pipeline"]
        Query["Natural Language Question"] --> QueryEmbed["HF Query Embedding"]
        QueryEmbed --> KNN["Top-K Cosine Similarity Search"]
        KNN --> Context["Assemble Semantic Context"]
        Context --> AnswerGen["Groq Grounded Answer Synthesis"]
    end
```

---

## Key Highlights

- **Structured Ingestion**: Constrained JSON prompts extract clean summaries, taxonomy tags, and named entities from raw text.
- **Semantic Retrieval**: Encodes queries into 384-dimensional dense vectors and performs top-k cosine similarity queries in MongoDB scoped to the user ID.
- **Containerized Microservices**: Independent Docker and Nginx reverse proxies for `api-gateway`, `auth-service`, and `palace-service`.
- **Session Security**: Stateless short-lived JWT access tokens paired with refresh token rotation and Redis-backed revocation.

---

## Tech Stack

- **Frontend**: React 18, Vite, Redux Toolkit, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express 5 (ES Modules)
- **AI & NLP**: Groq SDK (`llama-3`), Hugging Face Inference API (`@huggingface/inference`)
- **Databases**: MongoDB (Mongoose with vector fields), Redis (session cache and token blacklist)
- **Infrastructure**: Docker, Docker Compose, Nginx

---

## Setup & Local Run

### 1. Clone & Install
```bash
git clone https://github.com/V-Rytham/Memory-Palace.git
cd Memory-Palace

npm install
npm install --prefix backend/api-gateway-service/service
npm install --prefix backend/auth-service/service
npm install --prefix backend/palace-service/service
npm install --prefix frontend
```

### 2. Environment Variables
Copy `.env.example` templates in each service:

- `backend/auth-service/service/.env`:
  ```ini
  PORT=3001
  MONGO_URI=your_mongodb_uri
  REDIS_HOST=localhost
  REDIS_PORT=6379
  ACCESS_TOKEN_SECRET=your_access_token_secret
  REFRESH_TOKEN_SECRET=your_refresh_token_secret
  ```
- `backend/palace-service/service/.env`:
  ```ini
  PORT=3002
  MONGO_URI=your_mongodb_uri
  HF_TOKEN=your_huggingface_token
  GROQ_API_KEY=your_groq_api_key
  ```
- `backend/api-gateway-service/service/.env`:
  ```ini
  PORT=3000
  AUTH_SERVICE_URL=http://localhost:3001
  PALACE_SERVICE_URL=http://localhost:3002
  ```

### 3. Start Development Services
```bash
npm run dev
```

- Web App: `http://localhost:5173`
- API Gateway: `http://localhost:3000`
