import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  DollarSign, 
  Scale, 
  TrendingUp, 
  HeadphonesIcon,
  ArrowRight 
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Users,
      title: "Foreign Investment Advisory",
      description: "Expert guidance on market entry strategies, regulatory requirements, and business setup procedures across East Africa.",
      features: ["Market Analysis", "Regulatory Guidance", "Business Setup"]
    },
    {
      icon: FileText,
      title: "Feasibility Studies & Research",
      description: "Comprehensive market research and feasibility studies to validate your investment opportunities and minimize risks.",
      features: ["Market Research", "Risk Assessment", "Due Diligence"]
    },
    {
      icon: DollarSign,
      title: "Tax Incentives & Land Access",
      description: "Navigate complex tax incentive programs and secure favorable land acquisition terms with government partnerships.",
      features: ["Tax Optimization", "Land Acquisition", "Incentive Programs"]
    },
    {
      icon: Scale,
      title: "Legal & Regulatory Compliance",
      description: "Ensure full compliance with local laws and regulations while streamlining approval processes.",
      features: ["Legal Support", "Compliance", "Documentation"]
    },
    {
      icon: TrendingUp,
      title: "Capital Raising & Deal Facilitation",
      description: "Connect with local and international funding sources while structuring optimal investment deals.",
      features: ["Funding Sources", "Deal Structure", "Investor Matching"]
    },
    {
      icon: HeadphonesIcon,
      title: "Post-Investment Support",
      description: "Ongoing monitoring and support services to ensure successful project implementation and operations.",
      features: ["Project Monitoring", "Operational Support", "Performance Tracking"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-subtle scroll-mt-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-primary mb-6">
            About Us - Comprehensive Investment Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From initial market entry to post-investment support, we provide end-to-end 
            services to ensure your success in East African markets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-navy-primary">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-gold-medium rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-soft">
          <h3 className="text-2xl font-bold text-navy-primary mb-4">
            Ready to Start Your Investment Journey?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team of experts is ready to guide you through every step of your East African investment journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => window.location.href = '/investor-portal'}
            >
              Schedule Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/opportunities'}
            >
              Download Service Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}