import { Heart, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ampere Running Club
          </h3>

          <p className="text-center text-secondary-foreground/80 flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> by four friends who love running
          </p>

          {/* Blocco social */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/ampererunningclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground/80 hover:text-primary"
            >
              <Instagram className="h-6 w-6" />
            </a>

            {/* Strava */}
            <a
              href="https://www.strava.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground/80 hover:text-primary"
            >
              {/* Icona SVG Strava */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-strava"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 13l-5 -10l-5 10m6 0l4 8l4 -8" /></svg>
            </a>
          </div>

          <p className="text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} Ampere Running Club. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;