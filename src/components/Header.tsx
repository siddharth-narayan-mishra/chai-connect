import { Coffee } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-8 h-8 text-secondary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              bytee
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#exchange" className="text-foreground hover:text-primary transition-colors">
              Skill Exchange
            </a>
            <a href="#mentorship" className="text-foreground hover:text-primary transition-colors">
              Mentorship
            </a>
            <a href="forum" className="text-foreground hover:text-primary transition-colors">
              Forum
            </a>
            <a href="events" className="text-foreground hover:text-primary transition-colors">
              Events
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/features">
              <Button variant="hero" size="default">Get Started</Button>
            </Link>

            <Link to="/profile" title="Your profile" aria-label="Your profile">
              <Button variant="ghost" size="icon" className="p-2">
                <User className="w-5 h-5 text-foreground" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
