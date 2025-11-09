import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import MyProfile from "./pages/UserProfileOwn";
import ForumPage from "./pages/forum/Forum";
import SkillExchangeBoard from "./pages/exchange/SkillExchange";
import Auth from "./pages/Auth";
import Features from "./pages/Features";
import CareerGuidance from "./pages/CareerGuidance";
import AcademicSupport from "./pages/AcademicSupport";
import ProjectHelp from "./pages/ProjectHelp";
import SoftSkills from "./pages/SoftSkills";
import Credits from "./pages/Credits";
import SkillExchange from "./pages/exchange/SkillExchange";
import TrustScore from "./pages/TrustScore";
import VideoAnalyzer from "./pages/VideoAnalyzer";
import Sessions from "./pages/Sessions";
import StartMentoring from "./pages/StartMentoring";
import { useEffect, useState } from "react";
import PostDetailPage from "./pages/forum/components/PostDetails";
import Events from "./pages/events/Events";
import AnonymousQA from "./pages/AnonymousQA";
import ExchangeRequestView from "./pages/exchange/components/ExchangeRequestView";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

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
          <Navbar/>
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
            <Route path="/skillExchange" element={<SkillExchange />} />
            <Route path="/start-mentoring" element={<StartMentoring />} />
            <Route path="/trust-score" element={<TrustScore />} />
            <Route path="/video-analyzer" element={<VideoAnalyzer />} />
            <Route path="/skillexchange" element={<SkillExchangeBoard />} />
            <Route
              path="/skillexchange/:requestId"
              element={<ExchangeRequestView />}
            />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route path="/userown" element={<MyProfile />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/post/:postId" element={<PostDetailPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
