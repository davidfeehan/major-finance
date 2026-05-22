import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { ChevronRight, Shield, Target, TrendingUp, Palette } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { useTheme, MILITARY_THEMES } from './ThemeProvider';

interface OnboardingData {
  rank: string;
  yearsOfService: string;
  retirementGoal: string;
  currentAge: string;
  desiredRetirementAge: string;
  branch?: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { theme } = useTheme();
  const [formData, setFormData] = useState<OnboardingData>({
    rank: '',
    yearsOfService: '',
    retirementGoal: '',
    currentAge: '',
    desiredRetirementAge: ''
  });

  const steps = [
    {
      title: "Choose Your Theme",
      description: "Customize your experience",
      icon: Palette
    },
    {
      title: "Military Service",
      description: "Tell us about your service",
      icon: Shield
    },
    {
      title: "Retirement Goals", 
      description: "What are your retirement aspirations?",
      icon: Target
    },
    {
      title: "Timeline",
      description: "Let's plan your retirement timeline",
      icon: TrendingUp
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ ...formData, branch: theme.branch });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true; // Theme selection is always valid
      case 1:
        return formData.rank && formData.yearsOfService;
      case 2:
        return formData.retirementGoal;
      case 3:
        return formData.currentAge && formData.desiredRetirementAge;
      default:
        return false;
    }
  };

  const updateFormData = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    const StepIcon = steps[currentStep].icon;
    
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <StepIcon className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        
        <CardContent className="space-y-4">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Choose your military branch theme to personalize your experience
                </p>
              </div>
              <ThemeSelector compact showDescription={false} />
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Current: <span className="font-medium text-foreground">{MILITARY_THEMES[theme.branch].name}</span>
                  {' • '}
                  <span className="font-medium text-foreground">{theme.mode === 'light' ? 'Light' : 'Dark'} Mode</span>
                </p>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="rank">Military Rank</Label>
                <Select value={formData.rank} onValueChange={(value) => updateFormData('rank', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your rank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="E1-E3">E1-E3 (Junior Enlisted)</SelectItem>
                    <SelectItem value="E4-E6">E4-E6 (NCO)</SelectItem>
                    <SelectItem value="E7-E9">E7-E9 (Senior NCO)</SelectItem>
                    <SelectItem value="O1-O3">O1-O3 (Company Grade)</SelectItem>
                    <SelectItem value="O4-O6">O4-O6 (Field Grade)</SelectItem>
                    <SelectItem value="O7+">O7+ (General/Flag)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearsOfService">Years of Service</Label>
                <Input
                  id="yearsOfService"
                  type="number"
                  placeholder="Enter years of service"
                  value={formData.yearsOfService}
                  onChange={(e) => updateFormData('yearsOfService', e.target.value)}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div className="space-y-2">
              <Label htmlFor="retirementGoal">Primary Retirement Goal</Label>
              <Select value={formData.retirementGoal} onValueChange={(value) => updateFormData('retirementGoal', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="What's most important to you?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial-security">Financial Security</SelectItem>
                  <SelectItem value="travel">Travel & Adventure</SelectItem>
                  <SelectItem value="family-time">More Family Time</SelectItem>
                  <SelectItem value="second-career">Second Career</SelectItem>
                  <SelectItem value="home-ownership">Home Ownership</SelectItem>
                  <SelectItem value="education">Education & Skills</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {currentStep === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="currentAge">Current Age</Label>
                <Input
                  id="currentAge"
                  type="number"
                  placeholder="Your current age"
                  value={formData.currentAge}
                  onChange={(e) => updateFormData('currentAge', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="desiredRetirementAge">Desired Retirement Age</Label>
                <Input
                  id="desiredRetirementAge"
                  type="number"
                  placeholder="When do you want to retire?"
                  value={formData.desiredRetirementAge}
                  onChange={(e) => updateFormData('desiredRetirementAge', e.target.value)}
                />
              </div>
            </>
          )}
          
          <Button 
            onClick={handleNext} 
            disabled={!canProceed()}
            className="w-full mt-6"
          >
            {currentStep < steps.length - 1 ? (
              <>
                Next Step
                <ChevronRight className="ml-2 w-4 h-4" />
              </>
            ) : (
              'Complete Setup'
            )}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="mb-2">Welcome to Major Finance</h1>
          <p className="text-muted-foreground">Your personal military financial mission command</p>
        </div>
        {renderStep()}
      </div>
    </div>
  );
}