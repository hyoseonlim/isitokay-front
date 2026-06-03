import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import Card from '../components/Card.jsx';
import ScreenLayout from '../components/ScreenLayout.jsx';
import { useApp } from '../context/AppContext.jsx';
import { mockRecalls } from '../data/mockRecalls.js';

const GRADE_COLOR = {
  '1등급': { bg: T.redBg, ink: T.redInk },
  '2등급': { bg: T.redBg, ink: T.redInk },
  '3등급': { bg: T.yellowBg, ink: T.yellowInk },
  '4등급': { bg: T.cardSoft, ink: T.inkMid },
};

export default function RecallList() {
  const { navigate, navigateTab } = useApp();

  const myRecalls = mockRecalls.filter(r => r.isMyProduct);
  const otherRecalls = mockRecalls.filter(r => !r.isMyProduct);

  const RecallCard = ({ recall, isMyProduct }) => {
    const gc = GRADE_COLOR[recall.grade] || GRADE_COLOR['4등급'];
    return (
      <Card
        padding={14}
        onClick={() => navigate('recallDetail', { recallId: recall.id })}
        style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          border: isMyProduct ? `1.5px solid ${T.redLine}` : `1px solid ${T.border}`,
          background: isMyProduct ? T.redBg : T.card,
        }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: isMyProduct ? T.redSwatch : T.cardSoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon
            name={recall.category === '식품' ? 'apple' : recall.category === '의약품' ? 'pill' : 'bottle'}
            size={20}
            color={isMyProduct ? '#fff' : T.inkMid}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            {isMyProduct && (
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                background: T.redSwatch, color: '#fff',
              }}>
                내 제품
              </span>
            )}
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
              background: gc.bg, color: gc.ink,
            }}>
              {recall.grade}
            </span>
            <span style={{ fontSize: 10, color: T.inkSoft }}>{recall.category}</span>
          </div>
          <div style={{
            fontSize: 14, fontWeight: 700, color: isMyProduct ? T.redInk : T.ink,
            letterSpacing: -0.2, marginBottom: 4,
          }}>
            {recall.title}
          </div>
          <div style={{ fontSize: 12, color: isMyProduct ? T.redInk : T.inkMid, opacity: 0.85 }}>
            {recall.company}
          </div>
          <div style={{
            marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', borderRadius: 999,
            background: isMyProduct ? 'rgba(255,255,255,0.7)' : T.redBg,
            fontSize: 11, fontWeight: 600, color: T.redInk,
          }}>
            <Icon name="warn" size={11} color={T.redInk} />
            {recall.reason}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: T.inkSoft }}>{recall.checkDate}</span>
          <Icon name="chevR" size={14} color={T.inkSoft} />
        </div>
      </Card>
    );
  };

  return (
    <ScreenLayout activeTab="recall" onTabChange={navigateTab}>
      <div style={{ padding: '16px 18px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 14, background: T.redBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="bell" size={20} color={T.redInk} />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: T.ink, margin: 0, letterSpacing: -0.4 }}>
              리콜 · 회수 정보
            </h1>
            <p style={{ fontSize: 12, color: T.inkMid, margin: '2px 0 0' }}>
              식품의약품안전처 공식 데이터 기준
            </p>
          </div>
        </div>

        {/* 내 제품 회수 알림 */}
        {myRecalls.length > 0 && (
          <>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
              padding: '8px 12px', borderRadius: 12,
              background: T.redBg, border: `1px solid ${T.redLine}`,
            }}>
              <Icon name="warn" size={14} color={T.redInk} />
              <span style={{ fontSize: 12, fontWeight: 700, color: T.redInk }}>
                등록하신 제품 중 회수 대상이 있어요!
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {myRecalls.map(r => <RecallCard key={r.id} recall={r} isMyProduct />)}
            </div>

            <div style={{ height: 1, background: T.border, margin: '4px 0 20px' }} />
          </>
        )}

        {/* 최신 리콜 목록 */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: -0.2 }}>
            최신 회수 정보
          </div>
          <span style={{ fontSize: 12, color: T.inkSoft }}>{otherRecalls.length}건</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {otherRecalls.map(r => <RecallCard key={r.id} recall={r} isMyProduct={false} />)}
        </div>

        <Card padding={12} soft style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Icon name="info" size={14} color={T.inkMid} />
            <div style={{ fontSize: 11, color: T.inkMid, lineHeight: 1.55 }}>
              출처: 식품의약품안전처(식품안전나라) · 본 정보는 공공데이터를 기반으로 제공됩니다.
            </div>
          </div>
        </Card>
      </div>
    </ScreenLayout>
  );
}
