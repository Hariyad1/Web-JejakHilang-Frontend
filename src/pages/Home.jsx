import React from 'react';
import ThemeToggle from '../component/ThemeToggle';
import SectionCategorize from "../component/SectionCategorize"
import Footer from "../component/Footer"
import FeatureSection from "../component/FeatureSection"
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Temukan atau Laporkan Barang Hilang Anda
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
      <div className="space-y-0">
        <SectionCategorize />
        <FeatureSection />
        <Footer />
      </div>
    </div>
  )
}

export default Home
