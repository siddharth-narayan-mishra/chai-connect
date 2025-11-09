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

const trendingTopics = [
  { name: "Placement Season 2025", posts: 1234 },
  { name: "DSA Practice", posts: 892 },
  { name: "Remote Internships", posts: 567 },
  { name: "Open Source", posts: 445 },
  { name: "Resume Tips", posts: 389 },
];

const API_BASE = "http://localhost:3000";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTBmMjM3NmZkNGIyZDIzOGIyYzQ3ODMiLCJ1c2VybmFtZSI6InNpZCIsImlhdCI6MTc2MjU5OTk2NCwiZXhwIjoxNzk0MTU3NTY0fQ.65ri2I8VX3nB0YzqYpB-WsTrTsk5UMtgPyG1jvu9Vpk";
const payload = {
  title: "My second post",
  content: "LIV 1-0 RMA",
  mediaUrl: "https://example.com/image2.png",
};

async function createPost() {
  try {
    const response = await axios.post(
      `${API_BASE}/post/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

export default function CollegeForum() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/post`); // your backend endpoint
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
      }
    };
    fetchPosts();
  }, []);

  const handleVote = (postId: string, direction: "up" | "down") => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              upvotes: direction === "up" ? post.upvotes + 1 : post.upvotes - 1,
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-secondary font-bold text-xl">
              <Coffee />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-foreground">bytee</h1>
              <p className="text-xs text-muted-foreground">
                College Community Forum
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm">Create Post</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Main Content */}
        <main className="flex-1">
          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} handleVote={handleVote} />
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-80 space-y-4">
          {/* About */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Welcome to bytee! 👋</CardTitle>
              <CardDescription>
                A community for college students to discuss academics,
                upskilling, and career growth.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={createPost}>
                Create a Post
              </Button>
            </CardContent>
          </Card>

          {/* Trending Topics */}
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

          {/* Forum Rules */}
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
    </div>
  );
}

function PostDetailPage({ post, onBack, handleVote }) {
  const [commentText, setCommentText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const comments = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                S
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">bytee</h1>
              <p className="text-xs text-muted-foreground">
                College Community Forum
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm">Create Post</Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Post Content */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              {/* Voting Section */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => handleVote(post.id, "up")}
                  className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded transition-colors"
                >
                  <ArrowUp className="w-6 h-6 text-muted-foreground hover:text-orange-500 dark:hover:text-orange-400" />
                </button>
                <span className="font-bold text-lg text-foreground">
                  {post.upvotes}
                </span>
                <button
                  onClick={() => handleVote(post.id, "down")}
                  className="p-2 hover:bg-primary/10 rounded transition-colors"
                >
                  <ArrowDown className="w-6 h-6 text-muted-foreground hover:text-primary" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {post.author}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      {post.isPinned && (
                        <Badge className="bg-amber-500 dark:bg-amber-600 text-white text-xs">
                          Pinned
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.time}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  {post.title}
                </h1>

                {/* Full Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none mb-4">
                  <p className="text-foreground whitespace-pre-line leading-relaxed">
                    {post.fullContent}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="hover:bg-accent cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.comments} Comments</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      isBookmarked
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400"
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        isBookmarked ? "fill-current" : ""
                      }`}
                    />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comment Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Add a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary">
                  You
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="What are your thoughts?"
                  className="w-full min-h-24 p-3 bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" className="gap-2">
                    <Send className="w-4 h-4" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {comments.length} Comments
          </h2>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentCard({ comment, isReply = false }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <Card className={isReply ? "ml-12" : ""}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Voting */}
          <div className="flex flex-col items-center gap-1">
            <button className="p-1 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded transition-colors">
              <ArrowUp className="w-4 h-4 text-muted-foreground hover:text-orange-500" />
            </button>
            <span className="text-xs font-semibold text-foreground">
              {comment.upvotes}
            </span>
            <button className="p-1 hover:bg-primary/10 rounded transition-colors">
              <ArrowDown className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-7 h-7">
                <AvatarFallback className="text-xs bg-gradient-to-br from-primary/80 to-primary">
                  {comment.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm text-foreground">
                {comment.author}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {comment.time}
              </span>
            </div>

            <p className="text-sm text-foreground mb-3">{comment.content}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="hover:text-primary transition-colors font-medium"
              >
                Reply
              </button>
              <button className="hover:text-primary transition-colors">
                Share
              </button>
              <button className="hover:text-primary transition-colors">
                Report
              </button>
            </div>

            {/* Reply Box */}
            {showReplyBox && (
              <div className="mt-3 flex gap-2">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-xs bg-gradient-to-br from-primary/80 to-primary">
                    You
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full min-h-20 p-2 bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="text-xs">
                      Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => setShowReplyBox(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-3">
            {comment.replies.map((reply) => (
              <CommentCard key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
