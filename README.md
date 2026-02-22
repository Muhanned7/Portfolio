🤖 Resume RAG: AI-Powered Contextual Chatbot

A production-grade Retrieval-Augmented Generation (RAG) application that transforms a static PDF resume into an interactive, memory-aware conversational agent.

🚀 Key Features

Contextual Intelligence: Uses LangChain and Pinecone to retrieve specific facts from a PDF resume.

Persistent Memory: Integrated with Upstash Redis to maintain conversation history across sessions via pickle serialization.

Self-Hosted LLM: Runs Llama 3.2-3B locally within the container (via HuggingFace Transformers), eliminating external LLM API costs.

Production Guardrails: Strict system prompting to prevent "hallucinations" and ensure first-person professional responses.

Optimized for Cloud: Custom memory management and garbage collection to run efficiently on CPU-bound environments.

🛠️ Tech Stack
Component        Technology

Backend      ->    Python (Flask)

Orchestration  ->  LangChainLLMLlama 3.2 (via HuggingFace)

Vector      ->     DBPineconeCache/MemoryRedis (Upstash)

Deployment    ->   Docker & GCP (Cloud Run)


🏗️ Architecture & Logic
1. The RAG Pipeline
The system utilizes RecursiveCharacterTextSplitter to chunk PDF data, which is then embedded using HuggingFaceEmbeddings and stored in a Pinecone serverless index.

2. State Management
Unlike basic chatbots, this app uses a Hybrid Redis Strategy:

Flask-Session: Manages the user's browser session.

Redis Pickle Store: Custom logic to store and retrieve HumanMessage and AIMessage objects, allowing for a 7-day conversation "memory" window.

📦 Deployment

Docker
The application is fully containerized. To build and run locally:
docker build -t resume-rag .
docker run -p 8080:8080 --env-file .env resume-rag

Google Cloud Platform (GCP)
Deployed via Google Cloud Run. The app.run configuration is set to listen on $PORT to comply with GCP's dynamic routing.

🚦 API Endpoints

POST /api/chat: Submit a question and receive a RAG-filtered response.

POST /api/history: Retrieve full conversation history for a specific session.

POST /api/clear-history: Wipe the Redis-backed memory for a clean slate.

GET /api/health: Monitor system status, Redis connectivity, and message counts.
