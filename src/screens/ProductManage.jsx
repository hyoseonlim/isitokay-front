import { useState } from 'react';
import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import Card from '../components/Card.jsx';
import ScreenLayout from '../components/ScreenLayout.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function ProductManage() {
  const { products, removeProduct, goBack, navigateTab } = useApp();
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = (id) => {
    if (confirmId === id) {
      removeProduct(id);
      setConfirmId(null);
    } else {
      setConfirmId(id);
    }
  };

  return (
    <ScreenLayout activeTab="home" onTabChange={navigateTab}>
      <ScreenHeader title="등록 제품 관리" onBack={goBack} />

      <div style={{ padding: '4px 18px 32px' }}>
        <p style={{ fontSize: 13, color: T.inkMid, margin: '0 0 18px', lineHeight: 1.5 }}>
          제품을 삭제하려면 삭제 버튼을 탭하세요.
        </p>

        {products.length === 0 ? (
          <Card padding={40} soft style={{ textAlign: 'center' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 999,
              background: T.cardSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}>
              <Icon name="pill" size={24} color={T.inkSoft} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, marginBottom: 6 }}>
              등록된 제품이 없어요
            </div>
            <div style={{ fontSize: 13, color: T.inkSoft }}>
              홈에서 바코드·성분표로 제품을 추가해보세요
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {products.map(p => {
              const isConfirming = confirmId === p.id;
              const iconName = p.category === 'med' ? 'pill' : p.category === 'food' ? 'apple' : 'bottle';
              const iconBg = p.category === 'med' ? T.cardMint
                : p.tone === 'red' ? T.redBg
                : p.tone === 'yellow' ? T.yellowBg
                : T.greenBg;
              const iconColor = p.category === 'med' ? T.primaryDeep
                : p.tone === 'red' ? T.redInk
                : p.tone === 'yellow' ? T.yellowInk
                : T.greenInk;

              return (
                <Card
                  key={p.id}
                  padding={14}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    border: isConfirming ? `1.5px solid ${T.redLine}` : `1px solid ${T.border}`,
                    background: isConfirming ? T.redBg : '#fff',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name={iconName} size={20} color={iconColor} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: isConfirming ? T.redInk : T.ink, letterSpacing: -0.2 }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 11, color: T.inkSoft, marginTop: 2 }}>
                      {p.sub} · {p.status}
                    </div>
                    {isConfirming && (
                      <div style={{ fontSize: 11, color: T.redInk, fontWeight: 600, marginTop: 4 }}>
                        한 번 더 탭하면 삭제돼요
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      height: 34,
                      padding: '0 14px',
                      borderRadius: 999,
                      background: isConfirming ? T.redSwatch : T.redBg,
                      border: `1.5px solid ${isConfirming ? T.redSwatch : T.redLine}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      cursor: 'pointer', flexShrink: 0,
                      transition: 'background 0.2s',
                    }}
                  >
                    <Icon name="x" size={13} color={isConfirming ? '#fff' : T.redInk} strokeWidth={2.5} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: isConfirming ? '#fff' : T.redInk }}>
                      {isConfirming ? '확인' : '삭제'}
                    </span>
                  </button>
                </Card>
              );
            })}
          </div>
        )}

        <Card padding={12} soft style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Icon name="info" size={14} color={T.inkMid} />
            <div style={{ fontSize: 11, color: T.inkMid, lineHeight: 1.55 }}>
              삭제한 제품은 분석 대상에서 제외되며 복구할 수 없어요. 제품 추가는 홈 화면 하단의 바코드 스캔 또는 성분표 촬영으로 가능해요.
            </div>
          </div>
        </Card>
      </div>
    </ScreenLayout>
  );
}
