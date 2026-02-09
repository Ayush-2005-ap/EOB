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
      className="container mx-auto px-6 py-16 max-w-5xl"
    >
      <motion.h1
        variants={item}
        className="text-4xl font-bold mb-8 text-center"
      >
        About Ease of Doing Business
      </motion.h1>

      <motion.p variants={item} className="text-gray-700 leading-relaxed mb-6">
        The Ease of Doing Business initiative focuses on improving the regulatory
        and business environment in India by identifying barriers that affect
        entrepreneurs, small businesses, and emerging enterprises.
      </motion.p>

      <motion.p variants={item} className="text-gray-700 leading-relaxed mb-6">
        The objective is to simplify procedures, reduce compliance burden, and
        enable businesses to start, operate, and grow in a transparent ecosystem.
      </motion.p>

      <motion.p variants={item} className="text-gray-700 leading-relaxed">
        The platform connects policymakers, researchers, industry leaders, and
        citizens to evaluate reforms and build a more efficient, inclusive, and
        innovation-friendly economy.
      </motion.p>
    </motion.div>
  );
}
