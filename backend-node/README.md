# Node backend (DRIA)

Install:
  cd backend-node
  npm install

Run locally:
  npm run start
  (server at http://localhost:3000)

Dev (with autoreload):
  npm run dev

Test ingest:
  curl -X POST http://localhost:3000/ingest/alert -H "Content-Type: application/json" -d '{"source":"citizen","hazardType":"flood","lat":12.9,"lon":77.6,"message":"flooding now"}'
