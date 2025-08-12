import { CheckCircle, Search, Handshake, ShieldCheck } from "lucide-react";

export default function HowWeWork() {
  const steps = [
    {
      icon: Search,
      title: "Discover",
      desc: "We analyze your goals and identify high-potential sectors across East Africa.",
    },
    {
      icon: CheckCircle,
      title: "Assess",
      desc: "Detailed due diligence, incentives mapping, and risk evaluation for each opportunity.",
    },
    {
      icon: Handshake,
      title: "Structure",
      desc: "We secure land access, tax incentives, and create bankable deal structures.",
    },
    {
      icon: ShieldCheck,
      title: "Execute",
      desc: "End-to-end support from negotiation to operational launch and reporting.",
    },
  ];

  return (
    <section id="how-we-work" className="py-24 bg-earth-warm scroll-mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Illustration */}
        <div className="relative order-2 lg:order-1">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-primary shadow-elegant overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%),radial-gradient(circle_at_80%_60%,white,transparent_25%)]" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 grid grid-cols-2 gap-4">
              {steps.slice(0,2).map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <s.icon className="w-5 h-5 text-navy-primary" />
                  <div>
                    <div className="text-sm font-semibold text-navy-primary">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold text-navy-primary mb-4">How We Work</h2>
          <p className="text-lg text-muted-foreground mb-8">
            A clear, proven process to take you from idea to a successful investment on the ground.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 hover-scale shadow-soft">
                <step.icon className="w-6 h-6 text-gold-medium mb-3" />
                <div className="font-semibold text-navy-primary mb-1">{step.title}</div>
                <div className="text-sm text-muted-foreground">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
