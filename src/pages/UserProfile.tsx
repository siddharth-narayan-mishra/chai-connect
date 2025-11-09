import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE;

interface User {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  about?: string;
  avatar: string;
  tags: string[];
  passingYear?: number;
  skillsRequired: string[];
  skillsOffered: string[];
  credits: number;
  trustScore: number;
}

export default function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE}/user/${username}`);
        setUser(response.data.user || response.data);
      } catch (error: any) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center space-y-3">
            <UserIcon className="w-16 h-16 text-muted-foreground/40 mx-auto" />
            <p className="text-lg font-medium">User not found</p>
            <p className="text-sm text-muted-foreground">
              The profile you're looking for doesn't exist.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate rating from trust score (0-100 to 0-5 scale)
  const rating = (user.trustScore / 20).toFixed(1);
  const fullStars = Math.floor(Number(rating));
  const hasHalfStar = Number(rating) % 1 >= 0.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Profile Header */}
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-start gap-6">
                <Avatar className="h-28 w-28 border-4 border-primary/20 shadow-lg">
                  <AvatarImage
                    src={user.avatar}
                    alt={`${user.username}'s avatar`}
                  />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                    {user.username[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                      {user.username}
                    </h1>
                    {user.bio && (
                      <p className="text-muted-foreground mt-1 text-lg">
                        {user.bio}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {user.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/5">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {user.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </div>
                    )}
                    {user.passingYear && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        Class of {user.passingYear}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < fullStars
                            ? "text-yellow-500 fill-yellow-500"
                            : i === fullStars && hasHalfStar
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted fill-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Trust Score: {user.trustScore}/100
                  </span>
                </div>
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 w-full md:w-auto">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Request Skill Exchange
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        {user.about && (
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <UserIcon className="h-4 w-4 text-primary" />
                </div>
                About
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              {user.about}
            </CardContent>
          </Card>
        )}

        {/* Skills */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Award className="h-5 w-5" />
                Skills Offered
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.skillsOffered.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.map((skill, i) => (
                    <Badge
                      key={i}
                      className="bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No skills listed
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <TrendingUp className="h-5 w-5" />
                Skills Wanted
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.skillsRequired.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.skillsRequired.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No skills listed
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Credits Card */}
        <Card className="border-2 border-amber-200 dark:border-amber-900 shadow-lg bg-gradient-to-br from-amber-50 to-background dark:from-amber-950/20 dark:to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <div className="p-2 bg-amber-200 dark:bg-amber-900 rounded-lg">
                <Award className="h-5 w-5" />
              </div>
              Community Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-amber-700 dark:text-amber-400">
                  {user.credits}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Available credits for skill exchanges
                </p>
              </div>
              <div className="p-4 bg-amber-200 dark:bg-amber-900 rounded-full">
                <Award className="h-8 w-8 text-amber-700 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Placeholder */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 space-y-2">
              <Star className="h-12 w-12 text-muted-foreground/40 mx-auto" />
              <p className="text-muted-foreground">No reviews yet</p>
              <p className="text-sm text-muted-foreground">
                Reviews will appear here after completed exchanges
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
