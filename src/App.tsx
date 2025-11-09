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
import Events2 from "./pages/events2";
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
  // Top navigation hidden by returning null so "Chai Connect" and "Sign In" won't render.
  return null;
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
            <Route path="/events2" element={<Events2 />} />
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
