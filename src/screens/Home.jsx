import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import Card from '../components/Card.jsx';
import CTAButton from '../components/CTAButton.jsx';
import ScreenLayout from '../components/ScreenLayout.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { StatusChip } from '../components/StatusChip.jsx';
import { useApp } from '../context/AppContext.jsx';

function WeekProgress({ week }) {
  const label = week <= 12 ? '임신 초기' : week <= 28 ? '임신 중기' : '임신 말기';
  const pct = (week / 40) * 100;
  return (
    <Card padding={14} style={{ borderColor: T.cardMintDeep, marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.primaryInk, flexShrink: 0 }}>
          임신 주차
        </div>
        <div style={{ flex: 1, position: 'relative', height: 8, borderRadius: 999, background: T.primarySoft }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: 8, borderRadius: 999,
            background: T.primary, width: `${pct}%`,
          }} />
          <div style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            left: `calc(${pct}% - 9px)`,
            width: 18, height: 18, borderRadius: 999,
            background: '#fff', border: `3px solid ${T.primary}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
          }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, flexShrink: 0 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: T.primary, letterSpacing: -0.5 }}>{week}</span>
          <span style={{ fontSize: 11, color: T.primaryInk, fontWeight: 600 }}>주차</span>
        </div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: 7, fontSize: 10, color: T.inkSoft,
        paddingLeft: 60,
      }}>
        <span>1주</span>
        <span style={{ color: T.primary, fontWeight: 700 }}>{label}</span>
        <span>40주</span>
      </div>
    </Card>
  );
}

function HealthInfoCard({ user, onManage }) {
  return (
    <Card padding={14} style={{ marginBottom: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ paddingRight: 10, borderRight: `1px solid ${T.divider}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.inkMid }}>알레르기 성분</div>
            <button
              onClick={onManage}
              style={{ fontSize: 10, fontWeight: 700, color: T.primary, background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 4px', borderRadius: 999 }}
            >
              관리
            </button>
          </div>
          {user.allergies.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {user.allergies.map(a => (
                <span key={a} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '5px 9px', borderRadius: 999, background: T.cardSoft,
                  fontSize: 11, fontWeight: 600, color: T.ink,
                }}>
                  <Icon name="pill" size={11} color={T.primary} /> {a}
                </span>
              ))}
            </div>
          ) : (
            <span style={{ fontSize: 12, color: T.inkSoft }}>없음</span>
          )}
        </div>
        <div style={{ paddingLeft: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.inkMid }}>기저질환</div>
            <button
              onClick={onManage}
              style={{ fontSize: 10, fontWeight: 700, color: T.primary, background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 4px', borderRadius: 999 }}
            >
              관리
            </button>
          </div>
          {user.conditions.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {user.conditions.map(c => (
                <span key={c} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '5px 9px', borderRadius: 999, background: T.cardSoft,
                  fontSize: 11, fontWeight: 600, color: T.ink,
                }}>
                  <Icon name="heart" size={11} color={T.primary} /> {c}
                </span>
              ))}
            </div>
          ) : (
            <span style={{ fontSize: 12, color: T.inkSoft }}>없음</span>
          )}
        </div>
      </div>
    </Card>
  );
}

const REGISTER_METHODS = [
  {
    id: 'barcode',
    icon: 'barcode',
    title: '바코드 스캔',
    desc: '포장지 바코드로 등록 번호를 조회해요',
    available: true,
  },
  {
    id: 'ocr',
    icon: 'camera',
    title: '성분표 촬영',
    desc: '제품 성분표를 카메라로 읽어요',
    available: true,
  },
  {
    id: 'search',
    icon: 'search',
    title: '제품명 검색',
    desc: '준비 중인 기능이에요',
    available: false,
  },
];

