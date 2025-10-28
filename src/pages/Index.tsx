import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  // Scroll automatico quando c'è un hash nell'URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Events />
      <Contact />
    </div>
  );
};

export default Index;