import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Share2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const mockExchangePosts = [
  {
    id: 1,
    author: "techWizard",
    avatar: "TW",
    title: "Web Development Exchange",
    seeking: ["React.js", "Node.js", "MongoDB"],
    offering: ["Python", "Data Analysis", "Machine Learning"],
    comments: 12,
    timePosted: "2h ago"
  },
  {
    id: 2,
    author: "designPro",
    avatar: "DP",
    title: "UI/UX Skills Trading",
    seeking: ["Figma Advanced", "User Research"],
    offering: ["Adobe XD", "Wireframing", "Prototyping"],
    comments: 8,
    timePosted: "3h ago"
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
    timePosted: "4h ago"
  },
  // ...more posts following same pattern
].concat(Array.from({ length: 7 }, (_, i) => ({
  id: i + 4,
  author: `user${i + 4}`,
  avatar: `U${i + 4}`,
  title: `Skill Exchange Opportunity ${i + 4}`,
  seeking: [`Skill A${i + 4}`, `Skill B${i + 4}`],
  offering: [`Skill X${i + 4}`, `Skill Y${i + 4}`, `Skill Z${i + 4}`],
  comments: Math.floor(Math.random() * 20),
  timePosted: `${Math.floor(Math.random() * 12 + 1)}h ago`
})));

export default function EventsPage() {
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
          {mockExchangePosts.map((post) => (
            <ExchangePostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExchangePostCard({ post }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary">
              {post.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
            <p className="text-sm text-muted-foreground">
              Posted by {post.author} • {post.timePosted}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Skills Seeking */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">
              Skills Seeking:
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.seeking.map((skill, idx) => (
                <Badge key={idx} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <Button variant="outline" className="w-full gap-2">
              <MessageSquare className="w-4 h-4" />
              Read Comments ({post.comments})
            </Button>
          </div>

          {/* Skills Offering */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">
              Skills Offering:
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.offering.map((skill, idx) => (
                <Badge key={idx} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>
            <Button className="w-full gap-2">
              Respond
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
