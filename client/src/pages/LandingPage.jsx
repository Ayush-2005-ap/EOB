
import HeroV2 from "../components/landing/HeroV2";
import AboutSection from "../components/landing/AboutSection";
import RankingsPreviewSection from "../components/landing/RankingsPreviewSection";
import ResourcesPreviewSection from "../components/landing/ResourcesPreviewSection";
import LatestNewsSection from "../components/landing/LatestNewsSection";

export default function LandingPage() {


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
