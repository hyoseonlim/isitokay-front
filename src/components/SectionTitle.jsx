import T from '../tokens.js';

export default function SectionTitle({ children, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '0 4px', marginBottom: 12,
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: -0.2 }}>
        {children}
      </div>
      {right && (
        <div style={{ fontSize: 12, color: T.inkSoft, fontWeight: 500 }}>{right}</div>
      )}
    </div>
  );
}
