import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [color, setColor] = useState("hsl(0, 100%, 50%)");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cambia colore continuamente
  useEffect(() => {
    const interval = setInterval(() => {
      const hue = Math.floor(Math.random() * 360);
      setColor(`hsl(${hue}, 100%, 50%)`);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const goHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg dark:bg-background/95" 
          : " dark:bg-gray-900"}`
      }
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* LOGO CLICCABILE */}
          <button
            onClick={goHome}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Ampere Running Club
          </button>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground dark:text-white hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground dark:text-white hover:text-primary transition-colors"
            >
              Chi siamo
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-foreground dark:text-white hover:text-primary transition-colors"
            >
              Eventi
            </button>
            <button
              onClick={() => navigate("location")}
              className="text-foreground dark:text-white hover:text-primary transition-colors"
            >
              Dove siamo
            </button>
            <button
              onClick={() => navigate("statistics")}
              className="transition-colors"
              style={{ color }}
            >
              Stats
            </button>
            <ThemeToggle />
            <Button onClick={() => scrollToSection("contact")} size="sm">
              Contatti
            </Button>
          </div>

          {/* Pulsante Mobile */}
          <button
            className="md:hidden text-foreground dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border bg-background/95 dark:bg-background/95">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left text-foreground dark:text-white hover:text-primary transition-colors py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-foreground dark:text-white hover:text-primary transition-colors py-2"
            >
              Chi siamo
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="block w-full text-left text-foreground dark:text-white hover:text-primary transition-colors py-2"
            >
              Eventi
            </button>
            <button
              onClick={() => navigate("location")}
              className="block w-full text-left text-foreground dark:text-white hover:text-primary transition-colors py-2"
            >
              Dove siamo
            </button>
            <button
              onClick={() => navigate("statistics")}
              className="block w-full text-left transition-colors py-2"
              style={{ color }}
            >
              Stats
            </button>
            <ThemeToggle />
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full"
            >
              Contatti
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
