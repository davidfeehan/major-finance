import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { AIChatbot } from './AIChatbot';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle,
  Clock,
  Award,
  Target,
  Brain,
  Shield,
  DollarSign,
  Home,
  Briefcase,
  GraduationCap,
  Bot,
  X,
  Lightbulb
} from 'lucide-react';

interface FinancialEducationMissionProps {
  onBack: () => void;
  onComplete: () => void;
  userContext?: {
    rank: string;
    yearsOfService: string;
    currentAge: string;
    branch: string;
    completedMissions: number;
    completedMissionsList?: string[];
    xp: number;
    retirementGoal?: string;
    desiredRetirementAge?: string;
  };
}

export function FinancialEducationMission({ onBack, onComplete, userContext }: FinancialEducationMissionProps) {
  // Check if this mission has been completed
  const isCompleted = userContext?.completedMissionsList?.includes('financial-education') || false;
  
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [selectedObjective, setSelectedObjective] = useState<string>('basics');
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(false);
  const [isPinnedChatbot, setIsPinnedChatbot] = useState(false);

  const chatbotResponses = {
    'basics': 'Financial basics are crucial! Start with budgeting, understanding your military pay, and building an emergency fund. These fundamentals support everything else.',
    'budget': 'Military budgeting is unique due to allowances, deployments, and PCS moves. Use the 50/30/20 rule as a starting point: 50% needs, 30% wants, 20% savings.',
    'deployment': 'Deployments offer incredible savings opportunities! Lower expenses plus combat pay exclusion can supercharge your financial goals. Plan ahead for maximum benefit.',
    'pcs': 'PCS moves affect your finances significantly. Budget for moving expenses, temporary lodging, and potential gaps in allowances. Keep emergency funds accessible.',
    'benefits': 'Military benefits are valuable! BAH, BAS, healthcare, education benefits - understanding their value helps you make better financial decisions.',
    'education': 'Military education benefits are incredible! GI Bill, TA, credentialing programs - use these to boost earning potential both in service and after.',
    'transition': 'Military-to-civilian transition requires financial preparation. Build civilian emergency fund, understand VA benefits, and plan for potential income changes.',
    'spouse': 'Military spouses face unique challenges: frequent moves, employment gaps, childcare during deployments. Consider portable careers and joint financial planning.',
    'debt': 'Military debt management includes SCRA benefits, deployment pay for payoff, and avoiding predatory lending near bases. Prioritize high-interest debt first.',
    'insurance': 'Military insurance includes SGLI, TRICARE, and optional coverage. Understand what you have and what gaps might exist for your family.'
  };

  const objectives = [
    {
      id: 'basics',
      title: 'Financial Basics Objective',
      icon: Brain,
      description: 'Foundation concepts every service member needs',
      color: 'bg-blue-500'
    },
    {
      id: 'military',
      title: 'Military-Specific Objective',
      icon: Shield,
      description: 'Unique aspects of military financial life',
      color: 'bg-green-500'
    },
    {
      id: 'benefits',
      title: 'Benefits & Pay Objective',
      icon: DollarSign,
      description: 'Understanding your compensation package',
      color: 'bg-purple-500'
    },
    {
      id: 'lifecycle',
      title: 'Military Lifecycle Objective',
      icon: Briefcase,
      description: 'Financial planning through your career',
      color: 'bg-orange-500'
    },
    {
      id: 'education',
      title: 'Education Benefits Objective',
      icon: GraduationCap,
      description: 'Maximizing education and training opportunities',
      color: 'bg-red-500'
    },
    {
      id: 'family',
      title: 'Military Families Objective',
      icon: Home,
      description: 'Financial planning for military families',
      color: 'bg-indigo-500'
    }
  ];

  const tasks = {
    basics: [
      { id: 'budgeting', title: 'Military Budgeting 101', duration: '5 min', description: 'Creating budgets with military pay structure' },
      { id: 'emergency-fund', title: 'Emergency Fund Basics', duration: '4 min', description: 'Why and how much to save for emergencies' },
      { id: 'debt-fundamentals', title: 'Understanding Debt', duration: '6 min', description: 'Good vs bad debt and payoff strategies' },
      { id: 'compound-interest', title: 'Compound Interest Magic', duration: '5 min', description: 'How time and compound growth build wealth' },
      { id: 'financial-goals', title: 'Setting Financial Goals', duration: '4 min', description: 'SMART goals for military finances' }
    ],
    military: [
      { id: 'pay-structure', title: 'Military Pay Structure', duration: '7 min', description: 'Base pay, allowances, and special pay' },
      { id: 'deployment-finances', title: 'Deployment Financial Strategies', duration: '6 min', description: 'Maximizing deployment savings opportunities' },
      { id: 'pcs-planning', title: 'PCS Financial Planning', duration: '8 min', description: 'Budgeting for permanent change of station moves' },
      { id: 'scra-benefits', title: 'SCRA Financial Protections', duration: '5 min', description: 'Servicemembers Civil Relief Act benefits' },
      { id: 'combat-pay', title: 'Combat Pay Exclusion', duration: '6 min', description: 'Tax advantages and investment opportunities' }
    ],
    benefits: [
      { id: 'bah-bas', title: 'BAH and BAS Optimization', duration: '6 min', description: 'Housing and food allowances strategies' },
      { id: 'healthcare-value', title: 'TRICARE Value Analysis', duration: '5 min', description: 'Understanding your healthcare benefits' },
      { id: 'sgli', title: 'SGLI and Life Insurance', duration: '7 min', description: 'Servicemembers Group Life Insurance planning' },
      { id: 'leave-value', title: 'Leave as Financial Asset', duration: '4 min', description: 'Managing and selling military leave' },
      { id: 'commissary-savings', title: 'Commissary and Exchange Benefits', duration: '5 min', description: 'Maximizing shopping benefits' }
    ],
    lifecycle: [
      { id: 'early-career', title: 'Early Career Financial Focus', duration: '6 min', description: 'Financial priorities for new service members' },
      { id: 'mid-career', title: 'Mid-Career Wealth Building', duration: '7 min', description: 'Maximizing earning and saving potential' },
      { id: 'late-career', title: 'Pre-Retirement Planning', duration: '8 min', description: 'Preparing for military retirement' },
      { id: 'transition', title: 'Military-to-Civilian Transition', duration: '10 min', description: 'Financial aspects of leaving the military' },
      { id: 'second-career', title: 'Second Career Planning', duration: '7 min', description: 'Post-military career and finances' }
    ],
    education: [
      { id: 'gi-bill', title: 'GI Bill Optimization', duration: '8 min', description: 'Maximizing education benefits value' },
      { id: 'tuition-assistance', title: 'Tuition Assistance Strategy', duration: '6 min', description: 'Using TA for career advancement' },
      { id: 'certifications', title: 'Military Credentialing Programs', duration: '7 min', description: 'Earning valuable certifications' },
      { id: 'spouse-education', title: 'Spouse Education Benefits', duration: '6 min', description: 'Education opportunities for military spouses' },
      { id: 'education-roi', title: 'Education Return on Investment', duration: '5 min', description: 'Calculating education financial benefits' }
    ],
    family: [
      { id: 'spouse-employment', title: 'Military Spouse Employment', duration: '7 min', description: 'Career strategies for military spouses' },
      { id: 'childcare-costs', title: 'Childcare and CDC Benefits', duration: '6 min', description: 'Managing childcare expenses' },
      { id: 'family-savings', title: 'Family Savings Strategies', duration: '6 min', description: 'Saving as a military family' },
      { id: 'dual-military', title: 'Dual Military Couples', duration: '8 min', description: 'Financial planning for dual military families' },
      { id: 'children-benefits', title: 'Benefits for Military Children', duration: '5 min', description: 'Education and support for military kids' }
    ]
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getTotalTasks = () => {
    return Object.values(tasks).flat().length;
  };

  const completionPercentage = (completedTasks.length / getTotalTasks()) * 100;

  const getObjectiveProgress = (objectiveId: string) => {
    const objectiveTasks = tasks[objectiveId as keyof typeof tasks] || [];
    const completed = objectiveTasks.filter(task => completedTasks.includes(task.id)).length;
    return objectiveTasks.length > 0 ? (completed / objectiveTasks.length) * 100 : 0;
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
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 ${isCompleted ? 'bg-green-600' : 'bg-primary'} rounded-lg flex items-center justify-center`}>
              {isCompleted ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1>Financial Education Mission</h1>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Complete comprehensive financial education objectives tailored for military
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Education Progress
                </CardTitle>
                <CardDescription>
                  Complete all objectives to become a military financial expert
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{completedTasks.length}/{getTotalTasks()} tasks</span>
                    </div>
                    <Progress value={completionPercentage} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <Award className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-sm">Completion</p>
                      <p className="font-bold">{completionPercentage.toFixed(0)}%</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <Clock className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-sm">Est. Time</p>
                      <p className="font-bold">3 hours</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <DollarSign className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-sm">XP Reward</p>
                      <p className="font-bold">100 XP</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={selectedObjective} onValueChange={setSelectedObjective} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="objectives">Objectives</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="objectives" className="space-y-6">
                {/* Objective Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {objectives.map((objective) => {
                    const Icon = objective.icon;
                    const progress = getObjectiveProgress(objective.id);
                    const objectiveTasks = tasks[objective.id as keyof typeof tasks] || [];
                    const completed = objectiveTasks.filter(task => completedTasks.includes(task.id)).length;
                    
                    return (
                      <Card 
                        key={objective.id} 
                        className="cursor-pointer hover:shadow-md transition-all"
                        onClick={() => setSelectedObjective(objective.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${objective.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">{objective.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">{objective.description}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{completed}/{objectiveTasks.length} tasks</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Selected Objective Tasks */}
                {selectedObjective && !['objectives', 'progress', 'resources'].includes(selectedObjective) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {objectives.find(o => o.id === selectedObjective)?.title} Tasks
                      </CardTitle>
                      <CardDescription>
                        Complete these tasks to master this objective
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {(tasks[selectedObjective as keyof typeof tasks] || []).map((task, index) => (
                          <div 
                            key={task.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              completedTasks.includes(task.id) 
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                                : 'hover:shadow-sm'
                            }`}
                            onClick={() => toggleTask(task.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  completedTasks.includes(task.id) 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {completedTasks.includes(task.id) ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : (
                                    <span className="text-sm">{index + 1}</span>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium">{task.title}</h4>
                                  <p className="text-sm text-muted-foreground">{task.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className="text-xs">
                                  {task.duration}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress by Objective</CardTitle>
                    <CardDescription>
                      Track your progress across all financial education objectives
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {objectives.map((objective) => {
                        const Icon = objective.icon;
                        const progress = getObjectiveProgress(objective.id);
                        const objectiveTasks = tasks[objective.id as keyof typeof tasks] || [];
                        const completed = objectiveTasks.filter(task => completedTasks.includes(task.id)).length;
                        
                        return (
                          <div key={objective.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 ${objective.color} rounded flex items-center justify-center`}>
                                  <Icon className="w-3 h-3 text-white" />
                                </div>
                                <span className="font-medium">{objective.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {completed}/{objectiveTasks.length}
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Resources</CardTitle>
                    <CardDescription>
                      Helpful tools and references for military financial planning
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Official Military Resources</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Military Saves Program</li>
                          <li>• Personal Financial Management</li>
                          <li>• Military Family Life Counselors</li>
                          <li>• Base Financial Counseling</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Online Tools</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• TSP.gov calculators</li>
                          <li>• Military pay calculators</li>
                          <li>• BAH rate lookups</li>
                          <li>• PCS cost estimators</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Recommended Reading</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• "The Military Guide" by Doug Nordman</li>
                          <li>• "The Bogleheads' Guide to Investing"</li>
                          <li>• Military financial blogs and forums</li>
                          <li>• Service-specific financial guides</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Professional Help</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Fee-only financial planners</li>
                          <li>• Military-focused advisors</li>
                          <li>• Tax professionals</li>
                          <li>• Estate planning attorneys</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Complete Mission */}
            <Card className={isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  {isCompleted && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <div className="flex items-center justify-center gap-2 text-green-800 dark:text-green-100 mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Mission Already Completed!</span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-200">
                        You've already earned 100 XP for this mission. You can review the material anytime, but won't receive additional XP.
                      </p>
                    </div>
                  )}
                  <Button 
                    onClick={onComplete}
                    size="lg" 
                    className="px-8"
                    disabled={!isCompleted && completedTasks.length < getTotalTasks()}
                    variant={isCompleted ? "outline" : "default"}
                  >
                    <CheckCircle className="mr-2 w-5 h-5" />
                    {isCompleted ? 'Review Mission' : 'Complete Mission & Earn 100 XP'}
                  </Button>
                  {!isCompleted && (
                    <p className="text-sm text-muted-foreground">
                      {completedTasks.length < getTotalTasks() 
                        ? `Complete ${getTotalTasks() - completedTasks.length} more tasks to finish this mission`
                        : 'Congratulations! You\'ve completed all education modules.'
                      }
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Floating AI Chatbot Toggle */}
        {!showFloatingChatbot && (
          <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50">
            <Button
              onClick={() => setShowFloatingChatbot(true)}
              size="lg"
              className="h-16 w-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary border-2 border-primary-foreground/20"
            >
              <Bot className="w-8 h-8 text-primary-foreground" />
            </Button>
          </div>
        )}

        {/* Floating AI Chatbot Modal */}
        {showFloatingChatbot && (
          <div className={`fixed z-50 ${isPinnedChatbot ? 'inset-x-4 bottom-20 top-auto h-[450px] md:inset-x-6 md:bottom-6' : 'inset-0 bg-black/50'}`}>
            <div className={`${isPinnedChatbot ? 'h-full' : 'fixed inset-4 top-8 bottom-20 md:inset-6 md:top-12 md:bottom-6'} bg-background rounded-lg shadow-2xl overflow-hidden`}>
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Education AI</h3>
                    <p className="text-sm text-muted-foreground">Financial Education Specialist</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowFloatingChatbot(false)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="overflow-y-auto h-[calc(100%-60px)] p-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      The AI chatbot is ready to help you learn about military financial topics! Ask questions about budgeting, TSP, deployments, PCS moves, and more.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}