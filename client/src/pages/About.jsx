import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Filled solid icons
const IconMission = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const IconVision = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
);

const IconApproach = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
  </svg>
);

export default function About() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-[#F5F7FA] min-h-screen pb-24"
    >
      {/* Hero Banner */}
      <div className="relative h-[280px] md:h-[320px] overflow-hidden bg-[#002244] flex items-center justify-center">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #0071BC 0px, #0071BC 1px, transparent 1px, transparent 40px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#002244]/90" />
        
        {/* Main Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div variants={item} className="flex items-center justify-center gap-3 mb-3">
            
            <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
              Centre for Civil Society
            </span>
          </motion.div>
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            About the Initiative
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl -mt-10 relative z-20">
        {/* Intro Card */}
        <motion.div
          variants={item}
          className="bg-white rounded-lg p-8 md:p-12 border border-gray-200 shadow-lg mb-12"
        >
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-3xl font-bold text-[#002244] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Driving Regulatory <br />
                <span className="text-[#0071BC]">Excellence in India</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                The Ease of Doing Business (EODB) initiative is a dedicated research and advocacy effort by the Centre for Civil Society. By identifying and highlighting complex regulatory barriers, we empower policy researchers, stakeholders, and entrepreneurs to simplify compliance and foster robust economic growth.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                Our ultimate mission is to advocate for a transparent, efficient, and predictable regulatory ecosystem where businesses of all sizes can grow, compete, and innovate without the burden of excessive compliance.
              </p>
            </div>
            <div className="md:col-span-5 bg-[#002244] text-white p-8 md:p-10 rounded-lg shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full -mr-10 -mt-10" />
              <h3 className="text-lg md:text-xl font-bold mb-6 italic leading-relaxed text-white/90">
                "Empowering the engine of our economy — the small business owner."
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Through rigorous, data-driven research and persistent engagement with state governments, we aim to make India one of the easiest and most welcoming places in the world to launch and run an enterprise.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Our Mission",
              desc: "To simplify regulatory procedures and reduce the compliance burden for emerging enterprises.",
              icon: IconMission,
              color: "#0071BC",
            },
            {
              title: "Our Vision",
              desc: "A transparent, innovation-friendly economy that fosters inclusive growth across all Indian states.",
              icon: IconVision,
              color: "#00538A",
            },
            {
              title: "Our Approach",
              desc: "Evidence-based research, direct stakeholder engagement, and high-impact policy advocacy.",
              icon: IconApproach,
              color: "#002244",
            },
          ].map((box, i) => {
            const Icon = box.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:border-[#C8793F] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded flex items-center justify-center mb-6"
                  style={{ background: box.color + "12", color: box.color }}
                >
                  <Icon />
                </div>
                <h4 className="text-base font-bold text-[#002244] mb-3 uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  {box.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {box.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <motion.div
          variants={item}
          className="bg-white p-10 md:p-14 rounded-lg border border-gray-200 text-center relative overflow-hidden shadow-md"
        >
          <span className="text-[#0071BC] text-xs font-bold uppercase tracking-widest mb-3 inline-block">
            Collaborate With Us
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-[#002244] mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Want to join the mission?
          </h3>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            We are always looking for policy experts, researchers, industry leaders, and entrepreneurs to collaborate on reforms. Let's work together to build a more efficient India.
          </p>
          <button
            onClick={() => navigate("/contactUs")}
            className="bg-[#0071BC] hover:bg-[#C8793F] text-white font-bold px-8 py-3.5 rounded transition-all duration-200 shadow-sm text-sm"
          >
            Get In Touch →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
