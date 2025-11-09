import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldQuestion, Lock, Heart, MessageCircle } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const AnonymousQA = () => {
  return (
    <div className="min-h-screen">
      <main className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <ShieldQuestion className="w-16 h-16 mx-auto mb-4 text-secondary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Anonymous <span className="bg-gradient-primary bg-clip-text text-transparent">Q&A</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A safe space to ask sensitive questions without revealing your identity
              </p>
            </div>

            <Card className="mb-8 border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">Why Anonymous Q&A?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Sometimes you need to ask questions about sensitive topics without the fear of judgment. Our anonymous Q&A platform provides a secure environment where you can:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Discuss mental health concerns and academic pressure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Report unfair practices or discrimination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Ask about personal struggles affecting academics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Seek guidance on difficult life decisions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Lock className="w-8 h-8 mb-2 text-secondary" />
                  <CardTitle>Complete Privacy</CardTitle>
                  <CardDescription>
                    Your identity is never revealed. Questions are posted anonymously with no way to trace back to you.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="w-8 h-8 mb-2 text-secondary" />
                  <CardTitle>Supportive Community</CardTitle>
                  <CardDescription>
                    Receive empathetic responses from peers and mentors who genuinely want to help.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <MessageCircle className="w-8 h-8 mb-2 text-secondary" />
                  <CardTitle>Moderated Space</CardTitle>
                  <CardDescription>
                    All responses are monitored to ensure respectful and constructive discussions.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="bg-gradient-primary text-primary-foreground mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Common Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Mental Health",
                    "Academic Pressure",
                    "Career Confusion",
                    "Financial Struggles",
                    "Relationship Issues",
                    "Discrimination",
                    "Exam Anxiety",
                    "Campus Concerns"
                  ].map((topic) => (
                    <div key={topic} className="bg-primary-foreground/10 rounded-lg p-3 text-center font-medium">
                      {topic}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
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

export default AnonymousQA;
