import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Wheat, 
  Stethoscope, 
  Truck,
  ArrowRight,
  Users
} from "lucide-react";

export default function Opportunities() {
  const opportunities = [
    {
      id: 1,
      title: "Organic Coffee Processing Plant",
      sector: "Agro-processing",
      icon: Wheat,
      location: "Kampala, Uganda",
      investment: "$1.5M - $3M",
      returns: "18-22% IRR",
      status: "Open",
      description: "Establish a state-of-the-art organic coffee processing facility to serve growing international demand.",
      incentives: ["10-year tax holiday", "Duty-free equipment import", "Land lease facilitation"],
      timeline: "Q2 2024"
    },
    {
      id: 2,
      title: "Medical Equipment Manufacturing",
      sector: "Healthcare",
      icon: Stethoscope,
      location: "Nairobi, Kenya",
      investment: "$2M - $5M",
      returns: "20-25% IRR",
      status: "Under Review",
      description: "Manufacturing facility for medical devices and equipment serving East African healthcare market.",
      incentives: ["Manufacturing bond benefits", "Export promotion incentives", "Special economic zone access"],
      timeline: "Q3 2024"
    },
    {
      id: 3,
      title: "Cold Chain Logistics Network",
      sector: "Transport",
      icon: Truck,
      location: "Dar es Salaam, Tanzania",
      investment: "$3M - $7M",
      returns: "15-20% IRR",
      status: "Open",
      description: "Develop modern cold chain infrastructure to support agricultural export markets.",
      incentives: ["Infrastructure development grants", "Accelerated depreciation", "Port access privileges"],
      timeline: "Q4 2024"
    }
  ];

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case "Agro-processing":
        return "bg-green-100 text-green-800";
      case "Healthcare":
        return "bg-blue-100 text-blue-800";
      case "Transport":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="opportunities" className="py-24 bg-earth-warm scroll-mt-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Investment Opportunities
          </Badge>
          <h2 className="text-3xl font-bold text-navy-primary mb-6">
            Current Investment Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore curated investment opportunities across key East African sectors 
            with established tax incentives and government support.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="group hover:shadow-elegant transition-all duration-300 bg-white border-none">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <opportunity.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getSectorColor(opportunity.sector)}>
                      {opportunity.sector}
                    </Badge>
                    <Badge className={getStatusColor(opportunity.status)}>
                      {opportunity.status}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl text-navy-primary group-hover:text-primary transition-colors">
                  {opportunity.title}
                </CardTitle>
                <CardDescription>
                  {opportunity.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Details */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 text-gold-medium" />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4 mr-2 text-gold-medium" />
                    Investment: {opportunity.investment}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4 mr-2 text-gold-medium" />
                    Expected Returns: {opportunity.returns}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2 text-gold-medium" />
                    Timeline: {opportunity.timeline}
                  </div>
                </div>

                {/* Incentives */}
                <div>
                  <h4 className="font-semibold text-navy-primary mb-2">Key Incentives:</h4>
                  <ul className="space-y-1">
                    {opportunity.incentives.map((incentive, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-gold-medium rounded-full mr-3"></div>
                        {incentive}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => window.location.href = `/project/${opportunity.id}`}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sector Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-soft">
            <Wheat className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold text-navy-primary mb-2">Agro-processing</h3>
            <p className="text-sm text-muted-foreground">12 Active Projects</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-soft">
            <Stethoscope className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-navy-primary mb-2">Healthcare</h3>
            <p className="text-sm text-muted-foreground">8 Active Projects</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-soft">
            <Truck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-navy-primary mb-2">Transport</h3>
            <p className="text-sm text-muted-foreground">6 Active Projects</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-soft">
          <h3 className="text-2xl font-bold text-navy-primary mb-4">
            Don't See What You're Looking For?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We regularly identify new investment opportunities. Get in touch to discuss 
            your specific investment criteria and sector preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => window.location.href = '/investor-portal'}
            >
              <Users className="w-5 h-5" />
              Join Investor Network
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/opportunities'}
            >
              Custom Opportunity Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}