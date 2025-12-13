import { useState } from "react";
import { IOUCard } from "@/components/IOUCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const mockIOUs = [
  {
    id: "1",
    description: "Design a complete brand identity including logo, color palette, and typography guidelines",
    skillPoints: 180,
    creator: "alice.eth",
    reputation: 98,
    deadline: "Dec 20",
    category: "design" as const,
  },
  {
    id: "2",
    description: "Build a React component library with 20 reusable UI components",
    skillPoints: 320,
    creator: "bob.eth",
    reputation: 95,
    deadline: "Dec 25",
    category: "development" as const,
  },
  {
    id: "3",
    description: "Write 10 SEO-optimized blog posts about Web3 technology",
    skillPoints: 120,
    creator: "carol.eth",
    reputation: 92,
    deadline: "Dec 18",
    category: "writing" as const,
  },
  {
    id: "4",
    description: "Create and execute a social media marketing campaign",
    skillPoints: 140,
    creator: "dave.eth",
    reputation: 89,
    deadline: "Dec 22",
    category: "marketing" as const,
  },
  {
    id: "5",
    description: "Develop a smart contract for token vesting with cliff periods",
    skillPoints: 280,
    creator: "eve.eth",
    reputation: 97,
    deadline: "Dec 28",
    category: "development" as const,
  },
  {
    id: "6",
    description: "Design user interface mockups for a mobile banking app",
    skillPoints: 200,
    creator: "frank.eth",
    reputation: 94,
    deadline: "Dec 24",
    category: "design" as const,
  },
];

const Marketplace = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredIOUs = mockIOUs.filter((iou) => 
    categoryFilter === "all" || iou.category === categoryFilter
  );

  const handleAccept = (id: string) => {
    toast({
      title: "IOU Accepted",
      description: "You've committed to completing this work promise.",
    });
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold text-foreground mb-2 opacity-0 animate-fade-in-up">
          Marketplace
        </h1>
        <p className="text-muted-foreground mb-10 opacity-0 animate-fade-in-up animate-delay-100">
          Browse and accept work promises from the community.
        </p>

        {/* Filters */}
        <div className="flex items-center gap-6 pb-8 border-b border-border/30 mb-8 opacity-0 animate-fade-in-up animate-delay-200" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Category</span>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px] bg-input border-border/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-px h-5 bg-border/40" />

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Sort by</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-input border-border/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="value">Highest Value</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* IOU Grid */}
        <div className="grid gap-4 opacity-0 animate-fade-in-up animate-delay-300" style={{ animationFillMode: 'forwards' }}>
          {filteredIOUs.map((iou) => (
            <IOUCard
              key={iou.id}
              {...iou}
              onAccept={() => handleAccept(iou.id)}
            />
          ))}
        </div>

        {filteredIOUs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No IOUs found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
