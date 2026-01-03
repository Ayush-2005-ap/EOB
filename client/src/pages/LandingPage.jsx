import AnnouncementBanner from "../components/landing/AnnouncementBanner";
import HeroSection from "../components/landing/HeroSection";
// import StatsSection from "../components/landing/StatsSection";
import ChatbotContainer from "../components/chatbot/ChatbotContainer";
import ExperiencesSection from "../components/landing/ExperienceSection";
import NewsSection from "../components/landing/NewsSection";
import toast from "react-hot-toast";
import { useEffect } from "react";
import LatestNewsSection from "../components/landing/LatestNewsSection";

export default function LandingPage() {

    useEffect(() => {
        const shown = sessionStorage.getItem("chatbotToastShown");

        if (!shown) {
            toast(
                "🤖 Need help? Try our AI Chatbot from the bottom-right corner!",
                {
                    duration: 2000,
                    icon: "💬",
                    style: {
                        borderRadius: "12px",
                        background: "#C9783E", // blue-800
                        color: "#fff",
                        padding: "16px",
                        fontWeight: "500",
                    }
                }
            );
            sessionStorage.setItem("chatbotToastShown", "true");
        }
    }, []);

    return (
        <>
            <AnnouncementBanner />
            <section className="max-w-6xl mx-auto px-6 py-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    About the Initiative
                </h2>
                <p className="text-gray-700 leading-relaxed text-base">
                    Ease of Doing Business is an initiative by the Centre for Civil Society (CCS),
                    aimed at promoting regulatory reforms, simplifying compliance procedures, and
                    improving India’s business environment through research, advocacy, and
                    policy engagement.
                </p>
            </section>
            <HeroSection />
            <ExperiencesSection />
            <LatestNewsSection />
            {/* <NewsSection /> */}
            {/* <StatsSection /> */}
            {/* <ServicesSection /> */}

            {/* <ChatbotContainer /> */}
        </>
    );
}
