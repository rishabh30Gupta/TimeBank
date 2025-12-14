import { useState, useEffect } from "react";
import { useWeb3 } from "@/hooks/useWeb3";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getUserMockIOUs, confirmMockCompletion, fileMockDispute, updateMockIOU, type MockIOU } from "@/lib/mockData";
import { formatAddress } from "@/lib/web3";
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const MyIOUs = () => {
  const { account, isConnected, connect } = useWeb3();
  const [createdIOUs, setCreatedIOUs] = useState<MockIOU[]>([]);
  const [acceptedIOUs, setAcceptedIOUs] = useState<MockIOU[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && account) {
      loadMyIOUs();
    }
  }, [isConnected, account]);

  const loadMyIOUs = async () => {
    if (!account) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const { created, held } = getUserMockIOUs(account);
      setCreatedIOUs(created);
      setAcceptedIOUs(held);
    } catch (error) {
      console.error("Error loading IOUs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (iouId: string, isCreator: boolean) => {
    try {
      toast({
        title: "Confirming...",
        description: "Processing confirmation...",
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      const updated = confirmMockCompletion(iouId, isCreator);

      if (updated?.status === 'completed') {
        // Both parties have confirmed!
        toast({
          title: "Work Completed! 🎉",
          description: "Both parties confirmed! Collateral returned + 20 reputation earned!",
        });
      } else {
        // Only one party confirmed so far
        toast({
          title: "Confirmed! ✅",
          description: "Waiting for other party to confirm...",
        });
      }

      loadMyIOUs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm",
        variant: "destructive",
      });
    }
  };

  const handleDispute = async (iouId: string) => {
    try {
      toast({
        title: "Filing Dispute...",
        description: "Submitting claim to admin...",
      });

      await new Promise(resolve => setTimeout(resolve, 1500));
      fileMockDispute(iouId);

      toast({
        title: "Dispute Filed ⚠️",
        description: "Admin reviewing evidence... (simulating review)",
      });

      // Auto-resolve dispute after 4 seconds (simulate admin decision)
      setTimeout(() => {
        // Randomly decide if claim is valid or false (50/50)
        const randomValue = Math.random();
        const isClaimValid = randomValue > 0.5;

        console.log('Dispute Resolution:', { randomValue, isClaimValid });

        if (isClaimValid) {
          // Claim is VALID - Guilty party loses
          toast({
            title: "Dispute Resolved - Claim Valid ✅",
            description: "Admin reviewed evidence: Work not delivered! Guilty party loses collateral + 20 reputation. You receive compensation.",
            duration: 6000,
          });
        } else {
          // Claim is FALSE - Claimer penalized
          toast({
            title: "Dispute Resolved - False Claim ❌",
            description: "Admin reviewed evidence: Work was delivered properly! You filed a false claim and lose 20 reputation as penalty.",
            variant: "destructive",
            duration: 6000,
          });
        }

        // Set status based on claim outcome
        if (isClaimValid) {
          updateMockIOU(iouId, { status: 'completed' });
        } else {
          updateMockIOU(iouId, { status: 'false_claim' as any });
        }

        loadMyIOUs();
      }, 4000);

      loadMyIOUs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to file dispute",
        variant: "destructive",
      });
    }
  };

  const handleRequestRedemption = async (iouId: string) => {
    try {
      toast({
        title: "Requesting Redemption...",
        description: "Asking creator to deliver promised work...",
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      const { requestMockRedemption } = await import('@/lib/mockData');
      requestMockRedemption(iouId);

      toast({
        title: "Redemption Requested! 💼",
        description: "Creator will be notified to deliver the work they promised.",
      });

      loadMyIOUs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request redemption",
        variant: "destructive",
      });
    }
  };

  const handleConfirmRedemption = async (iouId: string) => {
    try {
      toast({
        title: "Confirming Redemption...",
        description: "Marking work as delivered...",
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      const { creatorConfirmRedemption } = await import('@/lib/mockData');
      creatorConfirmRedemption(iouId);

      toast({
        title: "IOU Redeemed! 🎉",
        description: "Creator delivered the promised work. IOU is now fully completed!",
      });

      loadMyIOUs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm redemption",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      accepted: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      completed: "bg-green-500/10 text-green-500 border-green-500/20",
      disputed: "bg-red-500/10 text-red-500 border-red-500/20",
      false_claim: "bg-red-500/10 text-red-500 border-red-500/20",
      redeemed: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    };
    const labels = {
      pending: "Pending",
      accepted: "Accepted",
      completed: "Completed",
      disputed: "Disputed",
      false_claim: "False Claim",
      redeemed: "Redeemed",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
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
              Connect your wallet to view your IOUs
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-semibold text-foreground">My IOUs</h1>
              <Button onClick={loadMyIOUs} variant="outline" disabled={isLoading}>
                {isLoading ? "Loading..." : "Refresh"}
              </Button>
            </div>
          </div>

          {/* Created IOUs */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              IOUs I Created ({createdIOUs.length})
            </h2>
            {createdIOUs.length === 0 ? (
              <div className="text-center py-12 bg-card/50 rounded-lg border border-border/40">
                <p className="text-muted-foreground">No IOUs created yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {createdIOUs.map((iou) => (
                  <div
                    key={iou.id}
                    className="p-6 bg-card/50 rounded-lg border border-border/40 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-foreground">{iou.description}</h3>
                          {getStatusBadge(iou.status)}
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>⏱️ {iou.hours} hours</span>
                          <span>📁 {iou.category}</span>
                          <span>💰 {iou.collateral} ETH</span>
                        </div>
                        {iou.holder && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            Accepted by: {formatAddress(iou.holder)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {iou.status === 'accepted' && (
                      <div className="flex gap-3 mt-4">
                        {!iou.creatorConfirmed ? (
                          <Button
                            onClick={() => handleConfirm(iou.id, true)}
                            size="sm"
                            variant="default"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm Completion
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-green-500">
                            <CheckCircle className="w-4 h-4" />
                            You confirmed
                          </div>
                        )}

                        {!iou.holderConfirmed && (
                          <div className="text-sm text-muted-foreground">
                            Waiting for other party...
                          </div>
                        )}

                        <Button
                          onClick={() => handleDispute(iou.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          File Dispute
                        </Button>
                      </div>
                    )}

                    {iou.status === 'completed' && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-sm text-green-500 mb-3">
                          <CheckCircle className="w-4 h-4" />
                          Completed! +20 reputation earned
                        </div>
                        {iou.redemptionRequested && !iou.creatorDeliveredRedemption && (
                          <div className="space-y-2">
                            <div className="text-sm text-orange-500">
                              ⚠️ Holder requested redemption: Deliver {iou.hours} hours of {iou.creatorSkill || 'work'}
                            </div>
                            <Button
                              onClick={() => handleConfirmRedemption(iou.id)}
                              size="sm"
                              variant="default"
                            >
                              Confirm Delivered
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {iou.status === 'false_claim' && (
                      <div className="flex items-center gap-2 text-sm text-red-500 mt-4">
                        <XCircle className="w-4 h-4" />
                        False claim penalty: -20 reputation
                      </div>
                    )}

                    {iou.status === 'disputed' && (
                      <div className="flex items-center gap-2 text-sm text-red-500 mt-4">
                        <AlertTriangle className="w-4 h-4" />
                        Under dispute - Admin reviewing
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accepted IOUs */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              IOUs I Accepted ({acceptedIOUs.length})
            </h2>
            {acceptedIOUs.length === 0 ? (
              <div className="text-center py-12 bg-card/50 rounded-lg border border-border/40">
                <p className="text-muted-foreground">No IOUs accepted yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {acceptedIOUs.map((iou) => (
                  <div
                    key={iou.id}
                    className="p-6 bg-card/50 rounded-lg border border-border/40 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-foreground">{iou.description}</h3>
                          {getStatusBadge(iou.status)}
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>⏱️ {iou.hours} hours</span>
                          <span>📁 {iou.category}</span>
                          <span>💰 {iou.collateral} ETH</span>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Creator: {formatAddress(iou.creator)}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {iou.status === 'accepted' && (
                      <div className="flex gap-3 mt-4">
                        {!iou.holderConfirmed ? (
                          <Button
                            onClick={() => handleConfirm(iou.id, false)}
                            size="sm"
                            variant="default"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm Completion
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-green-500">
                            <CheckCircle className="w-4 h-4" />
                            You confirmed
                          </div>
                        )}

                        {!iou.creatorConfirmed && (
                          <div className="text-sm text-muted-foreground">
                            Waiting for creator...
                          </div>
                        )}

                        <Button
                          onClick={() => handleDispute(iou.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          File Dispute
                        </Button>
                      </div>
                    )}

                    {iou.status === 'completed' && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-sm text-green-500 mb-3">
                          <CheckCircle className="w-4 h-4" />
                          Completed! +20 reputation earned
                        </div>
                        {iou.creatorSkill && !iou.redemptionRequested && (
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                              💼 You can now redeem: {iou.hours} hours of {iou.creatorSkill}
                            </div>
                            <Button
                              onClick={() => handleRequestRedemption(iou.id)}
                              size="sm"
                              variant="default"
                            >
                              Request Redemption
                            </Button>
                          </div>
                        )}
                        {iou.redemptionRequested && !iou.creatorDeliveredRedemption && (
                          <div className="text-sm text-blue-500">
                            ⏳ Redemption requested - waiting for creator to deliver...
                          </div>
                        )}
                      </div>
                    )}

                    {iou.status === 'false_claim' && (
                      <div className="flex items-center gap-2 text-sm text-red-500 mt-4">
                        <XCircle className="w-4 h-4" />
                        False claim penalty: -20 reputation
                      </div>
                    )}

                    {iou.status === 'disputed' && (
                      <div className="flex items-center gap-2 text-sm text-red-500 mt-4">
                        <AlertTriangle className="w-4 h-4" />
                        Under dispute - Admin reviewing
                      </div>
                    )}

                    {iou.status === 'redeemed' && (
                      <div className="flex items-center gap-2 text-sm text-purple-500 mt-4">
                        <CheckCircle className="w-4 h-4" />
                        IOU Fully Redeemed! Lifecycle complete 🎉
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyIOUs;
