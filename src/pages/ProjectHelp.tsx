import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, GitBranch, Lightbulb, Users } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProjectHelp = () => {
  const { toast } = useToast();
  const [helperName, setHelperName] = useState("");
  const [helpType, setHelpType] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [offerType, setOfferType] = useState("credits");
  const [creditsAmount, setCreditsAmount] = useState("");
  const [guidanceType, setGuidanceType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Sent!",
      description: "Schedule details will be asked when helper accepts.",
    });
    // Reset form
    setHelperName("");
    setHelpType("");
    setProjectDetails("");
    setOfferType("credits");
    setCreditsAmount("");
    setGuidanceType("");
  };

  return (
    <div className="min-h-screen">
      <main className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <Code className="w-16 h-16 mx-auto mb-4 text-secondary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Project <span className="bg-gradient-primary bg-clip-text text-transparent">Help</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Collaborate on projects and learn from experienced developers in your community
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section - 70% */}
              <div className="lg:w-[70%] space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <GitBranch className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Code Reviews</CardTitle>
                      <CardDescription>
                        Get your code reviewed by experienced developers. Learn best practices, improve code quality, and avoid common pitfalls.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Lightbulb className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Project Ideas</CardTitle>
                      <CardDescription>
                        Brainstorm project ideas with peers. Get feedback on your concepts and find collaborators for ambitious projects.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Users className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Team Collaboration</CardTitle>
                      <CardDescription>
                        Find team members for hackathons, academic projects, or personal side projects. Build together over chai.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Code className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Debug Help</CardTitle>
                      <CardDescription>
                        Stuck with a bug? Connect with peers who can help troubleshoot and solve technical challenges.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="bg-gradient-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="text-2xl">Popular Tech Stacks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {["React", "Python", "Node.js", "Flutter", "Java", "C++", "Django", "MongoDB", "PostgreSQL"].map((tech) => (
                        <div key={tech} className="bg-primary-foreground/10 rounded-lg p-3 text-center font-medium">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Section - 30% */}
              <div className="lg:w-[30%]">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Request Project Help</CardTitle>
                    <CardDescription>Fill in the details to get assistance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="helper-name">Helper Name</Label>
                        <Input
                          id="helper-name"
                          placeholder="Enter helper's name"
                          value={helperName}
                          onChange={(e) => setHelperName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="help-type">Type of Help Needed</Label>
                        <Select value={helpType} onValueChange={setHelpType} required>
                          <SelectTrigger id="help-type">
                            <SelectValue placeholder="Select help type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="code-review">Code Review</SelectItem>
                            <SelectItem value="collaboration">Team Collaboration</SelectItem>
                            <SelectItem value="idea">Project Ideas</SelectItem>
                            <SelectItem value="debug">Debug Help</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="project-details">Project Details</Label>
                        <Textarea
                          id="project-details"
                          placeholder="Describe your project and what help you need"
                          value={projectDetails}
                          onChange={(e) => setProjectDetails(e.target.value)}
                          required
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>What do you want to offer?</Label>
                        <RadioGroup value={offerType} onValueChange={setOfferType}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="credits" id="credits" />
                            <Label htmlFor="credits">Credits</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="guidance" id="guidance" />
                            <Label htmlFor="guidance">Guidance</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {offerType === "credits" && (
                        <div className="space-y-2">
                          <Label htmlFor="credits-amount">Number of Credits</Label>
                          <Input
                            id="credits-amount"
                            type="number"
                            placeholder="e.g., 2"
                            value={creditsAmount}
                            onChange={(e) => setCreditsAmount(e.target.value)}
                            required
                            min="1"
                          />
                        </div>
                      )}

                      {offerType === "guidance" && (
                        <div className="space-y-2">
                          <Label htmlFor="guidance-type">Type of Guidance You Offer</Label>
                          <Input
                            id="guidance-type"
                            placeholder="e.g., Frontend Development"
                            value={guidanceType}
                            onChange={(e) => setGuidanceType(e.target.value)}
                            required
                          />
                        </div>
                      )}

                      <Button type="submit" className="w-full" variant="hero">
                        Send Request
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link to="/features">
                <Button variant="outline" size="lg">
                  Back to Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectHelp;
