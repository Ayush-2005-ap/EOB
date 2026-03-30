import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

const item = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Outreach() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="pb-16"
    >
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden mb-16">
        <img
          src="/outreach_hero.png"
          alt="Outreach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            variants={item}
            className="text-5xl font-bold text-white text-center"
          >
            Outreach & Collaboration
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            variants={item} 
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold text-[#9A4020] mb-4">
              Stakeholder Network
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Building partnerships with business communities, associations, and
              research institutions to support high-impact reform initiatives.
            </p>
          </motion.div>

          <motion.div 
            variants={item} 
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-[#9A4020] mb-4">
              Ground-Level Insights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Documenting real-world experiences of entrepreneurs to identify 
              practical challenges in current regulatory and compliance systems.
            </p>
          </motion.div>

          <motion.div 
            variants={item}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">📢</div>
            <h2 className="text-2xl font-bold text-[#9A4020] mb-4">
              Awareness & Advocacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Promoting broad awareness about simplifying regulations and 
              enabling a business-friendly environment across all economic sectors.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={item}
          className="mt-16 bg-[#FDF5F2] p-10 rounded-3xl border border-[#9A4020]/20 text-center"
        >
          <h3 className="text-3xl font-bold mb-6 text-gray-900">Want to Collaborate?</h3>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            We are always looking for researchers, policy experts, and business leaders 
            to join our mission. Let's work together to build a more efficient India.
          </p>
          <button 
            onClick={() => window.location.href = '/contactUs'}
            className="bg-[#9A4020] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#80351A] transition shadow-lg"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

