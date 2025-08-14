import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Camera, 
  TrendingUp, 
  FolderOpen, 
  Heart, 
  BarChart3,
  LogOut,
  Edit,
  DollarSign,
  Calendar,
  MapPin,
  Building,
  Globe,
  MessageSquare,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Activity,
  Target,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Users,
  Star,
  Send
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const InvestorDashboard = () => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [investorProfile, setInvestorProfile] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [interests, setInterests] = useState([]);
  const [projects, setProjects] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    message: "",
    priority: "Medium"
  });
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    phone: "",
    sector: "",
    investment_amount: "",
    notes: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/investor-portal");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/investor-portal");
        return;
      }

      await fetchInvestorData(session.user.id);
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };

  const fetchInvestorData = async (userId: string) => {
    try {
      setLoading(true);

      // Fetch investor profile
      const { data: investor, error: investorError } = await supabase
        .from('investors')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (investorError && investorError.code !== 'PGRST116') {
        throw investorError;
      }

      if (investor) {
        setInvestorProfile(investor);
        setProfileData({
          name: investor.name || "",
          email: investor.email || "",
          company: investor.company || "",
          country: investor.country || "",
          phone: investor.phone || "",
          sector: investor.sector || "",
          investment_amount: investor.investment_amount || "",
          notes: investor.notes || ""
        });

        // Fetch investments
        const { data: investmentsData, error: investmentsError } = await supabase
          .from('investor_projects')
          .select(`
            *,
            projects (*)
          `)
          .eq('investor_id', investor.id);

        if (!investmentsError) {
          setInvestments(investmentsData || []);
        }

        // Fetch project interests
        const { data: interestsData, error: interestsError } = await supabase
          .from('project_interests')
          .select(`
            *,
            projects (*)
          `)
          .eq('email', investor.email);

        if (!interestsError) {
          setInterests(interestsData || []);
        }

        // Fetch support tickets
        const { data: ticketsData, error: ticketsError } = await supabase
          .from('support_tickets')
          .select('*')
          .eq('investor_id', investor.id)
          .order('created_at', { ascending: false });

        if (!ticketsError) {
          setSupportTickets(ticketsData || []);
        }
      }

      // Fetch all projects for insights
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!projectsError) {
        setProjects(projectsData || []);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/investor-portal");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const updateProfile = async () => {
    if (!user || !investorProfile) return;

    try {
      const { error } = await supabase
        .from('investors')
        .update({
          name: profileData.name,
          company: profileData.company,
          country: profileData.country,
          phone: profileData.phone,
          sector: profileData.sector,
          investment_amount: profileData.investment_amount,
          notes: profileData.notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', investorProfile.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });

      setEditMode(false);
      await fetchInvestorData(user.id);
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const submitSupportTicket = async () => {
    if (!investorProfile || !newTicket.subject.trim() || !newTicket.message.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('support_tickets')
        .insert([{
          investor_id: investorProfile.id,
          subject: newTicket.subject.trim(),
          message: newTicket.message.trim(),
          priority: newTicket.priority
        }]);

      if (error) throw error;

      toast({
        title: "Ticket Submitted",
        description: "Your support ticket has been submitted successfully",
      });

      setNewTicket({ subject: "", message: "", priority: "Medium" });
      await fetchInvestorData(user.id);
    } catch (error) {
      console.error('Ticket submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit support ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "open": return "bg-red-100 text-red-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const portfolioValue = investments.reduce((sum, inv) => sum + (inv.investment_amount || 0), 0);
  const activeProjects = investments.filter(inv => inv.status === 'Active').length;
  const completedProjects = investments.filter(inv => inv.status === 'Completed').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-primary"></div>
      </div>
    );
  }

  if (!investorProfile) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-6 py-24 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Please complete your investor registration to access the dashboard.
              </p>
              <Button onClick={() => navigate("/investor-portal")} className="bg-navy-primary hover:bg-navy-light">
                Complete Registration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Modern Header */}
      <header className="bg-navy-primary border-b border-gold-medium/20 px-6 py-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-2 border-gold-medium">
                <AvatarImage src={investorProfile.profile_picture} />
                <AvatarFallback className="bg-gradient-gold text-navy-deep font-bold text-xl">
                  {investorProfile.name?.charAt(0) || 'I'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back, {investorProfile.name}</h1>
                <p className="text-gold-light">Investor Dashboard • {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="border-red-400/30 text-red-400 hover:bg-red-400 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gold-light text-sm">Portfolio Value</p>
                  <p className="text-white text-2xl font-bold">${portfolioValue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-gold-medium" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gold-light text-sm">Active Projects</p>
                  <p className="text-white text-2xl font-bold">{activeProjects}</p>
                </div>
                <Activity className="w-8 h-8 text-gold-medium" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gold-light text-sm">Interests</p>
                  <p className="text-white text-2xl font-bold">{interests.length}</p>
                </div>
                <Heart className="w-8 h-8 text-gold-medium" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gold-light text-sm">Open Tickets</p>
                  <p className="text-white text-2xl font-bold">{supportTickets.filter(t => t.status === 'Open').length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-gold-medium" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border border-gold-medium/20 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="investments" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              <DollarSign className="w-4 h-4 mr-2" />
              My Investments
            </TabsTrigger>
            <TabsTrigger value="interests" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-2" />
              Project Interests
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Support
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Portfolio Analytics */}
              <div className="lg:col-span-2">
                <Card className="bg-white border-gold-medium/20">
                  <CardHeader>
                    <CardTitle className="text-navy-primary flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Portfolio Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{activeProjects}</div>
                          <div className="text-sm text-green-700">Active Projects</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{completedProjects}</div>
                          <div className="text-sm text-blue-700">Completed</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">{interests.length}</div>
                          <div className="text-sm text-yellow-700">Interests</div>
                        </div>
                      </div>

                      {/* Investment Progress */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-navy-primary">Investment Progress</h4>
                        {investments.slice(0, 3).map((investment, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{investment.projects?.title || 'Project'}</span>
                              <span className="text-muted-foreground">${investment.investment_amount?.toLocaleString()}</span>
                            </div>
                            <Progress value={Math.random() * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card className="bg-white border-gold-medium/20">
                  <CardHeader>
                    <CardTitle className="text-navy-primary">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full bg-navy-primary hover:bg-navy-light justify-start"
                      onClick={() => navigate('/opportunities')}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Explore Projects
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-navy-primary/20"
                      onClick={() => setEditMode(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-navy-primary/20"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-white border-gold-medium/20">
                  <CardHeader>
                    <CardTitle className="text-navy-primary">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {supportTickets.slice(0, 3).map((ticket, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <MessageSquare className="w-4 h-4 text-navy-primary mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-navy-primary truncate">
                              {ticket.subject}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(ticket.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments">
            <Card className="bg-white border-gold-medium/20">
              <CardHeader>
                <CardTitle className="text-navy-primary">My Investment Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                {investments.length === 0 ? (
                  <div className="text-center py-8">
                    <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-navy-primary mb-2">No Investments Yet</h3>
                    <p className="text-muted-foreground mb-4">Start exploring investment opportunities</p>
                    <Button onClick={() => navigate('/opportunities')} className="bg-navy-primary hover:bg-navy-light">
                      Browse Projects
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {investments.map((investment, idx) => (
                      <Card key={idx} className="border border-gold-medium/20">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-navy-primary text-lg mb-2">
                                {investment.projects?.title || 'Investment Project'}
                              </h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Investment Amount</p>
                                  <p className="font-medium text-navy-deep">${investment.investment_amount?.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Investment Date</p>
                                  <p className="font-medium text-navy-deep">
                                    {new Date(investment.investment_date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Sector</p>
                                  <p className="font-medium text-navy-deep">{investment.projects?.sector}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Status</p>
                                  <Badge className={getStatusColor(investment.status)}>
                                    {investment.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interests Tab */}
          <TabsContent value="interests">
            <Card className="bg-white border-gold-medium/20">
              <CardHeader>
                <CardTitle className="text-navy-primary">Project Interests</CardTitle>
              </CardHeader>
              <CardContent>
                {interests.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-navy-primary mb-2">No Interests Yet</h3>
                    <p className="text-muted-foreground">Express interest in projects you'd like to learn more about</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {interests.map((interest, idx) => (
                      <Card key={idx} className="border border-gold-medium/20">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-navy-primary">
                                Project Interest #{idx + 1}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Submitted on {new Date(interest.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                              Pending Review
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-white border-gold-medium/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-navy-primary">Investor Profile</CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => editMode ? updateProfile() : setEditMode(true)}
                    className="border-navy-primary/20"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {editMode ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    {editMode ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      <p className="text-navy-deep font-medium">{investorProfile.name}</p>
                    )}
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <p className="text-navy-deep">{investorProfile.email}</p>
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    {editMode ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    ) : (
                      <p className="text-navy-deep">{investorProfile.phone || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <Label>Company</Label>
                    {editMode ? (
                      <Input
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                      />
                    ) : (
                      <p className="text-navy-deep">{investorProfile.company || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Country</Label>
                    {editMode ? (
                      <Input
                        value={profileData.country}
                        onChange={(e) => setProfileData(prev => ({ ...prev, country: e.target.value }))}
                      />
                    ) : (
                      <p className="text-navy-deep">{investorProfile.country || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <Label>Preferred Sector</Label>
                    {editMode ? (
                      <Input
                        value={profileData.sector}
                        onChange={(e) => setProfileData(prev => ({ ...prev, sector: e.target.value }))}
                      />
                    ) : (
                      <p className="text-navy-deep">{investorProfile.sector || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <Label>Investment Range</Label>
                    {editMode ? (
                      <Input
                        value={profileData.investment_amount}
                        onChange={(e) => setProfileData(prev => ({ ...prev, investment_amount: e.target.value }))}
                      />
                    ) : (
                      <p className="text-navy-deep">{investorProfile.investment_amount || 'Not specified'}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            {/* Submit New Ticket */}
            <Card className="bg-white border-gold-medium/20">
              <CardHeader>
                <CardTitle className="text-navy-primary">Submit Support Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Brief description of your issue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newTicket.priority} onValueChange={(value) => setNewTicket(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={newTicket.message}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe your issue in detail..."
                    rows={4}
                  />
                </div>
                <Button onClick={submitSupportTicket} className="bg-navy-primary hover:bg-navy-light">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>

            {/* Existing Tickets */}
            <Card className="bg-white border-gold-medium/20">
              <CardHeader>
                <CardTitle className="text-navy-primary">Your Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                {supportTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-navy-primary mb-2">No Support Tickets</h3>
                    <p className="text-muted-foreground">Create your first support ticket above</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {supportTickets.map((ticket, idx) => (
                      <Card key={idx} className="border border-gold-medium/20">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-navy-primary">{ticket.subject}</h3>
                              <p className="text-sm text-muted-foreground">
                                Created on {new Date(ticket.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(ticket.status)}>
                                {ticket.status}
                              </Badge>
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-navy-deep">{ticket.message}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestorDashboard;
