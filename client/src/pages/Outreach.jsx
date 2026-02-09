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
      className="container mx-auto px-6 py-16 max-w-5xl"
    >
      <motion.h1 variants={item} className="text-4xl font-bold mb-10 text-center">
        Outreach & Collaboration
      </motion.h1>

      <motion.div variants={item} className="mb-8">
        <h2 className="text-2xl font-semibold text-red-700">
          Stakeholder Network
        </h2>
        <p className="text-gray-700 mt-2">
          Building partnerships with business communities, associations, and
          institutions to support reform initiatives.
        </p>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <h2 className="text-2xl font-semibold text-red-700">
          Ground-Level Insights
        </h2>
        <p className="text-gray-700 mt-2">
          Documenting real experiences of entrepreneurs to identify practical
          challenges in regulatory systems.
        </p>
      </motion.div>

      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold text-red-700">
          Awareness & Advocacy
        </h2>
        <p className="text-gray-700 mt-2">
          Promoting awareness about simplifying regulations and enabling a
          business-friendly environment across sectors.
        </p>
      </motion.div>
    </motion.div>
  );
}
