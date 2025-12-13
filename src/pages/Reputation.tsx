import { useState, useEffect } from "react";
import { ChronoRaven } from "@/components/ChronoRaven";
import { Award, TrendingUp, Clock, CheckCircle, Users, Zap } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";
import { getUserReputation } from "@/contracts";
import { Button } from "@/components/ui/button";

const achievements = [
  { id: "1", icon: Award, label: "First IOU", unlocked: true },
  { id: "2", icon: TrendingUp, label: "Rising Star", unlocked: true },
  { id: "3", icon: Clock, label: "On Time", unlocked: true },
  { id: "4", icon: CheckCircle, label: "10 Completed", unlocked: false },
  { id: "5", icon: Users, label: "Team Player", unlocked: false },
  { id: "6", icon: Zap, label: "Speed Demon", unlocked: false },
];

const Reputation = () => {
  const { account, isConnected, connect } = useWeb3();
  const [reputationData, setReputationData] = useState({
    score: 100, // Everyone starts with 100 reputation
    completed: 0,
    defaulted: 0,
    totalPoints: 0,
    tier: "Bronze",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [completionRate, setCompletionRate] = useState(0);

  useEffect(() => {
    if (isConnected && account) {
      loadReputation();
    }
  }, [isConnected, account]);

  const loadReputation = async () => {
    if (!account) return;

    setIsLoading(true);
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use mock data
      const { getMockReputation } = await import('@/lib/mockData');
      const data = getMockReputation(account);

      // If score is 0, default to 100 (new user)
      const updatedData = {
        ...data,
        score: data.score > 0 ? data.score : 100,
      };

      setReputationData(updatedData);

      // Calculate completion rate
      const total = data.completed + data.defaulted;
      const rate = total > 0 ? (data.completed / total) * 100 : 0;
      setCompletionRate(Math.round(rate));
    } catch (error) {
      console.error("Error loading reputation:", error);
      // Keep default 100 on error
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressToNextTier = () => {
    const { score } = reputationData;
    if (score < 100) return (score / 100) * 100; // Bronze to Silver
    if (score < 500) return ((score - 100) / 400) * 100; // Silver to Gold
    return ((score - 500) / 500) * 100; // Gold to Platinum
  };

  const getNextTier = () => {
    const { score } = reputationData;
    if (score < 100) return "Silver";
    if (score < 500) return "Gold";
    return "Platinum";
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen gradient-subtle">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center py-20">
            <h1 className="text-2xl font-semibold text-foreground mb-4">
              Connect Your Wallet
            </h1>
            <p className="text-muted-foreground mb-8">
              Connect your wallet to view your reputation
            </p>
            <Button onClick={connect} variant="hero">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const progress = getProgressToNextTier();
  const stats = [
    { label: "Current Reputation", value: reputationData.score.toString() },
    { label: "IOUs Completed", value: reputationData.completed.toString() },
    { label: "Completion Rate", value: `${completionRate}%` },
    { label: "Defaulted IOUs", value: reputationData.defaulted.toString() },
    { label: "Current Tier", value: reputationData.tier },
    { label: "Reputation Earned", value: `+${reputationData.completed * 20}` },
  ];

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl">
          {/* Header */}
          <div className="mb-16 opacity-0 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <ChronoRaven size="lg" className="text-primary" />
                <div>
                  <div className="text-5xl font-semibold text-foreground tabular-nums">
                    {isLoading ? "..." : reputationData.score}
                  </div>
                  <div className="text-muted-foreground mt-1">
                    {reputationData.tier} Tier
                  </div>
                </div>
              </div>
              <Button
                onClick={loadReputation}
                variant="outline"
                disabled={isLoading}
                size="sm"
              >
                {isLoading ? "Loading..." : "Refresh"}
              </Button>
            </div>

            {/* Progress to next tier */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to {getNextTier()}</span>
                <span className="text-muted-foreground tabular-nums">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
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
                // Unlock achievements based on actual stats
                let unlocked = achievement.unlocked;
                if (achievement.label === "10 Completed") {
                  unlocked = reputationData.completed >= 10;
                }

                return (
                  <div
                    key={achievement.id}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border border-border/40 transition-colors ${unlocked
                      ? "bg-card"
                      : "bg-muted/20 opacity-40"
                      }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${unlocked ? "text-primary" : "text-muted-foreground"
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

          {/* Tier Information */}
          <div className="mt-12 p-6 rounded-lg bg-card/50 border border-border/40 opacity-0 animate-fade-in-up animate-delay-300" style={{ animationFillMode: 'forwards' }}>
            <h3 className="text-sm font-medium text-foreground mb-3">Tier Benefits</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>Beginner (0-99):</strong> 100% collateral required</p>
              <p>• <strong>Trusted (100-199):</strong> 100% collateral required</p>
              <p>• <strong>Verified (200-499):</strong> 50% collateral reduction</p>
              <p>• <strong>Expert (500+):</strong> 75% collateral reduction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reputation;
