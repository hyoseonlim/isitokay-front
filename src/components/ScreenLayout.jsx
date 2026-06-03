import T from '../tokens.js';
import TabBar from './TabBar.jsx';

export default function ScreenLayout({
  children, activeTab, onTabChange,
  showTabBar = true, bg = T.bgApp,
}) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: bg,
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingBottom: showTabBar ? 86 : 0,
      color: T.ink,
    }}>
      {children}
      {showTabBar && (
        <TabBar active={activeTab} onChange={onTabChange} />
      )}
    </div>
  );
}
