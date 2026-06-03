import { useState, useMemo } from 'react';

function calcAge(birthdate) {
  if (!birthdate) return null;
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}
import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import Card from '../components/Card.jsx';
import CTAButton from '../components/CTAButton.jsx';
import ScreenLayout from '../components/ScreenLayout.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { useApp } from '../context/AppContext.jsx';

const ALLERGY_OPTIONS = [
  '페니실린', '아스피린', '설파제', '이부프로펜',
  '세팔로스포린', '아세트아미노펜', '모르핀', '코데인',
];

const CONDITION_OPTIONS = [
  '임신성 당뇨', '임신성 빈혈', '임신성 고혈압',
  '갑상선 질환', '자궁근종', '자궁내막증',
  '심장 질환', '신장 질환',
];

function EditModal({ title, options, selected, onSave, onClose, icon }) {
  const [localSelected, setLocalSelected] = useState(selected);

  const toggle = (item) => {
    setLocalSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(4px)', zIndex: 300,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <div style={{
        width: '100%', maxWidth: 430,
        background: '#fff', borderRadius: '28px 28px 0 0',
        padding: '24px 22px 40px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, letterSpacing: -0.4 }}>{title}</div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}>
            <Icon name="x" size={20} color={T.inkMid} />
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {options.map(opt => {
            const isOn = localSelected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '10px 16px', borderRadius: 999,
                  background: isOn ? T.primarySoft : T.cardSoft,
                  color: isOn ? T.primaryInk : T.inkMid,
                  border: isOn ? `1.5px solid ${T.primary}` : `1.5px solid transparent`,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {icon && <Icon name={icon} size={13} color={isOn ? T.primaryInk : T.inkSoft} />}
                {opt}
              </button>
            );
          })}
        </div>
        <CTAButton onClick={() => { onSave(localSelected); onClose(); }}>
          저장하기
        </CTAButton>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, navigateTab } = useApp();
  const [localUser, setLocalUser] = useState(user);
  const [modal, setModal] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleSave = (field, value) => {
    setLocalUser(prev => ({ ...prev, [field]: value }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const InfoRow = ({ label, value, onEdit }) => (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 0', borderBottom: `1px solid ${T.divider}`,
    }}>
      <span style={{ fontSize: 13, color: T.inkMid, fontWeight: 500 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{value}</span>
        {onEdit && (
          <button
            onClick={onEdit}
            style={{
              padding: '4px 10px', borderRadius: 999, border: `1px solid ${T.border}`,
              background: T.cardSoft, fontSize: 11, fontWeight: 600, color: T.inkMid,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            수정
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <ScreenLayout activeTab="profile" onTabChange={navigateTab}>
        <div style={{ padding: '16px 18px 24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 999, background: T.primarySoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="user" size={24} color={T.primaryDeep} />
            </div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: T.ink, margin: 0, letterSpacing: -0.4 }}>
                {localUser.name}
              </h1>
              <p style={{ fontSize: 13, color: T.inkMid, margin: '3px 0 0' }}>
                만 {calcAge(localUser.birthdate) ?? localUser.age}세 · {localUser.isPregnant ? `임신 ${localUser.pregnancyWeek}주차` : '비임신'}
              </p>
            </div>
            {saved && (
              <div style={{
                marginLeft: 'auto', padding: '6px 12px', borderRadius: 999,
                background: T.greenBg, color: T.greenInk, fontSize: 12, fontWeight: 700,
              }}>
                ✓ 저장됨
              </div>
            )}
          </div>

          {/* 기본 정보 */}
          <SectionTitle>기본 정보</SectionTitle>
          <Card padding={16} style={{ marginBottom: 16 }}>
            <InfoRow label="이름" value={localUser.name} />
            {localUser.birthdate && (
              <InfoRow
                label="생년월일"
                value={new Date(localUser.birthdate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              />
            )}
            <InfoRow label="만 나이" value={`${calcAge(localUser.birthdate) ?? localUser.age}세`} />
            <InfoRow
              label="임신 여부"
              value={localUser.isPregnant ? '임신 중' : '해당 없음'}
            />
            {localUser.isPregnant && (
              <>
                <InfoRow label="임신 주차" value={`${localUser.pregnancyWeek}주차`} />
                <InfoRow
                  label="임신 횟수"
                  value={localUser.pregnancyCount === 1 ? '초산' : `${localUser.pregnancyCount}회`}
                />
                <InfoRow
                  label="고위험 임신"
                  value={localUser.isHighRisk ? '해당' : '해당 없음'}
                />
                <InfoRow
                  label="다태 임신"
                  value={localUser.isMultiple ? '해당' : '해당 없음'}
                  onEdit={undefined}
                />
              </>
            )}
          </Card>

          {/* 알레르기 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: -0.2 }}>
              알레르기 성분
            </div>
            <button
              onClick={() => setModal('allergy')}
              style={{
                padding: '6px 14px', borderRadius: 999, border: `1px solid ${T.primary}`,
                background: T.primarySoft, fontSize: 12, fontWeight: 700, color: T.primaryInk,
                cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              <Icon name="edit" size={12} color={T.primaryInk} /> 수정
            </button>
          </div>
          <Card padding={14} style={{ marginBottom: 16 }}>
            {localUser.allergies.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {localUser.allergies.map(a => (
                  <span key={a} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '8px 14px', borderRadius: 999, background: T.cardSoft,
                    fontSize: 13, fontWeight: 600, color: T.ink,
                  }}>
                    <Icon name="pill" size={13} color={T.primary} /> {a}
                  </span>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center', padding: '12px 0',
                fontSize: 13, color: T.inkSoft,
              }}>
                등록된 알레르기 성분이 없어요
              </div>
            )}
          </Card>

          {/* 기저질환 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: -0.2 }}>
              기저질환
            </div>
            <button
              onClick={() => setModal('condition')}
              style={{
                padding: '6px 14px', borderRadius: 999, border: `1px solid ${T.primary}`,
                background: T.primarySoft, fontSize: 12, fontWeight: 700, color: T.primaryInk,
                cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              <Icon name="edit" size={12} color={T.primaryInk} /> 수정
            </button>
          </div>
          <Card padding={14} style={{ marginBottom: 24 }}>
            {localUser.conditions.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {localUser.conditions.map(c => (
                  <span key={c} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '8px 14px', borderRadius: 999, background: T.greenBg,
                    fontSize: 13, fontWeight: 600, color: T.greenInk,
                  }}>
                    <Icon name="heart" size={13} color={T.greenInk} /> {c}
                  </span>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '12px 0', fontSize: 13, color: T.inkSoft }}>
                등록된 기저질환이 없어요
              </div>
            )}
          </Card>

          {/* 안전 안내 */}
          <Card padding={14} soft>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Icon name="info" size={14} color={T.inkMid} />
              <div style={{ fontSize: 11, color: T.inkMid, lineHeight: 1.55 }}>
                등록하신 정보는 AI 분석 및 위험도 판단에만 활용됩니다. AI는 진단·처방을 대체하지 않으며, 정확한 문의는 전문가와 상담을 통해 확인하세요.
              </div>
            </div>
          </Card>
        </div>
      </ScreenLayout>

      {modal === 'allergy' && (
        <EditModal
          title="알레르기 성분 수정"
          options={ALLERGY_OPTIONS}
          selected={localUser.allergies}
          icon="pill"
          onSave={val => handleSave('allergies', val)}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'condition' && (
        <EditModal
          title="기저질환 수정"
          options={CONDITION_OPTIONS}
          selected={localUser.conditions}
          icon="heart"
          onSave={val => handleSave('conditions', val)}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
