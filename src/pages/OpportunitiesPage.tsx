import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface Project {
  id: string;
  title: string;
  description: string;
  sector: string;
  location: string;
  investment_size: string;
  expected_returns: string;
  timeline: string;
  status: string;
  incentives: string[];
}

const OpportunitiesPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load investment opportunities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector?.toLowerCase()) {
      case "agro-processing": return "bg-green-100 text-green-800 border-green-200";
      case "healthcare": return "bg-blue-100 text-blue-800 border-blue-200";
      case "transport": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "early stage": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "negotiation": return "bg-orange-100 text-orange-800 border-orange-200";
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-medium mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading opportunities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-primary mb-6">
            Investment Opportunities
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover verified investment opportunities across East Africa with government 
            backing, tax incentives, and comprehensive support.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-elegant transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge className={getSectorColor(project.sector)}>
                    {project.sector}
                  </Badge>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-navy-primary group-hover:text-gold-medium transition-colors">
                  {project.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 text-gold-medium mr-2" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 text-gold-medium mr-2" />
                    <span>{project.investment_size}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-gold-medium mr-2" />
                    <span>{project.expected_returns} returns</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-gold-medium mr-2" />
                    <span>{project.timeline}</span>
                  </div>
                </div>

                {project.incentives && project.incentives.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-navy-primary mb-2">Incentives:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.incentives.slice(0, 3).map((incentive, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-gold-light/20 text-gold-dark px-2 py-1 rounded-full"
                        >
                          {incentive}
                        </span>
                      ))}
                      {project.incentives.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.incentives.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full bg-navy-primary hover:bg-navy-light"
                  onClick={() => window.location.href = `/project/${project.id}`}
                >
                  View Details & Express Interest
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-navy-primary mb-4">
              No opportunities available yet
            </h3>
            <p className="text-muted-foreground">
              Check back soon for new investment opportunities.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-soft">
          <h3 className="text-2xl font-bold text-navy-primary mb-4">
            Ready to Invest?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our investor network to get early access to exclusive opportunities 
            and personalized investment guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="premium" size="lg">
              Join Investor Network
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.dispatchEvent(new CustomEvent('open-consultation'))}>
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;