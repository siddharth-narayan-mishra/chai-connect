import { Coffee, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-community.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Coffee className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-primary">Knowledge Over Chai</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Share Knowledge,
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Build Community
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              bytee connects college students through a barter system of skills and mentorship. 
              Exchange knowledge for a cup of tea or coffee, not money.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/features">
                <Button variant="hero" size="lg" className="group">
                  Start Exchanging
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/credits">
                <Button variant="outline" size="lg">
                  How It Works
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">Students Connected</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">10K+</div>
                <div className="text-sm text-muted-foreground">Exchanges Made</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Colleges</div>
              </div>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20"></div>
            <img 
              src={heroImage} 
              alt="Students collaborating over coffee"
              className="relative rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
