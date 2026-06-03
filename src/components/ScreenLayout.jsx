import T from '../tokens.js';
import TabBar from './TabBar.jsx';

export default function ScreenLayout({
  children, activeTab, onTabChange,
  showTabBar = true, bg = T.bgApp,
}) {
  return (
    <div style={{
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      background: bg,
      color: T.ink,
    }}>
      {showTabBar ? (
        <>
          <div style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}>
            {children}
          </div>
          <TabBar active={activeTab} onChange={onTabChange} />
        </>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      )}
    </div>
  );
}
