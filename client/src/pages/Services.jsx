import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const card = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Filled solid icons
const IconResearch = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2V7h2v10zm4 0h-2v-3h2v3z"/>
  </svg>
);

const IconInnovation = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

const IconEngagement = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

const IconAdvocacy = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
  </svg>
);

export default function Services() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-[#F5F7FA] min-h-screen py-20"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            
            <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
              Our Value Proposition
            </span>
          </div>
          <motion.h1
            variants={card}
            className="text-4xl md:text-5xl font-bold mb-4 text-[#002244]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Our Services
          </motion.h1>
          <motion.p variants={card} className="mt-6 text-gray-500 text-base md:text-lg leading-relaxed">
            We provide comprehensive support for regulatory excellence and 
            business environment transformation.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Policy Research & Analysis", desc: "Identifying regulatory barriers and providing evidence-based insights to support better policymaking through data-driven research.", icon: IconResearch, color: "#0071BC" },
            { title: "Pilot Projects & Innovation", desc: "Testing real-world solutions across governance and digital systems to reduce compliance complexity for startups.", icon: IconInnovation, color: "#00538A" },
            { title: "Stakeholder Engagement", desc: "Bringing government, industry, and researchers together for practical reform discussions and collaborative solutions.", icon: IconEngagement, color: "#002244" },
            { title: "EODB Advocacy", desc: "Promoting structural reforms that support MSMEs and innovation-driven growth through active policy engagement.", icon: IconAdvocacy, color: "#0071BC" }
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div 
                key={i} 
                variants={card} 
                className="p-8 bg-white rounded border border-gray-200 shadow-sm hover:border-[#C8793F] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded flex items-center justify-center mb-6 text-white"
                  style={{ background: s.color + "12", color: s.color }}
                >
                  <Icon />
                </div>
                <h2 className="text-xl font-bold text-[#002244] mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  {s.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
