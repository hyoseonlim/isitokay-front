import T from '../tokens.js';

export default function BrandMark({ size = 22, color = T.primary }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.2" fill={color} />
      <g stroke={color} strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2.5v2.2" />
        <path d="M12 19.3v2.2" />
        <path d="M2.5 12h2.2" />
        <path d="M19.3 12h2.2" />
        <path d="M5.2 5.2l1.6 1.6" />
        <path d="M17.2 17.2l1.6 1.6" />
        <path d="M18.8 5.2l-1.6 1.6" />
        <path d="M6.8 17.2l-1.6 1.6" />
      </g>
    </svg>
  );
}
