import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useWeb3 } from "@/hooks/useWeb3";
import { formatAddress } from "@/lib/web3";
import { Button } from "@/components/ui/button";
import { getMockIOUs, acceptMockIOU, type MockIOU } from "@/lib/mockData";
import { Clock, User, Award } from "lucide-react";

const Marketplace = () => {
  const { account, isConnected, connect } = useWeb3();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [ious, setIOUs] = useState<MockIOU[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      loadMarketplaceIOUs();
    }
  }, [isConnected]);

  const loadMarketplaceIOUs = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockIOUs = getMockIOUs();

      // Only show pending IOUs that you DIDN'T create
      const availableIOUs = mockIOUs.filter(iou =>
        iou.status === 'pending' &&
        iou.creator.toLowerCase() !== account?.toLowerCase()
      );

      setIOUs(availableIOUs);
      toast({
        title: "IOUs Loaded",
        description: `Found ${availableIOUs.length} available IOUs`,
      });
    } catch (error) {
      console.error("Error loading IOUs:", error);
      toast({
        title: "Error",
        description: "Failed to load IOUs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (iouId: string) => {
    if (!account) return;

    try {
      toast({
        title: "Accepting IOU...",
        description: "Staking collateral...",
      });

      await new Promise(resolve => setTimeout(resolve, 1500));
      acceptMockIOU(iouId, account);

      toast({
        title: "IOU Accepted! 🎉",
        description: "You've accepted this work promise. Equal collateral staked!",
      });

      loadMarketplaceIOUs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept IOU",
        variant: "destructive",
      });
    }
  };

  const filteredIOUs = ious.filter(iou => {
    if (categoryFilter === "all") return true;
    return iou.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  const sortedIOUs = [...filteredIOUs].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "reputation") {
      return b.creatorReputation - a.creatorReputation;
    }
    if (sortBy === "hours") {
      return a.hours - b.hours;
    }
    return 0;
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen gradient-subtle">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center py-20">
            <h1 className="text-2xl font-semibold text-foreground mb-4">
              Connect Your Wallet
            </h1>
            <p className="text-muted-foreground mb-8">
              Connect your wallet to browse the marketplace
            </p>
            <Button onClick={connect} variant="hero">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-semibold text-foreground">Marketplace</h1>
              <Button onClick={loadMarketplaceIOUs} variant="outline" disabled={isLoading}>
                {isLoading ? "Loading..." : "Refresh"}
              </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="skilled">Skilled</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="reputation">Highest Reputation</SelectItem>
                  <SelectItem value="hours">Fewest Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* IOUs Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading IOUs...</p>
            </div>
          ) : sortedIOUs.length === 0 ? (
            <div className="text-center py-20 bg-card/50 rounded-lg border border-border/40">
              <p className="text-muted-foreground">No IOUs available in marketplace</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedIOUs.map((iou) => (
                <div
                  key={iou.id}
                  className="p-6 bg-card/50 rounded-lg border border-border/40 hover:border-primary/40 transition-all hover:shadow-lg"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {iou.description}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {iou.hours} hours
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {formatAddress(iou.creator)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {iou.creatorReputation} rep
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div>
                      <div className="text-sm text-muted-foreground">Collateral Required</div>
                      <div className="text-lg font-semibold text-foreground">{iou.collateral} ETH</div>
                    </div>
                    <Button
                      onClick={() => handleAccept(iou.id)}
                      variant="default"
                      size="sm"
                    >
                      Accept IOU
                    </Button>
                  </div>

                  <div className="mt-3 text-xs text-muted-foreground">
                    Deadline: {new Date(iou.deadline).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
