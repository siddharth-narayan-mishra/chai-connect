import { Link } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, BookOpen, Code, MessageSquare, Coffee, ShieldQuestion, Calendar, Award, Video } from "lucide-react";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Briefcase,
    title: "Career Guidance",
    description: "Get personalized mentorship from seniors about internships, placements, and career paths.",
    path: "/career-guidance",
    color: "text-blue-500"
  },
  {
    icon: BookOpen,
    title: "Academic Support",
    description: "Connect with peers for help with coursework, exam prep, and study strategies.",
    path: "/academic-support",
    color: "text-green-500"
  },
  {
    icon: Code,
    title: "Project Help",
    description: "Collaborate on projects, get code reviews, and learn from experienced developers.",
    path: "/project-help",
    color: "text-purple-500"
  },
  {
    icon: MessageSquare,
    title: "Soft Skills",
    description: "Enhance communication, leadership, and presentation skills through peer learning.",
    path: "/soft-skills",
    color: "text-orange-500"
  },
  {
    icon: Coffee,
    title: "Tea/Coffee Credits",
    description: "Earn and redeem credits for your contributions to the community.",
    path: "/credits",
    color: "text-amber-600"
  },
  {
    icon: ShieldQuestion,
    title: "Anonymous Q&A",
    description: "Ask sensitive questions about academics, mental health, or campus issues anonymously.",
    path: "/anonymous-qa",
    color: "text-indigo-500"
  },
  {
    icon: Calendar,
    title: "Events & Meetups",
    description: "Join study groups, workshops, and casual chai sessions with fellow students.",
    path: "/events",
    color: "text-pink-500"
  },
  {
    icon: Award,
    title: "Trust Score",
    description: "Build your reputation by helping others and receiving positive feedback.",
    path: "/trust-score",
    color: "text-yellow-600"
  },
  {
    icon: Video,
    title: "YT Video Analyzer",
    description: "Get summaries and Q&A assistance from YouTube educational videos.",
    path: "/video-analyzer",
    color: "text-red-500"
  }
];

const Features = () => {
  return (
    <div className="min-h-screen">
      <main className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our <span className="bg-gradient-primary bg-clip-text text-transparent">Features</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose what you need - all powered by the spirit of sharing knowledge over chai
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.path} to={feature.path}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary">
                    <CardHeader>
                      <Icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
