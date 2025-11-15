# backend-python/app/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
import uuid

app = FastAPI(title="DRIA FastAPI backend (demo)")

alerts = []

class AlertIn(BaseModel):
    id: str | None = None
    source: str = Field(default="unknown")
    hazardType: str = Field(default="unknown")
    lat: float
    lon: float
    message: str | None = None
    ts: datetime | None = None

def score_by_source_trust(source: str):
    s = (source or "").lower()
    trust = {
        'fema.gov': 1,
        'who.int': 0.95,
        'ifrc.org': 0.95,
        'redcross.org': 0.9,
        'gov': 0.9,
        'citizen': 0.35,
        'unknown': 0.5
    }
    for k, v in trust.items():
        if k in s:
            return v
    return 0.5

def corroboration_score(corro_count: int = 0):
    return min(1, 0.2 + 0.25 * corro_count)

def compute_confidence(item):
    s = score_by_source_trust(item.get("source"))
    c = corroboration_score(item.get("corroCount", 0))
    age_penalty = 1.0
    ts = item.get("ts")
    if ts:
        age_hours = (datetime.utcnow() - ts).total_seconds() / 3600.0
        age_penalty = max(0, 1 - age_hours / 24.0)
    raw = s * 0.6 + c * 0.3 + age_penalty * 0.1
    return round(raw, 2)

@app.post("/ingest/alert")
def ingest_alert(alert: AlertIn):
    if alert.lat is None or alert.lon is None:
        raise HTTPException(status_code=400, detail="lat and lon required")
    record = alert.dict()
    record["id"] = record.get("id") or str(uuid.uuid4())
    record["ts"] = record.get("ts") or datetime.utcnow()
    record["confidence"] = compute_confidence(record)
    alerts.append(record)
    return {"ok": True, "record": record}

@app.get("/api/alerts")
def list_alerts():
    features = []
    for a in alerts:
        features.append({
            "type": "Feature",
            "properties": {
                "id": a["id"],
                "source": a["source"],
                "hazardType": a["hazardType"],
                "message": a.get("message"),
                "confidence": a.get("confidence"),
                "ts": a["ts"].isoformat() if hasattr(a["ts"], "isoformat") else str(a["ts"])
            },
            "geometry": {"type": "Point", "coordinates": [a["lon"], a["lat"]]}
        })
    return {"type": "FeatureCollection", "features": features}

@app.get("/health")
def health():
    return {"ok": True, "service": "dria-backend-python"}
