import { Heart } from "lucide-react";

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
          <p className="text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} Ampere Running Club. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
