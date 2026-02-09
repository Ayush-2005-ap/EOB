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
      className="container mx-auto px-6 py-16 max-w-6xl"
    >
      <motion.h1
        variants={card}
        className="text-4xl font-bold mb-12 text-center"
      >
        Our Services
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">

        <motion.div variants={card} className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold text-red-700">
            Policy Research & Analysis
          </h2>
          <p className="text-gray-700 mt-3">
            Identifying regulatory barriers and providing evidence-based insights
            to support better policymaking.
          </p>
        </motion.div>

        <motion.div variants={card} className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold text-red-700">
            Pilot Projects & Innovation
          </h2>
          <p className="text-gray-700 mt-3">
            Testing solutions across governance and digital systems to reduce
            compliance complexity.
          </p>
        </motion.div>

        <motion.div variants={card} className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold text-red-700">
            Stakeholder Engagement
          </h2>
          <p className="text-gray-700 mt-3">
            Bringing government, industry, and researchers together for practical
            reform discussions.
          </p>
        </motion.div>

        <motion.div variants={card} className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold text-red-700">
            EODB Advocacy
          </h2>
          <p className="text-gray-700 mt-3">
            Promoting reforms that support startups, MSMEs, and innovation-driven
            growth.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
