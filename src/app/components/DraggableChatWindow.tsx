import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AIChatbot } from './AIChatbot';
import { 
  Bot, 
  X, 
  Minimize2, 
  Maximize2, 
  Pin, 
  PinOff,
  GripVertical,
  Move
} from 'lucide-react';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';

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

interface AgentConfig {
  name: string;
  description: string;
  suggestions: string[];
  responses: Record<string, string>;
  missionType: string;
}

interface DraggableChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: string;
  userContext: UserContext;
  agentConfig: AgentConfig;
}

export function DraggableChatWindow({ 
  isOpen, 
  onClose, 
  currentScreen, 
  userContext, 
  agentConfig 
}: DraggableChatWindowProps) {
  const [position, setPosition] = useState({ x: window.innerWidth - 450, y: 100 });
  const [size, setSize] = useState({ width: 420, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useTheme();
  const themeInfo = MILITARY_THEMES[currentTheme as keyof typeof MILITARY_THEMES] || MILITARY_THEMES.joint;

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isPinned) return;
    if ((e.target as HTMLElement).closest('.no-drag')) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isPinned) {
      const newX = Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - size.width));
      const newY = Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - 60));
      
      setPosition({ x: newX, y: newY });
    }
    
    if (isResizing) {
      const newWidth = Math.max(300, Math.min(resizeStart.width + (e.clientX - resizeStart.x), 600));
      const newHeight = Math.max(400, Math.min(resizeStart.height + (e.clientY - resizeStart.y), window.innerHeight - 100));
      
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isDragging ? 'move' : 'nwse-resize';
      document.body.style.userSelect = 'none';
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, position, size, isPinned]);

  // Pin to right side
  const handlePin = () => {
    if (!isPinned) {
      setPosition({ x: window.innerWidth - size.width, y: 0 });
      setSize({ width: 420, height: window.innerHeight });
    }
    setIsPinned(!isPinned);
  };

  // Toggle minimize
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Reset to default position
  const handleReset = () => {
    setPosition({ x: window.innerWidth - 450, y: 100 });
    setSize({ width: 420, height: 600 });
    setIsPinned(false);
    setIsMinimized(false);
  };

  if (!isOpen) return null;

  const pinnedStyle = isPinned ? {
    position: 'fixed' as const,
    right: 0,
    top: 0,
    height: '100vh',
    width: size.width,
    transform: 'none'
  } : {
    position: 'fixed' as const,
    left: position.x,
    top: position.y,
    width: size.width,
    height: isMinimized ? 60 : size.height
  };

  return (
    <div
      ref={windowRef}
      className={`bg-background border-2 border-primary rounded-lg shadow-2xl overflow-hidden transition-all z-[999] ${
        isDragging ? 'shadow-primary/50' : ''
      } ${isPinned ? 'rounded-none border-r-0' : ''}`}
      style={pinnedStyle}
    >
      {/* Header with drag handle */}
      <div
        className={`flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border ${
          !isPinned && !isMinimized ? 'cursor-move' : ''
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {!isPinned && (
            <div className="no-drag cursor-move text-muted-foreground hover:text-foreground transition-colors">
              <GripVertical className="w-4 h-4" />
            </div>
          )}
          
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            themeInfo.gradient
          }`}>
            <Bot className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{agentConfig.name}</h3>
              <Badge variant="secondary" className="text-xs flex-shrink-0">
                {agentConfig.missionType}
              </Badge>
            </div>
            {!isMinimized && (
              <p className="text-xs text-muted-foreground truncate">
                {agentConfig.description.split('.')[0]}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 no-drag flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMinimize}
            className="h-8 w-8 p-0"
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePin}
            className={`h-8 w-8 p-0 ${isPinned ? 'text-primary' : ''}`}
            title={isPinned ? "Unpin" : "Pin to Right"}
          >
            {isPinned ? <Pin className="w-4 h-4" /> : <PinOff className="w-4 h-4" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            title="Close"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="h-full overflow-hidden no-drag" style={{ height: `calc(${size.height}px - 60px)` }}>
          <AIChatbot
            currentScreen={currentScreen}
            userContext={userContext}
            agentName={agentConfig.name}
            agentDescription={agentConfig.description}
            suggestions={agentConfig.suggestions}
            responses={agentConfig.responses}
          />
        </div>
      )}

      {/* Resize handle - bottom right corner */}
      {!isPinned && !isMinimized && (
        <div
          className="no-drag absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize opacity-50 hover:opacity-100 transition-opacity"
          onMouseDown={handleResizeMouseDown}
          title="Resize"
        >
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-muted-foreground" />
        </div>
      )}

      {/* Reset button when floating */}
      {!isPinned && !isMinimized && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="no-drag absolute bottom-2 left-2 text-xs opacity-50 hover:opacity-100"
          title="Reset Position & Size"
        >
          <Move className="w-3 h-3 mr-1" />
          Reset
        </Button>
      )}
    </div>
  );
}

export default DraggableChatWindow;
