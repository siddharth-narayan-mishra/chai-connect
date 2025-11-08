import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Coins, Pencil, Star, Plus } from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------ Mock API ------------------ */
const fetchUserData = async () => {
  return Promise.resolve({
    name: "Siddharth Mishra",
    email: "siddharth@example.com",
    year: "4th Year",
    department: "Computer Science and Engineering",
    college: "National Institute of Technologu Rourkela",
    bio: "Tech Lead @OpenCode | Web Developer | Passionate about open-source and collaborative learning.",
    about:
      "I’m passionate about building software that empowers people to learn and collaborate. I love mentoring and exploring system design, open-source, and web performance.",
    credits: 250,
    sessionsCount: 25,
    sessions: [
      { title: "Intro to React Optimizations", date: "2025-05-12" },
      { title: "Building REST APIs", date: "2025-04-22" },
      { title: "Open-source collaboration", date: "2025-03-18" },
    ],
    recentActivities: [
      "Hosted a session: 'Intro to React Optimizations'",
      "Reviewed: 'Aarav Mehta' session",
      "Completed mentorship: 'Frontend architecture'",
    ],
    offeredSkills: ["React", "Next.js", "Node.js", "UI/UX"],
    wantedSkills: ["Rust", "Machine Learning"],
    reviews: [
      {
        name: "Animesh Patel",
        comment:
          "Very helpful and detailed explanations. We built a REST API together!",
      },
      {
        name: "Lord Sen",
        comment:
          "Explained frontend optimization in a simple way. Great experience!",
      },
      {
        name: "Shreyas Mohanty",
        comment:
          "Supportive and easy to collaborate with on open-source tasks.",
      },
      {
        name: "Saswat Dash",
        comment:
          "Provided clear guidance on project structuring and clean code practices.",
      },
      {
        name: "Aarav Mehta",
        comment:
          "Learnt a lot about security best practices during the exchange.",
      },
    ],
    stats: {
      exchanges: 18,
      mentorships: 9,
      rating: 4.8,
    },
  });
};

