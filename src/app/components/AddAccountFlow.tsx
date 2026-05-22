import React, { useState, useCallback } from 'react';
import { ArrowLeft, Building2, CreditCard, Shield, CheckCircle, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { PasswordInput } from './ui/password-input';

interface Institution {
  id: string;
  name: string;
  type: 'military' | 'credit_union' | 'bank' | 'online';
  logo?: string;
  description: string;
  features: string[];
  recommended?: boolean;
  militaryFriendly?: boolean;
}

interface AddAccountFlowProps {
  onBack: () => void;
  onAccountAdded: (accountData: any) => void;
}

type FlowStep = 'institution' | 'account_type' | 'credentials' | 'verification' | 'success';

export function AddAccountFlow({ onBack, onAccountAdded }: AddAccountFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('institution');
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [selectedAccountType, setSelectedAccountType] = useState<string>('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    mfa: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Mock institutions - in a real app, this would come from your banking integration service
  const institutions: Institution[] = [
    {
      id: 'navy_federal',
      name: 'Navy Federal Credit Union',
      type: 'military',
      description: 'Military\'s largest credit union with comprehensive banking services',
      features: ['No monthly fees', 'Global ATM network', 'Military pay advances'],
      recommended: true,
      militaryFriendly: true
    },
    {
      id: 'usaa',
      name: 'USAA',
      type: 'military',
      description: 'Exclusive banking and insurance for military members and families',
      features: ['Mobile deposit', 'Fee refunds', 'Deployment benefits'],
      recommended: true,
      militaryFriendly: true
    },
    {
      id: 'military_star',
      name: 'Military Star Card',
      type: 'credit_union',
      description: 'Official military exchange credit card with exclusive benefits',
      features: ['Exchange discounts', 'No annual fee', 'Rewards program'],
      militaryFriendly: true
    },
    {
      id: 'penfed',
      name: 'Pentagon Federal Credit Union',
      type: 'credit_union',
      description: 'Defense community focused credit union',
      features: ['Competitive rates', 'Auto loans', 'Mortgage services'],
      militaryFriendly: true
    },
    {
      id: 'chase',
      name: 'Chase Bank',
      type: 'bank',
      description: 'Major national bank with extensive branch network',
      features: ['Branch locations', 'Business banking', 'Investment services']
    },
    {
      id: 'bank_of_america',
      name: 'Bank of America',
      type: 'bank',
      description: 'National bank with military-specific programs',
      features: ['Military banking specialists', 'Preferred rewards', 'Online banking']
    }
  ];

  const accountTypes = [
    {
      id: 'checking',
      name: 'Checking Account',
      description: 'For daily transactions and bill payments',
      icon: Building2
    },
    {
      id: 'savings',
      name: 'Savings Account',
      description: 'For emergency funds and saving goals',
      icon: Shield
    },
    {
      id: 'credit',
      name: 'Credit Card',
      description: 'For building credit and earning rewards',
      icon: CreditCard
    }
  ];

  const getStepProgress = () => {
    const steps = ['institution', 'account_type', 'credentials', 'verification', 'success'];
    return ((steps.indexOf(currentStep) + 1) / steps.length) * 100;
  };

  const handleInstitutionSelect = (institution: Institution) => {
    setSelectedInstitution(institution);
    setCurrentStep('account_type');
  };

  const handleAccountTypeSelect = (accountType: string) => {
    setSelectedAccountType(accountType);
    setCurrentStep('credentials');
  };

  const handleCredentialsSubmit = async () => {
    if (!credentials.username || !credentials.password) {
      return;
    }

    setIsConnecting(true);
    
    // Simulate API call to connect account
    setTimeout(() => {
      setIsConnecting(false);
      setCurrentStep('verification');
    }, 2000);
  };

  const handleVerificationSubmit = async () => {
    if (!verificationCode) {
      return;
    }

    setIsConnecting(true);

    // Simulate verification process
    setTimeout(() => {
      setIsConnecting(false);
      
      // Mock account data
      const newAccount = {
        id: Date.now().toString(),
        name: `${selectedInstitution?.name} ${selectedAccountType}`,
        type: selectedAccountType,
        institution: selectedInstitution?.name,
        balance: Math.random() * 10000,
        lastFour: Math.floor(Math.random() * 9999).toString().padStart(4, '0'),
        status: 'active'
      };

      onAccountAdded(newAccount);
      setCurrentStep('success');
    }, 1500);
  };

  const renderInstitutionStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Choose Your Financial Institution</h2>
        <p className="text-muted-foreground">
          Select your bank or credit union to connect your account securely.
        </p>
      </div>

      {/* Military-Friendly Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-success" />
          <h3 className="font-medium">Military-Friendly Institutions</h3>
          <Badge variant="secondary">Recommended</Badge>
        </div>
        <div className="grid gap-3">
          {institutions
            .filter(inst => inst.militaryFriendly)
            .map(institution => (
              <Card 
                key={institution.id} 
                className={`transition-all cursor-pointer hover:shadow-md ${
                  institution.recommended ? 'border-primary/50 bg-primary/5' : ''
                }`}
                onClick={() => handleInstitutionSelect(institution)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{institution.name}</h4>
                        {institution.recommended && (
                          <Badge variant="default" className="text-xs">Recommended</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {institution.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {institution.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <Separator />

      {/* Other Institutions */}
      <div>
        <h3 className="font-medium mb-4">Other Institutions</h3>
        <div className="grid gap-3">
          {institutions
            .filter(inst => !inst.militaryFriendly)
            .map(institution => (
              <Card 
                key={institution.id}
                className="transition-all cursor-pointer hover:shadow-md"
                onClick={() => handleInstitutionSelect(institution)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">{institution.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {institution.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {institution.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Your login credentials are encrypted and never stored. We use bank-level security 
          to protect your information through our trusted partner, Plaid.
        </AlertDescription>
      </Alert>
    </div>
  );

  const renderAccountTypeStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Connect {selectedInstitution?.name} Account
        </h2>
        <p className="text-muted-foreground">
          What type of account would you like to connect?
        </p>
      </div>

      <RadioGroup 
        value={selectedAccountType} 
        onValueChange={setSelectedAccountType}
        className="space-y-3"
      >
        {accountTypes.map(accountType => {
          const Icon = accountType.icon;
          return (
            <Card 
              key={accountType.id}
              className={`transition-all cursor-pointer hover:shadow-md ${
                selectedAccountType === accountType.id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => setSelectedAccountType(accountType.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value={accountType.id} id={accountType.id} />
                  <div className="icon-bg-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={accountType.id} className="cursor-pointer">
                      <div className="font-medium">{accountType.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {accountType.description}
                      </div>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </RadioGroup>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('institution')}>
          Back
        </Button>
        <Button 
          onClick={() => handleAccountTypeSelect(selectedAccountType)}
          disabled={!selectedAccountType}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderCredentialsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Sign in to {selectedInstitution?.name}
        </h2>
        <p className="text-muted-foreground">
          Enter your online banking credentials to securely connect your account.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          We use 256-bit encryption and never store your login credentials. Your information 
          is processed securely through our banking partner.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username or Email</Label>
            <Input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Enter your online banking username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter your online banking password"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4" />
            <span>
              Having trouble? Visit {selectedInstitution?.name} directly
            </span>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-l-4 border-l-warning bg-warning/5">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Make sure you're using the same credentials you use to log into your online banking.
          If you have two-factor authentication enabled, you'll be prompted for that next.
        </AlertDescription>
      </Alert>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('account_type')}>
          Back
        </Button>
        <Button 
          onClick={handleCredentialsSubmit}
          disabled={!credentials.username || !credentials.password || isConnecting}
          className="flex-1"
        >
          {isConnecting ? 'Connecting...' : 'Connect Account'}
        </Button>
      </div>
    </div>
  );

  const renderVerificationStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Two-Factor Authentication</h2>
        <p className="text-muted-foreground">
          {selectedInstitution?.name} sent a verification code to your registered device. 
          Please enter it below.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verification">Verification Code</Label>
            <Input
              id="verification"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
          </div>

          <div className="text-center">
            <Button variant="link" size="sm">
              Didn't receive a code? Resend
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('credentials')}>
          Back
        </Button>
        <Button 
          onClick={handleVerificationSubmit}
          disabled={!verificationCode || isConnecting}
          className="flex-1"
        >
          {isConnecting ? 'Verifying...' : 'Verify & Connect'}
        </Button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-success-foreground" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Account Connected Successfully!</h2>
        <p className="text-muted-foreground">
          Your {selectedInstitution?.name} {selectedAccountType} account has been added 
          to your Major Finance dashboard.
        </p>
      </div>

      <Card className="bg-success/5 border-success/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="icon-bg-success">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h4 className="font-medium">
                {selectedInstitution?.name} {selectedAccountType}
              </h4>
              <p className="text-sm text-muted-foreground">
                Account ending in ••••{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button onClick={onBack} className="w-full">
          View All Accounts
        </Button>
        <Button variant="outline" onClick={() => setCurrentStep('institution')} className="w-full">
          Add Another Account
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">Add Account</h1>
            <p className="text-muted-foreground">
              Connect your bank accounts securely
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {currentStep !== 'success' && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {['institution', 'account_type', 'credentials', 'verification'].indexOf(currentStep) + 1} of 4</span>
              <span>{Math.round(getStepProgress())}% Complete</span>
            </div>
            <Progress value={getStepProgress()} className="h-2" />
          </div>
        )}

        {/* Step Content */}
        <div>
          {currentStep === 'institution' && renderInstitutionStep()}
          {currentStep === 'account_type' && renderAccountTypeStep()}
          {currentStep === 'credentials' && renderCredentialsStep()}
          {currentStep === 'verification' && renderVerificationStep()}
          {currentStep === 'success' && renderSuccessStep()}
        </div>

        {/* Security Notice */}
        {currentStep !== 'success' && (
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Your security is our priority</p>
                <p>
                  We use bank-level 256-bit SSL encryption and never store your credentials. 
                  All account connections are processed through our SOC 2 compliant banking partner.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}