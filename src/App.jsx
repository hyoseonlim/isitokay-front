import { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';
import PushNotification from './components/PushNotification.jsx';

import Onboarding from './screens/Onboarding.jsx';
import Home from './screens/Home.jsx';
import BarcodeScreen from './screens/BarcodeScreen.jsx';
import OCRScreen from './screens/OCRScreen.jsx';
import ChatScreen from './screens/ChatScreen.jsx';
import AnalysisResult from './screens/AnalysisResult.jsx';
import RecallList from './screens/RecallList.jsx';
import RecallDetail from './screens/RecallDetail.jsx';
import Profile from './screens/Profile.jsx';

import { mockRecalls, MY_RECALL_ID } from './data/mockRecalls.js';

// ── Phone Frame wrapper ──────────────────────────────────────
const PHONE_W = 390;
const PHONE_H = 844;

function PhoneFrame({ children }) {
  return (
    <div style={{
      minHeight: '100vh', background: '#E6E2D6',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif',
    }}>
      <div style={{
        width: PHONE_W, height: PHONE_H,
        borderRadius: 52, overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.12)',
        position: 'relative', background: '#FBF4EE',
        flexShrink: 0,
      }}>
        {children}
      </div>
    </div>
  );
}

// ── Router ───────────────────────────────────────────────────
function Router() {
  const { screen, navigate } = useApp();
  const [pushRecall, setPushRecall] = useState(null);

  // 30초마다 리콜 알림 표시
  useEffect(() => {
    const myRecall = mockRecalls.find(r => r.id === MY_RECALL_ID);
    if (!myRecall) return;

    const show = () => {
      setPushRecall(myRecall);
    };

    // 3초 뒤 첫 알림 (시연용)
    const firstTimer = setTimeout(show, 3000);
    // 이후 30초마다
    const interval = setInterval(show, 30000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const handlePushClick = () => {
    setPushRecall(null);
    navigate('recallDetail', { recallId: MY_RECALL_ID });
  };

  const handlePushDismiss = () => {
    setPushRecall(null);
  };

  const screenMap = {
    home: <Home />,
    barcode: <BarcodeScreen />,
    ocr: <OCRScreen />,
    chat: <ChatScreen />,
    chatList: <ChatScreen />,
    analysisResult: <AnalysisResult />,
    recall: <RecallList />,
    recallDetail: <RecallDetail />,
    profile: <Profile />,
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {screen === 'onboarding' ? <Onboarding /> : (screenMap[screen] || <Home />)}

      {pushRecall && screen !== 'onboarding' && (
        <PushNotification
          recall={pushRecall}
          onClick={handlePushClick}
          onDismiss={handlePushDismiss}
        />
      )}
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <PhoneFrame>
        <Router />
      </PhoneFrame>
    </AppProvider>
  );
}
