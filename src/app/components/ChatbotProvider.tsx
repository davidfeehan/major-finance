import React, { createContext, useContext, useState, useCallback } from 'react';

interface ChatbotState {
  currentAgent: string;
  conversationHistory: ConversationSession[];
  globalMemory: GlobalMemory;
  isAgentSwitching: boolean;
}

interface ConversationSession {
  id: string;
  agentName: string;
  missionType: string;
  messages: any[];
  startTime: Date;
  endTime?: Date;
  switchReason?: string;
}

interface GlobalMemory {
  userGoals: string[];
  completedCalculations: any[];
  preferredAgents: Record<string, number>;
  conversationThemes: string[];
  favoriteResponses: string[];
}

interface ChatbotContextType {
  state: ChatbotState;
  switchAgent: (newAgent: string, reason: string, context?: any) => void;
  updateMemory: (updates: Partial<GlobalMemory>) => void;
  startNewSession: (agentName: string, missionType: string) => void;
  endCurrentSession: () => void;
  getAgentRecommendation: (message: string) => string | null;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ChatbotState>({
    currentAgent: '',
    conversationHistory: [],
    globalMemory: {
      userGoals: [],
      completedCalculations: [],
      preferredAgents: {},
      conversationThemes: [],
      favoriteResponses: []
    },
    isAgentSwitching: false
  });

  const switchAgent = useCallback((newAgent: string, reason: string, context?: any) => {
    setState(prev => ({
      ...prev,
      isAgentSwitching: true,
      currentAgent: newAgent,
      conversationHistory: prev.conversationHistory.map(session => 
        session.endTime ? session : { ...session, endTime: new Date(), switchReason: reason }
      )
    }));

    // End switching state after animation
    setTimeout(() => {
      setState(prev => ({ ...prev, isAgentSwitching: false }));
    }, 500);
  }, []);

  const updateMemory = useCallback((updates: Partial<GlobalMemory>) => {
    setState(prev => ({
      ...prev,
      globalMemory: { ...prev.globalMemory, ...updates }
    }));
  }, []);

  const startNewSession = useCallback((agentName: string, missionType: string) => {
    const newSession: ConversationSession = {
      id: Date.now().toString(),
      agentName,
      missionType,
      messages: [],
      startTime: new Date()
    };

    setState(prev => ({
      ...prev,
      currentAgent: agentName,
      conversationHistory: [...prev.conversationHistory, newSession]
    }));
  }, []);

  const endCurrentSession = useCallback(() => {
    setState(prev => ({
      ...prev,
      conversationHistory: prev.conversationHistory.map(session => 
        session.endTime ? session : { ...session, endTime: new Date() }
      )
    }));
  }, []);

  const getAgentRecommendation = useCallback((message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    // Agent specialty keywords
    const agentKeywords = {
      'Shield AI': ['emergency', 'savings', 'protection', 'fund', 'safety', 'secure'],
      'Investment AI': ['investment', 'portfolio', 'growth', 'market', 'stocks', 'bonds', 'mutual'],
      'TSP Expert AI': ['tsp', 'retirement', 'matching', 'contribution', 'funds', 'lifecycle'],
      'Education AI': ['learn', 'education', 'training', 'course', 'knowledge', 'understand']
    };

    let bestMatch = '';
    let highestScore = 0;

    for (const [agent, keywords] of Object.entries(agentKeywords)) {
      if (agent === state.currentAgent) continue;
      
      const score = keywords.reduce((acc, keyword) => 
        acc + (lowerMessage.includes(keyword) ? 1 : 0), 0
      );
      
      if (score > highestScore && score >= 2) {
        highestScore = score;
        bestMatch = agent;
      }
    }

    // Consider user preferences
    if (bestMatch && state.globalMemory.preferredAgents[bestMatch]) {
      return bestMatch;
    }

    return highestScore >= 2 ? bestMatch : null;
  }, [state.currentAgent, state.globalMemory.preferredAgents]);

  const value: ChatbotContextType = {
    state,
    switchAgent,
    updateMemory,
    startNewSession,
    endCurrentSession,
    getAgentRecommendation
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}