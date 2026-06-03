import { useEffect, useState } from 'react';
import T from '../tokens.js';

export default function PushNotification({ recall, onDismiss, onClick }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setVisible(false);
    setTimeout(() => onClick && onClick(), 300);
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setVisible(false);
    setTimeout(() => onDismiss && onDismiss(), 300);
  };

  return (
    <div style={{
      position: 'absolute', top: 12, left: 12, right: 12, zIndex: 200,
      transform: visible ? 'translateY(0)' : 'translateY(-120%)',
      opacity: visible ? 1 : 0,
      transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
    }}>
      <div
        onClick={handleClick}
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          padding: '14px 16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: `1px solid ${T.border}`,
          cursor: 'pointer',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img
              src="/images/logo.png"
              alt="logo"
              style={{ width: 20, height: 20, borderRadius: 5, objectFit: 'cover' }}
            />
            <span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>해가 될까</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: T.inkSoft }}>방금 전</span>
            <button
              onClick={handleDismiss}
              style={{
                width: 20, height: 20, borderRadius: 999, background: T.cardSoft,
                border: 'none', cursor: 'pointer', fontSize: 12, color: T.inkMid,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
              }}
            >
              ×
            </button>
          </div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: T.redInk, marginBottom: 4 }}>
          🚨 [회수] {recall.title}
        </div>
        <div style={{ fontSize: 12, color: T.ink, lineHeight: 1.5 }}>
          {recall.pushMessage}
        </div>
      </div>
    </div>
  );
}
