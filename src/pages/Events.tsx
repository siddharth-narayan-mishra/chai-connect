import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Lightbulb, Coffee } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Events = () => {
  // form state for scheduling an event
  const [form, setForm] = useState({
    userId: "",
    targetUserId: "",
    skillsRequired: "",
    exchangeType: "skills", // "skills" | "credits"
    creditsAmount: "",
    date: "",
    mode: "",
    contactEmail: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange = (k: string, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    // minimal validation
    if (!form.userId || !form.targetUserId || !form.date || !form.mode || !form.contactEmail) {
      alert("Please fill required fields: your id, target id, date, mode, and contact email.");
      return;
    }
    if (form.exchangeType === "skills" && !form.skillsRequired.trim()) {
      alert("Please specify skills required when exchanging skills.");
      return;
    }
    if (form.exchangeType === "credits" && !form.creditsAmount.trim()) {
      alert("Please specify number of credits to exchange.");
      return;
    }

    setSubmitting(true);
    // placeholder: replace with real API call
    try {
      const payload = { ...form };
      console.log("Scheduling event payload:", payload);
      // Simulate network
      await new Promise((r) => setTimeout(r, 700));
      setSuccessMsg("Event request sent. The receiver will be notified to accept.");
      setForm({
        userId: "",
        targetUserId: "",
        skillsRequired: "",
        exchangeType: "skills",
        creditsAmount: "",
        date: "",
        mode: "",
        contactEmail: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">

            {/* LEFT: existing events content (moved) */}
            <div>
              <div className="text-center mb-8 animate-fade-in">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-secondary" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Events & <span className="bg-gradient-primary bg-clip-text text-transparent">Meetups</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Join study groups, workshops, and casual chai sessions with fellow students
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <Users className="w-8 h-8 mb-2 text-secondary" />
                    <CardTitle>Study Groups</CardTitle>
                    <CardDescription>
                      Form or join regular study groups for specific subjects. Collaborate with peers and learn together over chai.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <Lightbulb className="w-8 h-8 mb-2 text-secondary" />
                    <CardTitle>Skill Workshops</CardTitle>
                    <CardDescription>
                      Attend peer-led workshops on coding, design, communication, and other valuable skills.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <Coffee className="w-8 h-8 mb-2 text-secondary" />
                    <CardTitle>Chai Sessions</CardTitle>
                    <CardDescription>
                      Casual meetups over tea/coffee to discuss ideas, share experiences, and build friendships.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <Calendar className="w-8 h-8 mb-2 text-secondary" />
                    <CardTitle>Hackathons & Competitions</CardTitle>
                    <CardDescription>
                      Participate in collaborative coding events, competitions, and team challenges.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card className="bg-gradient-primary text-primary-foreground mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-primary-foreground/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">Web Development Workshop</h3>
                      <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">This Week</span>
                    </div>
                    <p className="text-sm opacity-90 mb-2">Learn React basics from seniors who've built real projects</p>
                    <p className="text-sm">📅 Saturday, 4 PM | 📍 Library Seminar Hall</p>
                  </div>

                  <div className="bg-primary-foreground/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">Exam Prep Study Group</h3>
                      <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">Ongoing</span>
                    </div>
                    <p className="text-sm opacity-90 mb-2">Daily evening sessions for Mathematics and Physics</p>
                    <p className="text-sm">📅 Mon-Fri, 6 PM | 📍 Cafeteria 2nd Floor</p>
                  </div>

                  <div className="bg-primary-foreground/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">Career Guidance Chai Session</h3>
                      <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">Next Month</span>
                    </div>
                    <p className="text-sm opacity-90 mb-2">Alumni sharing internship and placement experiences</p>
                    <p className="text-sm">📅 Next Sunday, 3 PM | 📍 Student Lounge</p>
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

            {/* RIGHT: scheduling form */}
            <aside>
              <Card>
                <CardHeader>
                  <CardTitle>Schedule an Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs font-medium">Your User ID</label>
                      <Input value={form.userId} onChange={(e) => handleChange("userId", e.target.value)} placeholder="e.g., user_123" />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Target User ID</label>
                      <Input value={form.targetUserId} onChange={(e) => handleChange("targetUserId", e.target.value)} placeholder="Enter user id to connect" />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Skills Required (comma separated)</label>
                      <Textarea value={form.skillsRequired} onChange={(e) => handleChange("skillsRequired", e.target.value)} placeholder="e.g., React, Node.js" />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Exchange Type</label>
                      <div className="flex gap-3 mt-1">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="radio" name="exchange" checked={form.exchangeType === "skills"} onChange={() => handleChange("exchangeType", "skills")} />
                          Skills
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="radio" name="exchange" checked={form.exchangeType === "credits"} onChange={() => handleChange("exchangeType", "credits")} />
                          Credits
                        </label>
                      </div>
                    </div>

                    {form.exchangeType === "credits" ? (
                      <div>
                        <label className="text-xs font-medium">Number of Credits</label>
                        <Input value={form.creditsAmount} onChange={(e) => handleChange("creditsAmount", e.target.value)} placeholder="e.g., 5" />
                      </div>
                    ) : null}

                    <div>
                      <label className="text-xs font-medium">Date & Time</label>
                      <Input type="datetime-local" value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Mode of Event</label>
                      <Input value={form.mode} onChange={(e) => handleChange("mode", e.target.value)} placeholder="e.g., Online / Offline / Hybrid" />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Contact Email (for calendar invite)</label>
                      <Input value={form.contactEmail} onChange={(e) => handleChange("contactEmail", e.target.value)} placeholder="recipient@example.com" />
                    </div>

                    <div className="flex items-center gap-3">
                      <Button type="submit" variant="hero" disabled={submitting}>
                        {submitting ? "Scheduling..." : "Schedule Event"}
                      </Button>
                      <Button variant="ghost" onClick={() => setForm({
                        userId: "",
                        targetUserId: "",
                        skillsRequired: "",
                        exchangeType: "skills",
                        creditsAmount: "",
                        date: "",
                        mode: "",
                        contactEmail: "",
                      })}>Reset</Button>
                    </div>

                    {successMsg && <div className="text-sm text-green-600 mt-2">{successMsg}</div>}
                  </form>
                </CardContent>
              </Card>
            </aside>

          </div>
        </div>
      </main>
       <Footer />
     </div>
   );
 };
 
 export default Events;
