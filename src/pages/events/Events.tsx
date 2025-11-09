import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAuthToken } from "@/lib/getAuthToken";

const API_BASE = import.meta.env.VITE_API_BASE;
const AUTH_TOKEN = getAuthToken();

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    endDate: "",
    tags: "",
  });

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/event/all`);
      setEvents(res.data.events || res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  // Join an event
  const handleJoinEvent = async (eventId: string) => {
    try {
      const res = await axios.post(
        `${API_BASE}/event/${eventId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data?.message || "Joined event successfully!");
      fetchEvents();
    } catch (err: any) {
      console.error("Join event error:", err.response?.data || err.message);
      if (err.response?.status === 400) {
        toast.info(err.response.data?.message || "Already joined this event");
      } else {
        toast.error("Error joining event");
      }
    }
  };

  // Create a new event
  const handleCreateEvent = async () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.location.trim() ||
      !formData.date ||
      !formData.endDate
    ) {
      toast.warning("Please fill in all required fields");
      return;
    }

    try {
      await axios.post(
        `${API_BASE}/event/create`,
        {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          date: formData.date,
          endDate: formData.endDate,
          tags: formData.tags
            ? formData.tags.split(",").map((t) => t.trim())
            : [],
        },
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Event created successfully!");
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        endDate: "",
        tags: "",
      });
      fetchEvents();
    } catch (err) {
      toast.error("Error creating event");
      console.error("Create event error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-muted-foreground">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Community Events
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Discover, join, and host events with your peers.
          </p>
        </div>

        <Button onClick={() => setOpen(true)} className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Create Event
        </Button>
      </header>

      {/* Event Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {events.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No events yet. Be the first to host one!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card
                key={event._id}
                className="hover:shadow-md transition-all border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {event.title}
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(new Date(event.date), "dd MMM yyyy, hh:mm a")} →{" "}
                      {format(new Date(event.endDate), "hh:mm a")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.participants?.length || 0} participants</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {event.tags?.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <Button
                      size="sm"
                      onClick={() => handleJoinEvent(event._id)}
                    >
                      Join Event
                    </Button>

                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>
                        Created{" "}
                        {format(new Date(event.createdAt), "dd MMM yyyy")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Create Event Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create a New Event</DialogTitle>
            <DialogDescription>
              Host something exciting for the community.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-foreground">
                Title
              </label>
              <Input
                placeholder="Event title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Description
              </label>
              <Textarea
                placeholder="What is this event about?"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Location
              </label>
              <Input
                placeholder="Event location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Start Date & Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  End Date & Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Tags
              </label>
              <Input
                placeholder="Comma-separated (e.g. hackathon, open-source)"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEvent}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
