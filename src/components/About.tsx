import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Target, 
  Eye, 
  Award, 
  MapPin, 
  Users, 
  Calendar,
  ArrowRight
} from "lucide-react";

export default function About() {
  const milestones = [
    { year: "2018", event: "Qalby Investments Founded", description: "Established with a vision to bridge foreign investment gaps in East Africa" },
    { year: "2019", event: "First Major Deal", description: "Facilitated $2M agro-processing investment in Uganda" },
    { year: "2021", event: "Regional Expansion", description: "Extended operations to Kenya and Tanzania markets" },
    { year: "2023", event: "Healthcare Initiative", description: "Launched specialized healthcare investment program" },
    { year: "2024", event: "Digital Transformation", description: "Launched comprehensive digital investor platform" }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Delivering exceptional results through meticulous attention to detail and professional expertise."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Building lasting relationships with investors, governments, and local communities for mutual success."
    },
    {
      icon: Award,
      title: "Integrity",
      description: "Maintaining the highest ethical standards and transparency in all our business dealings."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About Qalby Investments
          </Badge>
          <h2 className="text-3xl font-bold text-navy-primary mb-6">
            About Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Led by CEO Twahir Ismail, a seasoned professional advisor with extensive experience 
            working with governments and investors, Qalby Investments specializes in unlocking 
            real opportunities for foreign investors across Uganda, Kenya, and Tanzania. We 
            deliver exceptional results through meticulous attention to detail and professional 
            expertise, building lasting relationships with investors, governments, and local 
            communities for mutual success while maintaining the highest ethical standards and 
            transparency in all our business dealings.
          </p>
        </div>

        {/* Core Values integrated into main description - removed separate section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-navy-primary mb-4">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Journey section removed */}

        {/* Leadership CTA with CEO Image */}
        <div className="bg-earth-warm rounded-2xl p-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* CEO Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-primary p-1">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img
                    src="/lovable-uploads/d7a52fe1-4b8e-4608-ad01-ae97741ea1a3.png"
                    alt="Twahir Ismail, CEO of Qalby Investments"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* CEO Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-bold text-navy-primary mb-1">Twahir Ismail</h4>
                <p className="text-sm text-gold-medium font-medium">Chief Executive Officer</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-navy-primary mb-4">Meet Our Leadership Team</h3>
              <p className="text-muted-foreground mb-6">
                Learn more about Twahir Ismail and our experienced team of investment professionals 
                who make successful East African investments possible.
              </p>
              <Link to="/team">
                <Button variant="professional" size="lg">
                  Our Team
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}