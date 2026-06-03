import { useState, useRef, useEffect } from 'react';
import T from '../tokens.js';
import Icon from '../components/Icon.jsx';
import ScreenLayout from '../components/ScreenLayout.jsx';
import { useApp } from '../context/AppContext.jsx';

const TONE = {
  green:  { dot: T.greenSwatch,  bg: T.greenBg,  line: T.greenLine,  ink: T.greenInk,  label: '안전' },
  yellow: { dot: T.yellowSwatch, bg: T.yellowBg, line: T.yellowLine, ink: T.yellowInk, label: '확인 필요' },
  red:    { dot: T.redSwatch,    bg: T.redBg,    line: T.redLine,    ink: T.redInk,    label: '경고' },
};
const tone = (t) => TONE[t] || TONE.green;

const QUICK_QUESTIONS = [
  '타이레놀 먹어도 되나요?',
  '이 성분이 뭔가요?',
  '영양제 같이 먹어도 돼요?',
];

// ── 대화 목록 ────────────────────────────────────────────────
function ChatList({ onSelectConv, onNewChat }) {
  const { conversations } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '24px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 16,
            background: T.primarySoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="sparkle" size={22} color={T.primaryDeep} />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: T.ink, margin: 0, letterSpacing: -0.6 }}>
              AI 안심 상담
            </h1>
            <div style={{ fontSize: 12, color: T.inkMid, marginTop: 3 }}>
              내 복용 약 기반으로 안전 여부를 분석해드려요
            </div>
          </div>
        </div>

        {/* New chat button */}
        <button
          onClick={onNewChat}
          style={{
            width: '100%', height: 52, borderRadius: 14,
            background: T.primary, color: '#fff', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: -0.3,
            fontFamily: 'inherit',
          }}
        >
          <div style={{
            width: 22, height: 22, borderRadius: 999,
            background: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="plus" size={13} color="#fff" strokeWidth={2.5} />
          </div>
          새 대화 시작하기
        </button>
      </div>

      {/* Disclaimer */}
      <div style={{
        margin: '0 20px 24px',
        padding: '10px 14px', borderRadius: 12,
        background: T.cardSoft,
        display: 'flex', gap: 8, alignItems: 'flex-start',
      }}>
        <Icon name="info" size={13} color={T.inkSoft} />
        <p style={{ fontSize: 11, color: T.inkSoft, margin: 0, lineHeight: 1.6 }}>
          AI는 복용 가능 여부를 단정하지 않아요. 임신 중 복용 여부는 반드시 의사·약사와 상담하세요.
        </p>
      </div>

      {/* History */}
      <div style={{ padding: '0 20px 32px' }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: T.inkSoft,
          letterSpacing: 0.4, marginBottom: 8, textTransform: 'uppercase',
        }}>
          이전 대화
        </div>

        {conversations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 0', color: T.inkSoft }}>
            <Icon name="chat" size={30} color={T.border} />
            <p style={{ fontSize: 13, marginTop: 12, color: T.inkSoft }}>아직 대화 기록이 없어요</p>
          </div>
        ) : (
          <div>
            {conversations.map((conv, idx) => {
              const tc = tone(conv.resultTone);
              return (
                <button
                  key={conv.id}
                  onClick={() => onSelectConv(conv)}
                  style={{
                    width: '100%', textAlign: 'left', fontFamily: 'inherit',
                    padding: '14px 0', background: 'transparent', border: 'none',
                    borderBottom: `1px solid ${T.divider}`, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 14,
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 12, flexShrink: 0,
                    background: tc.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ width: 9, height: 9, borderRadius: 999, background: tc.dot }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, marginBottom: 4, letterSpacing: -0.2 }}>
                      {conv.title}
                    </div>
                    <div style={{
                      fontSize: 12, color: T.inkSoft,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {conv.preview}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                    <span style={{ fontSize: 10, color: T.inkSoft }}>{conv.date}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                      background: tc.bg, color: tc.ink,
                    }}>
                      {tc.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── 채팅 창 ──────────────────────────────────────────────────
function ChatWindow({ conv, onBack, onViewResult }) {
  const [messages, setMessages] = useState(conv ? conv.messages : []);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text = input) => {
    const t = text.trim();
    if (!t) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: t }]);
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

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        padding: '10px 14px 10px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: `1px solid ${T.border}`,
        flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          style={{
            width: 36, height: 36, borderRadius: 11,
            background: T.cardSoft, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <Icon name="chevL" size={18} color={T.ink} />
        </button>
        <div style={{
          width: 34, height: 34, borderRadius: 11,
          background: T.primarySoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon name="sparkle" size={17} color={T.primaryDeep} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, letterSpacing: -0.3, lineHeight: 1.2 }}>
            {conv ? conv.title : 'AI 안심 상담'}
          </div>
          <div style={{ fontSize: 11, color: T.inkSoft, marginTop: 1 }}>복용 정보 기반 분석</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 16px 8px' }}>

        {/* Empty state */}
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', paddingBottom: 24 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 22,
              background: T.primarySoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Icon name="sparkle" size={28} color={T.primaryDeep} />
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 6, letterSpacing: -0.4 }}>
              무엇이 궁금하세요?
            </div>
            <div style={{ fontSize: 13, color: T.inkMid, lineHeight: 1.6, marginBottom: 20 }}>
              약·식품에 대해 자유롭게 질문해보세요
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {QUICK_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  style={{
                    width: '100%', padding: '13px 16px', borderRadius: 12,
                    background: T.cardSoft, border: `1px solid ${T.border}`,
                    fontSize: 13, color: T.ink, cursor: 'pointer',
                    fontFamily: 'inherit', fontWeight: 500, textAlign: 'left',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  {q}
                  <Icon name="chevR" size={14} color={T.inkSoft} />
                </button>
              ))}
            </div>

            <div style={{
              padding: '10px 14px', borderRadius: 12, background: T.cardSoft,
              fontSize: 11, color: T.inkSoft, lineHeight: 1.6, textAlign: 'left',
            }}>
              ※ AI는 복용 가능 여부를 단정하지 않습니다. 임신 중 복용 여부는 의사·약사와 상담해주세요.
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => {
          if (msg.role === 'user') {
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                <div style={{
                  maxWidth: '78%', padding: '12px 16px',
                  borderRadius: '18px 18px 4px 18px',
                  background: T.primary,
                  fontSize: 14, color: '#fff', lineHeight: 1.55,
                }}>
                  {msg.content}
                </div>
              </div>
            );
          }

          const isFirst = i === 0 || messages[i - 1]?.role === 'user';
          const tc = tone(msg.resultTone);
          return (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                {isFirst ? (
                  <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: T.primarySoft,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 2,
                  }}>
                    <Icon name="sparkle" size={15} color={T.primaryDeep} />
                  </div>
                ) : (
                  <div style={{ width: 32, flexShrink: 0 }} />
                )}
                <div style={{
                  maxWidth: '78%', padding: '12px 14px',
                  borderRadius: '18px 18px 18px 4px',
                  background: '#fff',
                  fontSize: 14, color: T.ink, lineHeight: 1.6,
                }}>
                  {msg.content}
                </div>
              </div>

              {msg.hasResult && (
                <div style={{ marginLeft: 42, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{
                    padding: '9px 13px', borderRadius: 10,
                    background: tc.bg, border: `1px solid ${tc.line}`,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: 999, background: tc.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: tc.ink }}>{msg.resultLabel}</span>
                  </div>
                  <button
                    onClick={onViewResult}
                    style={{
                      padding: '11px 14px', borderRadius: 12,
                      background: T.primary, color: '#fff', border: 'none',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    <Icon name="search" size={14} color="#fff" />
                    분석 결과 보기
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: T.primarySoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="sparkle" size={15} color={T.primaryDeep} />
            </div>
            <div style={{
              padding: '14px 18px', borderRadius: '18px 18px 18px 4px',
              background: '#fff',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: 999, background: T.primaryMid,
                  animation: `bounce 1s ease-in-out ${i * 0.16}s infinite`,
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
        background: T.bgApp,
        borderTop: `1px solid ${T.border}`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 6px 6px 16px',
          background: T.cardSoft, borderRadius: 14,
        }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="약이나 식품에 대해 질문하세요"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 14, color: T.ink, fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            style={{
              width: 38, height: 38, borderRadius: 10,
              background: input.trim() ? T.primary : T.border,
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default',
              transition: 'background 0.2s', flexShrink: 0,
            }}
          >
            <Icon name="send" size={15} color="#fff" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── 메인 ────────────────────────────────────────────────────
export default function ChatScreen() {
  const { navigate, navigateTab, screenParams } = useApp();
  const [view, setView] = useState(
    screenParams?.fromProduct || screenParams?.fromOCR ? 'newChat' : 'list'
  );
  const [selectedConv, setSelectedConv] = useState(null);

  if (view === 'list') {
    return (
      <ScreenLayout activeTab="chat" onTabChange={navigateTab}>
        <ChatList
          onSelectConv={(conv) => { setSelectedConv(conv); setView('chat'); }}
          onNewChat={() => { setSelectedConv(null); setView('newChat'); }}
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout activeTab="chat" onTabChange={navigateTab} showTabBar={false}>
      <ChatWindow
        conv={view === 'chat' ? selectedConv : null}
        onBack={() => { setView('list'); setSelectedConv(null); }}
        onViewResult={() => navigate('analysisResult')}
      />
    </ScreenLayout>
  );
}
