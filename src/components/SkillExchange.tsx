import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Coffee, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const skills = [
  {
    id: 1,
    title: "Web Development Basics",
    provider: "Sarah Chen",
    category: "Tech",
    priority: "medium",
    rating: 4.8,
    cost: 1,
    description: "Learn HTML, CSS, and JavaScript fundamentals",
  },
  {
    id: 2,
    title: "Resume Review & Tips",
    provider: "Raj Patel",
    category: "Career",
    priority: "high",
    rating: 4.9,
    cost: 1,
    description: "Get your resume reviewed by a senior with multiple offers",
  },
  {
    id: 3,
    title: "Data Structures Help",
    provider: "Mike Johnson",
    category: "Academics",
    priority: "medium",
    rating: 4.7,
    cost: 2,
    description: "One-on-one help with DSA concepts and problem-solving",
  },
  {
    id: 4,
    title: "Public Speaking Tips",
    provider: "Priya Sharma",
    category: "Soft Skills",
    priority: "low",
    rating: 4.6,
    cost: 1,
    description: "Overcome stage fear and improve presentation skills",
  },
];

const SkillExchange = () => {
  return (
    <section id="exchange" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Skill <span className="bg-gradient-primary bg-clip-text text-transparent">Exchange Board</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse available skills or post what you can offer. Everything costs just a cup of chai!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card 
              key={skill.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={skill.priority === "high" ? "default" : "secondary"}>
                    {skill.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-secondary">
                    {Array.from({ length: skill.cost }).map((_, i) => (
                      <Coffee key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg">{skill.title}</CardTitle>
                <CardDescription>by {skill.provider}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{skill.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="font-medium">{skill.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>1 hour</span>
                  </div>
                </div>

                <Link to="/events" className="block">
                  <Button className="w-full" variant="outline">
                    Connect
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/forum">
            <Button variant="hero" size="lg">
              Post Your Skill
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SkillExchange;
