import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useTheme, MILITARY_THEMES, type MilitaryBranch, type ThemeMode } from './ThemeProvider';
import { Moon, Sun, Check } from 'lucide-react';

interface ThemeSelectorProps {
  showDescription?: boolean;
  compact?: boolean;
}

export function ThemeSelector({ showDescription = true, compact = false }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (branch: MilitaryBranch, mode: ThemeMode) => {
    setTheme({ branch, mode });
  };

  if (compact) {
    return (
      <div className="space-y-4">
        {/* Mode Toggle */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant={theme.mode === 'light' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTheme({ ...theme, mode: 'light' })}
            className="flex items-center gap-2"
          >
            <Sun className="w-4 h-4" />
            Light
          </Button>
          <Button
            variant={theme.mode === 'dark' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTheme({ ...theme, mode: 'dark' })}
            className="flex items-center gap-2"
          >
            <Moon className="w-4 h-4" />
            Dark
          </Button>
        </div>

        {/* Branch Selection */}
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(MILITARY_THEMES).map(([key, themeInfo]) => (
            <Button
              key={key}
              variant={theme.branch === key ? 'default' : 'outline'}
              className="flex items-center gap-2 p-3 h-auto"
              onClick={() => handleThemeChange(key as MilitaryBranch, theme.mode)}
            >
              <span className="text-lg">{themeInfo.icon}</span>
              <div className="text-left">
                <div className="text-sm font-medium">{themeInfo.name}</div>
              </div>
              {theme.branch === key && (
                <Check className="w-4 h-4 ml-auto" />
              )}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Theme Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            Theme Mode
          </CardTitle>
          {showDescription && (
            <CardDescription>
              Choose between light and dark appearance
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={theme.mode === 'light' ? 'default' : 'outline'}
              className="flex-1 flex items-center gap-2 p-4 h-auto"
              onClick={() => setTheme({ ...theme, mode: 'light' })}
            >
              <Sun className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Light Mode</div>
                <div className="text-xs text-muted-foreground">Bright interface</div>
              </div>
              {theme.mode === 'light' && (
                <Check className="w-4 h-4 ml-auto" />
              )}
            </Button>
            
            <Button
              variant={theme.mode === 'dark' ? 'default' : 'outline'}
              className="flex-1 flex items-center gap-2 p-4 h-auto"
              onClick={() => setTheme({ ...theme, mode: 'dark' })}
            >
              <Moon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Dark Mode</div>
                <div className="text-xs text-muted-foreground">Easy on eyes</div>
              </div>
              {theme.mode === 'dark' && (
                <Check className="w-4 h-4 ml-auto" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Military Branch Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            Military Theme
          </CardTitle>
          {showDescription && (
            <CardDescription>
              Select your branch theme or use Joint Forces for a neutral military look
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(MILITARY_THEMES).map(([key, themeInfo]) => (
              <Button
                key={key}
                variant={theme.branch === key ? 'default' : 'outline'}
                className="flex items-start gap-3 p-4 h-auto text-left"
                onClick={() => handleThemeChange(key as MilitaryBranch, theme.mode)}
              >
                <span className="text-2xl">{themeInfo.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{themeInfo.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {themeInfo.description}
                  </div>
                </div>
                {theme.branch === key && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Theme Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
              <div className="w-6 h-6 bg-secondary rounded-full"></div>
              <div className="w-6 h-6 bg-accent rounded-full"></div>
            </div>
            <div>
              <div className="font-medium">
                {MILITARY_THEMES[theme.branch].name}
              </div>
              <div className="text-sm text-muted-foreground">
                {theme.mode === 'light' ? 'Light Mode' : 'Dark Mode'} • {MILITARY_THEMES[theme.branch].description}
              </div>
            </div>
            <Badge variant="secondary" className="ml-auto">
              {theme.mode === 'light' ? '☀️' : '🌙'} Active
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}