import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Bookmark,
  Share2,
  TrendingUp,
  Clock,
  ArrowLeft,
  Send,
  Coffee,
} from "lucide-react";
import PostCard from "./components/PostCard";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getAuthToken } from "@/lib/getAuthToken";

const API_BASE = import.meta.env.VITE_API_BASE;
const AUTH_TOKEN = getAuthToken();

const trendingTopics = [
  { name: "Placement Season 2025", posts: 1234 },
  { name: "DSA Practice", posts: 892 },
  { name: "Remote Internships", posts: 567 },
  { name: "Open Source", posts: 445 },
  { name: "Resume Tips", posts: 389 },
];

export default function CollegeForum() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/post`);
      setPosts(res.data.posts);
    } catch (err) {
      console.error("Error fetching posts:", err.message);
      toast.error("Couldn't fetch posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleVote = async (postId: string, direction: "up" | "down") => {
    try {
      await axios.post(
        `${API_BASE}/post/${postId}/vote`,
        { voteType: `${direction}vote` },
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchPosts();
    } catch (error) {
      toast.error("Error while voting...");
      console.error("Error voting:", error.response?.data || error.message);
    }
  };

  const handleCreatePost = async () => {
    if (!formData.title.trim() || !formData.content.trim()) return;
    try {
      await axios.post(`${API_BASE}/post`, formData, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      setFormData({ title: "", content: "" });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      toast.error("Error posting...");
      console.error("Error creating post:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Main Content */}
        <main className="flex-1">
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} handleVote={handleVote} />
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-80 space-y-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Welcome to bytee! 👋</CardTitle>
              <CardDescription>
                A community for college students to discuss academics,
                upskilling, and career growth.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => setOpen(true)}>
                Create a Post
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center hover:bg-accent p-2 rounded-lg cursor-pointer transition-colors"
                >
                  <span className="text-sm font-medium text-foreground">
                    #{topic.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {topic.posts} posts
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forum Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Be respectful and supportive</p>
              <p>• No spam or self-promotion</p>
              <p>• Share genuine experiences</p>
              <p>• Help fellow students grow</p>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Create Post Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
            <DialogDescription>
              Share something with the college community.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-foreground">
                Title
              </label>
              <Input
                placeholder="What's your post about?"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Content
              </label>
              <Textarea
                placeholder="Write your thoughts..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost}>Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
