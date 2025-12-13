import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useWeb3 } from "@/hooks/useWeb3";
import { createIOU } from "@/contracts";
import { SkillCategory, SKILL_CATEGORY_DESCRIPTIONS } from "@/contracts/abis";
import { parseEther } from "ethers";
import { parseError } from "@/lib/web3";

const skillCategories = [
  { value: SkillCategory.BASIC, label: "Basic", description: SKILL_CATEGORY_DESCRIPTIONS[SkillCategory.BASIC] },
  { value: SkillCategory.SKILLED, label: "Skilled", description: SKILL_CATEGORY_DESCRIPTIONS[SkillCategory.SKILLED] },
  { value: SkillCategory.TECHNICAL, label: "Technical", description: SKILL_CATEGORY_DESCRIPTIONS[SkillCategory.TECHNICAL] },
  { value: SkillCategory.EXPERT, label: "Expert", description: SKILL_CATEGORY_DESCRIPTIONS[SkillCategory.EXPERT] },
];

const CreateIOU = () => {
  const { account, isConnected, connect } = useWeb3();
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [category, setCategory] = useState<string>("");
  const [deadlineDays, setDeadlineDays] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const calculations = useMemo(() => {
    const hoursNum = parseFloat(hours) || 0;
    const categoryNum = category ? parseInt(category) : 0;

    // Reputation points: +20 per completed job (simplified system)
    const reputationReward = 20;

    // Collateral: 0.1 ETH per hour (reduced for demo)
    const collateralTokens = hoursNum * 0.1;

    return { reputationReward, collateralTokens };
  }, [hours, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your MetaMask wallet first.",
        variant: "destructive",
      });
      return;
    }

    if (!description || !hours || category === "" || !deadlineDays) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    try {
      const hoursNum = parseFloat(hours);
      const deadlineDaysNum = parseInt(deadlineDays);

      // Validate
      if (hoursNum < 0.1) {
        toast({
          title: "Invalid hours",
          description: "Hours must be at least 0.1",
          variant: "destructive",
        });
        setIsCreating(false);
        return;
      }

      // Calculate collateral (0.1 ETH per hour for demo)
      const collateralInEth = hoursNum * 0.1;

      toast({
        title: "Creating IOU...",
        description: "Simulating blockchain transaction...",
      });

      // Simulate blockchain delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Use mock data instead of blockchain
      const { addMockIOU } = await import('@/lib/mockData');
      const newIOU = addMockIOU({
        creator: account!,
        holder: null,
        description,
        hours: hoursNum,
        category: skillCategories[parseInt(category)]?.label || 'Basic',
        deadline: new Date(Date.now() + deadlineDaysNum * 24 * 60 * 60 * 1000).toISOString(),
        collateral: collateralInEth.toFixed(2),
        status: 'pending',
        creatorConfirmed: false,
        holderConfirmed: false,
        creatorReputation: 100,
      });

      toast({
        title: "IOU Created! 🎉",
        description: `Your work promise has been created. ID: #${newIOU.tokenId}`,
      });

      // Reset form
      setDescription("");
      setHours("");
      setCategory("");
      setDeadlineDays("");
    } catch (error: any) {
      console.error("Error creating IOU:", error);
      toast({
        title: "Failed to create IOU",
        description: parseError(error),
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-lg">
          <h1 className="text-2xl font-semibold text-foreground mb-2 opacity-0 animate-fade-in-up">
            Create IOU
          </h1>
          <p className="text-muted-foreground mb-10 opacity-0 animate-fade-in-up animate-delay-100">
            Define your work promise and mint it as a tradeable NFT.
          </p>

          {!isConnected ? (
            <div className="text-center py-12 opacity-0 animate-fade-in-up animate-delay-200" style={{ animationFillMode: 'forwards' }}>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to create an IOU
              </p>
              <Button onClick={connect} variant="hero">
                Connect Wallet
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 opacity-0 animate-fade-in-up animate-delay-200" style={{ animationFillMode: 'forwards' }}>
              {/* Work Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-foreground">
                  Work Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the work you'll deliver..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] bg-input border-border/60 focus:border-primary/60 resize-none"
                  disabled={isCreating}
                />
              </div>

              {/* Hours */}
              <div className="space-y-2">
                <Label htmlFor="hours" className="text-sm font-medium text-foreground">
                  Estimated Hours
                </Label>
                <Input
                  id="hours"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="bg-input border-border/60 focus:border-primary/60"
                  disabled={isCreating}
                />
                <p className="text-xs text-muted-foreground">
                  ⚠️ Note: Requires 10 ETH collateral per hour. You need more test ETH for this demo.
                </p>
              </div>

              {/* Skill Category */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Skill Category
                </Label>
                <Select value={category} onValueChange={setCategory} disabled={isCreating}>
                  <SelectTrigger className="bg-input border-border/60 focus:border-primary/60">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {skillCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value.toString()}>
                        {cat.label} - {cat.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-sm font-medium text-foreground">
                  Deadline (Days from now)
                </Label>
                <Input
                  id="deadline"
                  type="number"
                  min="1"
                  max="365"
                  placeholder="30"
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(e.target.value)}
                  className="bg-input border-border/60 focus:border-primary/60"
                  disabled={isCreating}
                />
              </div>

              {/* Calculated Values */}
              {(hours && category !== "") && (
                <div className="pt-4 border-t border-border/30 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="text-foreground font-medium tabular-nums">
                      +{calculations.reputationReward} Reputation (on completion)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Collateral Required</span>
                    <span className="text-foreground font-medium tabular-nums">
                      {calculations.collateralTokens} ETH
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You'll get your collateral back when you complete the work
                  </p>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                variant="hero"
                className="w-full mt-8"
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create IOU & Stake Collateral"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateIOU;
