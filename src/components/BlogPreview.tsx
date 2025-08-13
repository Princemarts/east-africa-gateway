import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPreview() {
  const posts = [
    {
      title: "Uganda’s Tax Incentives: What Foreign Investors Should Know",
      excerpt: "A quick guide to the most relevant tax holidays, exemptions, and eligibility criteria in 2025.",
      tag: "Policy",
      date: "Aug 2025",
    },
    {
      title: "Healthcare Investments: Demand Trends in East Africa",
      excerpt: "Why private clinics, diagnostics, and pharma distribution are positioned for growth.",
      tag: "Healthcare",
      date: "Aug 2025",
    },
    {
      title: "Building Agro-Processing Value Chains Across Borders",
      excerpt: "From sourcing to export, how to design resilient supply chains for regional markets.",
      tag: "Agro-processing",
      date: "Jul 2025",
    },
  ];

  return (
    <section id="blog" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-navy-primary text-center mb-12">Insights & Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Card key={i} className="hover-scale cursor-pointer" onClick={() => window.location.href = `/blog/${i + 1}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{p.tag}</Badge>
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-navy-primary mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
