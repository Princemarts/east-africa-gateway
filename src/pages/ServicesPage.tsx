import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Services from "@/components/Services";

export default function ServicesPage() {
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
                Our Services
              </Badge>
              <h1 className="text-4xl font-bold text-navy-primary mb-6">
                Investment Advisory Services
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive investment advisory services designed to help foreign investors 
                successfully enter and thrive in East African markets.
              </p>
            </div>
          </div>
        </section>

        <Services />
      </main>
      
      {/* Footer */}
      <footer className="bg-navy-deep text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold mb-4">
                Qalby<span className="text-gold-medium">.</span> Investments
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Your trusted partner for foreign investment opportunities in East Africa. 
                Specialized in agro-processing, healthcare, and transport sectors.
              </p>
              <div className="text-sm text-gray-400">
                © 2025 Qalby Investments. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Important Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/" className="hover:text-gold-medium transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-gold-medium transition-colors">Services</Link></li>
                <li><Link to="/opportunities" className="hover:text-gold-medium transition-colors">Opportunities</Link></li>
                <li><Link to="/team" className="hover:text-gold-medium transition-colors">Our Team</Link></li>
                <li><Link to="/contact" className="hover:text-gold-medium transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/resources" className="hover:text-gold-medium transition-colors">Blog & Insights</Link></li>
                <li><a href="#opportunities" className="hover:text-gold-medium transition-colors">Investment Guide</a></li>
                <li><a href="#opportunities" className="hover:text-gold-medium transition-colors">Market Reports</a></li>
                <li><Link to="/investor-portal" className="hover:text-gold-medium transition-colors">Investor Portal</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}