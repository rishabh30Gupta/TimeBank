import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ChronoRaven } from "./ChronoRaven";
import { Wallet, Star } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";
import { formatAddress } from "@/lib/web3";
import { useState, useEffect } from "react";
import { getUserReputation } from "@/contracts";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/create", label: "Create IOU" },
  { href: "/my-ious", label: "My IOUs" },
  { href: "/reputation", label: "Reputation" },
];

export const Navbar = () => {
  const location = useLocation();
  const { account, isConnected, isConnecting, connect } = useWeb3();
  const [reputation, setReputation] = useState<number>(100);

  useEffect(() => {
    const loadReputation = async () => {
      if (isConnected && account) {
        try {
          // Use mock data instead of blockchain
          const { getMockReputation } = await import('@/lib/mockData');
          const repData = getMockReputation(account);
          const score = Number(repData.score);
          // If score is 0 or undefined, default to 100 (new user)
          setReputation(score > 0 ? score : 100);
        } catch (error) {
          console.error("Error loading reputation:", error);
          setReputation(100); // Default for new users
        }
      } else {
        setReputation(100); // Default when not connected
      }
    };

    loadReputation();

    // Poll every 2 seconds to keep navbar updated
    const interval = setInterval(loadReputation, 2000);

    return () => clearInterval(interval);
  }, [isConnected, account]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <ChronoRaven size="md" className="text-primary" />
            <span className="text-lg font-semibold text-foreground">TimeBank</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm transition-colors duration-100 ${location.pathname === link.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Reputation + Wallet */}
          <div className="flex items-center gap-3">
            {/* Reputation Display */}
            {isConnected && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-sm font-medium text-primary">{reputation}</span>
              </div>
            )}

            {/* Wallet Connect */}
            <Button
              variant="wallet"
              size="sm"
              onClick={connect}
              disabled={isConnecting || isConnected}
            >
              <Wallet className="w-4 h-4" />
              {isConnecting
                ? "Connecting..."
                : isConnected
                  ? formatAddress(account!)
                  : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
