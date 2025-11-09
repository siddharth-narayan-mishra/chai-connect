import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  Clock,
  Coins,
  User,
  MessageSquare,
  Sparkles,
  Plus,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getAuthToken } from "@/lib/getAuthToken";

const API_BASE = import.meta.env.VITE_API_BASE;
const AUTH_TOKEN = getAuthToken();

export default function ExchangeRequestView() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    message: "",
    creditsOffered: "",
    skillsOffered: "",
  });

  const userId = import.meta.env.VITE_USER_ID; // or from auth context

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${API_BASE}/exchange/requests/${requestId}`);
      setRequest(res.data.exchangeRequest);
    } catch (err) {
      console.error("Error fetching request:", err.message);
    }
  };

  const fetchResponses = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/exchange/requests/${requestId}/responses`,
        { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
      );
      setResponses(res.data.responses);
    } catch (err) {
      console.error("Error fetching responses:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitResponse = async () => {
    try {
      await axios.post(
        `${API_BASE}/exchange/requests/${requestId}/responses`,
        {
          message: form.message,
          creditsOffered: Number(form.creditsOffered),
          skillsOffered: form.skillsOffered.split(",").map((s) => s.trim()),
        },
        { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
      );
      setOpenModal(false);
      setForm({ message: "", creditsOffered: "", skillsOffered: "" });
      fetchResponses();
    } catch (err) {
      console.error("Error submitting response:", err.message);
      toast.error("Error submitting response:", err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
    fetchResponses();
  }, [requestId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading request...</p>
        </div>
      </div>
    );

  if (!request)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center space-y-2">
            <p className="text-lg font-medium">Request not found</p>
            <Button onClick={() => navigate("/exchange")} className="mt-4">
              Browse Exchanges
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  const statusColors = {
    open: "bg-green-500/10 text-green-700 border-green-200",
    closed: "bg-gray-500/10 text-gray-700 border-gray-200",
    completed: "bg-blue-500/10 text-blue-700 border-blue-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
        {/* Header Card */}
        <Card className="border-2 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <Badge
                    className={`${
                      statusColors[request.status] || statusColors.open
                    } border`}
                  >
                    {request.status.toUpperCase()}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{request.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{request.creatorUsername}</span>
                </div>
              </div>

              {/* ✅ Add Response Button (only if not creator) */}
              {request.creator !== userId && (
                <Button
                  onClick={() => setOpenModal(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Response
                </Button>
              )}
            </div>

            <p className="text-base leading-relaxed mb-6">
              {request.description}
            </p>

            {/* Skills Exchange */}
            <div className="bg-background/80 backdrop-blur rounded-lg p-4 border shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  {request.skillsOffered.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-green-50 border-green-200 text-green-700 font-medium"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">
                    EXCHANGE
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {request.skillsRequested.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-blue-50 border-blue-200 text-blue-700 font-medium"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Responses Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">
              Responses{" "}
              <span className="text-muted-foreground text-lg">
                ({responses.length})
              </span>
            </h2>
          </div>

          {responses.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">
                  No responses yet
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {responses.map((res) => (
                <Card
                  key={res._id}
                  className="hover:shadow-md transition-shadow border-l-4 border-l-primary/50"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {res.responderUsername?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-lg">
                            {res.responderUsername}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(res.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                      <p className="text-sm leading-relaxed">{res.message}</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Offering Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {res.skillsOffered.map((s, i) => (
                            <Badge key={i} variant="outline">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-semibold">
                            {res.creditsOffered} Credits
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => navigate(`/user/${res.responder}`)}
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Add Response Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Your Response</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Textarea
              placeholder="Write your message..."
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
            />
            <Input
              type="number"
              placeholder="Credits offered"
              value={form.creditsOffered}
              onChange={(e) =>
                setForm((f) => ({ ...f, creditsOffered: e.target.value }))
              }
            />
            <Input
              placeholder="Skills offered (comma separated)"
              value={form.skillsOffered}
              onChange={(e) =>
                setForm((f) => ({ ...f, skillsOffered: e.target.value }))
              }
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmitResponse}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
