// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import Location from "@/pages/Location";
import Founder from "@/pages/Founder";
import Statistics from "@/pages/Statistics";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/location" element={<Location />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/founder" element={<Founder />} /> {/* rotta per founder */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
