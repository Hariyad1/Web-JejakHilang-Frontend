import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TentangKami = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const isPageReloaded = window.performance.getEntriesByType('navigation').some((nav) => nav.type === 'reload');
      if (isPageReloaded) {
          navigate('/');
      }
  }, [navigate]);

  return (
    <div className="w-full md:w-1/2 mb-8 md:mb-0">
      <h2 className="text-2xl font-bold text-gray-500 mb-2 text-center">TENTANG KAMI</h2>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
        Membantu Anda Menemukan Barang yang Hilang dengan Cepat dan Efektif.
      </h1>
      <p className="text-lg mb-6">
        JejakHilang adalah platform terdepan untuk pelaporan dan pencarian barang hilang. 
        Dengan teknologi terkini dan jaringan yang luas, kami menghubungkan orang-orang yang kehilangan barang dengan mereka yang menemukannya.
      </p>
      <p className="text-lg mb-6">
        Kami percaya bahwa setiap barang berharga dan layak untuk ditemukan kembali. 
        Bergabunglah dengan kami untuk pengalaman pencarian yang lebih baik.
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">
        Daftar Sekarang
      </button>
    </div>
  );
};

const OurTeam = () => {
  return (
    <div className="w-full text-center mt-32">
      <h2 className="text-3xl font-bold mb-4">Our Team</h2>
      <p className="text-gray-600 mb-8">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <div className="flex flex-wrap justify-center">
        {[
          { name: "p", role: "p", img: "path/to/image1.jpg" },
          { name: "p", role: "p", img: "path/to/image2.jpg" },
        ].map((member, index) => (
          <div key={index} className="w-full md:w-1/4 p-4">
            <img src={member.img} alt={member.name} className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-gray-500 mb-2">{member.role}</p>
            <p className="text-gray-600 mb-4">
              Glavi amet ritnisi libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-blue-500"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-blue-400"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-pink-500"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TentangKamiPage = () => {
  return (
    <div className="flex flex-col items-center justify-between px-8 py-16 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <TentangKami />
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="imges/about.svg"
            alt="Jejak Hilang"
            style={{ width: '500px', height: '500px' }}
            className="transform transition duration-500 hover:scale-105"
          />
        </div>
      </div>
      <OurTeam />
    </div>
  );
};

export default TentangKamiPage;