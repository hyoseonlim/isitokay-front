import T from '../tokens.js';
import Icon from './Icon.jsx';

const TABS = [
  { id: 'home', icon: 'home', label: '홈' },
  { id: 'chat', icon: 'chat', label: 'AI 상담' },
  { id: 'recall', icon: 'bell', label: '리콜' },
  { id: 'profile', icon: 'user', label: '내 정보' },
];

export default function TabBar({ active, onChange }) {
  return (
    <div style={{
      flexShrink: 0,
      paddingTop: 6,
      paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)',
      background: 'rgba(251,244,238,0.97)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderTop: `1px solid ${T.border}`,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      {TABS.map(tab => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange && onChange(tab.id)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '6px 20px 4px', fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
              flex: 1, position: 'relative',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 28, height: 3, borderRadius: '0 0 4px 4px',
                background: T.primary,
              }} />
            )}
            <Icon
              name={tab.icon} size={22}
              color={isActive ? T.primaryDeep : T.inkSoft}
              strokeWidth={isActive ? 2.2 : 1.5}
            />
            <span style={{
              fontSize: 10, fontWeight: isActive ? 700 : 500,
              color: isActive ? T.primaryDeep : T.inkSoft,
              letterSpacing: -0.2,
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
