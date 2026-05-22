import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Bot, Send, User, Lightbulb, Calculator, FileText, HelpCircle, Minimize2, Maximize2, Shield, TrendingUp, Pin, PinOff, Mic, MicOff, Search, Star, Copy, RefreshCw, ArrowRight, GripHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  agentName?: string;
  isInteractive?: boolean;
  quickActions?: QuickAction[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

interface UserContext {
  rank: string;
  yearsOfService: string;
  currentAge: string;
  branch: string;
  completedMissions: number;
  xp: number;
  retirementGoal?: string;
  desiredRetirementAge?: string;
}

interface ConversationMemory {
  userGoals: string[];
  previousTopics: string[];
  calculatorResults: any[];
  preferences: Record<string, any>;
  favoriteResponses: string[];
}

interface AIChatbotProps {
  missionType: string;
  agentName: string;
  agentDescription: string;
  quickSuggestions: string[];
  responses: Record<string, string>;
  isPinned?: boolean;
  onPinToggle?: (pinned: boolean) => void;
  userContext?: UserContext;
  onAgentSwitch?: (newAgent: string, context: string) => void;
}

const AGENT_CONFIGS = {
  'Shield AI': {
    icon: Shield,
    color: 'from-green-500 to-green-600',
    specialties: ['emergency', 'savings', 'protection', 'fund', 'safety'],
    personality: 'protective and methodical',
    catchphrases: ['Stay financially prepared', 'Security first', 'Build your shield']
  },
  'Investment AI': {
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600',
    specialties: ['investment', 'portfolio', 'growth', 'market', 'stocks', 'bonds'],
    personality: 'strategic and growth-focused',
    catchphrases: ['Think long-term', 'Strategic growth', 'Build wealth steadily']
  },
  'TSP Expert AI': {
    icon: Calculator,
    color: 'from-purple-500 to-purple-600',
    specialties: ['tsp', 'retirement', 'matching', 'funds', 'contribution'],
    personality: 'analytical and precise',
    catchphrases: ['Maximize your TSP', 'Every percent counts', 'Optimize your future']
  },
  'Education AI': {
    icon: FileText,
    color: 'from-orange-500 to-orange-600',
    specialties: ['learn', 'education', 'training', 'course', 'knowledge'],
    personality: 'patient and educational',
    catchphrases: ['Knowledge is power', 'Learn and grow', 'Education first']
  }
};

export function AIChatbot({ 
  missionType, 
  agentName, 
  agentDescription, 
  quickSuggestions, 
  responses,
  isPinned = false,
  onPinToggle,
  userContext,
  onAgentSwitch
}: AIChatbotProps) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: getPersonalizedWelcome(),
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(0, 3),
      agentName,
      quickActions: getQuickActions()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [conversationMemory, setConversationMemory] = useState<ConversationMemory>({
    userGoals: [],
    previousTopics: [],
    calculatorResults: [],
    preferences: {},
    favoriteResponses: []
  });
  
  // Enhanced state for resizable chat
  const [chatHeight, setChatHeight] = useState(isPinned ? 300 : 450);
  const [isResizing, setIsResizing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const [viewMode, setViewMode] = useState<'minimized' | 'compact' | 'split' | 'expanded'>('compact');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  function getPersonalizedWelcome(): string {
    if (!userContext) {
      return `Hello! I'm ${agentName}, your AI guide for ${missionType}. ${agentDescription} How can I assist you today?`;
    }

    const branchGreeting = {
      army: "Hooah!",
      navy: "Anchors aweigh!",
      'air-force': "Roger that!",
      marines: "Oorah!",
      'coast-guard': "Semper Paratus!",
      'space-force': "Guardian!",
      joint: "Welcome!"
    }[userContext.branch] || "Welcome!";

    const rankAddress = userContext.rank ? ` ${userContext.rank}` : '';
    const experienceNote = userContext.yearsOfService ? ` With ${userContext.yearsOfService} years of service, you've got great military experience to build on.` : '';
    
    return `${branchGreeting}${rankAddress} I'm ${agentName}, your specialized AI financial advisor for ${missionType}. ${agentDescription}${experienceNote} You've earned ${userContext.xp} XP and completed ${userContext.completedMissions} missions - impressive progress! How can I help you advance your financial readiness today?`;
  }

  function getQuickActions(): QuickAction[] {
    const baseActions: QuickAction[] = [
      {
        id: 'calculate',
        label: 'Quick Calculator',
        icon: Calculator,
        action: () => handleQuickAction('calculator')
      },
      {
        id: 'goal',
        label: 'Set Goal',
        icon: Star,
        action: () => handleQuickAction('goal-setter')
      }
    ];

    // Add mission-specific actions
    if (missionType.includes('Emergency Fund')) {
      baseActions.push({
        id: 'emergency-calc',
        label: 'Emergency Fund Calculator',
        icon: Shield,
        action: () => handleQuickAction('emergency-calculator')
      });
    } else if (missionType.includes('TSP')) {
      baseActions.push({
        id: 'tsp-calc',
        label: 'TSP Calculator',
        icon: TrendingUp,
        action: () => handleQuickAction('tsp-calculator')
      });
    } else if (missionType.includes('Investment')) {
      baseActions.push({
        id: 'portfolio',
        label: 'Portfolio Builder',
        icon: TrendingUp,
        action: () => handleQuickAction('portfolio-builder')
      });
    }

    return baseActions;
  }

  const handlePinToggle = () => {
    if (onPinToggle) {
      onPinToggle(!isPinned);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectTopicChange = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    for (const [agent, config] of Object.entries(AGENT_CONFIGS)) {
      if (agent === agentName) continue; // Skip current agent
      
      const matchCount = config.specialties.filter(specialty => 
        lowerMessage.includes(specialty)
      ).length;
      
      if (matchCount >= 2) {
        return agent;
      }
    }
    
    return null;
  };

  const getContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Update conversation memory
    const newTopics = [...conversationMemory.previousTopics];
    if (!newTopics.includes(missionType)) {
      newTopics.push(missionType);
    }
    setConversationMemory(prev => ({
      ...prev,
      previousTopics: newTopics
    }));

    // Branch-specific greeting responses
    const branchSpecificResponses = {
      army: "Hooah! Let me help you with that financial strategy.",
      navy: "Anchors aweigh! I'm here to navigate this financial topic with you.",
      'air-force': "Roger that! Let's aim high with your financial planning.",
      marines: "Oorah! Let's tackle this financial challenge head-on.",
      'coast-guard': "Semper Paratus! I'm ready to help with your financial preparedness.",
      'space-force': "Guardian, let's launch your financial success to new heights.",
      joint: "Let me provide some strategic financial guidance."
    };

    const branchResponse = userContext?.branch && branchSpecificResponses[userContext.branch] 
      ? branchSpecificResponses[userContext.branch] 
      : branchSpecificResponses[theme.branch] || branchSpecificResponses.joint;
    
    // Personalized context integration
    let contextualPrefix = '';
    if (userContext) {
      if (userContext.rank && Math.random() > 0.7) {
        contextualPrefix = `${userContext.rank}, `;
      }
      if (userContext.yearsOfService && Math.random() > 0.8) {
        contextualPrefix += `with your ${userContext.yearsOfService} years of military experience, `;
      }
    }

    // Check for specific topics first
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        const agentPersonality = AGENT_CONFIGS[agentName]?.personality || '';
        const personalizedResponse = Math.random() > 0.6 ? `${contextualPrefix}${response}` : response;
        return `${branchResponse} ${personalizedResponse}`;
      }
    }
    
    // Default responses based on mission type with enhanced personalization
    const branchIntro = Math.random() > 0.5 ? branchResponse : '';
    
    if (missionType.includes('Emergency Fund')) {
      const deploymentNote = userContext?.yearsOfService ? ' Consider your deployment cycles and PCS moves when planning.' : '';
      return `${branchIntro} ${contextualPrefix}That's a great question about emergency funds! For military personnel, I recommend starting with 3-6 months of essential expenses.${deploymentNote} Would you like me to help you calculate your target amount?`;
    } else if (missionType.includes('Retirement')) {
      const ageNote = userContext?.currentAge ? ` At ${userContext.currentAge}, you have excellent time to build wealth.` : '';
      return `${branchIntro} ${contextualPrefix}Retirement planning is crucial for military personnel! Your military pension combined with TSP provides excellent retirement security.${ageNote} What aspect would you like to explore?`;
    } else if (missionType.includes('Investment')) {
      const experienceNote = userContext?.completedMissions > 2 ? ' Your mission completion shows you\'re committed to financial growth!' : '';
      return `${branchIntro} ${contextualPrefix}Investment strategy is key to building long-term wealth! For military members, TSP and low-cost index funds are excellent starting points.${experienceNote} What's your investment timeline?`;
    } else if (missionType.includes('TSP')) {
      const currentNote = userContext?.rank ? ` As a ${userContext.rank}, you have great earning potential to maximize TSP benefits.` : '';
      return `${branchIntro} ${contextualPrefix}TSP is one of the best retirement benefits available to military personnel!${currentNote} Focus on getting the full 5% match and choosing appropriate fund allocations. What's your current contribution rate?`;
    } else {
      return `${branchIntro} ${contextualPrefix}That's an excellent question! I'm here to help guide you through this financial mission with strategies tailored for military personnel. Let me provide some specific advice for your situation.`;
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Check for agent switching
    const suggestedAgent = detectTopicChange(content);
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay with more realistic timing
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    let aiResponse = getContextualResponse(content);
    let suggestions = quickSuggestions.slice(0, 3);
    
    // Add agent switching suggestion if detected
    if (suggestedAgent && onAgentSwitch) {
      const switchMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: `I notice you're asking about ${AGENT_CONFIGS[suggestedAgent]?.specialties.join(', ')}. Would you like me to connect you with ${suggestedAgent} who specializes in this area?`,
        timestamp: new Date(),
        suggestions: [`Switch to ${suggestedAgent}`, 'Continue with current agent'],
        agentName: 'System'
      };
      
      setMessages(prev => [...prev, switchMessage]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Generate enhanced AI response with quick actions
    const aiMessage: ChatMessage = {
      id: (Date.now() + 2).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
      suggestions,
      agentName,
      quickActions: Math.random() > 0.7 ? getQuickActions().slice(0, 2) : undefined
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.startsWith('Switch to ') && onAgentSwitch) {
      const newAgent = suggestion.replace('Switch to ', '');
      onAgentSwitch(newAgent, `User requested switch from ${agentName} while discussing: ${messages[messages.length - 2]?.content || 'general topics'}`);
    } else {
      handleSendMessage(suggestion);
    }
  };

  const handleQuickAction = (actionId: string) => {
    let message = '';
    switch (actionId) {
      case 'calculator':
        message = 'I need help with calculations';
        break;
      case 'goal-setter':
        message = 'Help me set a financial goal';
        break;
      case 'emergency-calculator':
        message = 'Calculate my emergency fund target';
        break;
      case 'tsp-calculator':
        message = 'Help me optimize my TSP contributions';
        break;
      case 'portfolio-builder':
        message = 'Help me build an investment portfolio';
        break;
      default:
        return;
    }
    handleSendMessage(message);
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      // Start voice recognition (placeholder for future implementation)
      setIsListening(true);
      setTimeout(() => setIsListening(false), 3000); // Auto-stop after 3 seconds
    } else {
      setIsListening(false);
    }
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    // Could add a toast notification here
  };

  const handleFavoriteMessage = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setConversationMemory(prev => ({
        ...prev,
        favoriteResponses: [...prev.favoriteResponses, message.content]
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Resizing functionality
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    setStartY(e.clientY);
    setStartHeight(chatHeight);
    e.preventDefault();
  }, [chatHeight]);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    const deltaY = startY - e.clientY;
    const newHeight = Math.min(Math.max(150, startHeight + deltaY), window.innerHeight * 0.8);
    setChatHeight(newHeight);
  }, [isResizing, startY, startHeight]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  // View mode management  
  const handleViewModeChange = (mode: 'minimized' | 'compact' | 'split' | 'expanded') => {
    setViewMode(mode);
    switch (mode) {
      case 'minimized':
        setChatHeight(60);
        setIsMinimized(true);
        break;
      case 'compact':
        setChatHeight(250);
        setIsMinimized(false);
        break;
      case 'split':
        setChatHeight(Math.floor(window.innerHeight * 0.5));
        setIsMinimized(false);
        break;
      case 'expanded':
        setChatHeight(Math.floor(window.innerHeight * 0.8));
        setIsMinimized(false);
        break;
    }
  };

  const currentAgentConfig = AGENT_CONFIGS[agentName];
  const AgentIcon = currentAgentConfig?.icon || Bot;

  return (
    <TooltipProvider>
      <div 
        ref={chatContainerRef}
        className={`flex flex-col h-full military-card ${isPinned ? 'pinned-chat' : ''} ${isResizing ? 'select-none' : ''}`}
      >
        <Card className="flex-1 flex flex-col border-0 h-full">
          {/* Simplified header for split screen mode */}
          <div className="p-3 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 bg-gradient-to-br ${currentAgentConfig?.color || 'from-primary to-primary/80'} rounded-full flex items-center justify-center`}>
                <AgentIcon className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{agentName}</span>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {messages.length} messages
              </Badge>
            </div>
          </div>
          <div className="flex-1 flex flex-col p-0 min-h-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {(message.type === 'ai' || message.type === 'system') && (
                    <div className={`w-10 h-10 bg-gradient-to-br ${
                      message.type === 'system' ? 'from-gray-500 to-gray-600' : currentAgentConfig?.color || 'from-primary to-primary/80'
                    } rounded-lg flex items-center justify-center flex-shrink-0 military-card shadow-sm border border-primary/20`}>
                      {message.type === 'system' ? (
                        <RefreshCw className="w-5 h-5 text-white" />
                      ) : (
                        <AgentIcon className="w-5 h-5 text-white" />
                      )}
                    </div>
                  )}
                  <div className={`max-w-[75%] p-3 rounded-lg shadow-sm relative group ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto border border-primary/20' 
                      : message.type === 'system'
                      ? 'bg-muted border border-border'
                      : 'bg-card border border-border'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {/* Message actions */}
                    {message.type === 'ai' && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyMessage(message.content)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFavoriteMessage(message.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Star className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                    
                    {(message.type === 'ai' || message.type === 'system') && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                        <div className="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center">
                          {message.type === 'system' ? (
                            <RefreshCw className="w-2.5 h-2.5 text-primary" />
                          ) : (
                            <AgentIcon className="w-2.5 h-2.5 text-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">
                          {message.agentName || agentName}
                        </p>
                        <span className="text-xs text-muted-foreground/70">
                          {MILITARY_THEMES[theme.branch].icon}
                        </span>
                      </div>
                    )}
                  </div>
                  {message.type === 'user' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center flex-shrink-0 border border-border shadow-sm">
                      <User className="w-5 h-5 text-secondary-foreground" />
                    </div>
                  )}
                </div>
                
                {/* Quick Actions */}
                {message.quickActions && (
                  <div className="ml-13 flex flex-wrap gap-2">
                    {message.quickActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        onClick={action.action}
                        className="text-xs hover:bg-primary/5 border-primary/20"
                      >
                        <div className="flex items-center gap-1.5">
                          <action.icon className="w-3 h-3 text-primary" />
                          {action.label}
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
                
                {/* AI Suggestions */}
                {message.suggestions && (
                  <div className="ml-13 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs hover:bg-primary/5 border-primary/20"
                      >
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 bg-primary/10 rounded-full flex items-center justify-center">
                            {suggestion.startsWith('Switch to') ? (
                              <ArrowRight className="w-1.5 h-1.5 text-primary" />
                            ) : (
                              <AgentIcon className="w-1.5 h-1.5 text-primary" />
                            )}
                          </div>
                          {suggestion}
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${currentAgentConfig?.color || 'from-primary to-primary/80'} rounded-lg flex items-center justify-center military-card shadow-sm border border-primary/20`}>
                  <AgentIcon className="w-5 h-5 text-white" />
                </div>
                <div className="bg-card p-3 rounded-lg border border-border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <AgentIcon className="w-2.5 h-2.5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {agentName} is analyzing...
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                      {MILITARY_THEMES[theme.branch].icon}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

            {/* Input */}
            <div className="border-t p-3 bg-card">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Ask ${agentName} while viewing content above...`}
                    className="pr-10 text-sm"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleVoiceToggle}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 ${isListening ? 'text-red-500 voice-listening' : ''}`}
                      >
                        {isListening ? (
                          <MicOff className="w-3 h-3" />
                        ) : (
                          <Mic className="w-3 h-3" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isListening ? "Stop listening" : "Voice input"}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Button 
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="px-3"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}