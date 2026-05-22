import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { 
  HelpCircle, 
  MessageSquare, 
  Book, 
  Video,
  ExternalLink,
  Send,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Bot,
  Trophy,
  Target
} from 'lucide-react';
import { XPAchievementsGuide } from './XPAchievementsGuide';

export function HelpScreen() {
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      question: "How do I calculate my emergency fund target?",
      answer: "Your emergency fund should cover 3-6 months of essential expenses. Use our Emergency Fund Mission calculator to input your monthly expenses for housing, food, transportation, and healthcare. For military personnel, we often recommend 6 months due to potential deployment schedules and PCS moves."
    },
    {
      question: "What's the difference between Roth and Traditional TSP?",
      answer: "Traditional TSP contributions are made with pre-tax dollars (reducing current taxable income) but withdrawals in retirement are taxed. Roth TSP contributions are made with after-tax dollars but qualified withdrawals in retirement are tax-free. Early career military often benefit from Roth since you're typically in lower tax brackets."
    },
    {
      question: "How does military matching work in TSP?",
      answer: "The military provides up to 5% matching: 1% automatic contribution plus up to 4% matching your contributions. This means you should contribute at least 5% to get the full match - it's free money! This applies to all service members enrolled in the Blended Retirement System (BRS)."
    },
    {
      question: "Should I prioritize paying off debt or investing?",
      answer: "Generally, pay off high-interest debt (credit cards, personal loans) first. For lower-interest debt like student loans or car loans, you might invest while making minimum payments. Always contribute enough to get your full TSP match regardless - that's an immediate 100% return."
    },
    {
      question: "How do I plan financially for a PCS move?",
      answer: "Start saving 3-6 months before your PCS. Budget for temporary lodging, travel expenses, deposits for new utilities, and potential gaps in allowances. Keep receipts for reimbursable expenses and understand your entitlements through the Joint Travel Regulations (JTR)."
    },
    {
      question: "What should I do with my TSP when I leave the military?",
      answer: "You have several options: leave it in TSP (great low fees), roll it to an IRA for more investment options, roll it to a new employer's 401(k), or take distributions (not recommended due to penalties if under 59½). TSP's low fees often make leaving it there attractive."
    },
    {
      question: "How can I use my GI Bill most effectively?",
      answer: "Consider your career goals and the value of different programs. The Post-9/11 GI Bill often provides the most value for undergraduate degrees. You might transfer benefits to dependents if you don't need them. Also consider using Tuition Assistance (TA) first, then saving GI Bill benefits for later or higher-value programs."
    },
    {
      question: "What's SCRA and how does it help me financially?",
      answer: "The Servicemembers Civil Relief Act (SCRA) provides financial protections including reduced interest rates on pre-service debts (often to 6%), protection from foreclosure, and ability to terminate certain contracts. Contact your creditors about SCRA benefits when you enter active duty."
    }
  ];

  const resources = [
    {
      title: "Military Saves Program",
      description: "Official military financial readiness program",
      type: "Website",
      icon: ExternalLink,
      url: "#"
    },
    {
      title: "TSP.gov",
      description: "Official Thrift Savings Plan website with calculators and tools",
      type: "Website", 
      icon: ExternalLink,
      url: "#"
    },
    {
      title: "Personal Financial Management (PFM)",
      description: "Base-level financial counseling services",
      type: "Service",
      icon: Phone,
      url: "#"
    },
    {
      title: "Military Family Life Counselors",
      description: "Free financial counseling for military families",
      type: "Service",
      icon: Phone,
      url: "#"
    },
    {
      title: "The Military Guide",
      description: "Comprehensive book on military financial planning",
      type: "Book",
      icon: Book,
      url: "#"
    },
    {
      title: "Financial Planning Webinars",
      description: "Monthly webinars on military-specific financial topics",
      type: "Video",
      icon: Video,
      url: "#"
    }
  ];

  const contactOptions = [
    {
      title: "General Support",
      description: "Questions about using the app or features",
      icon: MessageSquare,
      responseTime: "Usually within 24 hours"
    },
    {
      title: "Technical Issues",
      description: "Bug reports or technical problems",
      icon: HelpCircle,
      responseTime: "Usually within 12 hours"
    },
    {
      title: "Financial Guidance",
      description: "Questions about financial strategies or concepts",
      icon: Book,
      responseTime: "Usually within 48 hours"
    }
  ];

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setContactForm({ subject: '', message: '', category: 'general' });
    
    // In a real app, this would send the form to your support system
    console.log('Contact form submitted:', contactForm);
  };

  return (
    <div className="min-h-full bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <HelpCircle className="w-6 h-6" />
          <h1>Help & Support</h1>
        </div>

        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="xp">XP & Missions</TabsTrigger>
            <TabsTrigger value="chat">AI Help</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="xp" className="space-y-6">
            <XPAchievementsGuide />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Help Assistant
                </CardTitle>
                <CardDescription>
                  Get instant help with app features, financial questions, and troubleshooting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-medium mb-2">App Navigation</h4>
                    <p className="text-sm text-muted-foreground">
                      Get help using missions, calculators, and tracking progress
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-medium mb-2">Financial Guidance</h4>
                    <p className="text-sm text-muted-foreground">
                      Military-specific advice on TSP, emergency funds, and investing
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-medium mb-2">Technical Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Troubleshoot issues and get technical assistance
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-medium mb-2">Account Help</h4>
                    <p className="text-sm text-muted-foreground">
                      Profile updates, settings, and account management
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Quick answers to common questions about military financial planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Resources</CardTitle>
                <CardDescription>
                  Helpful tools, websites, and services for military financial planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => {
                    const Icon = resource.icon;
                    return (
                      <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {resource.description}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {resource.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Help</CardTitle>
                <CardDescription>
                  When to seek professional financial advice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Free Military Resources</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Personal Financial Management (PFM) counselors on base</li>
                      <li>• Military Family Life Counselors (MFLC)</li>
                      <li>• Command financial specialists</li>
                      <li>• Military relief societies (Army Emergency Relief, Navy-Marine Corps Relief, etc.)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">When to Consider Paid Advisors</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Complex estate planning needs</li>
                      <li>• High net worth situations</li>
                      <li>• Complex tax situations</li>
                      <li>• Major life transitions (retirement, divorce, etc.)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get personalized help with your questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {contactOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <div key={index} className="p-4 border rounded-lg text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-medium mb-1">{option.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {option.description}
                        </p>
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {option.responseTime}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      className="w-full p-2 border rounded-lg"
                      value={contactForm.category}
                      onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="general">General Support</option>
                      <option value="technical">Technical Issues</option>
                      <option value="financial">Financial Guidance</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your question"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your question or issue"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Get Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@majorfinance.app</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <MessageSquare className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Community Forum</p>
                      <p className="text-sm text-muted-foreground">Connect with other military members</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}