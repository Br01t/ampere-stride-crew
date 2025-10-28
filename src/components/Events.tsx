"use client";

import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const events = [
    {
      title: "Allenamento Settimanale",
      date: "Ogni Martedì e Giovedì",
      time: "18:30 - 20:00",
      location: "Piazza Ampere",
      type: "Allenamento",
      description:
        "Sessione di allenamento per tutti i livelli. Riscaldamento, corsa e stretching.",
      participants: "4-8",
    },
    {
      title: "Long Run Domenicale",
      date: "Ogni Domenica",
      time: "08:00 - 10:00",
      location: "Parco Sempione",
      type: "Long Run",
      description: "Corsa lunga a ritmo rilassato. Ideale per costruire resistenza.",
      participants: "4-6",
    },
    {
      title: "Mezza Maratona Milano",
      date: "15 Novembre 2025",
      time: "09:00",
      location: "Milano Centro",
      type: "Gara",
      description: "Partecipiamo insieme alla mezza maratona di Milano!",
      participants: "4",
    },
    {
      title: "Trail Running",
      date: "23 Novembre 2025",
      time: "09:00 - 12:00",
      location: "Monti Brianza",
      type: "Avventura",
      description: "Esploriamo i sentieri di montagna per una corsa nella natura.",
      participants: "4",
    },
  ];

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
          {events.map((event, index) => (
            <Card
              key={index}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;