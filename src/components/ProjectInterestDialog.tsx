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

interface ProjectInterestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectTitle: string;
}

export default function ProjectInterestDialog({ 
  isOpen, 
  onClose, 
  projectId, 
  projectTitle 
}: ProjectInterestDialogProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [investorProfile, setInvestorProfile] = useState(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    investment_amount: "",
    message: ""
  });

  useEffect(() => {
    checkAuthAndLoadProfile();
  }, []);

  const checkAuthAndLoadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Fetch investor profile
        const { data: investor, error } = await supabase
          .from('investors')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (!error && investor) {
          setInvestorProfile(investor);
          setFormData({
            name: investor.name || "",
            email: investor.email || "",
            company: investor.company || "",
            phone: investor.phone || "",
            investment_amount: investor.investment_amount || "",
            message: ""
          });
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('project_interests')
        .insert({
          project_id: projectId,
          ...formData
        });

      if (error) throw error;

      toast({
        title: "Interest Submitted Successfully!",
        description: "We'll review your interest and get back to you within 24 hours.",
      });

      // Only reset message for logged in users
      if (user && investorProfile) {
        setFormData(prev => ({ ...prev, message: "" }));
      } else {
        // Reset form for non-logged in users
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          investment_amount: "",
          message: ""
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Error submitting interest:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-navy-primary">Express Interest in Investment</DialogTitle>
          <DialogDescription>
            {user && investorProfile 
              ? `Expressing interest in "${projectTitle}" as ${investorProfile.name}`
              : `Share your details to express interest in "${projectTitle}". Our team will review and contact you.`
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {(!user || !investorProfile) && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investment_amount">Investment Range</Label>
                <Select onValueChange={(value) => handleInputChange("investment_amount", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your investment range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under $500K">Under $500K</SelectItem>
                    <SelectItem value="$500K - $1M">$500K - $1M</SelectItem>
                    <SelectItem value="$1M - $2M">$1M - $2M</SelectItem>
                    <SelectItem value="$2M - $5M">$2M - $5M</SelectItem>
                    <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
                    <SelectItem value="Over $10M">Over $10M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your investment experience, timeline, specific interests, or any questions you have about this project..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-navy-primary hover:bg-navy-light">
              {loading ? "Submitting..." : "Express Interest"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}