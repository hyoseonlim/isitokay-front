import T from '../tokens.js';
import Icon from './Icon.jsx';
import BrandMark from './BrandMark.jsx';

export default function ScreenHeader({ title, onBack, right, brand }) {
  return (
    <div style={{
      padding: '14px 20px 10px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      {onBack ? (
        <button
          onClick={onBack}
          style={{
            width: 36, height: 36, borderRadius: 999,
            background: 'transparent', border: 'none',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', padding: 0,
          }}
        >
          <Icon name="chevL" size={22} color={T.ink} />
        </button>
      ) : brand ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BrandMark size={22} />
          <span style={{ fontSize: 16, fontWeight: 800, color: T.ink, letterSpacing: -0.4 }}>
            해가 될까?
          </span>
        </div>
      ) : (
        <div style={{ width: 36 }} />
      )}

      <div style={{ flex: 1, textAlign: brand ? 'left' : 'center' }}>
        {!brand && title && (
          <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: -0.3 }}>
            {title}
          </div>
        )}
      </div>

      <div style={{ minWidth: 36, display: 'flex', justifyContent: 'flex-end' }}>
        {right}
      </div>
    </div>
  );
}
