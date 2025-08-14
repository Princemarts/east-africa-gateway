import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, UserPlus, Phone, Mail, Building, Globe, Lock, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const InvestorPortal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    phone: "",
    sector: "",
    investment_amount: "",
    notes: "",
    password: "",
    confirmPassword: ""
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/investor-dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/investor-dashboard`,
          data: {
            name: formData.name
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create investor profile
        const { error: profileError } = await supabase
          .from('investors')
          .insert([{
            user_id: authData.user.id,
            name: formData.name,
            email: formData.email,
            company: formData.company,
            country: formData.country,
            phone: formData.phone,
            sector: formData.sector,
            investment_amount: formData.investment_amount,
            notes: formData.notes,
            status: 'New'
          }]);

        if (profileError) throw profileError;

        toast({
          title: "Registration Successful!",
          description: "Welcome! Redirecting to your dashboard...",
        });

        // Reset form and redirect
        setFormData({
          name: "",
          email: "",
          company: "",
          country: "",
          phone: "",
          sector: "",
          investment_amount: "",
          notes: "",
          password: "",
          confirmPassword: ""
        });

        // Redirect to investor dashboard
        setTimeout(() => {
          navigate("/investor-dashboard");
        }, 1500);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      toast({
        title: "Login Successful!",
        description: "Welcome back to your investor dashboard.",
      });

      navigate("/investor-dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to sign in. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-primary mb-6">
            Investor Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our exclusive network of international investors or access your dashboard
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Benefits */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-none shadow-soft sticky top-8">
                <CardHeader>
                  <CardTitle className="text-navy-primary">Why Join?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gold-medium rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-navy-primary">Exclusive Access</h4>
                      <p className="text-sm text-muted-foreground">Early access to high-potential investment opportunities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gold-medium rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-navy-primary">Expert Guidance</h4>
                      <p className="text-sm text-muted-foreground">Personalized investment advisory services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gold-medium rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-navy-primary">Tax Incentives</h4>
                      <p className="text-sm text-muted-foreground">Access to government tax incentive programs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gold-medium rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-navy-primary">Full Support</h4>
                      <p className="text-sm text-muted-foreground">End-to-end project implementation support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Auth Forms */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-none shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl text-navy-primary">Get Started</CardTitle>
                  <p className="text-muted-foreground">
                    Join our investor network or sign in to your account
                  </p>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="register" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="register">Register</TabsTrigger>
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                    </TabsList>

                    <TabsContent value="register">
                      <form onSubmit={handleRegister} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                          <UserPlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            required
                            placeholder="John Smith"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            required
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="company"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country of Origin</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="country"
                            placeholder="United States"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sector">Preferred Sector</Label>
                        <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Agro-processing">Agro-processing</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Transport">Transport</SelectItem>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Energy">Energy</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="investment_amount">Investment Range</Label>
                      <Select value={formData.investment_amount} onValueChange={(value) => handleInputChange('investment_amount', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$100K - $500K">$100K - $500K</SelectItem>
                          <SelectItem value="$500K - $1M">$500K - $1M</SelectItem>
                          <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                          <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
                          <SelectItem value="$10M+">$10M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Information</Label>
                          <Textarea
                            id="notes"
                            placeholder="Tell us about your investment goals, timeline, or any specific requirements..."
                            value={formData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            rows={4}
                          />
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="password"
                                type="password"
                                required
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password *</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="confirmPassword"
                                type="password"
                                required
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full bg-navy-primary hover:bg-navy-light"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Creating Account...
                            </>
                          ) : (
                            <>
                              Create Account & Register
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="login-email">Email Address</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="login-email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                value={loginData.email}
                                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="login-password">Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="login-password"
                                type="password"
                                required
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full bg-navy-primary hover:bg-navy-light"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Signing In...
                            </>
                          ) : (
                            <>
                              <LogIn className="w-4 h-4 mr-2" />
                              Sign In to Dashboard
                            </>
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorPortal;