import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Calculator, DollarSign, Target, TrendingUp } from 'lucide-react';

interface RetirementData {
  currentSavings: string;
  monthlyContribution: string;
  expectedReturn: string;
  retirementAge: string;
  currentAge: string;
  militaryPension: string;
  socialSecurityAge: string;
}

interface RetirementPlanningProps {
  onBack: () => void;
  onCalculate: (data: RetirementData) => void;
  initialData?: Partial<RetirementData>;
}

export function RetirementPlanning({ onBack, onCalculate, initialData }: RetirementPlanningProps) {
  const [formData, setFormData] = useState<RetirementData>({
    currentSavings: initialData?.currentSavings || '',
    monthlyContribution: initialData?.monthlyContribution || '',
    expectedReturn: initialData?.expectedReturn || '7',
    retirementAge: initialData?.retirementAge || '',
    currentAge: initialData?.currentAge || '',
    militaryPension: initialData?.militaryPension || '',
    socialSecurityAge: initialData?.socialSecurityAge || '67'
  });
  const [isCalculating, setIsCalculating] = useState(false);

  const updateFormData = (field: keyof RetirementData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canCalculate = () => {
    return formData.currentSavings && formData.monthlyContribution && 
           formData.retirementAge && formData.currentAge;
  };

  const getValidationMessage = () => {
    const missing = [];
    if (!formData.currentAge) missing.push('Current Age');
    if (!formData.retirementAge) missing.push('Retirement Age');
    if (!formData.currentSavings) missing.push('Current Savings');
    if (!formData.monthlyContribution) missing.push('Monthly Contribution');
    
    if (missing.length === 0) return '';
    if (missing.length === 1) return `Please enter your ${missing[0]}`;
    return `Please enter: ${missing.join(', ')}`;
  };

  const handleCalculate = async () => {
    if (canCalculate()) {
      setIsCalculating(true);
      // Add a small delay to show the calculation is happening
      await new Promise(resolve => setTimeout(resolve, 800));
      onCalculate(formData);
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1>Retirement Planning Mission</h1>
              <p className="text-muted-foreground">
                Plan your financial future with precision and confidence
              </p>
            </div>
          </div>
        </div>

        {/* Mission Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Mission Objective
            </CardTitle>
            <CardDescription>
              Complete this form to calculate your retirement projections and create a personalized financial strategy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3>Current Status</h3>
                <p className="text-sm text-muted-foreground">Enter your current savings</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Calculator className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3>Project Future</h3>
                <p className="text-sm text-muted-foreground">Calculate retirement needs</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3>Optimize Plan</h3>
                <p className="text-sm text-muted-foreground">Adjust for best outcomes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Retirement Planning Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your current age and retirement timeline
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentAge">Current Age <span className="text-red-500">*</span></Label>
                  <Input
                    id="currentAge"
                    type="number"
                    placeholder="35"
                    value={formData.currentAge}
                    onChange={(e) => updateFormData('currentAge', e.target.value)}
                    className={!formData.currentAge ? 'border-red-200' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retirementAge">Retirement Age <span className="text-red-500">*</span></Label>
                  <Input
                    id="retirementAge"
                    type="number"
                    placeholder="65"
                    value={formData.retirementAge}
                    onChange={(e) => updateFormData('retirementAge', e.target.value)}
                    className={!formData.retirementAge ? 'border-red-200' : ''}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="socialSecurityAge">Social Security Collection Age</Label>
                <Select value={formData.socialSecurityAge} onValueChange={(value) => updateFormData('socialSecurityAge', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="62">62 (Reduced Benefits)</SelectItem>
                    <SelectItem value="67">67 (Full Benefits)</SelectItem>
                    <SelectItem value="70">70 (Maximum Benefits)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>
                Your current savings and contribution plans
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Retirement Savings ($) <span className="text-red-500">*</span></Label>
                <Input
                  id="currentSavings"
                  type="number"
                  placeholder="50000"
                  value={formData.currentSavings}
                  onChange={(e) => updateFormData('currentSavings', e.target.value)}
                  className={!formData.currentSavings ? 'border-red-200' : ''}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution ($) <span className="text-red-500">*</span></Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  placeholder="500"
                  value={formData.monthlyContribution}
                  onChange={(e) => updateFormData('monthlyContribution', e.target.value)}
                  className={!formData.monthlyContribution ? 'border-red-200' : ''}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Select value={formData.expectedReturn} onValueChange={(value) => updateFormData('expectedReturn', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5% (Conservative)</SelectItem>
                    <SelectItem value="7">7% (Moderate)</SelectItem>
                    <SelectItem value="9">9% (Aggressive)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Military Benefits */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Military Benefits</CardTitle>
              <CardDescription>
                Include your expected military pension and benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="militaryPension">Expected Monthly Military Pension ($)</Label>
                  <Input
                    id="militaryPension"
                    type="number"
                    placeholder="2500"
                    value={formData.militaryPension}
                    onChange={(e) => updateFormData('militaryPension', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Estimate based on your years of service and final pay grade
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Additional Benefits</Label>
                  <div className="p-3 bg-muted rounded-lg text-sm">
                    <p className="font-medium mb-1">Included in calculation:</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• VA Disability (if applicable)</li>
                      <li>• TRICARE/Healthcare savings</li>
                      <li>• TSP employer contributions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculate Button */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleCalculate}
              disabled={!canCalculate() || isCalculating}
              size="lg"
              className="px-8"
            >
              {isCalculating ? (
                <>
                  <div className="mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Calculating Projection...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 w-5 h-5" />
                  Calculate Retirement Projection
                </>
              )}
            </Button>
            
            <Button
              onClick={() => {
                const exampleData = {
                  currentAge: '35',
                  retirementAge: '60',
                  currentSavings: '75000',
                  monthlyContribution: '800',
                  expectedReturn: '7',
                  militaryPension: '2800',
                  socialSecurityAge: '67'
                };
                setFormData(exampleData);
                setTimeout(() => onCalculate(exampleData), 100);
              }}
              variant="outline"
              size="lg"
              className="px-8"
            >
              <Target className="mr-2 w-5 h-5" />
              Try Example Calculation
            </Button>
          </div>
          
          {!canCalculate() && (
            <p className="text-sm text-muted-foreground">
              {getValidationMessage() || 'Please fill in all required fields to calculate your projection, or try the example above'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}