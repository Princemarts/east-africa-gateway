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
          <div className="aspect-[4/3] rounded-2xl bg-gradient-primary shadow-elegant overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%),radial-gradient(circle_at_80%_60%,white,transparent_25%)]" />
            
            {/* Process flow illustration */}
            <div className="absolute inset-6 flex flex-col justify-between">
              {/* Top flow */}
              <div className="flex justify-between items-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 h-0.5 bg-white/30 mx-4"></div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Bottom flow */}
              <div className="flex justify-between items-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 h-0.5 bg-white/30 mx-4"></div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            {/* Info overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4">
              <div className="text-center">
                <h4 className="text-sm font-bold text-navy-primary mb-1">Proven Investment Process</h4>
                <p className="text-xs text-muted-foreground">From discovery to execution</p>
              </div>
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
