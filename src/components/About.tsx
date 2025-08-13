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
          <p className="text-muted-foreground max-w-4xl mx-auto">
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

        {/* Leadership CTA */}
        <div className="bg-earth-warm rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-navy-primary mb-4">Meet Our Leadership Team</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Learn more about our experienced team of investment professionals 
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
    </section>
  );
}