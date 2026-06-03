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
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingBottom: 28, paddingTop: 8,
      background: 'rgba(251,244,238,0.96)',
      backdropFilter: 'blur(10px)',
      borderTop: `1px solid ${T.border}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    }}>
      {TABS.map(tab => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange && onChange(tab.id)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '4px 16px', fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
            }}
          >
            <Icon
              name={tab.icon} size={22}
              color={isActive ? T.primary : T.inkSoft}
              strokeWidth={isActive ? 2 : 1.5}
            />
            <span style={{
              fontSize: 10, fontWeight: isActive ? 700 : 500,
              color: isActive ? T.primary : T.inkSoft,
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
