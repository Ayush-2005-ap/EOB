import { useEffect } from "react";
import toast from "react-hot-toast";
import HeroV2 from "../components/landing/HeroV2";
import AboutSection from "../components/landing/AboutSection";
import RankingsPreviewSection from "../components/landing/RankingsPreviewSection";
import ResourcesPreviewSection from "../components/landing/ResourcesPreviewSection";
import LatestNewsSection from "../components/landing/LatestNewsSection";

export default function LandingPage() {
    useEffect(() => {
        const shown = sessionStorage.getItem("chatbotToastShown");
        if (!shown) {
            toast("🤖 Need help? Try our AI Chatbot from the bottom-right corner!", {
                duration: 2500,
                icon: "💬",
                style: {
                    borderRadius: "12px",
                    background: "#0F1E3C",
                    color: "#fff",
                    padding: "16px",
                    fontWeight: "500",
                },
            });
            sessionStorage.setItem("chatbotToastShown", "true");
        }
    }, []);

    return (
        <div className="overflow-x-hidden">
            <HeroV2 />
            <AboutSection />
            <RankingsPreviewSection />
            <ResourcesPreviewSection />
            <LatestNewsSection />
        </div>
    );
}
