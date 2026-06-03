import T from '../tokens.js';

export function StatusDot({ tone, size = 8 }) {
  const c = tone === 'red' ? T.redSwatch : tone === 'yellow' ? T.yellowSwatch : T.greenSwatch;
  return (
    <span style={{
      width: size, height: size, borderRadius: 999,
      background: c, display: 'inline-block', flexShrink: 0,
    }} />
  );
}

export function StatusChip({ tone, label, size = 'sm' }) {
  const map = {
    green: { fg: T.greenInk, bg: T.greenBg },
    yellow: { fg: T.yellowInk, bg: T.yellowBg },
    red: { fg: T.redInk, bg: T.redBg },
  };
  const s = map[tone];
  const pad = size === 'lg' ? '6px 12px' : '4px 10px';
  const fs = size === 'lg' ? 12 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: pad, borderRadius: 999,
      background: s.bg, color: s.fg,
      fontSize: fs, fontWeight: 600, letterSpacing: -0.1,
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      <StatusDot tone={tone} size={size === 'lg' ? 7 : 6} />
      {label}
    </span>
  );
}

export function SourceBadge({ label }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 9px', borderRadius: 6,
      background: T.cardSoft, color: T.ink,
      border: `1px solid ${T.border}`,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.1,
    }}>
      {label}
    </span>
  );
}
