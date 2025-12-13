import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { HowItWorksStep } from "@/components/HowItWorksStep";
import { FileText, Repeat, CheckCircle } from "lucide-react";

const stats = [
  { value: "2,847", label: "Active IOUs" },
  { value: "156K", label: "Skill Points Traded" },
  { value: "98.2%", label: "Completion Rate" },
  { value: "1,203", label: "Active Users" },
];

const steps = [
  {
    icon: FileText,
    title: "Create a Promise",
    description: "Define the work you'll deliver, set hours and deadline.",
  },
  {
    icon: Repeat,
    title: "Trade as NFT",
    description: "Your IOU becomes a tradeable token others can accept.",
  },
  {
    icon: CheckCircle,
    title: "Complete & Earn",
    description: "Deliver the work, build reputation, reclaim collateral.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen gradient-subtle">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight mb-6 opacity-0 animate-fade-in-up">
            Trade Future Work,
            <br />
            Get Help Today
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-in-up animate-delay-100">
            No money needed. Create work promises (IOUs) as NFTs and trade them for help right now.
          </p>

          <div className="flex items-center gap-4 opacity-0 animate-fade-in-up animate-delay-200">
            <Button variant="hero" asChild>
              <Link to="/create">Create IOU</Link>
            </Button>
            <Button variant="hero-secondary" asChild>
              <Link to="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16 border-t border-border/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={100 + index * 80}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="border-t border-border/30" />
      </div>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-lg font-medium text-foreground mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {steps.map((step, index) => (
            <HowItWorksStep
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              delay={400 + index * 100}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
