
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <Contact />
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
                © 2024 Qalby Investments. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#services" className="hover:text-gold-medium transition-colors">Investment Advisory</a></li>
                <li><a href="#services" className="hover:text-gold-medium transition-colors">Market Research</a></li>
                <li><a href="#services" className="hover:text-gold-medium transition-colors">Tax Incentives</a></li>
                <li><a href="#services" className="hover:text-gold-medium transition-colors">Legal Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#opportunities" className="hover:text-gold-medium transition-colors">Investment Guide</a></li>
                <li><a href="#opportunities" className="hover:text-gold-medium transition-colors">Market Reports</a></li>
                <li><a href="#opportunities" className="hover:text-gold-medium transition-colors">Success Stories</a></li>
                <li><a href="/investor-portal" className="hover:text-gold-medium transition-colors">Investor Portal</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
