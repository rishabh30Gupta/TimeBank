import { LucideIcon } from "lucide-react";

interface HowItWorksStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const HowItWorksStep = ({ icon: Icon, title, description, delay = 0 }: HowItWorksStepProps) => {
  return (
    <div 
      className="flex-1 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <Icon className="w-5 h-5 text-muted-foreground mb-4" strokeWidth={1.5} />
      <h3 className="text-base font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};
