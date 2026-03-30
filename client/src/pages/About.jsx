import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
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
          src="/about_hero.png"
          alt="About EODB"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            variants={item}
            className="text-5xl font-bold text-white text-center"
          >
            About the Initiative
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div variants={item}>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 leading-tight">
              Driving Regulatory <br />
              <span className="text-[#9A4020]">Excellence in India</span>
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              The Ease of Doing Business (EODB) initiative is a dedicated effort 
              to transform India's business landscape. By identifying and highlighting 
              regulatory barriers, we empower entrepreneurs to drive economic growth.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our mission is to foster a transparent and efficient ecosystem where 
              businesses of all sizes can thrive without the burden of excessive 
              compliance.
            </p>
          </motion.div>
          <motion.div 
            variants={item}
            className="bg-[#9A4020] text-white p-8 rounded-3xl shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4 italic">"Empowering the engine of our economy - the small business owner."</h3>
            <p className="opacity-90">
              Through rigorous research and persistent advocacy, we aim to make 
              India one of the easiest places in the world to start and run a business.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Our Mission", desc: "To simplify regulatory procedures and reduce the compliance burden for emerging enterprises." },
            { title: "Our Vision", desc: "A transparent, innovation-friendly economy that fosters inclusive growth across all sectors." },
            { title: "Our Approach", desc: "Evidence-based research, stakeholder engagement, and high-impact policy advocacy." }
          ].map((box, i) => (
            <motion.div 
              key={i} 
              variants={item}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-xl font-bold text-[#9A4020] mb-3">{box.title}</h4>
              <p className="text-gray-600">{box.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

