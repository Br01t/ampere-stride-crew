import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ampere Running Club
          </h1>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary transition-colors">Chi siamo</button>
            <button onClick={() => scrollToSection("events")} className="text-foreground hover:text-primary transition-colors">Eventi</button>
            <button onClick={() => navigate("statistics")} className="text-foreground hover:text-primary transition-colors">Statistiche</button>
            <ThemeToggle />
            <Button onClick={() => scrollToSection("contact")} size="sm">Contatti</Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <button onClick={() => scrollToSection("home")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">Home</button>
            <button onClick={() => scrollToSection("about")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">Chi siamo</button>
            <button onClick={() => scrollToSection("events")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">Eventi</button>
            <button onClick={() => navigate("statistics")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">Statistiche</button>
            <ThemeToggle />
            <Button onClick={() => scrollToSection("contact")} className="w-full">Contatti</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
