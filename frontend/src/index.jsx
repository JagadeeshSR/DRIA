import React from 'react';
import { createRoot } from 'react-dom/client';
import ThumbnailCard from './components/ThumbnailCard';

function App() {
  return (
    <div style={{ padding: 24 }}>
      <ThumbnailCard title="Disaster Relief Information Agent" subtitle="DRIA" />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
