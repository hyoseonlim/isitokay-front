import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import Card from '../components/Card.jsx';
import CTAButton from '../components/CTAButton.jsx';
import ScreenLayout from '../components/ScreenLayout.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { StatusChip, SourceBadge } from '../components/StatusChip.jsx';
import { useApp } from '../context/AppContext.jsx';

const FINDINGS = [
  {
    tone: 'green',
    icon: 'pill',
    title: '약↔약 병용금기',
    status: '주요 위험정보 미확인',
    reason: '훼로바유서방정, 폴산정, 타이레놀정 500mg 조합에서 직접적인 병용금기 정보는 확인되지 않았어요.',
    sources: ['DUR', '식약처'],
  },
  {
    tone: 'green',
    icon: 'heart',
    title: '임신 주차 기준 확인',
    status: '주요 위험정보 미확인',
    reason: '임신 5주차 기준으로 입력된 약 조합에서 직접적인 임부금기 정보는 확인되지 않았어요.',
    sources: ['DUR 임부금기', '의약품 허가정보'],
  },
  {
    tone: 'green',
    icon: 'shield',
    title: '회수 · 판매중지 확인',
    status: '주요 위험정보 미확인',
    reason: '입력된 제품명 기준으로 현재 회수·판매중지 정보는 확인되지 않았어요.',
    sources: ['식약처 회수정보'],
  },
  {
    tone: 'yellow',
    icon: 'info',
    title: '추가 확인 안내',
    status: '상담 권장',
    reason: '복용량, 복용 횟수, 증상 정도에 따라 판단이 달라질 수 있어요. 임신 중에는 최종 복용 여부를 전문가와 확인해주세요.',
    sources: ['e약은요', '의약품안전나라'],
  },
];

function toneColor(t) {
  return {
    red: { ink: T.redInk, bg: T.redBg, line: T.redLine },
    yellow: { ink: T.yellowInk, bg: T.yellowBg, line: T.yellowLine },
    green: { ink: T.greenInk, bg: T.greenBg, line: T.greenLine },
  }[t];
}

export default function AnalysisResult() {
  const { navigate, goBack, navigateTab } = useApp();

  return (
    <ScreenLayout activeTab="home" onTabChange={navigateTab}>
      {/* Back button row */}
      <div style={{ padding: '12px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={goBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 999, border: `1px solid ${T.border}`,
            background: '#fff', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 13, fontWeight: 600, color: T.inkMid,
          }}
        >
          <Icon name="chevL" size={14} color={T.inkMid} /> 대화창으로
        </button>
        <button
          onClick={() => navigateTab('chat')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 999, border: `1px solid ${T.border}`,
            background: '#fff', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 13, fontWeight: 600, color: T.primary,
          }}
        >
          <Icon name="list" size={14} color={T.primary} /> 대화 목록
        </button>
      </div>

      <div style={{ padding: '16px 20px 40px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: T.ink, margin: '4px 0 6px', letterSpacing: -0.5, lineHeight: 1.3 }}>
          위험 분석 결과를 확인했어요
        </h1>

        {/* 분석 대상 */}
        <Card padding={14} soft style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: '분석 대상', items: [{ icon: 'heart', text: '임신 중 · 5주차' }] },
            { label: '기존 복용', items: [{ icon: 'pill', text: '훼로바유서방정' }, { icon: 'pill', text: '폴산정' }] },
            { label: '새로 확인', items: [{ icon: 'pill', text: '타이레놀정 500mg' }] },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: 0.3, width: 48, flexShrink: 0, paddingTop: 6 }}>
                {row.label}
              </div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {row.items.map(item => (
                  <span key={item.text} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '5px 10px', borderRadius: 999,
                    background: '#fff', fontSize: 11, fontWeight: 600, color: T.ink,
                  }}>
                    <Icon name={item.icon} size={11} color={T.primary} /> {item.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Card>

        {/* Verdict */}
        <Card padding={0} style={{ overflow: 'hidden', borderColor: T.cardMintDeep, marginBottom: 18, background: T.primarySoft }}>
          <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 999, background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="shieldCheck" size={13} color={T.primaryDeep} strokeWidth={1.8} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.primaryDeep, letterSpacing: 0.3 }}>
              현재 확인된 공식 데이터 기준 안전해요!
            </span>
          </div>
        </Card>

        {/* 상세 분석 */}
        <SectionTitle right="4개 항목">상세 분석</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FINDINGS.map((f, i) => {
            const c = toneColor(f.tone);
            return (
              <Card key={i} padding={0} style={{ overflow: 'hidden', borderColor: c.line }}>
                <div style={{
                  padding: '8px 12px', background: c.bg,
                  display: 'flex', alignItems: 'center', gap: 10,
                  borderBottom: `1px solid ${c.line}`,
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon name={f.icon} size={16} color={c.ink} />
                  </div>
                  <div style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: T.ink, letterSpacing: -0.2 }}>
                    {f.title}
                  </div>
                  <StatusChip tone={f.tone} label={f.status} />
                </div>
                <div style={{ padding: '12px 14px 14px', background: '#fff' }}>
                  <div style={{ fontSize: 12.5, color: T.ink, lineHeight: 1.6 }}>
                    {f.reason}
                    <span style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap', marginLeft: 8, verticalAlign: 'middle', position: 'relative', top: -1 }}>
                      {f.sources.map(s => <SourceBadge key={s} label={s} />)}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </ScreenLayout>
  );
}
