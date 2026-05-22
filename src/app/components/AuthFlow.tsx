import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { Shield, User, Lock, Mail, Sparkles, Chrome, Apple as AppleIcon, CheckCircle2, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { PasswordInput } from './ui/password-input';
import { PasswordStrength } from './ui/password-strength';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner';

interface AuthFlowProps {
  onAuthenticated: (accessToken: string) => void;
  onNavigate?: (screen: string) => void;
}



export function AuthFlow({ onAuthenticated, onNavigate }: AuthFlowProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [connectionAvailable, setConnectionAvailable] = useState(true);
  const [success, setSuccess] = useState('');
  const [demoMode, setDemoMode] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [verificationEmailSent, setVerificationEmailSent] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate passwords
      if (signUpData.password !== signUpData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (signUpData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      // Try to create user via Supabase
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            name: signUpData.name,
          },
        },
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Failed to fetch') || 
            error.name === 'AuthRetryableFetchError' ||
            error.message.includes('fetch') ||
            error.message.includes('network')) {
          setConnectionAvailable(false);
          setError('');
          setIsLoading(false);
          return;
        }
        if (error.message.includes('already registered')) {
          setError('An account with this email already exists. Please sign in instead.');
          setIsLoading(false);
          return;
        }
        throw error;
      }

      if (data.user) {
        setSignUpEmail(signUpData.email);
        setSuccess('Account created successfully! Please check your email to verify your account, then sign in.');
        setSignUpData({ name: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (err: any) {
      // Silently handle - promote to demo mode
      setConnectionAvailable(false);
      setError('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password.');
          setIsLoading(false);
          return;
        }
        if (error.message.includes('Email not confirmed')) {
          setError('Please verify your email address before signing in.');
          setSignUpEmail(signInData.email);
          setIsLoading(false);
          return;
        }
        if (error.message.includes('Failed to fetch') || 
            error.name === 'AuthRetryableFetchError' ||
            error.message.includes('fetch') ||
            error.message.includes('network')) {
          setConnectionAvailable(false);
          setError('');
          setIsLoading(false);
          return;
        }
        throw error;
      }

      if (data.session?.access_token) {
        onAuthenticated(data.session.access_token);
      } else {
        setError('');
        setIsLoading(false);
      }
    } catch (err: any) {
      // Silently handle - promote to demo mode
      setConnectionAvailable(false);
      setError('');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSignUpData = (field: keyof typeof signUpData, value: string) => {
    setSignUpData(prev => ({ ...prev, [field]: value }));
  };

  const updateSignInData = (field: keyof typeof signInData, value: string) => {
    setSignInData(prev => ({ ...prev, [field]: value }));
  };

  const handleDemoMode = () => {
    setDemoMode(true);
    // Navigate to demo interstitial screen
    if (onNavigate) {
      onNavigate('demo-interstitial');
    } else {
      // Fallback if onNavigate is not provided
      onAuthenticated('demo-token-offline-mode');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Failed to fetch') || 
            error.name === 'AuthRetryableFetchError' ||
            error.message.includes('fetch') ||
            error.message.includes('network')) {
          setConnectionAvailable(false);
          setError('');
          setIsLoading(false);
          return;
        }
        throw error;
      }

      setResetEmailSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (err: any) {
      setConnectionAvailable(false);
      setError('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;
      
      setVerificationEmailSent(email);
      toast.success('Verification email sent! Please check your inbox.');
    } catch (err: any) {
      toast.error('Failed to resend verification email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        if (error.message.includes('Failed to fetch') || 
            error.name === 'AuthRetryableFetchError' ||
            error.message.includes('fetch') ||
            error.message.includes('network')) {
          setConnectionAvailable(false);
          setError('');
          setIsLoading(false);
          return;
        }
        throw error;
      }

      // OAuth will redirect, so we don't need to do anything here
    } catch (err: any) {
      toast.error(`${provider} sign-in is not available at the moment`);
      setConnectionAvailable(false);
      setError('');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password View
  if (showForgotPassword && !resetEmailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="mb-2">Major Finance</h1>
            <p className="text-muted-foreground">Reset your password</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="Enter your email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full" 
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordEmail('');
                    }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Reset Email Sent View
  if (resetEmailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-center">Check Your Email</CardTitle>
              <CardDescription className="text-center">
                We've sent a password reset link to {forgotPasswordEmail}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  Click the link in the email to reset your password. The link will expire in 1 hour.
                </AlertDescription>
              </Alert>

              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  setResetEmailSent(false);
                  setShowForgotPassword(false);
                  setForgotPasswordEmail('');
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="mb-2">Major Finance</h1>
          <p className="text-muted-foreground">Your personal military financial mission command</p>
        </div>

        {/* Connection Warning - Show prominently if offline */}
        {!connectionAvailable && (
          <Alert className="mb-6 border-primary bg-primary/10">
            <Sparkles className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium text-primary mb-2">Demo Mode Available</p>
              <p className="text-sm">
                Experience the full app with Staff Sergeant Martinez's account - no connection required!
              </p>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          {error && (
            <Alert className="mt-4 border-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mt-4 border-green-500 bg-green-50 dark:bg-green-950/20">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 dark:text-green-400">
                {success}
                {signUpEmail && (
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleResendVerification(signUpEmail)}
                      disabled={isLoading || verificationEmailSent === signUpEmail}
                    >
                      <RefreshCw className="w-3 h-3 mr-2" />
                      {verificationEmailSent === signUpEmail ? 'Email Sent!' : 'Resend Verification Email'}
                    </Button>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to continue your financial mission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Social Login Buttons */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                  >
                    <Chrome className="w-4 h-4 mr-2" />
                    Continue with Google
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin('apple')}
                    disabled={isLoading}
                  >
                    <AppleIcon className="w-4 h-4 mr-2" />
                    Continue with Apple
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signInData.email}
                        onChange={(e) => updateSignInData('email', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password">Password</Label>
                      <Button
                        type="button"
                        variant="link"
                        className="text-xs px-0 h-auto"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                      <PasswordInput
                        id="signin-password"
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => updateSignInData('password', e.target.value)}
                        hasLeftIcon
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>

                {signUpEmail && error.includes('verify your email') && (
                  <div className="mt-4">
                    <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-700 dark:text-yellow-400">
                        Need a new verification email?
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResendVerification(signUpEmail)}
                            disabled={isLoading || verificationEmailSent === signUpEmail}
                          >
                            <RefreshCw className="w-3 h-3 mr-2" />
                            {verificationEmailSent === signUpEmail ? 'Email Sent!' : 'Resend Verification'}
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Join Major Finance</CardTitle>
                <CardDescription>
                  Create your account to start your financial mission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Social Login Buttons */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                  >
                    <Chrome className="w-4 h-4 mr-2" />
                    Sign up with Google
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin('apple')}
                    disabled={isLoading}
                  >
                    <AppleIcon className="w-4 h-4 mr-2" />
                    Sign up with Apple
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signUpData.name}
                        onChange={(e) => updateSignUpData('name', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signUpData.email}
                        onChange={(e) => updateSignUpData('email', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <PasswordInput
                        id="signup-password"
                        placeholder="Create a password"
                        value={signUpData.password}
                        onChange={(e) => updateSignUpData('password', e.target.value)}
                        hasLeftIcon
                        minLength={6}
                        required
                      />
                    </div>
                    <PasswordStrength password={signUpData.password} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <PasswordInput
                        id="signup-confirm"
                        placeholder="Confirm your password"
                        value={signUpData.confirmPassword}
                        onChange={(e) => updateSignUpData('confirmPassword', e.target.value)}
                        hasLeftIcon
                        minLength={6}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <div className="border-t pt-6">
            <div className={`${!connectionAvailable ? 'bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary/30 rounded-lg p-5 shadow-lg' : 'bg-muted/30 border border-border rounded-lg p-4'}`}>
              <div className="text-center">
                {!connectionAvailable ? (
                  <>
                    <div className="mb-3">
                      <Sparkles className="w-8 h-8 mx-auto text-primary mb-2" />
                      <p className="font-semibold text-primary mb-1">
                        Try Demo Mode
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Explore SSG Martinez's financial journey
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-3">
                      Want to explore without creating an account?
                    </p>
                  </>
                )}
                
                <Button 
                  variant={!connectionAvailable ? 'default' : 'outline'}
                  onClick={handleDemoMode}
                  className={`w-full ${!connectionAvailable ? 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md' : ''}`}
                  size="lg"
                  disabled={demoMode}
                >
                  {demoMode ? '✓ Demo Mode Active' : '🚀 Try Demo Mode'}
                </Button>
                
                {!connectionAvailable ? (
                  <p className="text-xs text-muted-foreground mt-3">
                    ✨ Full features • Realistic data • No signup needed
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-3">
                    All features available • No signup required
                  </p>
                )}
              </div>
            </div>
            
            {connectionAvailable && (
              <p className="text-sm text-muted-foreground text-center mt-4">
                Secure military-grade financial planning
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}