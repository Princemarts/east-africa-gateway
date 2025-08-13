
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import InvestorPortal from "./pages/InvestorPortal";
import AdminLogin from "./pages/AdminLogin";
import ContactPage from "./pages/ContactPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ConsultationDialog from "@/components/ConsultationDialog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Global consultation dialog */}
        <ConsultationDialog />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/investor-portal" element={<InvestorPortal />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
