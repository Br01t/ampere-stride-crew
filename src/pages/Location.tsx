import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const gallery = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Ieo_%2C_p.lambro_006.JPG/2560px-Ieo_%2C_p.lambro_006.JPG",
    title: "Parco Lambro",
    desc: "Uno dei nostri percorsi preferiti, immerso nel verde e perfetto per i lunghi del weekend.",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/10/I_giardini_di_Porta_Venezia_di_Milano%2C_ingresso_dai_Bastioni.jpg",
    title: "Giardini Pubblici Indro Montanelli",
    desc: "Allenamenti serali nel cuore della città, tra viali alberati e luci di Milano.",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/59/PanoramaNaviglioPonteBernateTicino.JPG",
    title: "Navigli",
    desc: "Ideale per corse leggere al tramonto o per un defaticamento post-gara.",
  },
];

const Location = () => {
  return (
    <section className="py-24 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Titolo e descrizione */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Dove siamo</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tutto nasce da <strong>Via Ampere, Milano</strong> — il cuore del nostro club.  
            Da qui partiamo ogni settimana, attraversando le strade, i parchi e i viali della città,  
            macinando chilometri e amicizie. Dai primi passi nei parchi locali fino alle gare più grandi,  
            ogni corsa è un nuovo traguardo condiviso.
          </p>
        </div>

        {/* Mappa */}
        <Card className="max-w-4xl mx-auto mb-16">
          <CardHeader>
            <CardTitle>Dove ci alleniamo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Mappa - Via Ampere, Milano"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.937542690735!2d9.220938215555818!3d45.47801553990561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6c26f55f127%3A0x8b88a50a3c2c7472!2sVia%20Ampere%2C%20Milano%20MI!5e0!3m2!1sit!2sit!4v1698955560000!5m2!1sit!2sit"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        {/* Galleria */}
        <div className="grid gap-8 md:grid-cols-3">
          {gallery.map((place) => (
            <Card key={place.title} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-video overflow-hidden">
                <img
                  src={place.src}
                  alt={place.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/800x450?text=Immagine+non+disponibile";
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{place.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{place.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Location;