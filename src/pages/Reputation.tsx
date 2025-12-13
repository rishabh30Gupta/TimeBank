import { ChronoRaven } from "@/components/ChronoRaven";
import { Award, TrendingUp, Clock, CheckCircle, Users, Zap } from "lucide-react";

const achievements = [
  { id: "1", icon: Award, label: "First IOU", unlocked: true },
  { id: "2", icon: TrendingUp, label: "Rising Star", unlocked: true },
  { id: "3", icon: Clock, label: "On Time", unlocked: true },
  { id: "4", icon: CheckCircle, label: "10 Completed", unlocked: true },
  { id: "5", icon: Users, label: "Team Player", unlocked: false },
  { id: "6", icon: Zap, label: "Speed Demon", unlocked: false },
];

const stats = [
  { label: "IOUs Created", value: "24" },
  { label: "IOUs Completed", value: "22" },
  { label: "On-Time Rate", value: "96%" },
  { label: "Total SP Earned", value: "4,820" },
  { label: "Avg. Rating", value: "4.9" },
  { label: "Repeat Clients", value: "8" },
];

const Reputation = () => {
  const reputationScore = 847;
  const tier = "Gold";
  const progress = 72; // Percentage to next tier

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl">
          {/* Header */}
          <div className="mb-16 opacity-0 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-6">
              <ChronoRaven size="lg" className="text-primary" />
              <div>
                <div className="text-5xl font-semibold text-foreground tabular-nums">
                  {reputationScore}
                </div>
                <div className="text-muted-foreground mt-1">
                  {tier} Tier
                </div>
              </div>
            </div>

            {/* Progress to next tier */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to Platinum</span>
                <span className="text-muted-foreground tabular-nums">{progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-16 opacity-0 animate-fade-in-up animate-delay-100" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-lg font-medium text-foreground mb-6">Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold text-foreground tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="opacity-0 animate-fade-in-up animate-delay-200" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-lg font-medium text-foreground mb-6">Achievements</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border border-border/40 transition-colors ${
                      achievement.unlocked
                        ? "bg-card"
                        : "bg-muted/20 opacity-40"
                    }`}
                  >
                    <Icon 
                      className={`w-6 h-6 ${
                        achievement.unlocked ? "text-primary" : "text-muted-foreground"
                      }`} 
                      strokeWidth={1.5}
                    />
                    <span className="text-xs text-center text-muted-foreground">
                      {achievement.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reputation;
