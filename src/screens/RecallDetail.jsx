import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import Card from '../components/Card.jsx';
import CTAButton from '../components/CTAButton.jsx';
import ScreenLayout from '../components/ScreenLayout.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { SourceBadge } from '../components/StatusChip.jsx';
import { useApp } from '../context/AppContext.jsx';
import { mockRecalls } from '../data/mockRecalls.js';

export default function RecallDetail() {
  const { screenParams, goBack, navigate, navigateTab } = useApp();
  const recallId = screenParams?.recallId;
  const recall = mockRecalls.find(r => r.id === recallId) || mockRecalls[0];

  return (
    <ScreenLayout activeTab="recall" onTabChange={navigateTab}>
      {/* Navigation buttons */}
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
          <Icon name="chevL" size={14} color={T.inkMid} /> 뒤로
        </button>
        <button
          onClick={() => navigate('recall')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 999, border: `1px solid ${T.border}`,
            background: '#fff', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 13, fontWeight: 600, color: T.primary,
          }}
        >
          <Icon name="list" size={14} color={T.primary} /> 목록
        </button>
      </div>

      <div style={{ padding: '16px 20px 32px' }}>
        {/* Warning Hero */}
        <Card padding={20} style={{ background: T.redBg, borderColor: T.redLine, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 999, background: T.redSwatch,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="warn" size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.redInk }}>즉시 섭취 중단 및 반품</div>
              <div style={{ fontSize: 12, color: T.redInk, opacity: 0.8, marginTop: 1 }}>
                {recall.grade} 회수 {recall.category}으로 지정되었습니다
              </div>
            </div>
          </div>

          <div style={{
            background: '#fff', borderRadius: 14, padding: 16,
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {[
              { label: '제품명', value: recall.title, highlight: false },
              { label: '회수 사유', value: recall.reason, highlight: true },
              { label: '제조업체', value: recall.company, highlight: false },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: T.inkMid }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.highlight ? T.redInk : T.ink }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* 내 제품 알림 (해당하는 경우) */}
        {recall.isMyProduct && (
          <div style={{
            padding: '12px 14px', borderRadius: 14, marginBottom: 20,
            background: T.primarySoft, border: `1px solid ${T.primary}`,
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <Icon name="warn" size={16} color={T.primaryInk} />
            <div style={{ fontSize: 12, color: T.primaryInk, lineHeight: 1.55, fontWeight: 600 }}>
              등록하신 제품입니다. 즉시 사용을 중단하고 구매처에 반품하세요.
            </div>
          </div>
        )}

        {/* 상세 식별 정보 */}
        <SectionTitle>상세 식별 정보</SectionTitle>
        <Card padding={16} style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: '포장 단위', value: recall.weight },
            { label: '소비 기한', value: recall.expiry },
            { label: '바코드 번호', value: recall.barcode },
            { label: '회수 사유 원문', value: recall.reasonDetail },
            { label: '등록 일자', value: recall.checkDate },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between',
              borderBottom: `1px solid ${T.divider}`, paddingBottom: 10,
            }}>
              <span style={{ fontSize: 13, color: T.inkMid }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, textAlign: 'right', flex: 1, marginLeft: 20 }}>
                {row.value}
              </span>
            </div>
          ))}
        </Card>

        {/* 소비자 행동 요령 */}
        <SectionTitle>소비자 행동 요령</SectionTitle>
        <Card padding={16} soft style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 999, background: T.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name="check" size={12} color="#fff" />
          </div>
          <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.6 }}>
            해당 제품을 보관하고 계신 경우 <strong>절대 섭취하지 마시고</strong>, 구입하신 판매처를 통해 반품 및 환불을 진행하시기 바랍니다.
          </div>
        </Card>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
          <div style={{ flex: 1, fontSize: 11, color: T.inkSoft, lineHeight: 1.5 }}>
            출처: 식품의약품안전처(식품안전나라)<br />
            본 정보는 공공데이터를 기반으로 제공됩니다.
          </div>
          <SourceBadge label="식약처 회수정보" />
        </div>

        <CTAButton variant="primary" onClick={() => navigate('recall')}>
          확인 완료
        </CTAButton>
      </div>
    </ScreenLayout>
  );
}
