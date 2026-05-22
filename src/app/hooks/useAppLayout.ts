import { useState, useCallback } from 'react';
import { useMediaQuery } from './useMediaQuery';

interface ChatPanelState {
  isOpen: boolean;
  width: number;
}

const DEFAULT_CHAT_WIDTH = 400;
const MIN_CHAT_WIDTH = 300;
const MAX_CHAT_WIDTH = 800;

export function useAppLayout() {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  
  const [chatPanelState, setChatPanelState] = useState<ChatPanelState>({
    isOpen: false,
    width: DEFAULT_CHAT_WIDTH
  });

  const setChatPanelOpen = useCallback((isOpen: boolean) => {
    setChatPanelState(prev => ({
      ...prev,
      isOpen
    }));
  }, []);

  const resizeChatPanel = useCallback((width: number) => {
    // Constrain width between min and max
    const constrainedWidth = Math.min(Math.max(width, MIN_CHAT_WIDTH), MAX_CHAT_WIDTH);
    setChatPanelState(prev => ({
      ...prev,
      width: constrainedWidth
    }));
  }, []);

  return {
    isMobile,
    chatPanelState,
    setChatPanelOpen,
    resizeChatPanel
  };
}