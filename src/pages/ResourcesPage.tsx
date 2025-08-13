import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

export default function ResourcesPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Uganda's Tax Incentives: What Foreign Investors Should Know",
      excerpt: "A comprehensive guide to the most relevant tax holidays, exemptions, and eligibility criteria in 2025. Learn how to maximize your investment benefits through strategic planning and proper documentation.",
      content: `Uganda offers some of the most attractive tax incentives in East Africa for foreign investors. Understanding these incentives can significantly impact your investment returns and overall success in the region.

## Key Tax Incentives Available

**Investment Tax Credits**
- Manufacturing: Up to 25% investment allowance
- Agriculture: 100% deduction for capital expenditure
- Tourism: 50% investment allowance for hotel development

**Corporate Tax Rates**
- Standard rate: 30%
- Manufacturing: 20% for first 3 years
- Agriculture: 20% for first 5 years

**VAT Exemptions**
- Capital equipment imports
- Raw materials for manufacturing
- Medical equipment and supplies

## Eligibility Criteria

To qualify for these incentives, investors must:
1. Meet minimum investment thresholds ($50,000 - $500,000 depending on sector)
2. Create specified number of jobs for Ugandans
3. Export minimum percentage of production
4. Comply with environmental regulations

## Application Process

The Uganda Investment Authority (UIA) handles all applications through a streamlined one-stop center. Required documents include:
- Investment proposal
- Financial projections
- Environmental impact assessment
- Land title or lease agreement

## Strategic Recommendations

1. **Early Engagement**: Apply for incentives before commencing operations
2. **Documentation**: Maintain detailed records of all investments
3. **Compliance**: Regular monitoring to ensure continued eligibility
4. **Professional Advice**: Work with local tax advisors

These incentives, when properly utilized, can reduce your tax burden by 30-50% in the initial years of operation, making Uganda an extremely attractive investment destination.`,
      tag: "Policy",
      date: "Aug 15, 2025",
      author: "Twahir Ismail",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Healthcare Investments: Demand Trends in East Africa",
      excerpt: "Why private clinics, diagnostics, and pharma distribution are positioned for exponential growth across Uganda, Kenya, and Tanzania in the coming decade.",
      content: `The healthcare sector in East Africa presents unprecedented investment opportunities, driven by growing populations, rising incomes, and increasing health awareness.

## Market Dynamics

**Population Growth**
East Africa's population is projected to reach 300 million by 2030, creating massive demand for healthcare services. Current doctor-to-patient ratios remain critically low:
- Uganda: 1:25,000
- Kenya: 1:16,000  
- Tanzania: 1:20,000

**Rising Healthcare Expenditure**
- Private healthcare spending growing at 12% annually
- Government health budgets increasing by 8% yearly
- Medical tourism market expanding rapidly

## Key Investment Opportunities

**Private Hospitals & Clinics**
- Specialty care facilities (cardiology, oncology, orthopedics)
- Maternal and child health centers
- Emergency care facilities

**Diagnostic Services**
- Medical imaging centers (CT, MRI, ultrasound)
- Laboratory services
- Telemedicine platforms

**Pharmaceutical Distribution**
- Cold chain logistics for vaccines
- Generic drug manufacturing
- Medical device distribution

## Investment Requirements & Returns

**Capital Requirements**
- Tier 1 Hospital: $5-15 million
- Diagnostic Center: $1-3 million
- Pharmaceutical Distribution: $500K-2 million

**Expected Returns**
- Private hospitals: 15-25% ROI
- Diagnostic centers: 20-30% ROI
- Pharma distribution: 12-18% ROI

## Regulatory Environment

All three countries have streamlined healthcare investment processes:
- Fast-track licensing for qualified investors
- Tax incentives for medical equipment imports
- Support for public-private partnerships

## Success Factors

1. **Local Partnerships**: Essential for regulatory navigation
2. **Quality Standards**: International accreditation preferred
3. **Affordability**: Tiered pricing for different income levels
4. **Technology Integration**: Digital health solutions

The healthcare sector offers investors the opportunity to generate strong returns while making a meaningful social impact in rapidly growing markets.`,
      tag: "Healthcare",
      date: "Aug 12, 2025",
      author: "Kizito Allan",
      readTime: "10 min read"
    },
    {
      id: 3,
      title: "Building Agro-Processing Value Chains Across Borders",
      excerpt: "From sourcing to export, how to design resilient supply chains for regional markets while maximizing profitability and minimizing risks.",
      content: `Regional agro-processing presents massive opportunities for investors willing to think beyond single-country operations. Success requires understanding cross-border dynamics and building integrated value chains.

## Regional Market Potential

**Production Capacity**
- Uganda: 85% of population in agriculture
- Kenya: Leading exporter of tea, coffee, horticulture
- Tanzania: Largest cashew producer in Africa

**Processing Gaps**
Currently, 60-80% of agricultural produce is exported raw, representing massive value-addition opportunities.

## Value Chain Integration Strategies

**Upstream Integration**
- Contract farming programs
- Input supply systems
- Quality assurance protocols
- Farmer training initiatives

**Processing Operations**
- Strategic facility location near production zones
- Modern equipment for efficiency and quality
- Flexible capacity for seasonal variations
- Multiple product lines from single crops

**Downstream Integration**
- Regional distribution networks
- Export market development
- Brand building and marketing
- Consumer education programs

## Cross-Border Logistics

**Transportation Networks**
- Road infrastructure improvements ongoing
- Railway projects connecting major cities
- Cold storage facilities at border points
- Simplified customs procedures under EAC

**Regional Trade Agreements**
- Common Market Protocol eliminates tariffs
- Simplified customs procedures
- Harmonized standards and regulations
- Free movement of goods and services

## Investment Models

**Greenfield Operations**
- New processing facilities
- Integrated farming operations
- Technology transfer opportunities
- Job creation focus

**Acquisition & Expansion**
- Existing facility upgrades
- Capacity expansion projects
- Technology modernization
- Market share consolidation

## Risk Mitigation

**Agricultural Risks**
- Diversified sourcing across regions
- Climate-smart agriculture practices
- Crop insurance programs
- Water management systems

**Political Risks**
- Multi-country operations spread risk
- Strong government relationships
- Compliance with all regulations
- Local partnership strategies

## Financial Projections

**Investment Requirements**
- Small-scale processing: $500K-2M
- Medium-scale operations: $2M-10M
- Large integrated facilities: $10M-50M

**Return Profiles**
- Processing margins: 15-30%
- Export premiums: 20-40%
- Regional scale economies: 10-15% cost reduction

Success in agro-processing requires patience, local knowledge, and commitment to quality. However, the rewards - both financial and social - are substantial for investors who execute effectively.`,
      tag: "Agro-processing",
      date: "Jul 28, 2025",
      author: "Tuhame Mathias",
      readTime: "12 min read"
    },
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
                Resources
              </Badge>
              <h1 className="text-4xl font-bold text-navy-primary mb-6">
                Insights & Market Intelligence
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay informed with our latest research, market analysis, and investment insights 
                for East African opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="h-full hover-scale cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{post.tag}</Badge>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-navy-primary mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
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