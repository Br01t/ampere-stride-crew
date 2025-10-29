import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  participants: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const eventsData = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Event));
        setEvents(eventsData);
      } catch (error) {
        console.error('Errore nel caricamento degli eventi:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "Allenamento":
        return "default";
      case "Long Run":
        return "secondary";
      case "Gara":
        return "destructive";
      case "Avventura":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <section id="events" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Titolo */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Prossimi Eventi</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unisciti a noi nei nostri allenamenti e sfide. Ogni evento è un'opportunità per
            crescere insieme e divertirsi!
          </p>
        </div>

        {/* Lista Eventi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Nessun evento disponibile al momento.</p>
            </div>
          ) : (
            events.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary"
              >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <Badge variant={getTypeBadgeVariant(event.type)}>{event.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{event.description}</p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{event.participants} partecipanti</span>
                  </div>
                </div>
              </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;