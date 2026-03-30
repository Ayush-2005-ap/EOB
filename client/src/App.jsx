import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ChatbotContainer from "./components/chatbot/ChatbotContainer";
import AboutPage from "./pages/About";
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import Rankings from "./pages/Ranking";
import StateDetails from "./pages/StateDetails";
import ResourcesHome from "./pages/Resources/ResourcesHome";
import ResourceDetail from "./pages/Resources/ResourceDetail";

// ADD THESE TWO IMPORTS
import Outreach from "./pages/Outreach";
import Services from "./pages/Services";

// Admin
import AdminLogin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ResourcesAdmin from "./admin/pages/ResourcesAdmin";
import AddResource from "./admin/pages/AddResource";
import EditResource from "./admin/pages/EditResource";
import AdminRoute from "./admin/components/AdminRoute";
import AdminLayout from "./admin/components/AdminLayout";
import ManageRankings from "./admin/pages/ManageRankings";
import ManageNews from "./admin/pages/ManageNews";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Navbar />}

      <div className="flex-1">{children}</div>

      {!isAdminPage && <ChatbotContainer />}
      {!isAdminPage && <Footer />}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          {/* CLIENT ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contactUs" element={<ContactPage />} />
          <Route path="/outreach" element={<Outreach />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ranking" element={<Rankings />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/rankings/:stateId" element={<StateDetails />} />
          <Route path="/resources" element={<ResourcesHome />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ADMIN PANEL (PROTECTED) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="resources" element={<ResourcesAdmin />} />
            <Route path="resources/add" element={<AddResource />} />
            <Route path="resources/edit/:id" element={<EditResource />} />
            <Route path="rankings" element={<ManageRankings />} />
            <Route path="news" element={<ManageNews />} />
          </Route>
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
