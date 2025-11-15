// Simple confidence calculator (demo)
function scoreBySourceTrust(source) {
  const s = source ? source.toLowerCase() : 'unknown';
  const trust = {
    'fema.gov': 1,
    'who.int': 0.95,
    'ifrc.org': 0.95,
    'redcross.org': 0.9,
    'gov': 0.9,
    'citizen': 0.35,
    'unknown': 0.5
  };
  // simple match by substring
  for (const key of Object.keys(trust)) {
    if (s.includes(key)) return trust[key];
  }
  return 0.5;
}

function corroborationScore(corroCount = 0) {
  return Math.min(1, 0.2 + 0.25 * corroCount);
}

function computeConfidence(item = {}) {
  // item: { source, corroCount, ts }
  const s = scoreBySourceTrust(item.source);
  const c = corroborationScore(item.corroCount || 0);
  // age penalty: newer is better, assume ts in ISO format
  let agePenalty = 1;
  if (item.ts) {
    const ageHours = (Date.now() - new Date(item.ts).getTime()) / (1000 * 60 * 60);
    agePenalty = Math.max(0, 1 - ageHours / 24); // degrade over a day
  }
  const raw = s * 0.6 + c * 0.3 + agePenalty * 0.1;
  return Math.round(raw * 100) / 100; // two decimals
}

module.exports = { computeConfidence };
