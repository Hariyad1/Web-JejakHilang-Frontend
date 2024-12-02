import React from 'react';
import { motion } from "framer-motion";
import { CustomerServiceOutlined } from "@ant-design/icons";

const features = [
  {
    title: "Laporan Barang Hilang",
    description: (
      <>
        Laporkan barang hilang atau laporkan barang temuan
        <br /> dengan mudah dan cepat.
      </>
    ),
    icon: "📦",
  },
  {
    title: "Pencarian Barang",
    description: "Cari barang yang hilang dengan fitur pencarian kami.",
    icon: "🔍",
  },
  {
    title: "Layanan Bantuan 24/7",
    description: "Layanan bantuan 24/7 melalui kontak kami di bawah.",
    icon: <CustomerServiceOutlined />,
  },
];

const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const boxVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const FeatureSection = () => {
  const title = "Fitur Unggulan JejakHilang";
  const highlightWord = "Hilang";

  return (
    <div className="relative container mx-auto py-12">
      <motion.h2
        className="text-3xl font-bold text-center mb-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={textRevealVariants}
      >
        {title.split(highlightWord)[0].split("").map((char, index) => (
          <motion.span
            key={`title-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            {char}
          </motion.span>
        ))}
        {highlightWord.split("").map((char, index) => (
          <motion.span
            key={`highlight-${index}`}
            style={{ color: '#93C5FD' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: (title.length + index) * 0.2,
              duration: 0.7,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h2>
      <div className="flex justify-around flex-wrap relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg m-4 text-center"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={boxVariants}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <motion.h3
              className="text-xl font-semibold mb-2"
              initial="hidden"
              whileInView="visible"
              variants={textRevealVariants}
            >
              {feature.title}
            </motion.h3>
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={textRevealVariants}
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
