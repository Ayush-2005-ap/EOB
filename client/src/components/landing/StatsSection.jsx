import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchResources, fetchRankings } from "../../services/api";

export default function StatsSection() {
  const [stats, setStats] = useState([
    { label: "Business Score Improvement", value: "14%", icon: "📈" },
    { label: "Regulatory Reforms Tracked", value: "250+", icon: "📋" },
    { label: "States & UTs Covered", value: "32", icon: "🇮🇳" },
    { label: "Stakeholders Engaged", value: "5,000+", icon: "🤝" },
  ]);

  useEffect(() => {
    const loadStats = async () => {
        try {
            const [resources, rankings] = await Promise.all([
                fetchResources(),
                fetchRankings()
            ]);

            setStats([
                { label: "Research & Publications", value: resources.length, icon: "📚" },
                { label: "Regulatory Data Points", value: "850+", icon: "📋" },
                { label: "States & UTs Indexed", value: rankings.length, icon: "🇮🇳" },
                { label: "Average Compliance", value: "72%", icon: "⚖️" },
            ]);
        } catch (err) {
            console.error(err);
        }
    };
    loadStats();
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#9A4020] to-[#80351A] py-20 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
              }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums">
                  {stat.value}
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/60">
                  {stat.label}
              </div>
              <div className="w-10 h-1 bg-white/20 mx-auto mt-4 rounded-full group-hover:w-16 group-hover:bg-white/40 transition-all"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
