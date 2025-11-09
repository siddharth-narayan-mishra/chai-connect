import { useState } from "react";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function StartMentoring() {
  const [form, setForm] = useState({
    topics: "",
    github: "",
    linkedin: "",
    email: "",
    year: "",
    college: "",
    cgpa: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (k: string, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    // minimal validation
    if (!form.topics.trim() || !form.email.trim()) {
      alert("Please provide at least topics you want to teach and your email.");
      return;
    }
    setSubmitting(true);
    try {
      // Placeholder: replace with API call
      await new Promise((r) => setTimeout(r, 600));
      setSuccess("Added you as a mentor — others can now approach you for help.");
      setForm({
        topics: "",
        github: "",
        linkedin: "",
        email: "",
        year: "",
        college: "",
        cgpa: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="pt-24 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Start Mentoring</h1>
            <p className="text-sm text-muted-foreground">Tell others what you can teach and how to reach you.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mentor Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-medium">Topics you want to teach</label>
                  <Textarea value={form.topics} onChange={(e) => handleChange("topics", e.target.value)} placeholder="e.g., React, System Design, Interview Prep" />
                </div>

                <div>
                  <label className="text-xs font-medium">GitHub Profile URL</label>
                  <Input value={form.github} onChange={(e) => handleChange("github", e.target.value)} placeholder="https://github.com/yourname" />
                </div>

                <div>
                  <label className="text-xs font-medium">LinkedIn Profile URL</label>
                  <Input value={form.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} placeholder="https://linkedin.com/in/yourname" />
                </div>

                <div>
                  <label className="text-xs font-medium">Email</label>
                  <Input value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="you@example.com" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium">Year</label>
                    <Input value={form.year} onChange={(e) => handleChange("year", e.target.value)} placeholder="e.g., 3rd Year" />
                  </div>
                  <div>
                    <label className="text-xs font-medium">CGPA</label>
                    <Input value={form.cgpa} onChange={(e) => handleChange("cgpa", e.target.value)} placeholder="e.g., 8.5" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium">College</label>
                  <Input value={form.college} onChange={(e) => handleChange("college", e.target.value)} placeholder="Your college name" />
                </div>

                <div className="flex items-center gap-3">
                  <Button type="submit" variant="hero" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit"}
                  </Button>
                  <Link to="/#mentorship">
                    <Button variant="ghost">Back</Button>
                  </Link>
                </div>

                {success && (
                  <div className="text-sm text-green-600 mt-2">{success}</div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
