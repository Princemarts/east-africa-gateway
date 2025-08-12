
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-africa-investment.jpg";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="East Africa Investment Opportunities" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold-medium/20 backdrop-blur-sm border border-gold-medium/30 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-gold-medium" />
            <span className="text-sm font-medium text-gold-light">Trusted Investment Partner</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
            Your Gateway to 
            <span className="bg-gradient-gold bg-clip-text text-transparent"> East Africa</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Unlock investment opportunities in Uganda, Kenya, and Tanzania with expert guidance, 
            tax incentives, and comprehensive support from market entry to project completion.
          </p>
          
          {/* Key Sectors */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {["Agro-processing", "Healthcare", "Transport"].map((sector) => (
              <span 
                key={sector}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-sm font-medium"
              >
                {sector}
              </span>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full sm:w-auto min-w-[200px]"
              onClick={() => window.location.href = '/opportunities'}
            >
              Explore Opportunities
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="consultation" 
              size="lg" 
              className="w-full sm:w-auto min-w-[200px]"
              onClick={() => window.dispatchEvent(new CustomEvent('open-consultation'))}
            >
              Book Consultation
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-medium mb-2">3</div>
              <div className="text-sm text-gray-300">Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-medium mb-2">50+</div>
              <div className="text-sm text-gray-300">Projects Facilitated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-medium mb-2">$10M+</div>
              <div className="text-sm text-gray-300">Investment Volume</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
