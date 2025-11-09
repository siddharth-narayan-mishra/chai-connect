import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export default function CommentCard({ comment }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-10 h-10 bg-secondary/40 flex items-center justify-center text-2xl">
                {comment.authorUsername[0]}
              </Avatar>
              <span className="font-semibold text-sm text-foreground">
                {comment.authorUsername}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {formatDate(comment.createdAt)}
              </span>
            </div>

            <p className="text-sm text-foreground mb-3">{comment.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
