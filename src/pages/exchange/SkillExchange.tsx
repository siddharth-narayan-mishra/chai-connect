import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Sparkles, TrendingUp, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import ExchangePostCard from "./components/ExchangePostCard";
import { getAuthToken } from "@/lib/getAuthToken";

const API_BASE = import.meta.env.VITE_API_BASE;
const AUTH_TOKEN = getAuthToken();

export default function SkillExchange() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creditsRequested: "",
    creditsOffered: "",
    skillsRequested: "",
    skillsOffered: "",
    durationValue: "",
    durationUnit: "days",
    locationType: "online",
    availabilitySchedule: "",
  });

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/exchange/requests`);
      setPosts(res.data.exchangeRequests || res.data);
    } catch (err) {
      console.error("Error fetching posts:", err.message);
      toast.error("Failed to load skill exchanges");
    }
  };

  const handleCreateExchange = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.warning("Please fill in required fields");
      return;
    }

    try {
      await axios.post(
        `${API_BASE}/exchange/requests`,
        {
          title: formData.title,
          description: formData.description,
          creditsRequested: Number(formData.creditsRequested) || 0,
          creditsOffered: Number(formData.creditsOffered) || 0,
          skillsRequested: formData.skillsRequested
            ? formData.skillsRequested.split(",").map((s) => s.trim())
            : [],
          skillsOffered: formData.skillsOffered
            ? formData.skillsOffered.split(",").map((s) => s.trim())
            : [],
          duration: {
            value: Number(formData.durationValue) || 1,
            unit: formData.durationUnit,
          },
          availabilitySchedule: formData.availabilitySchedule,
          location: {
            type: formData.locationType,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Exchange request created successfully!");
      setOpen(false);
      fetchPosts();
      setFormData({
        title: "",
        description: "",
        creditsRequested: "",
        creditsOffered: "",
        skillsRequested: "",
        skillsOffered: "",
        durationValue: "",
        durationUnit: "days",
        locationType: "online",
        availabilitySchedule: "",
      });
    } catch (err) {
      console.error("Error creating exchange:", err);
      toast.error("Failed to create exchange request");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.skillsOffered?.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      post.skillsRequested?.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (!posts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading exchanges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  Skill Exchange
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Discover opportunities and share your expertise with the
                community
              </p>
            </div>
            <Button
              onClick={() => setOpen(true)}
              size="lg"
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Exchange
            </Button>
          </div>

          {/* Stats & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by title, skills, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 border-2 focus-visible:ring-2 focus-visible:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">{posts.length}</span>
              <span className="text-sm text-muted-foreground">
                Active Exchanges
              </span>
            </div>
          </div>
        </div>

        {/* Exchange Posts */}
        <div className="space-y-5">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <ExchangePostCard key={post._id} exchange={post} />
            ))
          ) : searchQuery ? (
            <div className="text-center py-16 space-y-3">
              <Search className="w-16 h-16 text-muted-foreground/40 mx-auto" />
              <p className="text-lg font-medium text-muted-foreground">
                No matches found
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search terms
              </p>
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="p-4 bg-primary/10 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-muted-foreground">
                  No exchanges yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Be the first to create a skill exchange!
                </p>
              </div>
              <Button onClick={() => setOpen(true)} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Create First Exchange
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Create Exchange Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <DialogTitle className="text-2xl">
                Create Skill Exchange
              </DialogTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Share what you can offer and what you're looking for
            </p>
          </DialogHeader>

          <div className="space-y-5 mt-4">
            {/* Basic Info Section */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Basic Information
              </h3>

              <div>
                <Label className="text-base">Title *</Label>
                <Input
                  placeholder="e.g., Trading Python tutoring for Web Design help"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-1.5 h-11"
                />
              </div>

              <div>
                <Label className="text-base">Description *</Label>
                <Textarea
                  placeholder="Describe what you're offering and what you're seeking in detail..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1.5 min-h-[100px]"
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
              <h3 className="font-semibold text-sm text-green-700 dark:text-green-400 uppercase tracking-wide">
                Skills Exchange
              </h3>

              <div>
                <Label className="text-base">Skills You're Offering</Label>
                <Input
                  placeholder="Comma separated (e.g., React, UI Design, Node.js)"
                  value={formData.skillsOffered}
                  onChange={(e) =>
                    setFormData({ ...formData, skillsOffered: e.target.value })
                  }
                  className="mt-1.5 h-11 bg-background"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Enter skills separated by commas
                </p>
              </div>

              <div>
                <Label className="text-base">Skills You're Requesting</Label>
                <Input
                  placeholder="Comma separated (e.g., Python, Data Science, Machine Learning)"
                  value={formData.skillsRequested}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skillsRequested: e.target.value,
                    })
                  }
                  className="mt-1.5 h-11 bg-background"
                />
              </div>
            </div>

            {/* Credits Section */}
            <div className="space-y-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
              <h3 className="font-semibold text-sm text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                Credit Exchange
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-base">Credits Offered</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.creditsOffered}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        creditsOffered: e.target.value,
                      })
                    }
                    className="mt-1.5 h-11 bg-background"
                  />
                </div>
                <div>
                  <Label className="text-base">Credits Requested</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 100"
                    value={formData.creditsRequested}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        creditsRequested: e.target.value,
                      })
                    }
                    className="mt-1.5 h-11 bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Duration & Location Section */}
            <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
              <h3 className="font-semibold text-sm text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                Duration & Logistics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-base">Duration Value</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 2"
                    value={formData.durationValue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationValue: e.target.value,
                      })
                    }
                    className="mt-1.5 h-11 bg-background"
                  />
                </div>
                <div>
                  <Label className="text-base">Duration Unit</Label>
                  <select
                    className="w-full border rounded-md p-2.5 bg-background mt-1.5 h-11"
                    value={formData.durationUnit}
                    onChange={(e) =>
                      setFormData({ ...formData, durationUnit: e.target.value })
                    }
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="sessions">Sessions</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-base">Location Type</Label>
                <select
                  className="w-full border rounded-md p-2.5 bg-background mt-1.5 h-11"
                  value={formData.locationType}
                  onChange={(e) =>
                    setFormData({ ...formData, locationType: e.target.value })
                  }
                >
                  <option value="online">🌐 Online</option>
                  <option value="in_person">📍 In Person</option>
                  <option value="hybrid">🔄 Hybrid</option>
                </select>
              </div>

              <div>
                <Label className="text-base">Availability (Optional)</Label>
                <Textarea
                  placeholder="e.g., Weekday evenings, flexible on weekends..."
                  value={formData.availabilitySchedule}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availabilitySchedule: e.target.value,
                    })
                  }
                  className="mt-1.5 bg-background"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} size="lg">
              Cancel
            </Button>
            <Button
              onClick={handleCreateExchange}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Exchange
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
