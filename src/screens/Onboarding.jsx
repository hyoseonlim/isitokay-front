import { useState } from 'react';
import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import BrandMark from '../components/BrandMark.jsx';
import CTAButton from '../components/CTAButton.jsx';
import { useApp } from '../context/AppContext.jsx';

const TOTAL_STEPS = 5;

function calcAge(birthdate) {
  if (!birthdate) return null;
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

const ALLERGY_OPTIONS = [
  '페니실린', '아스피린', '설파제', '이부프로펜',
  '세팔로스포린', '아세트아미노펜', '모르핀', '코데인',
];

const CONDITION_OPTIONS = [
  '임신성 당뇨', '임신성 빈혈', '임신성 고혈압',
  '갑상선 질환', '자궁근종', '자궁내막증',
  '심장 질환', '신장 질환',
];

function ProgressBar({ step }) {
  return (
    <div style={{ padding: '0 24px', marginBottom: 8 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: T.inkSoft, marginBottom: 8,
      }}>
        <span>단계 {step} / {TOTAL_STEPS}</span>
        <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 999, background: T.primarySoft }}>
        <div style={{
          height: '100%', borderRadius: 999, background: T.primary,
          width: `${(step / TOTAL_STEPS) * 100}%`,
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  );
}

function StepLabel({ children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 12px', borderRadius: 999,
      background: T.primarySoft, color: T.primaryInk,
      fontSize: 12, fontWeight: 700, marginBottom: 16,
    }}>
      <BrandMark size={14} />
      {children}
    </div>
  );
}

function MultiSelect({ options, selected, onToggle, icon }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
      {options.map(opt => {
        const isOn = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
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
  );
}

// Step 1 — 이름
function Step1({ data, onChange }) {
  return (
    <div>
      <StepLabel>기본 정보</StepLabel>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: T.ink, margin: '0 0 6px', letterSpacing: -0.5 }}>
        이름을 알려주세요
      </h2>
      <p style={{ fontSize: 13, color: T.inkMid, margin: '0 0 28px', lineHeight: 1.55 }}>
        맞춤 안전 정보를 드리기 위해 필요해요.
      </p>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: T.inkMid, marginBottom: 8 }}>
        이름
      </label>
      <input
        type="text"
        value={data.name}
        onChange={e => onChange({ name: e.target.value })}
        placeholder="예) 박지수"
        style={{
          width: '100%', height: 54, borderRadius: 14,
          border: `1.5px solid ${data.name ? T.primary : T.border}`,
          background: '#fff', padding: '0 18px',
          fontSize: 16, color: T.ink, fontFamily: 'inherit',
          outline: 'none',
        }}
      />
    </div>
  );
}

// Step 2 — 생년월일
function Step2({ data, onChange }) {
  const age = calcAge(data.birthdate);
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <StepLabel>기본 정보</StepLabel>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: T.ink, margin: '0 0 6px', letterSpacing: -0.5 }}>
        생년월일을 알려주세요
      </h2>
      <p style={{ fontSize: 13, color: T.inkMid, margin: '0 0 28px', lineHeight: 1.55 }}>
        임신 위험도 분석에 활용돼요.
      </p>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: T.inkMid, marginBottom: 8 }}>
        생년월일
      </label>
      <input
        type="date"
        value={data.birthdate}
        onChange={e => onChange({ birthdate: e.target.value })}
        max={today}
        min="1960-01-01"
        style={{
          width: '100%', height: 54, borderRadius: 14,
          border: `1.5px solid ${data.birthdate ? T.primary : T.border}`,
          background: '#fff', padding: '0 18px',
          fontSize: 16, color: T.ink, fontFamily: 'inherit',
          outline: 'none',
        }}
      />
      {age !== null && age >= 15 && (
        <div style={{
          marginTop: 14, padding: '14px 18px', borderRadius: 14,
          background: T.primarySoft,
          display: 'flex', alignItems: 'baseline', gap: 6,
        }}>
          <span style={{ fontSize: 13, color: T.primaryInk, fontWeight: 600 }}>만 나이</span>
          <span style={{ fontSize: 26, fontWeight: 800, color: T.primaryDeep, letterSpacing: -1 }}>{age}</span>
          <span style={{ fontSize: 14, color: T.primaryInk, fontWeight: 600 }}>세</span>
        </div>
      )}
    </div>
  );
}

