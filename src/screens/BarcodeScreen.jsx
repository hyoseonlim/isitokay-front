import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import Card from '../components/Card.jsx';
import CTAButton from '../components/CTAButton.jsx';
import ScreenLayout from '../components/ScreenLayout.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function BarcodeScreen() {
  const { navigate, goBack, navigateTab } = useApp();

  return (
    <ScreenLayout activeTab="home" onTabChange={navigateTab}>
      <ScreenHeader title="바코드 스캔" onBack={goBack} />
      <div style={{ padding: '0 20px 30px' }}>
        <p style={{ fontSize: 13, color: T.inkMid, margin: '0 0 16px', lineHeight: 1.5 }}>
          포장지의 바코드를 카메라에 맞춰주세요.
        </p>

        <img
          src="/images/barcode.jpeg"
          alt="바코드 스캔"
          style={{ width: '100%', borderRadius: 18, marginBottom: 20, display: 'block' }}
        />

        <SectionTitle>조회된 제품</SectionTitle>
        <Card padding={16} style={{ borderColor: T.cardMintDeep, marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <img
              src="/images/barcode-result.jpeg"
              alt="조회 결과"
              style={{
                width: 72, height: 72, objectFit: 'cover',
                borderRadius: 10, flexShrink: 0, border: `1px solid ${T.border}`,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, letterSpacing: -0.3, lineHeight: 1.35 }}>
                  오 그래놀라바 카카오&유산균볼 160g
                </div>
                <span style={{
                  padding: '3px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700,
                  background: T.cardSoft, color: T.inkMid, flexShrink: 0,
                }}>분석 전</span>
              </div>
              {[
                ['브랜드', '(주)오리온'],
                ['분류', '시리얼 / 즉석·편의식품'],
                ['바코드', '8801117138103'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: 6, fontSize: 11, marginTop: 3 }}>
                  <span style={{ color: T.inkSoft, flexShrink: 0, minWidth: 36 }}>{k}</span>
                  <span style={{ color: T.inkMid, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <CTAButton
            onClick={() => navigate('chat', { fromProduct: '오 그래놀라바 카카오&유산균볼 160g' })}
            size="md"
            icon={<Icon name="arrow" size={15} color="#fff" />}
          >
            기존 복용약과 함께 분석하기
          </CTAButton>
        </Card>

        <Card padding={12} soft>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Icon name="info" size={14} color={T.inkMid} />
            <div style={{ fontSize: 11, color: T.inkMid, lineHeight: 1.55 }}>
              식품 성분도 <strong style={{ color: T.ink }}>현재 복용 중인 약과 함께</strong> 안전 여부를 분석할 수 있어요.
            </div>
          </div>
        </Card>
      </div>
    </ScreenLayout>
  );
}
