import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Briefcase, TrendingUp, Users, Target } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CareerGuidance = () => {
  const { toast } = useToast();
  const [mentorName, setMentorName] = useState("");
  const [guidanceDetails, setGuidanceDetails] = useState("");
  const [offerType, setOfferType] = useState("credits");
  const [creditsAmount, setCreditsAmount] = useState("");
  const [guidanceType, setGuidanceType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Sent!",
      description: "Schedule details will be asked when mentor accepts.",
    });
    // Reset form
    setMentorName("");
    setGuidanceDetails("");
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
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-secondary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Career <span className="bg-gradient-primary bg-clip-text text-transparent">Guidance</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with seniors and alumni for personalized career mentorship over chai
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section - 70% */}
              <div className="lg:w-[70%] space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <TrendingUp className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Internship Insights</CardTitle>
                      <CardDescription>
                        Learn from seniors who've secured internships at top companies. Get tips on applications, interviews, and the selection process.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Users className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>One-on-One Mentorship</CardTitle>
                      <CardDescription>
                        Schedule personal sessions with mentors who align with your career goals. Exchange knowledge for a cup of coffee.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Target className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Career Path Planning</CardTitle>
                      <CardDescription>
                        Get guidance on choosing the right specialization, building your profile, and planning your career trajectory.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Briefcase className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Industry Insights</CardTitle>
                      <CardDescription>
                        Learn about different industries, job roles, and what companies look for in candidates from those who've been there.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="bg-gradient-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="text-2xl">How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">1</div>
                      <div>
                        <h3 className="font-semibold mb-1">Browse Mentors</h3>
                        <p className="opacity-90">Find seniors with experience in your area of interest</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">2</div>
                      <div>
                        <h3 className="font-semibold mb-1">Request a Session</h3>
                        <p className="opacity-90">Send a request offering a tea/coffee credit in exchange</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">3</div>
                      <div>
                        <h3 className="font-semibold mb-1">Meet & Learn</h3>
                        <p className="opacity-90">Connect over chai and get personalized career guidance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Section - 30% */}
              <div className="lg:w-[30%]">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Request Mentorship</CardTitle>
                    <CardDescription>Fill in the details to connect with a mentor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mentor-name">Mentor Name</Label>
                        <Input
                          id="mentor-name"
                          placeholder="Enter mentor's name"
                          value={mentorName}
                          onChange={(e) => setMentorName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="guidance-details">Guidance Type & Details</Label>
                        <Textarea
                          id="guidance-details"
                          placeholder="What kind of guidance do you need?"
                          value={guidanceDetails}
                          onChange={(e) => setGuidanceDetails(e.target.value)}
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
                            placeholder="e.g., Web Development"
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

export default CareerGuidance;
