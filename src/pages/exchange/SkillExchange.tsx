import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Share2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ExchangePostCard from "./components/ExchangePostCard";

const mockExchangePosts = [
  {
    id: 1,
    author: "techWizard",
    avatar: "TW",
    title: "Web Development Exchange",
    seeking: ["React.js", "Node.js", "MongoDB"],
    offering: ["Python", "Data Analysis", "Machine Learning"],
    comments: 12,
    timePosted: "2h ago",
  },
  {
    id: 2,
    author: "designPro",
    avatar: "DP",
    title: "UI/UX Skills Trading",
    seeking: ["Figma Advanced", "User Research"],
    offering: ["Adobe XD", "Wireframing", "Prototyping"],
    comments: 8,
    timePosted: "3h ago",
  },
  // Add 8 more mock posts with similar structure
  {
    id: 3,
    author: "cloudExpert",
    avatar: "CE",
    title: "Cloud Architecture Exchange",
    seeking: ["AWS Lambda", "Serverless"],
    offering: ["Docker", "Kubernetes", "CI/CD"],
    comments: 15,
    timePosted: "4h ago",
  },
  // ...more posts following same pattern
].concat(
  Array.from({ length: 7 }, (_, i) => ({
    id: i + 4,
    author: `user${i + 4}`,
    avatar: `U${i + 4}`,
    title: `Skill Exchange Opportunity ${i + 4}`,
    seeking: [`Skill A${i + 4}`, `Skill B${i + 4}`],
    offering: [`Skill X${i + 4}`, `Skill Y${i + 4}`, `Skill Z${i + 4}`],
    comments: Math.floor(Math.random() * 20),
    timePosted: `${Math.floor(Math.random() * 12 + 1)}h ago`,
  }))
);

const API_BASE = import.meta.env.VITE_API_BASE;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export default function SkillExchange() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/exchange/requests`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Skill Exchange Events</h1>
          <p className="text-muted-foreground">
            Browse active skill exchange opportunities or create your own
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <ExchangePostCard key={post._id} exchange={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
