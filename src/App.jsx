import { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';
import PushNotification from './components/PushNotification.jsx';
import T from './tokens.js';


import Onboarding from './screens/Onboarding.jsx';
import Home from './screens/Home.jsx';
import BarcodeScreen from './screens/BarcodeScreen.jsx';
import OCRScreen from './screens/OCRScreen.jsx';
import ChatScreen from './screens/ChatScreen.jsx';
import AnalysisResult from './screens/AnalysisResult.jsx';
import RecallList from './screens/RecallList.jsx';
import RecallDetail from './screens/RecallDetail.jsx';
import Profile from './screens/Profile.jsx';
import ProductManage from './screens/ProductManage.jsx';

import { mockRecalls, MY_RECALL_ID } from './data/mockRecalls.js';

function Router() {
  const { screen, navigate } = useApp();
  const [pushRecall, setPushRecall] = useState(null);

  useEffect(() => {
    const myRecall = mockRecalls.find(r => r.id === MY_RECALL_ID);
    if (!myRecall) return;

    const firstTimer = setTimeout(() => setPushRecall(myRecall), 3000);
    const interval = setInterval(() => setPushRecall(myRecall), 30000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const handlePushClick = () => {
    setPushRecall(null);
    navigate('recallDetail', { recallId: MY_RECALL_ID });
  };

  const handlePushDismiss = () => setPushRecall(null);

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
    productManage: <ProductManage />,
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
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

export default function App() {
  return (
    <AppProvider>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: T.bgApp,
        fontFamily: '"Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif',
      }}>
        <Router />
      </div>
    </AppProvider>
  );
}