export default function Home() {
  const { user, products, navigate, navigateTab } = useApp();

  const summary = products.reduce(
    (acc, p) => { acc[p.tone] = (acc[p.tone] || 0) + 1; return acc; },
    {}
  );
  const overallTone = summary.red > 0 ? 'red' : summary.yellow > 0 ? 'yellow' : 'green';
  const overallLabel = {
    red: '강한 경고 제품이 있어요',
    yellow: '추가 확인이 필요해요',
    green: '현재 주요 위험정보는 확인되지 않았어요',
  }[overallTone];
  const overallBg = { red: T.redBg, yellow: T.yellowBg, green: T.greenBg }[overallTone];
  const overallLine = { red: T.redLine, yellow: T.yellowLine, green: T.greenLine }[overallTone];
  const overallInk = { red: T.redInk, yellow: T.yellowInk, green: T.greenInk }[overallTone];

  return (
    <ScreenLayout activeTab="home" onTabChange={navigateTab}>
      <div style={{ padding: '16px 18px 24px' }}>
        {/* Logo bar */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 22,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              overflow: 'hidden', flexShrink: 0,
              boxShadow: '0 4px 14px rgba(143,130,176,0.4)',
            }}>
              <img src="/images/logo.png" alt="해가될까"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{
                fontSize: 18, fontWeight: 800, color: T.ink,
                letterSpacing: -0.6, lineHeight: 1.1,
              }}>
                해가 될까
              </div>
              <div style={{
                fontSize: 11, color: T.primaryDeep,
                fontWeight: 600, marginTop: 3, letterSpacing: 0.1,
              }}>
                임산부 AI 안심 파트너
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTab('recall')}
            style={{
              width: 40, height: 40, borderRadius: 999,
              background: '#fff', border: `1.5px solid ${T.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            }}
          >
            <Icon name="bell" size={19} color={T.inkMid} />
          </button>
        </div>

        {/* Greeting */}
        <h1 style={{ fontSize: 22, fontWeight: 700, color: T.ink, margin: '0 0 16px', letterSpacing: -0.5, lineHeight: 1.32 }}>
          {user.name}님, 오늘도<br />안전한 하루 되세요!
        </h1>

        {/* 임신 주차 */}
        {user.isPregnant && <WeekProgress week={user.pregnancyWeek} />}

        {/* 건강정보 카드 */}
        <HealthInfoCard user={user} onManage={() => navigateTab('profile')} />

        {/* 위험도 배너 */}
        <div
          onClick={() => navigate('analysisResult')}
          style={{
            padding: '14px 16px', borderRadius: 18,
            background: overallBg, border: `1px solid ${overallLine}`,
            display: 'flex', alignItems: 'center', gap: 12,
            cursor: 'pointer', marginBottom: 20,
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 999,
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name={overallTone === 'green' ? 'shieldCheck' : 'warn'} size={18} color={overallInk} strokeWidth={1.8} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: overallInk }}>{overallLabel}</div>
            <div style={{ fontSize: 11, color: overallInk, opacity: 0.8, marginTop: 1 }}>공식 데이터 기준 · 분석 결과 자세히 보기</div>
          </div>
          <Icon name="chevR" size={16} color={overallInk} />
        </div>

        {/* 등록 제품 목록 */}
        <SectionTitle right={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: T.inkSoft }}>{products.length}개</span>
            <button
              onClick={() => navigate('productManage')}
              style={{
                fontSize: 12, fontWeight: 700, color: T.primaryDeep,
                background: T.primarySoft, border: 'none',
                padding: '4px 12px', borderRadius: 999,
                cursor: 'pointer',
              }}
            >
              관리하기
            </button>
          </div>
        }>등록한 제품</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {products.map(p => (
            <Card key={p.id} padding={14} onClick={() => navigate('analysisResult')} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: p.category === 'med' ? T.cardMint : p.tone === 'red' ? T.redBg : p.tone === 'yellow' ? T.yellowBg : T.greenBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon
                  name={p.category === 'med' ? 'pill' : p.category === 'food' ? 'apple' : 'bottle'}
                  size={20}
                  color={p.category === 'med' ? T.medBlue : p.tone === 'red' ? T.redInk : p.tone === 'yellow' ? T.yellowInk : T.greenInk}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: -0.2 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: T.inkSoft, marginTop: 2 }}>{p.sub} · {p.status}</div>
              </div>
              <StatusChip tone={p.tone} label={p.note} />
            </Card>
          ))}
        </div>

        {/* 구분선 */}
        <div style={{ height: 1, background: T.divider, margin: '4px 0 24px' }} />

        {/* 제품 등록 방법 선택 */}
        <div style={{ marginBottom: 8 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.ink, margin: '0 0 4px', letterSpacing: -0.4 }}>
            새 제품 확인하기
          </h2>
          <p style={{ fontSize: 13, color: T.inkMid, margin: '0 0 16px', lineHeight: 1.5 }}>
            이미 복용 중인 약과 <strong style={{ color: T.primary }}>함께 분석</strong>돼요.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {REGISTER_METHODS.map(m => (
            <Card
              key={m.id}
              padding={14}
              onClick={m.available ? () => navigate(m.id === 'barcode' ? 'barcode' : 'ocr') : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                border: `1px solid ${m.available ? T.border : T.border}`,
                opacity: m.available ? 1 : 0.55,
                cursor: m.available ? 'pointer' : 'default',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: m.available ? T.primarySoft : T.cardSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={m.icon} size={20} color={m.available ? T.primaryDeep : T.inkSoft} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: -0.2 }}>
                  {m.title}
                  {!m.available && (
                    <span style={{
                      marginLeft: 8, fontSize: 10, fontWeight: 600,
                      padding: '2px 8px', borderRadius: 999,
                      background: T.cardSoft, color: T.inkSoft,
                    }}>준비중</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: T.inkMid, marginTop: 3 }}>{m.desc}</div>
              </div>
              {m.available && <Icon name="chevR" size={16} color={T.inkSoft} />}
            </Card>
          ))}
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Icon name="info" size={14} color={T.inkMid} />
          <div style={{ fontSize: 11, color: T.inkMid, lineHeight: 1.55 }}>
            AI는 진단·처방을 대체하지 않으며, 복용 가능 여부를 단정하지 않습니다. 정확한 문의는 전문가와 상담을 통해 확인하세요.
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
}
