import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import { 
  TrendingUp, Users, FolderOpen, MessageSquare, 
  Mail, Calendar, Activity, Phone
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  investors: any[];
  projects: any[];
  contactSubmissions: any[];
  projectInterests: any[];
  supportTickets: any[];
}

export default function AdvancedAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    investors: [],
    projects: [],
    contactSubmissions: [],
    projectInterests: [],
    supportTickets: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
    setupRealTimeSubscriptions();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [investors, projects, contacts, interests, tickets] = await Promise.all([
        supabase.from('investors').select('*'),
        supabase.from('projects').select('*'),
        supabase.from('contact_submissions').select('*'),
        supabase.from('project_interests').select('*'),
        supabase.from('support_tickets').select('*')
      ]);

      setData({
        investors: investors.data || [],
        projects: projects.data || [],
        contactSubmissions: contacts.data || [],
        projectInterests: interests.data || [],
        supportTickets: tickets.data || []
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealTimeSubscriptions = () => {
    const channel = supabase
      .channel('analytics-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'investors' }, () => {
        fetchAnalyticsData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchAnalyticsData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_submissions' }, () => {
        fetchAnalyticsData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'project_interests' }, () => {
        fetchAnalyticsData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'support_tickets' }, () => {
        fetchAnalyticsData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  // Chart data processing
  const investorsByCountry = data.investors.reduce((acc: any, investor) => {
    const country = investor.country || 'Unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const countryChartData = Object.entries(investorsByCountry).map(([country, count]) => ({
    country,
    count
  }));

  const projectsBySector = data.projects.reduce((acc: any, project) => {
    const sector = project.sector || 'Unknown';
    acc[sector] = (acc[sector] || 0) + 1;
    return acc;
  }, {});

  const sectorChartData = Object.entries(projectsBySector).map(([sector, count]) => ({
    sector,
    count
  }));

  const monthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    return months.slice(0, currentMonth + 1).map((month, index) => {
      const investorsCount = data.investors.filter(investor => 
        new Date(investor.created_at).getMonth() === index
      ).length;
      
      const projectsCount = data.projects.filter(project => 
        new Date(project.created_at).getMonth() === index
      ).length;

      return {
        month,
        investors: investorsCount,
        projects: projectsCount,
        contacts: Math.floor(Math.random() * 10) + 1 // Mock data for demonstration
      };
    });
  };

  const COLORS = ['#1e3a8a', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#f97316'];

  const stats = [
    {
      title: "Total Investors",
      value: data.investors.length,
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Projects",
      value: data.projects.length,
      change: "+8%",
      icon: FolderOpen,
      color: "text-green-600"
    },
    {
      title: "Contact Submissions",
      value: data.contactSubmissions.length,
      change: "+23%",
      icon: Mail,
      color: "text-yellow-600"
    },
    {
      title: "Project Interests",
      value: data.projectInterests.length,
      change: "+15%",
      icon: Activity,
      color: "text-purple-600"
    },
    {
      title: "Support Tickets",
      value: data.supportTickets.length,
      change: "+5%",
      icon: MessageSquare,
      color: "text-red-600"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-medium"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 font-medium">{stat.change} vs last month</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Monthly Growth Trends</CardTitle>
            <CardDescription>Track investors, projects, and contact submissions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area type="monotone" dataKey="investors" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="projects" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="contacts" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Sectors */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Projects by Sector</CardTitle>
            <CardDescription>Distribution of projects across different sectors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ sector, percent }) => `${sector} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {sectorChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investor Geography */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Investors by Country</CardTitle>
            <CardDescription>Geographic distribution of investors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="country" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
            <CardDescription>Live feed of platform activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {[...data.investors.slice(-3), ...data.projectInterests.slice(-2)].map((item: any, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name} {item.company ? `from ${item.company}` : 'submitted interest'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList className="bg-white border shadow-sm">
          <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
          <TabsTrigger value="interests">Project Interests</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Contact Form Submissions</CardTitle>
              <CardDescription>All contact form submissions with detailed information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.contactSubmissions.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone || 'N/A'}</TableCell>
                      <TableCell>{contact.subject || 'General Inquiry'}</TableCell>
                      <TableCell>{new Date(contact.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Project Interest Submissions</CardTitle>
              <CardDescription>Investors who showed interest in specific projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Investment Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.projectInterests.map((interest) => (
                    <TableRow key={interest.id}>
                      <TableCell className="font-medium">{interest.name}</TableCell>
                      <TableCell>{interest.company || 'N/A'}</TableCell>
                      <TableCell>{interest.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {interest.investment_amount || 'Not specified'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(interest.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Customer support tickets and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.supportTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={ticket.priority === 'High' ? 'destructive' : 'outline'}
                          className={ticket.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                        >
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={ticket.status === 'Open' ? 'destructive' : 'outline'}
                          className={ticket.status === 'Closed' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                        >
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}