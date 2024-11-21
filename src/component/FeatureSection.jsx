// frontend/src/component/FeatureSection.jsx
import { motion } from "framer-motion";

const features = [
  {
    title: "Laporan Barang Hilang",
    description: "Laporkan barang yang hilang dengan mudah dan cepat.",
    icon: "📦",
  },
  {
    title: "Pencarian Barang",
    description: "Cari barang yang hilang dengan fitur pencarian kami.",
    icon: "🔍",
  },
  {
    title: "Komunitas",
    description: "Bergabung dengan komunitas untuk mendapatkan bantuan.",
    icon: "👥",
  },
];

const FeatureSection = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Fitur Jejak Hilang
      </h2>
      <div className="flex justify-around">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;