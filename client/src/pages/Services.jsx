import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="container mx-auto px-6 py-20 max-w-6xl"
    >
      <div className="text-center mb-16">
        <motion.h1
          variants={card}
          className="text-5xl font-bold mb-4 text-gray-900"
        >
          Our Services
        </motion.h1>
        <motion.div variants={card} className="w-24 h-1 bg-[#9A4020] mx-auto"></motion.div>
        <motion.p variants={card} className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          We provide comprehensive support for regulatory excellence and 
          business environment transformation.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {[
          { title: "Policy Research & Analysis", desc: "Identifying regulatory barriers and providing evidence-based insights to support better policymaking through data-driven research.", icon: "📊" },
          { title: "Pilot Projects & Innovation", desc: "Testing real-world solutions across governance and digital systems to reduce compliance complexity for startups.", icon: "🚀" },
          { title: "Stakeholder Engagement", desc: "Bringing government, industry, and researchers together for practical reform discussions and collaborative solutions.", icon: "🤝" },
          { title: "EODB Advocacy", desc: "Promoting structural reforms that support MSMEs and innovation-driven growth through active policy engagement.", icon: "🏛️" }
        ].map((s, i) => (
          <motion.div 
            key={i} 
            variants={card} 
            className="p-10 bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">{s.icon}</div>
            <h2 className="text-2xl font-bold text-[#9A4020] mb-4">
              {s.title}
            </h2>
            <p className="text-gray-900 text-lg leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

