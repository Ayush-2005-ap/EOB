import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Filled solid icons
const IconPartnership = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const IconSpeaker = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm0 4h8v-2H6v2zm0-8h12v2H6V5z"/>
  </svg>
);

export default function Outreach() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-[#F5F7FA] min-h-screen pb-24"
    >
      {/* Hero Section */}
      <div className="relative h-[280px] md:h-[320px] overflow-hidden bg-[#002244] flex items-center justify-center">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #0071BC 0px, #0071BC 1px, transparent 1px, transparent 40px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#002244]/90" />
        <div className="relative z-10 text-center px-6">
          <motion.div variants={item} className="flex items-center justify-center gap-3 mb-3">
            
            <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
              Engagement &amp; Advocacy
            </span>
          </motion.div>
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-bold text-white text-center"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Outreach &amp; Collaboration
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mt-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div 
            variants={item} 
            className="bg-white p-8 rounded border border-gray-200 shadow-sm hover:border-[#C8793F] hover:shadow-lg hover:shadow-[#C8793F]/20 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded bg-[#0071BC]/10 text-[#0071BC] flex items-center justify-center mb-6">
              <IconPartnership />
            </div>
            <h2 className="text-lg font-bold text-[#002244] mb-3 uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Stakeholder Network
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Building partnerships with business communities, associations, and
              research institutions to support high-impact reform initiatives.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={item} 
            className="bg-white p-8 rounded border border-gray-200 shadow-sm hover:border-[#C8793F] hover:shadow-lg hover:shadow-[#C8793F]/20 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded bg-[#00538A]/10 text-[#00538A] flex items-center justify-center mb-6">
              <IconSearch />
            </div>
            <h2 className="text-lg font-bold text-[#002244] mb-3 uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Ground-Level Insights
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Documenting real-world experiences of entrepreneurs to identify 
              practical challenges in current regulatory and compliance systems.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={item} 
            className="bg-white p-8 rounded border border-gray-200 shadow-sm hover:border-[#C8793F] hover:shadow-lg hover:shadow-[#C8793F]/20 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded bg-[#002244]/10 text-[#002244] flex items-center justify-center mb-6">
              <IconSpeaker />
            </div>
            <h2 className="text-lg font-bold text-[#002244] mb-3 uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Awareness &amp; Advocacy
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Promoting broad awareness about simplifying regulations and 
              enabling a business-friendly environment across all economic sectors.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          variants={item}
          className="mt-12 bg-white p-10 md:p-14 rounded border border-gray-200 text-center shadow-sm"
        >
          <span className="text-[#0071BC] text-xs font-bold uppercase tracking-widest mb-3 inline-block">
            Collaborate With Us
          </span>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#002244]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Want to Collaborate?
          </h3>
          <p className="text-gray-500 text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
            We are always looking for researchers, policy experts, and business leaders 
            to join our mission. Let's work together to build a more efficient India.
          </p>
          <button 
            onClick={() => navigate("/contactUs")}
            className="bg-[#0071BC] hover:bg-[#C8793F] text-white px-10 py-4 rounded font-bold transition shadow-sm text-sm"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
