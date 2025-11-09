import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Coffee,
  User,
  Mail,
  Lock,
  Tag,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sign In States
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  // Sign Up States
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    email: "",
    bio: "",
    about: "",
    tags: "",
    passingYear: "",
    skillsRequired: "",
    skillsOffered: "",
  });
  const [signingUp, setSigningUp] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);

    try {
      const response = await axios.post(`${API_BASE}/user/login`, {
        username: signInUsername,
        password: signInPassword,
      });

      // Store token if provided
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }

      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });

      navigate(`/user/${signInUsername}`);
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningUp(true);

    try {
      const payload = {
        username: signUpData.username,
        password: signUpData.password,
        email: signUpData.email,
        bio: signUpData.bio || undefined,
        about: signUpData.about || undefined,
        tags: signUpData.tags
          ? signUpData.tags.split(",").map((t) => t.trim())
          : [],
        passingYear: signUpData.passingYear
          ? Number(signUpData.passingYear)
          : undefined,
        skillsRequired: signUpData.skillsRequired
          ? signUpData.skillsRequired.split(",").map((s) => s.trim())
          : [],
        skillsOffered: signUpData.skillsOffered
          ? signUpData.skillsOffered.split(",").map((s) => s.trim())
          : [],
      };

      const response = await axios.post(`${API_BASE}/user/create`, payload);

      toast({
        title: "Account Created!",
        description: "Welcome to bytee! Let's get started.",
      });

      // Optionally auto-login after signup
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
        navigate(`/user/${signUpData.username}`);
      } else {
        // Switch to sign in tab
        toast({
          title: "Please sign in",
          description:
            "Your account has been created. Please sign in to continue.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
      console.log(error)
    } finally {
      setSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Coffee className="w-10 h-10 text-primary" />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              bytee
            </span>
          </Link>
          <p className="text-muted-foreground text-lg">
            Share Knowledge Over Chai ☕
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="signin" className="text-base">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-base">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* SIGN IN TAB */}
              <TabsContent value="signin" className="mt-6">
                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="signin-username"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-primary" />
                      Username
                    </label>
                    <Input
                      id="signin-username"
                      type="text"
                      placeholder="your_username"
                      value={signInUsername}
                      onChange={(e) => setSignInUsername(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="signin-password"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-primary" />
                      Password
                    </label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    disabled={signingIn}
                  >
                    {signingIn ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* SIGN UP TAB */}
              <TabsContent value="signup" className="mt-6">
                <form onSubmit={handleSignUp} className="space-y-5">
                  {/* Basic Info Section */}
                  <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Basic Information
                    </h3>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-username"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-primary" />
                        Username *
                      </label>
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="your_username"
                        value={signUpData.username}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            username: e.target.value,
                          })
                        }
                        required
                        pattern="[a-zA-Z0-9]+"
                        minLength={1}
                        maxLength={20}
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">
                        Alphanumeric only, 1-20 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-email"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4 text-primary" />
                        Email *
                      </label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@college.edu"
                        value={signUpData.email}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            email: e.target.value,
                          })
                        }
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-password"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4 text-primary" />
                        Password *
                      </label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signUpData.password}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            password: e.target.value,
                          })
                        }
                        required
                        pattern="[a-zA-Z0-9]+"
                        minLength={1}
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">
                        Alphanumeric only
                      </p>
                    </div>
                  </div>

                  {/* Profile Info Section */}
                  <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                    <h3 className="font-semibold text-sm text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                      Profile Details
                    </h3>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-bio"
                        className="text-sm font-medium"
                      >
                        Bio
                      </label>
                      <Textarea
                        id="signup-bio"
                        placeholder="Tell us about yourself in a few words..."
                        value={signUpData.bio}
                        onChange={(e) =>
                          setSignUpData({ ...signUpData, bio: e.target.value })
                        }
                        maxLength={500}
                        className="bg-background min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-about"
                        className="text-sm font-medium"
                      >
                        About
                      </label>
                      <Textarea
                        id="signup-about"
                        placeholder="Share more details about your interests, background..."
                        value={signUpData.about}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            about: e.target.value,
                          })
                        }
                        maxLength={500}
                        className="bg-background min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="signup-tags"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Tag className="w-4 h-4" />
                          Tags
                        </label>
                        <Input
                          id="signup-tags"
                          type="text"
                          placeholder="student, developer, artist"
                          value={signUpData.tags}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              tags: e.target.value,
                            })
                          }
                          className="h-11 bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="signup-year"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Passing Year
                        </label>
                        <Input
                          id="signup-year"
                          type="number"
                          placeholder="2025"
                          value={signUpData.passingYear}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              passingYear: e.target.value,
                            })
                          }
                          className="h-11 bg-background"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                    <h3 className="font-semibold text-sm text-green-700 dark:text-green-400 uppercase tracking-wide">
                      Skills
                    </h3>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-skills-offered"
                        className="text-sm font-medium"
                      >
                        Skills You Offer
                      </label>
                      <Input
                        id="signup-skills-offered"
                        type="text"
                        placeholder="React, Python, Design, Photography"
                        value={signUpData.skillsOffered}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            skillsOffered: e.target.value,
                          })
                        }
                        className="h-11 bg-background"
                      />
                      <p className="text-xs text-muted-foreground">
                        Comma separated
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-skills-required"
                        className="text-sm font-medium"
                      >
                        Skills You Want to Learn
                      </label>
                      <Input
                        id="signup-skills-required"
                        type="text"
                        placeholder="Machine Learning, UI/UX, Public Speaking"
                        value={signUpData.skillsRequired}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            skillsRequired: e.target.value,
                          })
                        }
                        className="h-11 bg-background"
                      />
                      <p className="text-xs text-muted-foreground">
                        Comma separated
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    disabled={signingUp}
                  >
                    {signingUp ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
