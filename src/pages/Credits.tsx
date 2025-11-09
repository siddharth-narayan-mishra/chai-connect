import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Award, TrendingUp, Gift } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Credits = () => {
  return (
    <div className="min-h-screen">
      <main className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <Coffee className="w-16 h-16 mx-auto mb-4 text-secondary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tea/Coffee <span className="bg-gradient-primary bg-clip-text text-transparent">Credits</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Our unique barter system where knowledge is exchanged for chai
              </p>
            </div>

            <Card className="mb-8 border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">How Credits Work</CardTitle>
                <CardDescription>
                  Credits are the symbolic currency of knowledge sharing on bytee
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-1">Earn Credits</h3>
                    <p className="text-muted-foreground">Help others by sharing your knowledge, tutoring, or providing mentorship. Receive credits as appreciation.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-1">Spend Credits</h3>
                    <p className="text-muted-foreground">Use your earned credits to request help, get mentorship, or join study sessions with others.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-1">Redeem for Real Chai</h3>
                    <p className="text-muted-foreground">Accumulated credits can be redeemed for actual tea/coffee at campus cafeterias or partner outlets.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Award className="w-8 h-8 mb-2 text-secondary" />
                  <CardTitle>Fair Pricing</CardTitle>
                  <CardDescription>
                    A charge limit ensures all exchanges are affordable and accessible to everyone in the community.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="w-8 h-8 mb-2 text-secondary" />
                  <CardTitle>Track Progress</CardTitle>
                  <CardDescription>
                    Monitor your earned and spent credits. See how much you've contributed to the community.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Gift className="w-8 h-8 mb-2 text-secondary" />
                  <CardTitle>Bonus Credits</CardTitle>
                  <CardDescription>
                    Earn bonus credits for exceptional contributions, high ratings, and consistent participation.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-2xl">Credit Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-primary-foreground/10 p-3 rounded">
                    <span className="font-medium">Quick Question (15 min)</span>
                    <span className="font-bold">1 Credit</span>
                  </div>
                  <div className="flex justify-between items-center bg-primary-foreground/10 p-3 rounded">
                    <span className="font-medium">Study Session (1 hour)</span>
                    <span className="font-bold">3 Credits</span>
                  </div>
                  <div className="flex justify-between items-center bg-primary-foreground/10 p-3 rounded">
                    <span className="font-medium">Project Review</span>
                    <span className="font-bold">4 Credits</span>
                  </div>
                  <div className="flex justify-between items-center bg-primary-foreground/10 p-3 rounded">
                    <span className="font-medium">Career Mentorship Session</span>
                    <span className="font-bold">5 Credits</span>
                  </div>
                </div>
              </CardContent>
            </Card>

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

export default Credits;
