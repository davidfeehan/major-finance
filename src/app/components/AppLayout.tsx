import React from 'react';
import { GlobalAIChatFAB } from './GlobalAIChatFAB';
import { useAppContext } from '../contexts/AppContext';
import { AppScreen } from '../constants';

// Direct imports instead of lazy loading to avoid suspension issues
import BottomNavigation from './BottomNavigation';
import DesktopSidebar from './DesktopSidebar';
import DesktopAIChatPanel from './DesktopAIChatPanel';

interface AppLayoutProps {
  children: React.ReactNode;
  currentScreen: AppScreen;
  onNavigate: (screen: string) => void;
  showNavigation: boolean;
}

function MobileLayout({ 
  children, 
  currentScreen, 
  onNavigate, 
  showNavigation 
}: AppLayoutProps) {
  const { userData } = useAppContext();

  return (
    <>
      <div className="flex min-h-screen">
        {showNavigation && (
          <BottomNavigation
            currentScreen={currentScreen}
            onNavigate={onNavigate}
            userData={userData.userData}
          />
        )}
        <div className={`flex-1 ${showNavigation ? 'bottom-nav-spacing' : ''} relative z-0 interactive-content`}>
          {children}
        </div>
      </div>
      
      {/* Mobile AI Chat FAB */}
      <GlobalAIChatFAB 
        currentScreen={currentScreen}
        userContext={userData.userData}
      />
    </>
  );
}

function DesktopLayout({ 
  children, 
  currentScreen, 
  onNavigate 
}: Omit<AppLayoutProps, 'showNavigation'>) {
  const { layout, userData, auth } = useAppContext();

  return (
    <div 
      className={`desktop-layout ${
        layout.chatPanelState.isOpen ? 'chat-expanded' : 'chat-collapsed'
      }`}
      style={{
        // Dynamically adjust grid columns based on chat panel width
        ...(layout.chatPanelState.isOpen ? {
          gridTemplateColumns: `250px 1fr ${layout.chatPanelState.width}px`
        } : {})
      }}
    >
      {/* Desktop Sidebar */}
      <DesktopSidebar
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        userData={userData.userData}
        isDemo={auth.isDemo}
      />
      
      {/* Main Content Area */}
      <div className="desktop-main">
        <div className="desktop-main-content">
          {children}
        </div>
      </div>
      
      {/* Desktop Chat Panel */}
      <DesktopAIChatPanel
        isOpen={layout.chatPanelState.isOpen}
        onToggle={layout.setChatPanelOpen}
        onResize={layout.resizeChatPanel}
        currentScreen={currentScreen}
        userContext={userData.userData}
        width={layout.chatPanelState.width}
      />
    </div>
  );
}

export function AppLayout(props: AppLayoutProps) {
  const { layout } = useAppContext();

  return (
    <div className="min-h-screen relative">
      {layout.isMobile ? (
        <MobileLayout {...props} />
      ) : (
        <DesktopLayout 
          children={props.children}
          currentScreen={props.currentScreen}
          onNavigate={props.onNavigate}
        />
      )}
    </div>
  );
}