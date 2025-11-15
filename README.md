# DRIA — demo project (Node + Python + Frontend)

## Quick local (without Docker)

### Node backend
cd backend-node
npm install
npm start
-> Node backend @ http://localhost:3000

### Python backend
cd backend-python
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
-> Python backend @ http://localhost:8000

### Frontend (dev)
cd frontend
npm install
npm run start
-> Vite dev server (open printed URL)

## Quick with Docker Compose (recommended for demo)
# from repo root
docker compose build
docker compose up

Frontend available at http://localhost:8080
Node backend at http://localhost:3000
Python backend at http://localhost:8000

## Test ingest (Node)
curl -X POST http://localhost:3000/ingest/alert -H "Content-Type: application/json" -d '{"source":"citizen","hazardType":"flood","lat":12.95,"lon":77.58,"message":"water rising"}'

## Test ingest (Python)
curl -X POST http://localhost:8000/ingest/alert -H "Content-Type: application/json" -d '{"source":"who.int","hazardType":"health","lat":12.95,"lon":77.58,"message":"outbreak"}'
