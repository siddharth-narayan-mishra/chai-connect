import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ArrowDown, ArrowUp, Clock, MessageSquare, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, handleVote }) {
  const navigate = useNavigate();
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Voting Section */}
          <div className="flex flex-col items-center gap-1 pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleVote(post._id, "up");
              }}
              className="p-1 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded transition-colors"
            >
              <ArrowUp className="w-5 h-5 text-muted-foreground hover:text-orange-500 dark:hover:text-orange-400" />
            </button>
            <span className="font-semibold text-sm text-foreground">
              {post.voteScore}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleVote(post._id, "down");
              }}
              className="p-1 hover:bg-primary/10 rounded transition-colors"
            >
              <ArrowDown className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </button>
          </div>

          {/* Content Section */}
          <div
            className="flex-1"
            onClick={() => {
              navigate(`/post/${post._id}`);
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {/* <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-primary/80 to-primary">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar> */}
                <span className="font-medium text-foreground">
                  {post.authorUsername}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(post.createdAt)}
                </span>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-foreground mb-2 hover:text-primary cursor-pointer transition-colors">
              {post.title}
            </h2>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {post.content}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>
                  {post.commentCount}{" "}
                  {post.commentCount === 1 ? "Comment" : "Comments"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
