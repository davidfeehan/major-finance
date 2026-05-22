import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, Layout, Monitor, Smartphone } from 'lucide-react';
import { useAppLayout } from '../hooks/useAppLayout';

interface DesktopLayoutTestProps {
  onNavigate: (screen: string) => void;
}

export function DesktopLayoutTest({ onNavigate }: DesktopLayoutTestProps) {
  const layout = useAppLayout();
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testLayoutDetection = () => {
    addResult(`Layout detection: ${layout.isMobile ? 'Mobile' : 'Desktop'} (window width: ${window.innerWidth}px)`);
  };

  const testChatPanelToggle = () => {
    const wasOpen = layout.chatPanelState.isOpen;
    layout.toggleChatPanel();
    setTimeout(() => {
      addResult(`Chat panel toggle: ${wasOpen ? 'Closed' : 'Opened'} -> ${layout.chatPanelState.isOpen ? 'Open' : 'Closed'}`);
    }, 100);
  };

  const testChatPanelResize = () => {
    const oldWidth = layout.chatPanelState.width;
    const newWidth = oldWidth === 400 ? 500 : 400;
    layout.resizeChatPanel(newWidth);
    addResult(`Chat panel resize: ${oldWidth}px -> ${layout.chatPanelState.width}px`);
  };

  const testResponsiveBreakpoint = () => {
    const currentWidth = window.innerWidth;
    addResult(`Current breakpoint: ${currentWidth >= 1024 ? 'Desktop (≥1024px)' : 'Mobile (<1024px)'} at ${currentWidth}px`);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Desktop Layout Test</h1>
        <p className="text-muted-foreground">Test the desktop layout system and chat panel functionality</p>
      </div>

      {/* Current State Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              {layout.isMobile ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
              Layout Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={layout.isMobile ? "secondary" : "default"}>
              {layout.isMobile ? 'Mobile' : 'Desktop'}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">
              {window.innerWidth}px wide
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={layout.chatPanelState.isOpen ? "default" : "secondary"}>
              {layout.chatPanelState.isOpen ? 'Open' : 'Closed'}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">
              Width: {layout.chatPanelState.width}px
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Grid Layout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">
              {layout.isMobile ? 'Flex' : 'CSS Grid'}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">
              {layout.isMobile ? 'Mobile layout' : '3-column grid'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Tests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" size="sm" onClick={testLayoutDetection}>
              Test Layout Detection
            </Button>
            <Button variant="outline" size="sm" onClick={testChatPanelToggle}>
              Toggle Chat Panel
            </Button>
            <Button variant="outline" size="sm" onClick={testChatPanelResize}>
              Resize Chat Panel
            </Button>
            <Button variant="outline" size="sm" onClick={testResponsiveBreakpoint}>
              Check Breakpoint
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="destructive" size="sm" onClick={clearResults}>
              Clear Results
            </Button>
            <Button variant="secondary" size="sm" onClick={() => onNavigate('dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-muted-foreground text-sm">No test results yet. Run some tests above.</p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Layout Debug Info */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Window Information</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>Width: {window.innerWidth}px</li>
                <li>Height: {window.innerHeight}px</li>
                <li>Device Pixel Ratio: {window.devicePixelRatio}</li>
                <li>User Agent: {navigator.userAgent.split(' ')[0]}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Layout State</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>Mobile: {layout.isMobile ? 'true' : 'false'}</li>
                <li>Chat Open: {layout.chatPanelState.isOpen ? 'true' : 'false'}</li>
                <li>Chat Width: {layout.chatPanelState.width}px</li>
                <li>Chat Position: {layout.chatPanelState.position}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CSS Grid Visualization (Desktop Only) */}
      {!layout.isMobile && (
        <Card>
          <CardHeader>
            <CardTitle>Desktop Grid Layout Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4">
              <div className="grid grid-cols-12 gap-2 h-32">
                <div className="col-span-2 bg-sidebar rounded flex items-center justify-center text-xs font-medium">
                  Sidebar
                  <br />
                  250px
                </div>
                <div className={`${layout.chatPanelState.isOpen ? 'col-span-7' : 'col-span-10'} bg-background border rounded flex items-center justify-center text-xs font-medium`}>
                  Main Content
                  <br />
                  1fr (flexible)
                </div>
                {layout.chatPanelState.isOpen && (
                  <div className="col-span-3 bg-sidebar rounded flex items-center justify-center text-xs font-medium">
                    Chat Panel
                    <br />
                    {layout.chatPanelState.width}px
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Testing Instructions</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Resize your browser window to test responsive breakpoints (1024px is the desktop threshold)</li>
            <li>Use the "Toggle Chat Panel" button to test open/close functionality</li>
            <li>Try the "Resize Chat Panel" button to test width changes</li>
            <li>Check the grid layout visualization to see how the layout responds</li>
            <li>Observe the CSS classes applied to the desktop layout in browser dev tools</li>
          </ol>
          
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Expected Behavior:</strong> On desktop (≥1024px), you should see a 3-column grid layout. 
              The chat panel should toggle between collapsed (64px) and expanded ({layout.chatPanelState.width}px) states. 
              On mobile (&lt;1024px), the layout switches to the mobile flex layout with bottom navigation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DesktopLayoutTest;