/* ------------------ Main Component ------------------ */
export default function MyProfile() {
  const [user, setUser] = useState<any>(null);
  const [editingMode, setEditingMode] = useState<
    "profile" | "offered" | "wanted" | "about" | null
  >(null);
  const [newSkill, setNewSkill] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviewsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchUserData().then((data) => setUser(data));
  }, []);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading profile...
      </div>
    );

  const {
    name,
    bio,
    about,
    credits,
    offeredSkills,
    wantedSkills,
    reviews,
    stats,
    email,
    year,
    department,
    college,
    sessionsCount,
    recentActivities,
    sessions,
  } = user;
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  /* ------------------ Handlers ------------------ */
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    const updatedSkills =
      editingMode === "offered"
        ? { offeredSkills: [...offeredSkills, newSkill.trim()] }
        : { wantedSkills: [...wantedSkills, newSkill.trim()] };

    setUser({ ...user, ...updatedSkills });
    setNewSkill("");
    setEditingMode(null);
  };

  const handleProfileSave = (updatedData: any) => {
    setUser({ ...user, ...updatedData });
    setEditingMode(null);
  };

  const handleAboutSave = (newAbout: string) => {
    setUser({ ...user, about: newAbout });
    setEditingMode(null);
  };

  const handleViewReviews = () => {
    setShowAllReviews(true);
    setTimeout(() => {
      reviewsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  /* ------------------ Render ------------------ */
  return (
    <div className="min-h-screen bg-muted/30 p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Profile Header */}
        <Card className="border-none shadow-sm">
          <CardContent className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8 p-8">
            <div className="flex items-center gap-6">
              <Avatar className="h-28 w-28">
                <AvatarImage src="/avatars/user.jpg" alt="User avatar" />
                <AvatarFallback>
                  {name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
                <p className="text-sm text-muted-foreground">{email}</p>
                <p className="text-muted-foreground">
                  {bio.length > 90 ? bio.slice(0, 90) + "..." : bio}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Full Stack", "Open Source", "Mentor"].map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {year} • {department} • {college}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex items-center gap-2 text-amber-600 font-medium">
                <Coins className="h-5 w-5" />
                <span>{credits} credits</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>{sessionsCount}</strong> sessions •{" "}
                <strong>{stats.rating}</strong> rating
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingMode("profile")}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
              <Link to="/credits" className="w-full md:w-auto">
                <Button variant="secondary" size="sm" className="mt-2">
                  Earn Credits
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>About</CardTitle>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setEditingMode("about")}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            {about}
          </CardContent>
        </Card>

        {/* Skills */}
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Skills Offered", skills: offeredSkills, mode: "offered" },
            { title: "Skills Wanted", skills: wantedSkills, mode: "wanted" },
          ].map((section) => (
            <Card key={section.title}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{section.title}</CardTitle>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setEditingMode(section.mode as "offered" | "wanted")
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {section.skills.map((skill: string) => (
                  <Badge
                    key={skill}
                    variant={
                      section.mode === "offered" ? "default" : "secondary"
                    }
                  >
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions & Recent Activities */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Public: sessions details, reviews & ratings are visible to other
                users. Use the actions below to view them or manage account
                settings.
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    // navigate to sessions list (unified route)
                    window.location.href = "/sessions";
                  }}
                >
                  View Sessions ({sessionsCount})
                </Button>
                <Button variant="ghost" onClick={handleViewReviews}>
                  Reviews & Ratings
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setEditingMode("profile")}
                >
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {recentActivities.map((act: string, idx: number) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="text-xs text-muted-foreground">
                Sessions ({sessions.length}) — click "View Sessions" to explore
                details.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews */}
        <div ref={reviewsRef} id="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {displayedReviews.map((review: any, i: number) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-3.5 w-3.5 ${
                            index < 4 ? "fill-current" : "text-muted fill-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-1">{review.comment}</p>
                  {i < displayedReviews.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}

              <div className="flex justify-center mt-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-sm font-medium"
                >
                  {showAllReviews ? "Show Less Reviews" : "Read More Reviews"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { label: "Exchanges Done", value: stats.exchanges },
              { label: "Mentorships", value: stats.mentorships },
              { label: "Reviews", value: reviews.length },
              { label: "Average Rating", value: stats.rating },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Unified Dialog */}
      <Dialog open={!!editingMode} onOpenChange={() => setEditingMode(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingMode === "profile" && "Edit Profile"}
              {editingMode === "offered" && "Add Offered Skill"}
              {editingMode === "wanted" && "Add Wanted Skill"}
              {editingMode === "about" && "Edit About Section"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {editingMode === "profile" && (
              <ProfileEditDialog
                name={name}
                bio={bio}
                onSave={(updated) => handleProfileSave(updated)}
              />
            )}

            {(editingMode === "offered" || editingMode === "wanted") && (
              <SkillAddDialog
                newSkill={newSkill}
                setNewSkill={setNewSkill}
                onAdd={handleAddSkill}
              />
            )}

            {editingMode === "about" && (
              <AboutEditDialog about={about} onSave={handleAboutSave} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ------------------ Subcomponents ------------------ */
function ProfileEditDialog({
  name,
  bio,
  onSave,
}: {
  name: string;
  bio: string;
  onSave: (data: { name: string; bio: string }) => void;
}) {
  const [tempName, setTempName] = useState(name);
  const [tempBio, setTempBio] = useState(bio);

  return (
    <>
      <div className="space-y-1">
        <label className="text-sm font-medium">Name</label>
        <Input value={tempName} onChange={(e) => setTempName(e.target.value)} />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Bio</label>
        <Textarea
          rows={3}
          value={tempBio}
          onChange={(e) => setTempBio(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => onSave({ name: tempName, bio: tempBio })}>
          Save Changes
        </Button>
      </div>
    </>
  );
}

function SkillAddDialog({
  newSkill,
  setNewSkill,
  onAdd,
}: {
  newSkill: string;
  setNewSkill: (val: string) => void;
  onAdd: () => void;
}) {
  return (
    <>
      <div className="space-y-1">
        <label className="text-sm font-medium">Skill Name</label>
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="e.g., Docker, Python, UI Design"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={onAdd}>Add Skill</Button>
      </div>
    </>
  );
}

function AboutEditDialog({
  about,
  onSave,
}: {
  about: string;
  onSave: (val: string) => void;
}) {
  const [tempAbout, setTempAbout] = useState(about);
  return (
    <>
      <div className="space-y-1">
        <label className="text-sm font-medium">About</label>
        <Textarea
          rows={5}
          value={tempAbout}
          onChange={(e) => setTempAbout(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => onSave(tempAbout)}>Save Changes</Button>
      </div>
    </>
  );
}
