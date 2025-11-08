import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import MyProfile from "./pages/UserProfileOwn";
import ForumPage from "./pages/Forum";
import SkillExchangeBoard from "./pages/SkillExchange";
import Auth from "./pages/Auth";
import Features from "./pages/Features";
import CareerGuidance from "./pages/CareerGuidance";
import AcademicSupport from "./pages/AcademicSupport";
import ProjectHelp from "./pages/ProjectHelp";
import SoftSkills from "./pages/SoftSkills";
import Credits from "./pages/Credits";
import AnonymousQA from "./pages/Forum";
import Events from "./pages/Events";
import TrustScore from "./pages/TrustScore";
import VideoAnalyzer from "./pages/VideoAnalyzer";
import Sessions from "./pages/Sessions";
import StartMentoring from "./pages/StartMentoring";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

// --- Add helper DummyAvatar ---
function DummyAvatar({ src, alt, initials, className }: any) {
  const [errored, setErrored] = useState(false);
  return (
    <Avatar className={className}>
      {!errored && src ? (
        <AvatarImage
          src={src}
          alt={alt}
          onError={() => {
            setErrored(true);
          }}
        />
      ) : (
        <AvatarFallback>
          {/* simple inline dummy SVG cup icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block"
          >
            <path d="M2 7h14v5a5 5 0 01-5 5H7a5 5 0 01-5-5V7z"></path>
            <path d="M16 8v3"></path>
            <path d="M20 8a2 2 0 010 4"></path>
          </svg>
          {/* fallback initials if provided */}
          <span className="ml-1 text-xs">{initials}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
}
// --- end helper ---

const TopNav = ({ signedIn, user, onSignOut }: any) => {
  const [open, setOpen] = useState(false);

  // close on route change (very simple)
  useEffect(() => {
    const onNav = () => setOpen(false);
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, []);

  return (
    <header className="w-full border-b bg-background/50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold">
          Chai Connect
        </Link>

        <div className="flex items-center gap-4">
          {/* ... other top nav items ... */}
          {signedIn ? (
            <div className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="rounded-full hover:opacity-90 focus:outline-none"
                aria-label="Open profile menu"
              >
                {/* use DummyAvatar instead of raw AvatarImage */}
                <DummyAvatar
                  className="h-9 w-9"
                  src="/avatars/user.jpg"
                  alt="User avatar"
                  initials={(user?.name || "U")
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-64 rounded-md border bg-card p-3 shadow-lg z-50">
                  <div className="flex items-center gap-3">
                    {/* small avatar inside popover */}
                    <DummyAvatar
                      className="h-10 w-10"
                      src="/avatars/user.jpg"
                      alt="User avatar"
                      initials={(user?.name || "U")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    />
                    <div>
                      <div className="font-medium">{user?.name ?? "User"}</div>
                      <div className="text-xs text-muted-foreground">
                        {user?.email ?? "user@example.com"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2">
                    <div className="text-sm text-muted-foreground">
                      <strong>{user?.credits ?? 0}</strong> Chai Credits •{" "}
                      <strong>{user?.stats?.rating ?? "-"}</strong> Rating
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Link to="/profile" onClick={() => setOpen(false)}>
                        <Button size="sm" variant="ghost" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          // navigate to profile settings
                          window.location.href = "/profile";
                          setOpen(false);
                        }}
                      >
                        Account Settings
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full text-left"
                      onClick={() => {
                        onSignOut();
                        setOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

const App = () => {
  // Mock sign-in state for demo. In real app, hook into auth provider.
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem("chai_signed_in") === "1";
    } catch {
      return true;
    }
  });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Simple mock fetch for header summary; you can replace with real API
    if (signedIn) {
      setUser({
        name: "Siddharth Mishra",
        email: "siddharth@example.com",
        credits: 250,
        stats: { rating: 4.8 },
      });
    } else {
      setUser(null);
    }
  }, [signedIn]);

  const handleSignOut = () => {
    setSignedIn(false);
    try {
      localStorage.removeItem("chai_signed_in");
    } catch {}
    setUser(null);
    // optional: redirect to home
    window.location.href = "/";
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TopNav signedIn={signedIn} user={user} onSignOut={handleSignOut} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/features" element={<Features />} />
            <Route path="/career-guidance" element={<CareerGuidance />} />
            <Route path="/academic-support" element={<AcademicSupport />} />
            <Route path="/project-help" element={<ProjectHelp />} />
            <Route path="/soft-skills" element={<SoftSkills />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/anonymous-qa" element={<AnonymousQA />} />
            <Route path="/events" element={<Events />} />
            <Route path="/start-mentoring" element={<StartMentoring />} />
            <Route path="/trust-score" element={<TrustScore />} />
            <Route path="/video-analyzer" element={<VideoAnalyzer />} />
            <Route path="/skillexchange" element={<SkillExchangeBoard />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/userown" element={<MyProfile />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/forum" element={<ForumPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
