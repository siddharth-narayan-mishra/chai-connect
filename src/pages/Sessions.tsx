import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

/**
 * Simple mock fetch — replace with real API call if available.
 */
async function fetchSessions() {
  // Try real endpoint first (if exists), otherwise fall back to mock
  try {
    const res = await fetch("/api/sessions");
    if (res.ok) return res.json();
  } catch {}
  return Promise.resolve([
    { id: 1, title: "Intro to React Optimizations", date: "2025-05-12", host: "Siddharth Mishra", notes: "Performance patterns, memoization, code-splitting." },
    { id: 2, title: "Building REST APIs", date: "2025-04-22", host: "Siddharth Mishra", notes: "Design, validation, error handling." },
    { id: 3, title: "Open-source collaboration", date: "2025-03-18", host: "Siddharth Mishra", notes: "PR workflow, maintainers' expectations." },
  ]);
}

export default function Sessions() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    fetchSessions().then((data) => {
      setSessions(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-10 bg-muted/30">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Sessions</h1>
          <Link to="/profile">
            <Button variant="ghost" size="sm">Back to Profile</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-muted-foreground">Loading sessions...</div>
            ) : sessions.length === 0 ? (
              <div className="text-sm text-muted-foreground">No sessions found.</div>
            ) : (
              <div className="space-y-4">
                {sessions.map((s) => (
                  <div key={s.id} className="p-4 border rounded-md bg-background">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{s.title}</h3>
                        <div className="text-xs text-muted-foreground">
                          {s.date} • Host: {s.host}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{/* placeholder for actions */}</div>
                    </div>
                    <Separator className="my-2" />
                    <p className="text-sm text-muted-foreground">{s.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
