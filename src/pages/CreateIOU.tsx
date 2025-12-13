import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const skillCategories = [
  { value: "design", label: "Design", rate: 15 },
  { value: "development", label: "Development", rate: 20 },
  { value: "writing", label: "Writing", rate: 12 },
  { value: "marketing", label: "Marketing", rate: 14 },
  { value: "other", label: "Other", rate: 10 },
];

const CreateIOU = () => {
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const calculations = useMemo(() => {
    const selectedCategory = skillCategories.find((c) => c.value === category);
    const hoursNum = parseFloat(hours) || 0;
    const rate = selectedCategory?.rate || 0;
    
    const totalValue = hoursNum * rate;
    const collateral = Math.round(totalValue * 0.1);

    return { totalValue, collateral };
  }, [hours, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !hours || !category || !deadline) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "IOU Created",
      description: "Your work promise has been minted as an NFT.",
    });
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
                placeholder="8"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="bg-input border-border/60 focus:border-primary/60"
              />
            </div>

            {/* Skill Category */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Skill Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-input border-border/60 focus:border-primary/60">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {skillCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm font-medium text-foreground">
                Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="bg-input border-border/60 focus:border-primary/60"
              />
            </div>

            {/* Calculated Values */}
            {(hours && category) && (
              <div className="pt-4 border-t border-border/30 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="text-foreground font-medium tabular-nums">
                    {calculations.totalValue} Skill Points
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Collateral Required</span>
                  <span className="text-foreground font-medium tabular-nums">
                    {calculations.collateral} Tokens
                  </span>
                </div>
              </div>
            )}

            {/* Submit */}
            <Button type="submit" variant="hero" className="w-full mt-8">
              Create IOU
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIOU;
