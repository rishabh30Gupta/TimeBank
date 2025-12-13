import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ChronoRaven } from "./ChronoRaven";
import { Wallet } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/create", label: "Create IOU" },
  { href: "/my-ious", label: "My IOUs" },
  { href: "/reputation", label: "Reputation" },
];

export const Navbar = () => {
  const location = useLocation();

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
                className={`text-sm transition-colors duration-100 ${
                  location.pathname === link.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet Connect */}
          <Button variant="wallet" size="sm">
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
};
