import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const isPageReloaded = window.performance.getEntriesByType('navigation').some((nav) => nav.type === 'reload');
      if (isPageReloaded) {
          navigate('/');
      }
  }, [navigate]);
  
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="privacy-policy-page px-8 py-16 bg-white max-w-screen-lg mx-auto shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-8 text-center">Kebijakan Privasi</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Pendahuluan</h2>
          <p className="text-gray-700">
            JejakHilang berkomitmen untuk melindungi privasi pengguna kami. Kebijakan privasi ini menjelaskan informasi yang dikumpulkan oleh Jejak Hilang dan bagaimana informasi tersebut digunakan dan dibagikan.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Informasi yang Dikumpulkan</h2>
          <p className="text-gray-700">
            JejakHilang mengumpulkan informasi yang Anda berikan saat menggunakan situs web, seperti nama, alamat email, dan nomor telepon Anda. Jejak Hilang juga dapat mengumpulkan informasi tentang penggunaan Anda atas situs web, seperti alamat IP dan halaman yang Anda kunjungi.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Penggunaan Informasi</h2>
          <p className="text-gray-700">
            JejakHilang menggunakan informasi yang dikumpulkan untuk menyediakan dan meningkatkan layanan yang ditawarkan melalui situs web. Jejak Hilang juga dapat menggunakan informasi tersebut untuk berkomunikasi dengan Anda dan memenuhi persyaratan hukum.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Berbagi Informasi</h2>
          <p className="text-gray-700">
            JejakHilang tidak membagikan informasi pribadi Anda dengan pihak ketiga, kecuali jika diwajibkan oleh hukum atau diperlukan untuk menyediakan layanan yang ditawarkan melalui situs web.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Keamanan Data</h2>
          <p className="text-gray-700">
            JejakHilang mengambil langkah-langkah yang wajar untuk melindungi informasi yang dikumpulkan dari kehilangan, penyalahgunaan, dan akses yang tidak sah. Namun, tidak ada langkah keamanan yang sempurna dan Jejak Hilang tidak dapat menjamin keamanan informasi Anda.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Perubahan Kebijakan Privasi</h2>
          <p className="text-gray-700">
            JejakHilang berhak untuk mengubah kebijakan privasi ini kapan saja. Penggunaan situs web yang berkelanjutan setelah perubahan dilakukan akan dianggap sebagai penerimaan dari kebijakan privasi yang telah direvisi.
          </p>
          <p className="text-gray-700">
            Dengan menggunakan situs web JejakHilang, Anda menyetujui pengumpulan, penggunaan, dan pembagian informasi Anda sebagaimana dijelaskan dalam kebijakan privasi ini. Jika Anda tidak setuju dengan kebijakan privasi ini, Anda tidak boleh menggunakan situs web ini.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
