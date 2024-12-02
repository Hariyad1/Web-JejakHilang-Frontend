import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import aboutImage from '../assets/images/about.svg';
import hariyadiImage from '../assets/images/hariyadi.svg';
import keivinImage from '../assets/images/keivin.svg';

const TentangKami = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const isPageReloaded = window.performance.getEntriesByType('navigation').some((nav) => nav.type === 'reload');
      if (isPageReloaded) {
          navigate('/');
      }
  }, [navigate]);

  return (
    <div className="w-full md:w-3/5 mb-8 md:mb-0">
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
    </div>
  );
};

const OurTeam = () => {
  const teamMembers = [
    { name: "Hariyadi", role: "Fullstack Developer", img: hariyadiImage },
    { name: "Keivin Immanuel Akta Purba", role: "Frontend Developer", img: keivinImage },
  ];

  return (
    <div className="w-full text-center mt-8">
      <h2 className="text-3xl font-bold mb-4">Tim Kami</h2>
      <p className="text-gray-600 text-lg mb-8">
        Tim kami terdiri dari para profesional berdedikasi yang berkomitmen untuk memberikan layanan terbaik. 
        Dengan keahlian dan pengalaman yang luas, kami bekerja sama untuk mencapai tujuan bersama dan memberikan solusi inovatif bagi pengguna kami.
      </p>
      <div className="flex flex-wrap justify-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="w-full md:w-1/4 p-4">
            <img src={member.img} alt={member.name} className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-gray-500 mb-2">{member.role}</p>
            <p className="text-gray-600 mb-4">
              {member.name === "Hariyadi" ? (
                "Sebagai pengembang Fullstack, Dalam project ini saya bertanggung jawab untuk merancang dan mengimplementasikan solusi teknis yang inovatif, memastikan integrasi yang mulus antara frontend dan backend."
              ) : (
                "Sebagai pengembang Frontend, Dalam project ini saya fokus pada desain antarmuka pengguna yang responsif, serta memastikan pengalaman pengguna yang optimal di berbagai perangkat."
              )}
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
  const { theme } = useTheme();

  return (
    <div>
      <Navbar />
      <div className={`flex flex-col items-center justify-between px-8 py-16 ${theme}`}>
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <TentangKami />
          <div className="w-full md:w-2/5 flex justify-center">
            <img
              src={aboutImage}
              alt="Jejak Hilang"
              style={{ width: '500px', height: '500px' }}
              className="transform transition duration-500 hover:scale-105"
            />
          </div>
        </div>
        <OurTeam />
      </div>
      <Footer />
    </div>
  );
};

export default TentangKamiPage;