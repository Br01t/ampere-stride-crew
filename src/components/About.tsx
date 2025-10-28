import { useState, useEffect } from "react";
import { Heart, Users, Trophy, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const formatDate = (date) => {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  
  // Ottieni la parte data senza ora
  let formatted = date.toLocaleDateString("it-IT", options);

  // Metti la prima lettera del giorno in maiuscolo
  formatted = formatted.replace(/^./, (c) => c.toUpperCase());

  // Metti la prima lettera del mese in maiuscolo
  // Assume che il mese sia la seconda parola dopo il giorno
  formatted = formatted.replace(/ (\w+) (\d{4})$/, (match, month, year) => {
    return ` ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  });

  // Aggiungi l’ora
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${formatted} alle ore ${hours}:${minutes}`;
};

const About = () => {
  const nextRun = new Date("2025-11-05T09:00:00");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
  const timer = setInterval(() => {
    const now = new Date();
    const diff = nextRun.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft("È ora di correre!");
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTimeLeft(`${days} giorni - ${hours} ore - ${minutes} minuti - ${seconds} secondi`);
  }, 1000);

  return () => clearInterval(timer);
}, []);

  const values = [
    { icon: Heart, title: "Passione", description: "La corsa è nel nostro DNA. Ogni passo è un'emozione condivisa." },
    { icon: Users, title: "Comunità", description: "Quattro amici che corrono insieme, crescono insieme." },
    { icon: Trophy, title: "Obiettivi", description: "Spingerci oltre i nostri limiti, un chilometro alla volta." },
    { icon: Target, title: "Determinazione", description: "Ogni allenamento è un passo verso i nostri sogni." },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">

        {/* Banner Countdown */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-primary to-accent text-white px-6 py-4 text-center">
            <p className="text-sm uppercase tracking-wide">Prossima corsa di gruppo</p>
            <h3 className="text-2xl md:text-3xl font-bold mt-1">{formatDate(nextRun)}</h3>
            <p className="mt-2 text-lg">{timeLeft}</p>
          </div>
        </div>

        {/* Titolo Chi Siamo */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Chi Siamo</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ampere Running Club nasce dall'amicizia di{" "}
            <Link to="/founder" className="text-primary font-semibold underline hover:text-accent transition-colors">
              quattro runner
            </Link>{" "}
            che vivono nella stessa strada. Quello che è iniziato come un modo per allenarsi insieme si è trasformato
            in una passione condivisa che ci spinge ogni giorno a dare il massimo.
          </p>
        </div>

        {/* Valori */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scopo */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-2xl font-bold">Il Nostro Scopo</h3>
          <p className="text-lg text-muted-foreground">
            L'Ampere Running Club è più di un semplice gruppo di amici che corrono insieme.
            È una comunità che celebra la passione per la corsa, promuove uno stile di vita
            sano e incoraggia il superamento dei propri limiti personali.
          </p>
          <p className="text-lg text-muted-foreground">
            Che tu sia un principiante o un runner esperto, crediamo che la corsa sia un
            viaggio personale che diventa straordinario quando condiviso con gli altri.
            Ogni allenamento è un'opportunità per crescere, motivarci a vicenda e celebrare
            insieme ogni traguardo raggiunto.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;