import { BrowserRouter, Routes, Route, useNavigate, replace } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ChatbotContainer from "./components/chatbot/ChatbotContainer";
import AboutPage from "./pages/About";
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Rankings from "./pages/Ranking";
import StateDetails from "./pages/StateDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* <ChatbotContainer /> */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
              <LandingPage />
              </>
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contactUs" element={<ContactPage />}/>
            <Route path="/ranking" element={<Rankings />}/>
            <Route path="/rankings/:stateId" element={<StateDetails />}/>
          </Routes>
        </div>
        <ChatbotContainer />
        <Footer />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </BrowserRouter>
  );
}

export default App;