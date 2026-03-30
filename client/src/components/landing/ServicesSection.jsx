import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    title: "Policy Research",
    desc: "In-depth analysis of regulatory frameworks to identify bottlenecks.",
    icon: "🔬",
  },
  {
    title: "Advocacy",
    desc: "Engaging with government bodies to promote business-friendly reforms.",
    icon: "📢",
  },
  {
    title: "Support Systems",
    desc: "Helping MSMEs and startups navigate compliance complexity.",
    icon: "🛠️",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Core Focus</h2>
          <div className="w-20 h-1 bg-[#9A4020] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="text-4xl mb-6">{s.icon}</div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{s.desc}</p>
              <Link
                to="/services"
                className="text-[#9A4020] font-semibold hover:underline flex items-center gap-2"
              >
                Learn More <span>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
