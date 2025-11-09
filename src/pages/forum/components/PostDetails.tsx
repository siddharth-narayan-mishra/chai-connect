import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Bookmark,
  Clock,
  MessageSquare,
  Send,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { toast } from "sonner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate } from "@/lib/utils";
import { getAuthToken } from "@/lib/getAuthToken";

const API_BASE = import.meta.env.VITE_API_BASE;
const AUTH_TOKEN = getAuthToken();

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/post/${postId}/comments`);
      setComments(res.data.comments);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${API_BASE}/post/${postId}`);
      setPost(res.data.post);
      fetchComments();
    } catch (err) {
      console.error("Failed to fetch post:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async () => {
    try {
      await axios.post(
        `${API_BASE}/post/${postId}/comments`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchComments();
    } catch (error) {
      toast.error("Error while voting...");
      console.error("Error voting:", error.response?.data || error.message);
    }
  };

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
      fetchPost();
    } catch (error) {
      toast.error("Error while voting...");
      console.error("Error voting:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  if (loading) {
    return <div className="p-12">Loading...</div>;
  }

  if (!post) {
    return <div className="p-12 text-red-500">Post not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Post Content */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              {/* Voting Section */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => handleVote(post._id, "up")}
                  className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded transition-colors"
                >
                  <ArrowUp className="w-6 h-6 text-muted-foreground hover:text-orange-500 dark:hover:text-orange-400" />
                </button>
                <span className="font-bold text-lg text-foreground">
                  {post.voteScore}
                </span>
                <button
                  onClick={() => handleVote(post._id, "down")}
                  className="p-2 hover:bg-primary/10 rounded transition-colors"
                >
                  <ArrowDown className="w-6 h-6 text-muted-foreground hover:text-primary" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10 bg-secondary/40 flex items-center justify-center text-2xl">
                    {post.authorUsername[0]}
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {post.authorUsername}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatDate(post.createdAt)}
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
                    {post.content}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.commentCount} Comments</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
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
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="What are your thoughts?"
                  className="w-full min-h-24 p-3 bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" className="gap-2" onClick={handleComment}>
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
            {post.commentCount} Comments
          </h2>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
