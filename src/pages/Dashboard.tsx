import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  FolderOpen, 
  TrendingUp, 
  MessageSquare, 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app this would come from Supabase
  const dashboardStats = {
    totalInvestors: 24,
    activeProjects: 8,
    onboardingProcesses: 5,
    recentMessages: 12
  };

  const mockInvestors = [
    {
      id: 1,
      name: "John Smith",
      company: "AgriTech Solutions",
      country: "UK",
      sector: "Agro-processing",
      status: "Active",
      email: "john@agritech.com"
    },
    {
      id: 2,
      name: "Maria Garcia",
      company: "HealthCorp International",
      country: "Spain",
      sector: "Healthcare",
      status: "Onboarding",
      email: "maria@healthcorp.com"
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      company: "Transport Dynamics",
      country: "UAE",
      sector: "Transport",
      status: "New",
      email: "ahmed@transportdynamics.com"
    }
  ];

  const mockProjects = [
    {
      id: 1,
      title: "Coffee Processing Plant - Uganda",
      sector: "Agro-processing",
      location: "Kampala, Uganda",
      investmentSize: "$2.5M",
      status: "Negotiation",
      timeline: "Q2 2024"
    },
    {
      id: 2,
      title: "Medical Equipment Manufacturing",
      sector: "Healthcare",
      location: "Nairobi, Kenya",
      investmentSize: "$1.8M",
      status: "Early Stage",
      timeline: "Q3 2024"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "onboarding": return "bg-blue-100 text-blue-800 border-blue-200";
      case "new": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "paused": return "bg-gray-100 text-gray-800 border-gray-200";
      case "negotiation": return "bg-orange-100 text-orange-800 border-orange-200";
      case "early stage": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-navy-light">
      {/* Header */}
      <header className="bg-navy-primary border-b border-gold-medium/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
              <span className="text-navy-deep font-bold text-lg">Q</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Qalbi Admin Dashboard</h1>
              <p className="text-gold-light text-sm">Investment Management Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="border-gold-medium/30 text-gold-medium hover:bg-gold-medium hover:text-navy-deep">
              <Settings className="w-4 h-4 mr-2 text-gold-medium" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-gold-medium/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-navy-primary">Total Investors</CardTitle>
              <Users className="h-4 w-4 text-gold-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-deep">{dashboardStats.totalInvestors}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gold-medium/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-navy-primary">Active Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-gold-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-deep">{dashboardStats.activeProjects}</div>
              <p className="text-xs text-muted-foreground">3 in negotiation</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gold-medium/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-navy-primary">Onboarding</CardTitle>
              <TrendingUp className="h-4 w-4 text-gold-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-deep">{dashboardStats.onboardingProcesses}</div>
              <p className="text-xs text-muted-foreground">Pending completion</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gold-medium/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-navy-primary">Recent Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-gold-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-deep">{dashboardStats.recentMessages}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="investors" className="space-y-6">
          <TabsList className="bg-white border border-gold-medium/20">
            <TabsTrigger value="investors" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              Investor Management
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              Project Tracker
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              Document Library
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-navy-primary data-[state=active]:text-white">
              Internal Messages
            </TabsTrigger>
          </TabsList>

          {/* Investor Management */}
          <TabsContent value="investors">
            <Card className="bg-white border-gold-medium/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-navy-primary">Investor Management</CardTitle>
                    <CardDescription>Manage investor profiles and track engagement</CardDescription>
                  </div>
                  <Button className="bg-navy-primary hover:bg-navy-light">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Investor
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search investors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" className="border-navy-primary/20">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInvestors.map((investor) => (
                      <TableRow key={investor.id}>
                        <TableCell className="font-medium">{investor.name}</TableCell>
                        <TableCell>{investor.company}</TableCell>
                        <TableCell>{investor.country}</TableCell>
                        <TableCell>{investor.sector}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(investor.status)}>
                            {investor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Tracker */}
          <TabsContent value="projects">
            <Card className="bg-white border-gold-medium/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-navy-primary">Project Tracker</CardTitle>
                    <CardDescription>Manage investment opportunities and track progress</CardDescription>
                  </div>
                  <Button className="bg-navy-primary hover:bg-navy-light">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockProjects.map((project) => (
                    <Card key={project.id} className="border-gold-medium/10">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-navy-primary">{project.title}</CardTitle>
                            <CardDescription className="mt-1">{project.location}</CardDescription>
                          </div>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Sector:</span>
                            <span className="text-sm font-medium">{project.sector}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Investment:</span>
                            <span className="text-sm font-medium">{project.investmentSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Timeline:</span>
                            <span className="text-sm font-medium">{project.timeline}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Document Library */}
          <TabsContent value="documents">
            <Card className="bg-white border-gold-medium/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-navy-primary">Document Library</CardTitle>
                    <CardDescription>Upload and organize files by investor or project</CardDescription>
                  </div>
                  <Button className="bg-navy-primary hover:bg-navy-light">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FolderOpen className="w-12 h-12 text-gold-medium mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-navy-primary mb-2">No documents uploaded yet</h3>
                  <p className="text-muted-foreground mb-4">Start by uploading your first document</p>
                  <Button variant="outline" className="border-navy-primary/20">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Internal Messages */}
          <TabsContent value="messages">
            <Card className="bg-white border-gold-medium/20">
              <CardHeader>
                <CardTitle className="text-navy-primary">Internal Messages</CardTitle>
                <CardDescription>Track investor communications and internal notes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gold-medium mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-navy-primary mb-2">No messages yet</h3>
                  <p className="text-muted-foreground mb-4">Communication logs will appear here</p>
                  <Button variant="outline" className="border-navy-primary/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;