import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Globe
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
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
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
          navigate("/investor-auth");
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
        navigate("/investor-auth");
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
    navigate("/investor-auth");
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

  const uploadProfilePicture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0] || !user || !investorProfile) return;

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/avatar.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('investor-profiles')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('investor-profiles')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('investors')
        .update({ profile_picture: publicUrl })
        .eq('id', investorProfile.id);

      if (updateError) throw updateError;

      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully",
      });

      await fetchInvestorData(user.id);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
      
      {/* Header */}
      <header className="bg-navy-primary border-b border-gold-medium/20 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-gold-medium">
                <AvatarImage src={investorProfile.profile_picture} />
                <AvatarFallback className="bg-gradient-gold text-navy-deep font-bold">
                  {investorProfile.name?.charAt(0) || 'I'}
                </AvatarFallback>
              </Avatar>
              <label htmlFor="profile-upload" className="absolute -bottom-1 -right-1 bg-gold-medium rounded-full p-1 cursor-pointer hover:bg-gold-light transition-colors">
                <Camera className="w-3 h-3 text-navy-deep" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={uploadProfilePicture}
                />
              </label>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Welcome, {investorProfile.name}</h1>
              <p className="text-gold-light text-sm">Investor Dashboard</p>
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
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-gold-medium/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-navy-primary">Active Investments</CardTitle>
              <DollarSign className="h-4 w-4 text-gold-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-deep">{investments.length}</div>
              <p className="text-xs text-muted-foreground">Total portfolio projects</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gold-medium/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-navy-primary">Expressed Interest</CardTitle>
              <Heart className="h-4 w-4 text-gold-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-deep">{interests.length}</div>
              <p className="text-xs text-muted-foreground">Projects interested in</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gold-medium/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-navy-primary">Available Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-gold-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-deep">{projects.length}</div>
              <p className="text-xs text-muted-foreground">Investment opportunities</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gold-medium/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-navy-primary">Portfolio Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-gold-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-deep">
                ${investments.reduce((sum, inv) => sum + (inv.investment_amount || 0), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total invested amount</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white border border-gold-medium/20">
            <TabsTrigger value="profile" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="investments" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              <DollarSign className="w-4 h-4 mr-2" />
              My Investments
            </TabsTrigger>
            <TabsTrigger value="interests" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-2" />
              Project Interests
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Market Insights
            </TabsTrigger>
          </TabsList>

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
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(investorProfile.status || 'New')}>
                      {investorProfile.status || 'New'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments">
            <Card className="bg-white border-gold-medium/20">
              <CardHeader>
                <CardTitle className="text-navy-primary">My Active Investments</CardTitle>
              </CardHeader>
              <CardContent>
                {investments.length === 0 ? (
                  <div className="text-center py-8">
                    <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No active investments yet</p>
                    <Button 
                      onClick={() => navigate("/opportunities")} 
                      className="mt-4 bg-navy-primary hover:bg-navy-light"
                    >
                      Explore Investment Opportunities
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {investments.map((investment) => (
                      <Card key={investment.id} className="border border-gold-medium/20">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{investment.projects?.title}</CardTitle>
                            <Badge className={getStatusColor(investment.status)}>
                              {investment.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-2" />
                              {investment.projects?.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <DollarSign className="w-4 h-4 mr-2" />
                              Investment: ${investment.investment_amount?.toLocaleString()}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-2" />
                              Invested: {new Date(investment.investment_date).toLocaleDateString()}
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
                <CardTitle className="text-navy-primary">Projects of Interest</CardTitle>
              </CardHeader>
              <CardContent>
                {interests.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No project interests recorded</p>
                    <Button 
                      onClick={() => navigate("/opportunities")} 
                      className="mt-4 bg-navy-primary hover:bg-navy-light"
                    >
                      Browse Investment Opportunities
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {interests.map((interest) => (
                      <Card key={interest.id} className="border border-gold-medium/20">
                        <CardHeader>
                          <CardTitle className="text-lg">{interest.project_id}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <DollarSign className="w-4 h-4 mr-2" />
                              Interest Amount: {interest.investment_amount}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-2" />
                              Expressed: {new Date(interest.created_at).toLocaleDateString()}
                            </div>
                            {interest.message && (
                              <p className="text-sm text-muted-foreground mt-2">{interest.message}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border-gold-medium/20">
                <CardHeader>
                  <CardTitle className="text-navy-primary">Market Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Available Projects</span>
                      <span className="text-2xl font-bold text-navy-deep">{projects.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Investment Size</span>
                      <span className="text-lg font-semibold text-navy-deep">$2.1M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Most Popular Sector</span>
                      <span className="text-lg font-semibold text-navy-deep">Agro-processing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gold-medium/20">
                <CardHeader>
                  <CardTitle className="text-navy-primary">Investment Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border border-gold-medium/20 rounded-lg">
                      <h4 className="font-medium text-navy-primary">Diversification Opportunity</h4>
                      <p className="text-sm text-muted-foreground">Consider expanding into healthcare sector</p>
                    </div>
                    <div className="p-3 border border-gold-medium/20 rounded-lg">
                      <h4 className="font-medium text-navy-primary">High Growth Potential</h4>
                      <p className="text-sm text-muted-foreground">Technology projects showing 25% ROI</p>
                    </div>
                    <div className="p-3 border border-gold-medium/20 rounded-lg">
                      <h4 className="font-medium text-navy-primary">Government Incentives</h4>
                      <p className="text-sm text-muted-foreground">New tax benefits for manufacturing investments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestorDashboard;