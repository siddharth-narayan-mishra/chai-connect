import { Button } from "./ui/button";
import { Coffee, ArrowRight } from "lucide-react";
import coffeeIcon from "@/assets/coffee-icon.png";
import { Link } from "react-router-dom";
   
const CTA = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-primary rounded-3xl p-8 md:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <img src={coffeeIcon} alt="" className="w-full h-full object-contain" />
          </div>
          
          <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto text-primary-foreground">
            <Coffee className="w-16 h-16 mx-auto animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Start Learning?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of students who are already exchanging knowledge over chai. 
              Your next breakthrough is just a conversation away.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button variant="secondary" size="lg" className="group">
                  Join bytee Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
