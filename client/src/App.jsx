import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ChatbotContainer from "./components/chatbot/ChatbotContainer";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
