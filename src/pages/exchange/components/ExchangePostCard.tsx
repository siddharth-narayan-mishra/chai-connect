import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Clock,
  MapPin,
  ArrowRightLeft,
  Coins,
  Eye,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function ExchangePostCard({ exchange }) {
  const {
    _id,
    title,
    description,
    creatorUsername,
    creditsRequested,
    creditsOffered,
    skillsRequested,
    skillsOffered,
    duration,
    location,
    viewCount,
    responseCount,
    createdAt,
  } = exchange;

  const navigate = useNavigate();

  return (
    <Card
      className="hover:shadow-md transition-all cursor-pointer"
      onClick={() => navigate(`/skillExchange/${_id}`)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7">
              <AvatarFallback className="text-xs uppercase">
                {creatorUsername?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{creatorUsername}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(createdAt)}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs capitalize">
            {location?.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <CardTitle className="text-lg mb-1">{title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mt-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {duration?.value} {duration?.unit}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Coins className="w-3.5 h-3.5" />
            <span>
              {creditsOffered} → {creditsRequested} credits
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Eye className="w-3.5 h-3.5" />
            <span>{viewCount} views</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{responseCount} responses</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {skillsOffered?.map((skill, i) => (
                <Badge key={i} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
            <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {skillsRequested?.map((skill, i) => (
                <Badge key={i} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
