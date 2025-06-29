#!/bin/bash

echo "Starting backend..."
(cd backend && npm run dev) &

echo "Starting AI service..."
(cd ai_service && /Users/stefanoknez/Library/Python/3.12/bin/uvicorn app:app --reload --port 5050) &

echo "Starting frontend..."
(cd frontend && npm run dev)