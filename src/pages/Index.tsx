import Hero from "@/components/Hero";
import SkillExchange from "@/components/SkillExchange";
import Mentorship from "@/components/Mentorship";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <SkillExchange />
      <Mentorship />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
