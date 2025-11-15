// Simple DRIA Node backend demo
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { computeConfidence } = require('../../processors/verifier');

const app = express();
app.use(cors());
app.use(express.json());

const alerts = []; // demo in-memory store

app.post('/ingest/alert', (req, res) => {
  try {
    const { id = uuidv4(), source = 'unknown', hazardType = 'unknown', lat, lon, message = '', ts } = req.body;
    if (typeof lat !== 'number' || typeof lon !== 'number') {
      return res.status(400).json({ ok: false, error: 'lat and lon must be numbers' });
    }
    const record = {
      id,
      source,
      hazardType,
      location: { lat, lon },
      message,
      ts: ts || new Date().toISOString(),
      confidence: computeConfidence({ source, ts })
    };
    alerts.push(record);
    return res.status(201).json({ ok: true, record });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/alerts', (req, res) => {
  const features = alerts.map(a => ({
    type: 'Feature',
    properties: {
      id: a.id,
      source: a.source,
      hazardType: a.hazardType,
      message: a.message,
      confidence: a.confidence,
      ts: a.ts
    },
    geometry: { type: 'Point', coordinates: [a.location.lon, a.location.lat] }
  }));
  res.json({ type: 'FeatureCollection', features });
});

app.get('/health', (req, res) => res.json({ ok: true, service: 'dria-backend-node' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`DRIA Node backend running on :${PORT}`));
