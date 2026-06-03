import T from '../tokens.js';

export default function Card({ children, style, onClick, padding = 16, soft }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: soft ? T.cardSoft : T.card,
        borderRadius: T.radiusCard,
        border: `1px solid ${T.border}`,
        padding,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