// Step 3 — 임신 정보
function Step3({ data, onChange }) {
  const Toggle = ({ on, onToggle }) => (
    <div
      onClick={onToggle}
      style={{
        width: 48, height: 28, borderRadius: 999,
        background: on ? T.primary : '#D8D2C2',
        position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: on ? 22 : 3,
        width: 22, height: 22, borderRadius: 999, background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left 0.2s',
      }} />
    </div>
  );

  return (
    <div>
      <StepLabel>임신 정보</StepLabel>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: T.ink, margin: '0 0 6px', letterSpacing: -0.5 }}>
        임신 정보를 알려주세요
      </h2>
      <p style={{ fontSize: 13, color: T.inkMid, margin: '0 0 24px', lineHeight: 1.55 }}>
        약물 안전 분석의 핵심 기준이 돼요.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 18px', borderRadius: 16, background: '#fff',
          border: `1px solid ${T.border}`,
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.ink }}>현재 임신 중</div>
            <div style={{ fontSize: 12, color: T.inkMid, marginTop: 2 }}>임신 중이신가요?</div>
          </div>
          <Toggle on={data.isPregnant} onToggle={() => onChange({ isPregnant: !data.isPregnant })} />
        </div>

        {data.isPregnant && (
          <>
            <div style={{
              padding: '16px 18px', borderRadius: 16, background: '#fff',
              border: `1.5px solid ${T.primary}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.inkMid, marginBottom: 14 }}>
                임신 주차
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button
                  onClick={() => onChange({ pregnancyWeek: Math.max(1, data.pregnancyWeek - 1) })}
                  style={{
                    width: 36, height: 36, borderRadius: 999, border: `1px solid ${T.border}`,
                    background: T.cardSoft, cursor: 'pointer', fontSize: 18, color: T.inkMid,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  −
                </button>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: T.primary }}>
                    {data.pregnancyWeek}
                  </span>
                  <span style={{ fontSize: 14, color: T.primaryInk, marginLeft: 4 }}>주차</span>
                </div>
                <button
                  onClick={() => onChange({ pregnancyWeek: Math.min(40, data.pregnancyWeek + 1) })}
                  style={{
                    width: 36, height: 36, borderRadius: 999, border: `1px solid ${T.border}`,
                    background: T.cardSoft, cursor: 'pointer', fontSize: 18, color: T.inkMid,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ position: 'relative', height: 6, borderRadius: 999, background: T.primarySoft, marginTop: 14 }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, height: 6, borderRadius: 999,
                  background: T.primary, width: `${(data.pregnancyWeek / 40) * 100}%`,
                  transition: 'width 0.2s',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.inkSoft, marginTop: 6 }}>
                <span>1주</span>
                <span style={{ color: T.primary, fontWeight: 600 }}>
                  {data.pregnancyWeek <= 12 ? '임신 초기' : data.pregnancyWeek <= 28 ? '임신 중기' : '임신 말기'}
                </span>
                <span>40주</span>
              </div>
            </div>

            <div style={{
              display: 'flex', gap: 10,
            }}>
              {[
                { label: '초산', value: 1 },
                { label: '경산 (2회)', value: 2 },
                { label: '경산 (3회+)', value: 3 },
              ].map(opt => {
                const isOn = data.pregnancyCount === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => onChange({ pregnancyCount: opt.value })}
                    style={{
                      flex: 1, padding: '12px 8px', borderRadius: 14,
                      background: isOn ? T.primarySoft : T.cardSoft,
                      color: isOn ? T.primaryInk : T.inkMid,
                      border: isOn ? `1.5px solid ${T.primary}` : `1.5px solid transparent`,
                      fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: '고위험 임신', key: 'isHighRisk' },
                { label: '다태 임신', key: 'isMultiple' },
              ].map(opt => {
                const isOn = data[opt.key];
                return (
                  <button
                    key={opt.key}
                    onClick={() => onChange({ [opt.key]: !data[opt.key] })}
                    style={{
                      flex: 1, padding: '12px', borderRadius: 14,
                      background: isOn ? T.primarySoft : T.cardSoft,
                      color: isOn ? T.primaryInk : T.inkMid,
                      border: isOn ? `1.5px solid ${T.primary}` : `1.5px solid transparent`,
                      fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    {isOn && <Icon name="check" size={14} color={T.primaryInk} strokeWidth={2.5} />}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Step 4 — 알레르기
function Step4({ data, onChange }) {
  const toggle = (item) => {
    const next = data.allergies.includes(item)
      ? data.allergies.filter(a => a !== item)
      : [...data.allergies, item];
    onChange({ allergies: next });
  };

  return (
    <div>
      <StepLabel>건강 정보</StepLabel>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: T.ink, margin: '0 0 6px', letterSpacing: -0.5 }}>
        알레르기 성분을 알려주세요
      </h2>
      <p style={{ fontSize: 13, color: T.inkMid, margin: '0 0 24px', lineHeight: 1.55 }}>
        해당 성분이 포함된 약물은 경고 표시가 돼요. 없으면 건너뛰셔도 괜찮아요.
      </p>
      <MultiSelect options={ALLERGY_OPTIONS} selected={data.allergies} onToggle={toggle} icon="pill" />
      {data.allergies.length > 0 && (
        <div style={{
          marginTop: 12, padding: '10px 14px', borderRadius: 12,
          background: T.primarySoft, fontSize: 12, color: T.primaryInk, fontWeight: 600,
        }}>
          선택됨: {data.allergies.join(', ')}
        </div>
      )}
    </div>
  );
}

// Step 5 — 기저질환
function Step5({ data, onChange }) {
  const toggle = (item) => {
    const next = data.conditions.includes(item)
      ? data.conditions.filter(c => c !== item)
      : [...data.conditions, item];
    onChange({ conditions: next });
  };

  return (
    <div>
      <StepLabel>건강 정보</StepLabel>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: T.ink, margin: '0 0 6px', letterSpacing: -0.5 }}>
        기저질환이 있으신가요?
      </h2>
      <p style={{ fontSize: 13, color: T.inkMid, margin: '0 0 24px', lineHeight: 1.55 }}>
        약물 상호작용 분석에 활용돼요. 없으면 건너뛰셔도 괜찮아요.
      </p>
      <MultiSelect options={CONDITION_OPTIONS} selected={data.conditions} onToggle={toggle} icon="heart" />
      {data.conditions.length > 0 && (
        <div style={{
          marginTop: 12, padding: '10px 14px', borderRadius: 12,
          background: T.greenBg, fontSize: 12, color: T.greenInk, fontWeight: 600,
        }}>
          선택됨: {data.conditions.join(', ')}
        </div>
      )}
    </div>
  );
}

const STEPS = [Step1, Step2, Step3, Step4, Step5];

export default function Onboarding() {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '박지수',
    birthdate: '1994-07-29',
    isPregnant: true,
    pregnancyWeek: 5,
    pregnancyCount: 1,
    isHighRisk: false,
    isMultiple: false,
    allergies: [],
    conditions: [],
  });

  const update = (patch) => setFormData(prev => ({ ...prev, ...patch }));

  const canNext = () => {
    if (step === 1) return formData.name.trim().length > 0;
    if (step === 2) {
      const age = calcAge(formData.birthdate);
      return age !== null && age >= 15 && age <= 60;
    }
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(s => s + 1);
    else completeOnboarding({ ...formData, age: calcAge(formData.birthdate) });
  };

  const StepComp = STEPS[step - 1];

  return (
    <div style={{
      flex: 1, minHeight: 0, background: T.bgApp,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 24px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 20 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 12,
            overflow: 'hidden', flexShrink: 0,
            boxShadow: '0 3px 10px rgba(233,169,184,0.45)',
          }}>
            <img src="/images/logo.png" alt="해가될까"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.ink, letterSpacing: -0.5, lineHeight: 1.1 }}>
              해가 될까
            </div>
            <div style={{ fontSize: 10, color: T.primaryDeep, fontWeight: 600, marginTop: 2, letterSpacing: 0.1 }}>
              임산부 AI 안심 파트너
            </div>
          </div>
        </div>
        <ProgressBar step={step} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 0' }}>
        <StepComp data={formData} onChange={update} />
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 24px',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 20px)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {step > 1 && (
            <div style={{ flexShrink: 0 }}>
              <CTAButton
                variant="ghost"
                full={false}
                size="lg"
                onClick={() => setStep(s => s - 1)}
              >
                이전
              </CTAButton>
            </div>
          )}
          <div style={{ flex: 1 }}>
            <CTAButton
              onClick={handleNext}
              disabled={!canNext()}
              icon={step === TOTAL_STEPS
                ? <Icon name="check" size={16} color="#fff" strokeWidth={2.5} />
                : <Icon name="chevR" size={16} color="#fff" />}
            >
              {step === TOTAL_STEPS ? '시작하기' : step === 4 || step === 5 ? '없으면 건너뛰기' : '다음'}
            </CTAButton>
          </div>
        </div>
        {(step === 4 || step === 5) && formData.allergies.length + formData.conditions.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <CTAButton
              variant="soft"
              onClick={handleNext}
              icon={<Icon name="check" size={15} color={T.primaryInk} />}
            >
              선택 완료
            </CTAButton>
          </div>
        )}
      </div>
    </div>
  );
}
