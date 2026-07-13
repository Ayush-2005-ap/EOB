import { motion } from "framer-motion";
import { Award, Eye, Compass, Shield, Target, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-[#FAFAFA] min-h-screen pb-24"
    >
      {/* Hero Banner */}
      <div className="relative h-[320px] md:h-[400px] overflow-hidden bg-[#0F1E3C] flex items-center justify-center">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #ffffff 1.5px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0F1E3C]/80" />
        
        {/* Main Content */}
        <div className="relative z-10 text-center px-6">
          <motion.span
            variants={item}
            className="inline-block text-[#E88C30] text-xs font-black uppercase tracking-widest mb-3"
          >
            Centre for Civil Society
          </motion.span>
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-black text-white leading-tight"
          >
            About the Initiative
          </motion.h1>
          <div className="w-16 h-1 bg-[#E88C30] mx-auto mt-4 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl -mt-10 relative z-20">
        {/* Intro Card */}
        <motion.div
          variants={item}
          className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-200/50 mb-16"
        >
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-3xl font-black text-[#0F1E3C] leading-tight">
                Driving Regulatory <br />
                <span className="relative inline-block mt-1">
                  Excellence in India
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E88C30] rounded-full" />
                </span>
              </h2>
              <p className="text-gray-600 leading-[1.75] text-base md:text-lg">
                The Ease of Doing Business (EODB) initiative is a dedicated research and advocacy effort by the Centre for Civil Society. By identifying and highlighting complex regulatory barriers, we empower policy researchers, stakeholders, and entrepreneurs to simplify compliance and foster robust economic growth.
              </p>
              <p className="text-gray-600 leading-[1.75] text-base md:text-lg">
                Our ultimate mission is to advocate for a transparent, efficient, and predictable regulatory ecosystem where businesses of all sizes can grow, compete, and innovate without the burden of excessive compliance.
              </p>
            </div>
            <div className="md:col-span-5 bg-[#0F1E3C] text-white p-8 md:p-10 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full -mr-10 -mt-10" />
              <h3 className="text-xl md:text-2xl font-bold mb-6 italic leading-relaxed text-white/90">
                "Empowering the engine of our economy — the small business owner."
              </h3>
              <div className="w-8 h-[2px] bg-[#E88C30] mb-4" />
              <p className="text-sm text-white/70 leading-relaxed">
                Through rigorous, data-driven research and persistent engagement with state governments, we aim to make India one of the easiest and most welcoming places in the world to launch and run an enterprise.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Our Mission",
              desc: "To simplify regulatory procedures and reduce the compliance burden for emerging enterprises.",
              icon: Award,
            },
            {
              title: "Our Vision",
              desc: "A transparent, innovation-friendly economy that fosters inclusive growth across all Indian states.",
              icon: Eye,
            },
            {
              title: "Our Approach",
              desc: "Evidence-based research, direct stakeholder engagement, and high-impact policy advocacy.",
              icon: Compass,
            },
          ].map((box, i) => {
            const Icon = box.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <div className="w-10 h-10 bg-[#E88C30]/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon size={20} className="text-[#E88C30]" strokeWidth={2} />
                </div>
                <h4 className="text-lg font-black text-[#0F1E3C] mb-3 uppercase tracking-wider">
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
          className="bg-linear-to-br from-[#0F1E3C] to-[#071124] text-white p-10 md:p-14 rounded-3xl border border-white/5 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
          <span className="text-[#E88C30] text-xs font-black uppercase tracking-widest mb-3 inline-block">
            Collaborate With Us
          </span>
          <h3 className="text-2xl md:text-3xl font-black mb-4">
            Want to join the mission?
          </h3>
          <p className="text-white/70 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            We are always looking for policy experts, researchers, industry leaders, and entrepreneurs to collaborate on reforms. Let's work together to build a more efficient India.
          </p>
          <button
            onClick={() => navigate("/contactUs")}
            className="bg-[#E88C30] hover:bg-[#d07a20] text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg text-sm hover:shadow-xl active:scale-98"
          >
            Get In Touch →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
