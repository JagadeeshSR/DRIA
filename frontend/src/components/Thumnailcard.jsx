import React from 'react';

/**
 * A thumbnail card sized 560x280 px.
 * Inline styles set exact pixel size for export/screenshot.
 */
export default function ThumbnailCard({ title = 'Disaster Relief Information Agent', subtitle = '' }) {
  const wrapper = {
    width: 560,
    height: 280,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#E8F7FB',
    borderRadius: 12,
    padding: 20,
    boxSizing: 'border-box',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  };

  const left = {
    flex: 1,
    paddingRight: 12
  };

  const titleStyle = {
    margin: 0,
    fontSize: 28,
    color: '#073b4c',
    lineHeight: 1.05,
    fontWeight: 700
  };

  const subtitleStyle = {
    marginTop: 6,
    fontSize: 14,
    color: '#12364a'
  };

  return (
    <div style={wrapper} role="img" aria-label={title}>
      <div style={left}>
        <h1 style={titleStyle}>{title}</h1>
        {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
      </div>
      <div style={{ width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 120 120" width="140" height="140" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="12" y="24" rx="10" width="64" height="40" fill="#6fb0d9" stroke="#073b4c" strokeWidth="3"/>
          <circle cx="28" cy="44" r="5" fill="#082034"/>
          <circle cx="58" cy="44" r="5" fill="#082034"/>
          <rect x="34" y="58" width="18" height="10" rx="2" fill="#ffd54a" stroke="#073b4c" strokeWidth="1.5"/>
          <rect x="26" y="84" rx="8" width="72" height="24" fill="#6fb0d9" stroke="#073b4c" strokeWidth="3"/>
        </svg>
      </div>
    </div>
  );
}
