
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      name: "Sarah Johnson",
      company: "Tech Innovations Ltd",
      rating: 5,
      text: "Qalby Investments helped us navigate the East African market seamlessly. Their expertise in agro-processing investments was invaluable.",
      location: "Kenya"
    },
    {
      name: "Michael Chen",
      company: "Global Healthcare Partners",
      rating: 5,
      text: "Professional service and deep market knowledge. The tax incentive guidance saved us significant costs on our healthcare facility investment.",
      location: "Uganda"
    },
    {
      name: "Amanda Thompson",
      company: "Transport Solutions Inc",
      rating: 5,
      text: "From initial consultation to project completion, Qalby provided exceptional support. Our logistics hub is now operational ahead of schedule.",
      location: "Tanzania"
    },
    {
      name: "David Rodriguez",
      company: "AgriTech Ventures",
      rating: 5,
      text: "The market research and regulatory guidance were comprehensive. Qalby's team made our agricultural processing investment a success.",
      location: "Kenya"
    }
  ];

  return (
    <section className="py-24 bg-earth-warm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-navy-primary mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by investors from around the world for successful East African ventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-white border-none shadow-elegant hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-medium fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  "{review.text}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-navy-primary text-sm">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.company}</div>
                  <div className="text-xs text-gold-medium mt-1">{review.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
