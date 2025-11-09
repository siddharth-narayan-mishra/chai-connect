import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BookOpen, GraduationCap, FileText, Users } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
   
const AcademicSupport = () => {
  const { toast } = useToast();
  const [mentorName, setMentorName] = useState("");
  const [supportDetails, setSupportDetails] = useState("");
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
    setSupportDetails("");
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
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-secondary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Academic <span className="bg-gradient-primary bg-clip-text text-transparent">Support</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Get help with coursework, exam prep, and study strategies from your peers
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section - 70% */}
              <div className="lg:w-[70%] space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <GraduationCap className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Subject Tutoring</CardTitle>
                      <CardDescription>
                        Find students who excel in specific subjects and exchange knowledge. Learn difficult concepts in a collaborative environment.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <FileText className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Exam Preparation</CardTitle>
                      <CardDescription>
                        Connect with students who've aced exams. Get study materials, tips, and strategies for scoring better.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Users className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Study Groups</CardTitle>
                      <CardDescription>
                        Form or join study groups with peers taking the same courses. Learn together over regular chai sessions.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <BookOpen className="w-8 h-8 mb-2 text-secondary" />
                      <CardTitle>Assignment Help</CardTitle>
                      <CardDescription>
                        Stuck on an assignment? Get guidance and clarification from peers who understand the subject matter.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="bg-gradient-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="text-2xl">Popular Subjects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {["Mathematics", "Physics", "Chemistry", "Computer Science", "Electronics", "Mechanics", "Economics", "Statistics", "Biology"].map((subject) => (
                        <div key={subject} className="bg-primary-foreground/10 rounded-lg p-3 text-center font-medium">
                          {subject}
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
                    <CardTitle>Request Support</CardTitle>
                    <CardDescription>Fill in the details to get academic help</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mentor-name">Helper Name</Label>
                        <Input
                          id="mentor-name"
                          placeholder="Enter helper's name"
                          value={mentorName}
                          onChange={(e) => setMentorName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="support-details">Support Type & Details</Label>
                        <Textarea
                          id="support-details"
                          placeholder="What academic help do you need?"
                          value={supportDetails}
                          onChange={(e) => setSupportDetails(e.target.value)}
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
                            placeholder="e.g., Mathematics Tutoring"
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

export default AcademicSupport;
