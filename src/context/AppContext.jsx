import { createContext, useContext, useState, useCallback } from 'react';
import { mockUser } from '../data/mockUser.js';
import { mockProducts } from '../data/mockProducts.js';
import { mockConversations } from '../data/mockConversations.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [products, setProducts] = useState(mockProducts);
  const [conversations, setConversations] = useState(mockConversations);

  // Navigation state
  const [screen, setScreen] = useState('onboarding');
  const [screenParams, setScreenParams] = useState({});
  const [screenHistory, setScreenHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('home');

  const navigate = useCallback((targetScreen, params = {}) => {
    setScreenHistory(prev => [...prev, { screen, params: screenParams }]);
    setScreen(targetScreen);
    setScreenParams(params);

    // Sync tab bar with main screens
    const tabScreens = { home: 'home', chat: 'chat', chatList: 'chat', recall: 'recall', recallDetail: 'recall', profile: 'profile' };
    if (tabScreens[targetScreen]) {
      setActiveTab(tabScreens[targetScreen]);
    }
  }, [screen, screenParams]);

  const goBack = useCallback(() => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory(h => h.slice(0, -1));
      setScreen(prev.screen);
      setScreenParams(prev.params || {});
    }
  }, [screenHistory]);

  const navigateTab = useCallback((tab) => {
    setActiveTab(tab);
    setScreenHistory([]);
    setScreen(tab === 'chat' ? 'chatList' : tab);
    setScreenParams({});
  }, []);

  const completeOnboarding = useCallback((userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    setIsOnboarded(true);
    setScreen('home');
    setActiveTab('home');
  }, []);

  const addConversation = useCallback((conv) => {
    setConversations(prev => [conv, ...prev]);
  }, []);

  return (
    <AppContext.Provider value={{
      isOnboarded, user, products, conversations,
      screen, screenParams, activeTab,
      navigate, goBack, navigateTab,
      completeOnboarding, addConversation,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
