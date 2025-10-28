"use client";

import { useEffect, useState } from "react";
import { Mail, MessageSquare, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const CITY = "Milano";
const API_CITY = "Milan";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🌤️ Meteo sopra contatti
  useEffect(() => {
    fetch(`https://wttr.in/${encodeURIComponent(API_CITY)}?format=j1`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.current_condition?.[0]) {
          setWeather({
            name: CITY,
            main: { temp: data.current_condition[0].temp_C },
            weather: [
              {
                description: data.current_condition[0].weatherDesc[0].value,
              },
            ],
          });
          setError(null);
        } else {
          setError("Meteo non disponibile");
        }
      })
      .catch(() => setError("Errore di connessione"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      contactSchema.parse(formData);
      setErrors({});
      toast({
        title: "Messaggio Inviato!",
        description: "Ti risponderemo al più presto. Grazie per averci contattato!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0].toString()] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const contactSchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(255),
    message: z.string().trim().min(1).max(1000),
  });

  const getWeatherEmoji = (desc: string) => {
    const d = desc.toLowerCase();
    if (d.includes("pioggia")) return "🌧️";
    if (d.includes("nuvol")) return "☁️";
    if (d.includes("sole") || d.includes("sereno")) return "☀️";
    if (d.includes("neve")) return "❄️";
    return "🌤️";
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* 🌤️ Widget meteo */}
        <div className="max-w-xs mx-auto mb-20 relative animate-fade-in">
          <Card className="bg-card/80 backdrop-blur-md border border-border shadow-lg text-center">
            <CardContent className="pt-6">
              {loading ? (
                <p className="text-sm text-muted-foreground">Caricamento meteo...</p>
              ) : error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : weather ? (
                <>
                  <div className="text-4xl mb-2">{getWeatherEmoji(weather.weather[0].description)}</div>
                  <h3 className="text-lg font-semibold">{weather.name}</h3>
                  <p className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</p>
                  <p className="capitalize text-sm text-muted-foreground">{weather.weather[0].description}</p>
                </>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Titolo */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Contattaci</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hai domande? Vuoi unirti al club? Scrivici! Siamo sempre felici di conoscere nuovi appassionati di running.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2"><User className="h-4 w-4" /> Nome</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? "border-destructive" : ""} />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? "border-destructive" : ""} />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Messaggio</Label>
              <Textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} className={errors.message ? "border-destructive" : ""} />
              {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full">Invia Messaggio</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;