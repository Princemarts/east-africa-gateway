import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  ArrowLeft,
  Building,
  CheckCircle,
  Phone,
  Mail
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProjectInterestDialog from "@/components/ProjectInterestDialog";

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

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast({
        title: "Error",
        description: "Failed to load project details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector?.toLowerCase()) {
      case 'agro-processing': return 'bg-green-100 text-green-800 border-green-200';
      case 'healthcare': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'transport': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'energy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'negotiation': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'early stage': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'paused': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">Loading project details...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-navy-primary mb-4">Project Not Found</h1>
            <Button onClick={() => navigate('/opportunities')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Opportunities
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/opportunities')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Opportunities
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className={getSectorColor(project.sector)}>
                  {project.sector}
                </Badge>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-navy-primary mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {project.description}
              </p>
            </div>
            
            <div className="lg:flex-shrink-0">
              <Button 
                size="lg" 
                className="bg-navy-primary hover:bg-navy-light w-full lg:w-auto"
                onClick={() => setShowInterestDialog(true)}
              >
                Express Interest
              </Button>
            </div>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <MapPin className="w-5 h-5 text-gold-medium mr-2" />
                <span className="font-semibold text-navy-primary">Location</span>
              </div>
              <p className="text-muted-foreground">{project.location}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <DollarSign className="w-5 h-5 text-gold-medium mr-2" />
                <span className="font-semibold text-navy-primary">Investment Size</span>
              </div>
              <p className="text-muted-foreground">{project.investment_size}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <TrendingUp className="w-5 h-5 text-gold-medium mr-2" />
                <span className="font-semibold text-navy-primary">Expected Returns</span>
              </div>
              <p className="text-muted-foreground">{project.expected_returns}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Calendar className="w-5 h-5 text-gold-medium mr-2" />
                <span className="font-semibold text-navy-primary">Timeline</span>
              </div>
              <p className="text-muted-foreground">{project.timeline}</p>
            </CardContent>
          </Card>
        </div>

        {/* Incentives */}
        {project.incentives && project.incentives.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center text-navy-primary">
                <CheckCircle className="w-6 h-6 mr-3 text-gold-medium" />
                Government Incentives & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.incentives.map((incentive, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{incentive}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Section */}
        <Card className="bg-earth-warm border-gold-medium/20">
          <CardContent className="p-8">
            <div className="text-center">
              <Building className="w-12 h-12 text-gold-medium mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy-primary mb-4">
                Ready to Invest in This Project?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get detailed project documentation, financial projections, and schedule a consultation 
                with our investment team to move forward with this opportunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-navy-primary hover:bg-navy-light"
                  onClick={() => setShowInterestDialog(true)}
                >
                  Express Interest
                </Button>
                <Button variant="outline" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interest Dialog */}
      <ProjectInterestDialog 
        isOpen={showInterestDialog}
        onClose={() => setShowInterestDialog(false)}
        projectId={project.id}
        projectTitle={project.title}
      />
    </div>
  );
}