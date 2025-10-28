import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const founders = [
  {
    name: "Luca Rossi",
    role: "Co-fondatore & Coach",
    bio: "Appassionato runner da sempre, guida il club con energia e passione.",
    img: "/founders/luca.jpg",
  },
  {
    name: "Giulia Bianchi",
    role: "Co-fondatrice & Event Manager",
    bio: "Organizza eventi e gare locali, sempre alla ricerca di nuove sfide.",
    img: "/founders/giulia.jpg",
  },
  {
    name: "Marco Verdi",
    role: "Social Media & Comunicazione",
    bio: "Racconta le storie del club e dei runner attraverso i social.",
    img: "/founders/marco.jpg",
  },
  {
    name: "Sara Neri",
    role: "Logistica & Supporto",
    bio: "Gestisce tutto ciò che serve per rendere le corse indimenticabili.",
    img: "/founders/sara.jpg",
  },
];

const FounderPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-24 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">I Founder</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quattro persone appassionate di running che hanno dato vita al club e ai suoi eventi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {founders.map((founder) => (
            <Card
              key={founder.name}
              className="text-left border-2 border-transparent transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:border-primary"
            >
              <CardHeader>
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={founder.img} alt={founder.name} />
                  <AvatarFallback>{founder.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{founder.name}</CardTitle>
                <CardDescription>{founder.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{founder.bio}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  💡 Ama correre per esplorare nuovi percorsi e città.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderPage;