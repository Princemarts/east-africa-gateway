import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Twahir Ismail",
      role: "Chief Executive Officer",
      image: "/lovable-uploads/d7a52fe1-4b8e-4608-ad01-ae97741ea1a3.png",
      bio: "Seasoned professional advisor with extensive experience working with governments and investors across East Africa. Twahir leads our strategic initiatives and maintains key relationships with stakeholders across Uganda, Kenya, and Tanzania.",
      experience: "15+ years",
      education: "MBA in International Business",
      expertise: ["Government Relations", "Investment Strategy", "Market Analysis", "Deal Structuring"],
      email: "twahir@qalbyinvestments.com",
      phone: "+256 700 123 456"
    },
    {
      id: 2,
      name: "Kizito Allan",
      role: "Managing Director",
      image: "/lovable-uploads/572c148b-7a6b-4e2e-8a28-a672d3bc3079.png",
      bio: "Experienced business leader with deep expertise in East African markets and investment operations. Kizito oversees day-to-day operations and ensures seamless execution of client projects across our target regions.",
      experience: "12+ years",
      education: "Master's in Business Administration",
      expertise: ["Operations Management", "Business Development", "Client Relations", "Strategic Planning"],
      email: "kizito@qalbyinvestments.com",
      phone: "+256 700 234 567"
    },
    {
      id: 3,
      name: "Tuhame Mathias",
      role: "Marketing Manager",
      image: "/lovable-uploads/a2410ac5-a694-4083-9e66-b1973ce24cc2.png",
      bio: "Dynamic marketing professional specializing in investment sector communications and brand management. Mathias drives our marketing initiatives and manages investor relations across digital and traditional platforms.",
      experience: "8+ years",
      education: "Bachelor's in Marketing & Communications",
      expertise: ["Digital Marketing", "Brand Management", "Investor Communications", "Market Research"],
      email: "mathias@qalbyinvestments.com",
      phone: "+256 700 345 678"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-earth-warm">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                Leadership Team
              </Badge>
              <h1 className="text-4xl font-bold text-navy-primary mb-6">
                Meet Our Team
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our experienced leadership team brings decades of combined expertise in 
                East African investment, government relations, and strategic advisory services.
              </p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden group hover-scale">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-navy-primary mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gold-medium font-medium mb-2">
                        {member.role}
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                        <span className="font-medium">{member.experience}</span>
                        <span>•</span>
                        <span>{member.education}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Expertise */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-navy-primary mb-3">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Join Our Team CTA */}
            <div className="mt-16 text-center bg-earth-warm rounded-2xl p-12">
              <h3 className="text-2xl font-bold text-navy-primary mb-4">
                Join Our Growing Team
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're always looking for talented professionals who share our passion 
                for facilitating successful investments across East Africa.
              </p>
              <Button variant="professional" size="lg">
                View Open Positions
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}