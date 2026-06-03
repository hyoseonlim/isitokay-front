import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import Card from '../components/Card.jsx';
import CTAButton from '../components/CTAButton.jsx';
import ScreenLayout from '../components/ScreenLayout.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { useApp } from '../context/AppContext.jsx';

const INGREDIENTS = [
  { name: '트리메부틴말레산염', amount: '50mg', flag: 'yellow', note: '임부 안전성 미확립' },
  { name: '스코폴리아엑스', amount: '5mg', flag: 'red', note: '임산부 투여 금기' },
  { name: '감초가루', amount: '25mg', flag: 'yellow', note: '글리시리진산 함유 · 주의' },
  { name: '침강탄산칼슘', amount: '100mg', flag: null, note: null },
  { name: '탄산수소나트륨', amount: '50mg', flag: null, note: null },
  { name: '메타규산알루민산마그네슘', amount: '40mg', flag: null, note: null },
  { name: '디아스타제·프로테아제·셀룰라제', amount: '20mg', flag: null, note: null },
  { name: '리파제', amount: '7.5mg', flag: null, note: null },
];

const FLAG_STYLE = {
  yellow: { bg: T.yellowBg, color: T.yellowInk, label: '주의' },
  red: { bg: T.redBg, color: T.redInk, label: '경고' },
};

export default function OCRScreen() {
  const { navigate, goBack, navigateTab } = useApp();

  return (
    <ScreenLayout activeTab="home" onTabChange={navigateTab}>
      <ScreenHeader title="성분표 촬영 (OCR)" onBack={goBack} />
      <div style={{ padding: '0 20px 30px' }}>
        <p style={{ fontSize: 13, color: T.inkMid, margin: '0 0 14px', lineHeight: 1.5 }}>
          제품 성분표가 잘 보이도록 카메라를 맞춰주세요.
        </p>

        <img
          src="/images/ocr.jpg"
          alt="OCR 촬영"
          style={{
            width: '100%', height: 160, objectFit: 'cover',
            borderRadius: 18, marginBottom: 16, display: 'block',
          }}
        />

        {/* 임산부 투여 금기 경고 */}
        <div style={{
          display: 'flex', gap: 10, alignItems: 'flex-start',
          padding: '12px 14px', borderRadius: 14,
          background: T.redBg, border: `1px solid ${T.redLine}`, marginBottom: 14,
        }}>
          <Icon name="warn" size={16} color={T.redInk} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.redInk, marginBottom: 2 }}>임산부 투여 금기</div>
            <div style={{ fontSize: 11, color: T.redInk, lineHeight: 1.5, opacity: 0.85 }}>
              임산부 또는 임신 가능성이 있는 분, 수유 중인 분에게는 투여하지 않습니다.
            </div>
          </div>
        </div>

        <SectionTitle>읽어낸 성분</SectionTitle>
        <Card padding={12} style={{ marginBottom: 14 }}>
          {INGREDIENTS.map((ing, i) => {
            const fs = ing.flag ? FLAG_STYLE[ing.flag] : { bg: T.cardSoft, color: T.inkMid, label: '해당없음' };
            return (
              <div
                key={ing.name}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 6px',
                  borderBottom: i < INGREDIENTS.length - 1 ? `1px solid ${T.divider}` : 'none',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, letterSpacing: -0.2 }}>{ing.name}</div>
                  <div style={{ fontSize: 11, color: T.inkMid, marginTop: 1 }}>
                    {ing.amount}
                    {ing.note && (
                      <span style={{ marginLeft: 6, color: ing.flag === 'red' ? T.redInk : T.yellowInk }}>
                        {ing.note}
                      </span>
                    )}
                  </div>
                </div>
                <span style={{
                  padding: '4px 9px', borderRadius: 999, fontSize: 10, fontWeight: 700,
                  background: fs.bg, color: fs.color, whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {fs.label}
                </span>
              </div>
            );
          })}
        </Card>

        <CTAButton
          size="md"
          onClick={() => navigate('chat', { fromOCR: true })}
          icon={<Icon name="arrow" size={15} color="#fff" />}
        >
          기존 복용약과 함께 분석하기
        </CTAButton>
      </div>
    </ScreenLayout>
  );
}
