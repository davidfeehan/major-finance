import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { 
  ArrowLeft,
  Shield,
  Heart,
  GraduationCap,
  Home,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Calculator,
  FileText,
  Award,
  DollarSign,
  Target
} from 'lucide-react';

interface VABenefitsMissionProps {
  onBack: () => void;
  onComplete: () => void;
  isDemo?: boolean;
  userContext?: {
    rank: string;
    yearsOfService: string;
    currentAge: string;
    branch: string;
    serviceConnectedDisability?: boolean;
  };
}

export function VABenefitsMission({ onBack, onComplete, isDemo = false, userContext }: VABenefitsMissionProps) {
  // Check if this mission has been completed
  const isCompleted = userContext?.completedMissionsList?.includes('va-benefits') || false;
  
  const [yearsOfService, setYearsOfService] = useState(userContext?.yearsOfService || '');
  const [hasDisability, setHasDisability] = useState(false);
  const [disabilityRating, setDisabilityRating] = useState('');
  const [hasSpouse, setHasSpouse] = useState(false);
  const [hasDependents, setHasDependents] = useState(false);
  const [numberOfDependents, setNumberOfDependents] = useState('');
  const [interestedBenefits, setInterestedBenefits] = useState<string[]>([]);

  const benefitCategories = [
    {
      id: 'healthcare',
      title: 'Healthcare Benefits',
      icon: Heart,
      description: 'VA healthcare, TRICARE, and medical coverage',
      benefits: [
        'VA Healthcare enrollment',
        'Priority Group assignment based on service',
        'TRICARE coverage options',
        'Prescription medication benefits',
        'Mental health services'
      ],
      estimatedValue: 12000
    },
    {
      id: 'education',
      title: 'Education Benefits',
      icon: GraduationCap,
      description: 'GI Bill and education assistance programs',
      benefits: [
        'Post-9/11 GI Bill (up to 36 months)',
        'Montgomery GI Bill',
        'Vocational Rehabilitation',
        'Dependent education benefits',
        'Tutorial assistance'
      ],
      estimatedValue: 25000
    },
    {
      id: 'housing',
      title: 'Housing & Home Loans',
      icon: Home,
      description: 'VA home loan benefits and housing assistance',
      benefits: [
        'VA Home Loan (0% down payment)',
        'No private mortgage insurance required',
        'Lower interest rates',
        'Adapted housing grants for disabled veterans',
        'Native American Direct Loan program'
      ],
      estimatedValue: 15000
    },
    {
      id: 'disability',
      title: 'Disability Compensation',
      icon: Shield,
      description: 'Monthly compensation for service-connected conditions',
      benefits: [
        'Tax-free monthly payments',
        'Dependent allowances',
        'Aid and Attendance benefits',
        'Automobile allowance for certain disabilities',
        'Clothing allowance'
      ],
      estimatedValue: hasDisability && disabilityRating ? calculateDisabilityCompensation() : 0
    },
    {
      id: 'employment',
      title: 'Career & Employment',
      icon: Briefcase,
      description: 'Job training and employment assistance',
      benefits: [
        'Veterans preference in federal hiring',
        'VR&E employment services',
        'Resume building assistance',
        'Interview preparation',
        'Apprenticeship programs'
      ],
      estimatedValue: 8000
    }
  ];

  function calculateDisabilityCompensation() {
    const rating = parseInt(disabilityRating) || 0;
    const baseRates: Record<number, number> = {
      10: 165,
      20: 327,
      30: 508,
      40: 731,
      50: 1041,
      60: 1361,
      70: 1716,
      80: 1995,
      90: 2241,
      100: 3737
    };

    let monthly = baseRates[rating] || 0;

    // Add for spouse
    if (hasSpouse && rating >= 30) {
      const spouseRates: Record<number, number> = {
        30: 57,
        40: 76,
        50: 95,
        60: 123,
        70: 150,
        80: 174,
        90: 195,
        100: 219
      };
      monthly += spouseRates[rating] || 0;
    }

    // Add for dependents
    if (hasDependents && rating >= 30) {
      const numDeps = parseInt(numberOfDependents) || 0;
      const perDependent = rating >= 50 ? 40 : 31;
      monthly += numDeps * perDependent;
    }

    return monthly * 12; // Annual value
  }

  const totalBenefitsValue = benefitCategories.reduce((sum, cat) => {
    if (interestedBenefits.includes(cat.id)) {
      return sum + cat.estimatedValue;
    }
    return sum;
  }, 0);

  const toggleBenefit = (id: string) => {
    setInterestedBenefits(prev =>
      prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Missions
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-12 h-12 ${isCompleted ? 'bg-green-600' : 'bg-primary'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <Shield className="w-6 h-6 text-primary-foreground" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl mb-2">VA Benefits Optimization Mission</h1>
                  {isCompleted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  Discover and maximize your VA benefits package
                </p>
              </div>
            </div>
            {!isCompleted && (
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                300 XP
              </Badge>
            )}
          </div>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="benefits">All Benefits</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="timeline">Action Plan</TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Benefits Eligibility Calculator</CardTitle>
                <CardDescription>
                  Enter your information to estimate your VA benefits package
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="years">Years of Service</Label>
                    <Input
                      id="years"
                      type="number"
                      placeholder="8"
                      value={yearsOfService}
                      onChange={(e) => setYearsOfService(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Service-Connected Disability</Label>
                    <div className="flex items-center space-x-2 h-10">
                      <Checkbox
                        id="disability"
                        checked={hasDisability}
                        onCheckedChange={(checked) => setHasDisability(checked as boolean)}
                      />
                      <label htmlFor="disability" className="text-sm cursor-pointer">
                        I have a service-connected disability
                      </label>
                    </div>
                  </div>

                  {hasDisability && (
                    <div className="space-y-2">
                      <Label htmlFor="rating">Disability Rating (%)</Label>
                      <select
                        id="rating"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={disabilityRating}
                        onChange={(e) => setDisabilityRating(e.target.value)}
                      >
                        <option value="">Select rating</option>
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                        <option value="40">40%</option>
                        <option value="50">50%</option>
                        <option value="60">60%</option>
                        <option value="70">70%</option>
                        <option value="80">80%</option>
                        <option value="90">90%</option>
                        <option value="100">100%</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Family Status</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="spouse"
                          checked={hasSpouse}
                          onCheckedChange={(checked) => setHasSpouse(checked as boolean)}
                        />
                        <label htmlFor="spouse" className="text-sm cursor-pointer">
                          Married
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="dependents"
                          checked={hasDependents}
                          onCheckedChange={(checked) => setHasDependents(checked as boolean)}
                        />
                        <label htmlFor="dependents" className="text-sm cursor-pointer">
                          Have dependents
                        </label>
                      </div>
                    </div>
                  </div>

                  {hasDependents && (
                    <div className="space-y-2">
                      <Label htmlFor="numDependents">Number of Dependents</Label>
                      <Input
                        id="numDependents"
                        type="number"
                        placeholder="2"
                        value={numberOfDependents}
                        onChange={(e) => setNumberOfDependents(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {hasDisability && disabilityRating && (
                  <Card className="bg-green-500/5 border-green-500/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Estimated Annual Disability Compensation</p>
                          <p className="text-3xl font-bold text-green-600">
                            ${calculateDisabilityCompensation().toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            ${(calculateDisabilityCompensation() / 12).toFixed(2)}/month (tax-free)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Benefits You're Interested In</CardTitle>
                <CardDescription>
                  Choose the benefits you want to explore and claim
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {benefitCategories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = interestedBenefits.includes(category.id);

                    return (
                      <Card
                        key={category.id}
                        className={`cursor-pointer transition-all ${
                          isSelected ? 'border-primary shadow-md' : 'hover:border-muted-foreground'
                        }`}
                        onClick={() => toggleBenefit(category.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon className="w-5 h-5 text-primary" />
                              <h4 className="font-semibold">{category.title}</h4>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {category.description}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            Est. ${(category.estimatedValue / 1000).toFixed(1)}k/year value
                          </Badge>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {interestedBenefits.length > 0 && (
                  <Card className="mt-6 bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Total Estimated Annual Value
                          </p>
                          <p className="text-3xl font-bold text-primary">
                            ${totalBenefitsValue.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">
                            Selected Benefits
                          </p>
                          <p className="text-2xl font-bold">
                            {interestedBenefits.length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Benefits Tab */}
          <TabsContent value="benefits" className="space-y-6">
            {benefitCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      {category.title}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="mt-4 w-full">
                      Learn More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>VA Resources & Contacts</CardTitle>
                <CardDescription>
                  Important links and phone numbers for VA benefits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">VA Benefits Hotline</h4>
                    <p className="text-2xl font-bold text-primary mb-1">1-800-827-1000</p>
                    <p className="text-sm text-muted-foreground">Monday-Friday, 8am-9pm ET</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">VA Healthcare</h4>
                    <p className="text-2xl font-bold text-primary mb-1">1-877-222-8387</p>
                    <p className="text-sm text-muted-foreground">24/7 Support</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Crisis Line</h4>
                    <p className="text-2xl font-bold text-primary mb-1">988 (Press 1)</p>
                    <p className="text-sm text-muted-foreground">24/7 Crisis Support</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">GI Bill Hotline</h4>
                    <p className="text-2xl font-bold text-primary mb-1">1-888-442-4551</p>
                    <p className="text-sm text-muted-foreground">Monday-Friday, 8am-7pm ET</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Online Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="https://www.va.gov" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">VA.gov</p>
                    <p className="text-sm text-muted-foreground">Official VA website</p>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a href="https://www.ebenefits.va.gov" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">eBenefits</p>
                    <p className="text-sm text-muted-foreground">Manage your benefits online</p>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a href="https://www.benefits.va.gov/gibill/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">GI Bill Website</p>
                    <p className="text-sm text-muted-foreground">Education benefits information</p>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>

            <Card className="border-amber-500/50 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-500">
                  <AlertTriangle className="w-5 h-5" />
                  Important Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  • <strong>File claims promptly:</strong> Some benefits have time limits from separation date
                </p>
                <p>
                  • <strong>Keep records:</strong> Save all medical records, DD-214, and service documentation
                </p>
                <p>
                  • <strong>Use VA representatives:</strong> Free help available through VSOs and county veterans services
                </p>
                <p>
                  • <strong>Appeal if denied:</strong> You have the right to appeal any VA decision
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Action Plan Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your VA Benefits Action Plan</CardTitle>
                <CardDescription>
                  Step-by-step guide to claiming your benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        1
                      </div>
                      <div className="w-px h-full bg-border mt-2" />
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className="font-semibold mb-2">Gather Documentation</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Collect your DD-214, medical records, and service history
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Request DD-214 from archives if needed</li>
                        <li>• Collect service medical records</li>
                        <li>• Document any service-connected conditions</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        2
                      </div>
                      <div className="w-px h-full bg-border mt-2" />
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className="font-semibold mb-2">Register with VA</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Create accounts and register for healthcare
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Create VA.gov account</li>
                        <li>• Register for VA healthcare</li>
                        <li>• Set up eBenefits access</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        3
                      </div>
                      <div className="w-px h-full bg-border mt-2" />
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className="font-semibold mb-2">File Claims</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Submit claims for disability and other benefits
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• File disability compensation claim</li>
                        <li>• Apply for education benefits</li>
                        <li>• Submit housing benefit applications</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        4
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Follow Up & Maintain</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Track claims and keep benefits current
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Check claim status regularly</li>
                        <li>• Attend VA medical appointments</li>
                        <li>• Update information as needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Complete Mission Button */}
        <Card className={`mt-8 ${isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}`}>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              {isCompleted && (
                <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-green-800 dark:text-green-100 mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">Mission Already Completed!</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-200">
                    You've already earned 300 XP for this mission. You can review the material anytime, but won't receive additional XP.
                  </p>
                </div>
              )}
              <Button
                onClick={onComplete}
                size="lg"
                className="px-8"
                disabled={!isCompleted && interestedBenefits.length === 0}
                variant={isCompleted ? "outline" : "default"}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {isCompleted ? 'Review Mission' : 'Complete Mission & Earn 300 XP'}
              </Button>
              {!isCompleted && interestedBenefits.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Select at least one benefit category to complete this mission
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
