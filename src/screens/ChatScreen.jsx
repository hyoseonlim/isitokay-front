import { useState, useRef, useEffect } from 'react';
import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import Card from '../components/Card.jsx';
import CTAButton from '../components/CTAButton.jsx';
import ScreenLayout from '../components/ScreenLayout.jsx';
import { StatusDot } from '../components/StatusChip.jsx';
import { useApp } from '../context/AppContext.jsx';

// ── 대화 목록 화면 ──────────────────────────────────────────
function ChatList({ onSelectConv, onNewChat }) {
  const { conversations } = useApp();

  const toneColor = {
    green: { bg: T.greenBg, ink: T.greenInk, label: '위험 미확인' },
    yellow: { bg: T.yellowBg, ink: T.yellowInk, label: '추가 확인' },
    red: { bg: T.redBg, ink: T.redInk, label: '경고' },
  };

  return (
    <div style={{ padding: '0 18px 24px' }}>
      {/* Header area */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 20, paddingTop: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 14, background: T.cardMint,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon name="sparkle" size={20} color={T.primaryDeep} />
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: T.ink, margin: 0, letterSpacing: -0.4 }}>
            AI 안심 상담
          </h1>
          <p style={{ fontSize: 12, color: T.inkMid, margin: '3px 0 0', lineHeight: 1.5 }}>
            ※ AI는 복용 가능 여부를 단정하지 않아요. 임신 중 복용은 전문가와 상담하세요.
          </p>
        </div>
      </div>

      {/* 새 대화 버튼 */}
      <CTAButton
        onClick={onNewChat}
        icon={<Icon name="plus" size={16} color="#fff" strokeWidth={2.2} />}
        style={{ marginBottom: 20 }}
      >
        새 대화 시작하기
      </CTAButton>

      {/* 대화 기록 */}
      <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, marginBottom: 12, letterSpacing: -0.2 }}>
        대화 기록
      </div>

      {conversations.length === 0 ? (
        <Card padding={24} soft style={{ textAlign: 'center' }}>
          <Icon name="chat" size={28} color={T.inkSoft} />
          <p style={{ fontSize: 13, color: T.inkSoft, marginTop: 10 }}>아직 대화 기록이 없어요</p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {conversations.map(conv => {
            const tc = toneColor[conv.resultTone] || toneColor.green;
            return (
              <Card
                key={conv.id}
                padding={14}
                onClick={() => onSelectConv(conv)}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 12, background: tc.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <StatusDot tone={conv.resultTone} size={10} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, letterSpacing: -0.2, marginBottom: 3 }}>
                    {conv.title}
                  </div>
                  <div style={{
                    fontSize: 12, color: T.inkMid,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {conv.preview}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: T.inkSoft }}>{conv.date}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: tc.bg, color: tc.ink }}>
                    {tc.label}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── 채팅 화면 ──────────────────────────────────────────────
function ChatWindow({ conv, onBack, onViewResult }) {
  const { products } = useApp();
  const [messages, setMessages] = useState(conv ? conv.messages : []);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: '등록된 복용 정보를 기준으로 분석해볼게요. 전문가와 상담을 권장드려요.',
        resultTone: 'green',
        resultLabel: '분석 결과 · 주요 위험정보 미확인',
        hasResult: true,
      }]);
    }, 1800);
  };

  const UserBubble = ({ children }) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
      <div style={{
        maxWidth: '84%', padding: '12px 16px',
        borderRadius: '20px 20px 4px 20px',
        background: T.butter, color: T.ink,
        fontSize: 13, lineHeight: 1.55, fontWeight: 500,
      }}>
        {children}
      </div>
    </div>
  );

  const AIBubble = ({ children, withAvatar }) => (
    <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'flex-start' }}>
      {withAvatar ? (
        <div style={{
          width: 30, height: 30, borderRadius: 999, background: T.cardMint,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
        }}>
          <Icon name="sparkle" size={14} color={T.primaryDeep} />
        </div>
      ) : <div style={{ width: 30, flexShrink: 0 }} />}
      <div style={{
        maxWidth: '84%', padding: '12px 14px',
        borderRadius: '20px 20px 20px 4px',
        background: '#fff', color: T.ink,
        fontSize: 13, lineHeight: 1.6,
      }}>
        {children}
      </div>
    </div>
  );

  const toneColor = (t) => ({
    green: { bg: T.greenBg, line: T.greenLine, ink: T.greenInk },
    yellow: { bg: T.yellowBg, line: T.yellowLine, ink: T.yellowInk },
    red: { bg: T.redBg, line: T.redLine, ink: T.redInk },
  })[t] || { bg: T.greenBg, line: T.greenLine, ink: T.greenInk };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px 10px', flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 10,
        background: T.bgApp, borderBottom: `1px solid ${T.divider}`,
      }}>
        <button
          onClick={onBack}
          style={{
            width: 36, height: 36, borderRadius: 999, background: 'transparent',
            border: 'none', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: 0,
          }}
        >
          <Icon name="chevL" size={22} color={T.ink} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.ink }}>
            {conv ? conv.title : '새 대화'}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '8px 18px', background: T.cardSoft, flexShrink: 0 }}>
        <p style={{ fontSize: 11, color: T.inkMid, margin: 0, lineHeight: 1.55 }}>
          ※ AI는 복용 가능 여부를 단정하지 않습니다. 임신 중 복용 여부는 의사 또는 약사와 상담해주세요.
        </p>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '16px 18px 8px' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
            <div style={{ fontSize: 14, color: T.inkMid, lineHeight: 1.6 }}>
              궁금한 약이나 식품에 대해<br />자유롭게 질문해보세요.
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {['타이레놀 먹어도 되나요?', '이 성분이 뭔가요?', '영양제 같이 먹어도 돼요?'].map(q => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  style={{
                    padding: '8px 14px', borderRadius: 999,
                    background: T.cardSoft, border: `1px solid ${T.border}`,
                    fontSize: 12, color: T.inkMid, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.role === 'user') {
            return <UserBubble key={i}>{msg.content}</UserBubble>;
          }

          const isFirst = i === 0 || messages[i - 1]?.role === 'user';
          return (
            <div key={i}>
              <AIBubble withAvatar={isFirst}>
                <div style={{ marginBottom: msg.analysisCard ? 10 : 0 }}>{msg.content}</div>
                {msg.analysisCard && (
                  <div style={{
                    background: '#fff', borderRadius: 12,
                    border: `1px solid ${T.cardMintDeep}`,
                    padding: '10px 12px', marginBottom: 8,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <span style={{ fontSize: 10, color: T.primary, fontWeight: 700 }}>기존 복용</span>
                      {msg.analysisCard.existing.map(n => (
                        <span key={n} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          padding: '3px 8px', borderRadius: 999, background: T.cardSoft,
                          fontSize: 10.5, fontWeight: 600, color: T.ink,
                        }}>
                          <Icon name="pill" size={10} color={T.primary} /> {n}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span style={{ fontSize: 10, color: T.primary, fontWeight: 700 }}>새로 확인</span>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '3px 8px', borderRadius: 999, background: T.butter,
                        fontSize: 10.5, fontWeight: 600, color: T.yellowInk,
                      }}>
                        <Icon name="pill" size={10} color={T.primary} /> {msg.analysisCard.newItem}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {msg.analysisCard.criteria.map(c => (
                        <span key={c} style={{
                          padding: '3px 8px', borderRadius: 999,
                          border: `1px solid ${T.cardMintDeep}`,
                          fontSize: 10, fontWeight: 600, color: T.inkMid, background: '#fff',
                        }}>{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </AIBubble>

              {msg.hasResult && (
                <div style={{ marginLeft: 38, marginBottom: 8 }}>
                  {msg.resultTone && (
                    <div style={{
                      padding: '8px 12px', borderRadius: 11, marginBottom: 8,
                      background: toneColor(msg.resultTone).bg,
                      border: `1px solid ${toneColor(msg.resultTone).line}`,
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <StatusDot tone={msg.resultTone} size={7} />
                      <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: toneColor(msg.resultTone).ink }}>
                        {msg.resultLabel}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={onViewResult}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 12,
                      background: T.primary, color: '#fff', border: 'none',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    }}
                  >
                    <Icon name="search" size={13} color="#fff" /> 분석 결과 보기
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'flex-start' }}>
            <div style={{
              width: 30, height: 30, borderRadius: 999, background: T.cardMint,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="sparkle" size={14} color={T.primaryDeep} />
            </div>
            <div style={{
              padding: '12px 16px', borderRadius: '20px 20px 20px 4px',
              background: '#fff', display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: 999, background: T.primary,
                  animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{
        padding: '10px 16px',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 14px)',
        flexShrink: 0,
        background: 'rgba(251,244,238,0.96)', backdropFilter: 'blur(8px)',
        borderTop: `1px solid ${T.border}`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 8px 8px 18px',
          background: '#fff', borderRadius: 999,
          border: `1px solid ${T.border}`,
        }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="추가 질문을 입력하세요"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 14, color: T.ink, fontFamily: 'inherit',
            }}
          />
          <button style={{
            width: 36, height: 36, borderRadius: 999, background: 'transparent',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon name="mic" size={18} color={T.inkMid} />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            style={{
              width: 40, height: 40, borderRadius: 999, background: input.trim() ? T.primary : T.border,
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default', transition: 'background 0.2s',
            }}
          >
            <Icon name="send" size={16} color="#fff" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── 메인 ChatScreen ────────────────────────────────────────
export default function ChatScreen() {
  const { navigate, navigateTab, screen, screenParams } = useApp();
  const [view, setView] = useState(
    screenParams?.fromProduct || screenParams?.fromOCR ? 'newChat' : 'list'
  );
  const [selectedConv, setSelectedConv] = useState(null);

  const handleNewChat = () => {
    setSelectedConv(null);
    setView('newChat');
  };

  const handleSelectConv = (conv) => {
    setSelectedConv(conv);
    setView('chat');
  };

  const handleBack = () => {
    setView('list');
    setSelectedConv(null);
  };

  const handleViewResult = () => {
    navigate('analysisResult');
  };

  if (view === 'list') {
    return (
      <ScreenLayout activeTab="chat" onTabChange={navigateTab}>
        <ChatList onSelectConv={handleSelectConv} onNewChat={handleNewChat} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout activeTab="chat" onTabChange={navigateTab} showTabBar={false}>
      <ChatWindow
        conv={view === 'chat' ? selectedConv : null}
        onBack={handleBack}
        onViewResult={handleViewResult}
      />
    </ScreenLayout>
  );
}
