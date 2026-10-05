import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import DoctorDetail from "./pages/DoctorDetail";
import LeaderDetail from "./pages/LeaderDetail";
import News from "./pages/News";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contacts from "./pages/Contacts";
import LegalActs from "./pages/LegalActs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import DoctorsAdmin from "./pages/admin/DoctorsAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";
import MediaAdmin from "./pages/admin/MediaAdmin";
import LegalActsAdmin from "./pages/admin/LegalActsAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:id" element={<DoctorDetail />} />
              <Route path="/leaders/:id" element={<LeaderDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/blog-rukovoditelya" element={<Blog />} />
              <Route path="/blog-rukovoditelya/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/management" element={<Navigate to="/about" replace />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/legal-acts" element={<LegalActs />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="services" element={<ServicesAdmin />} />
                <Route path="doctors" element={<DoctorsAdmin />} />
                <Route path="news" element={<NewsAdmin />} />
                <Route path="legal-acts" element={<LegalActsAdmin />} />
                <Route path="blog" element={<BlogAdmin />} />
                <Route path="media" element={<MediaAdmin />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
