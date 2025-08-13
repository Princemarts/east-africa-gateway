import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";

interface Project {
  id?: string;
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

interface ProjectManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  onSuccess: () => void;
}

export default function ProjectManagementDialog({ 
  isOpen, 
  onClose, 
  project,
  onSuccess 
}: ProjectManagementDialogProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    sector: "",
    location: "",
    investment_size: "",
    expected_returns: "",
    timeline: "",
    status: "Early Stage",
    incentives: []
  });
  const [newIncentive, setNewIncentive] = useState("");

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        title: "",
        description: "",
        sector: "",
        location: "",
        investment_size: "",
        expected_returns: "",
        timeline: "",
        status: "Early Stage",
        incentives: []
      });
    }
  }, [project, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (project?.id) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', project.id);

        if (error) throw error;

        toast({
          title: "Project Updated Successfully!",
          description: "The project has been updated and is now visible on the website.",
        });
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Project Created Successfully!",
          description: "The new project has been added and is now visible on the website.",
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Save Failed",
        description: "Please try again or check your input data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Project, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addIncentive = () => {
    if (newIncentive.trim()) {
      setFormData(prev => ({
        ...prev,
        incentives: [...prev.incentives, newIncentive.trim()]
      }));
      setNewIncentive("");
    }
  };

  const removeIncentive = (index: number) => {
    setFormData(prev => ({
      ...prev,
      incentives: prev.incentives.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-navy-primary">
            {project ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
          <DialogDescription>
            {project ? 'Update project details and save changes.' : 'Create a new investment opportunity for the website.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Detailed project description..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sector">Sector *</Label>
              <Select onValueChange={(value) => handleInputChange("sector", value)} value={formData.sector}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agro-processing">Agro-processing</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Kampala, Uganda"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investment_size">Investment Size *</Label>
              <Input
                id="investment_size"
                value={formData.investment_size}
                onChange={(e) => handleInputChange("investment_size", e.target.value)}
                placeholder="e.g., $2.5M - $3.2M"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expected_returns">Expected Returns *</Label>
              <Input
                id="expected_returns"
                value={formData.expected_returns}
                onChange={(e) => handleInputChange("expected_returns", e.target.value)}
                placeholder="e.g., 18-22% IRR"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline *</Label>
              <Input
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleInputChange("timeline", e.target.value)}
                placeholder="e.g., 18 months"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select onValueChange={(value) => handleInputChange("status", value)} value={formData.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Early Stage">Early Stage</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Incentives */}
          <div className="space-y-2">
            <Label>Incentives & Benefits</Label>
            <div className="flex gap-2">
              <Input
                value={newIncentive}
                onChange={(e) => setNewIncentive(e.target.value)}
                placeholder="Add an incentive..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncentive())}
              />
              <Button type="button" variant="outline" onClick={addIncentive}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.incentives.map((incentive, index) => (
                <div key={index} className="bg-gold-light/20 text-gold-dark px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {incentive}
                  <button
                    type="button"
                    onClick={() => removeIncentive(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-navy-primary hover:bg-navy-light">
              {loading ? "Saving..." : (project ? "Update Project" : "Create Project")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}