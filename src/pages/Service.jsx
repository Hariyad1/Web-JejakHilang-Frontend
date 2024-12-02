import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Service() {
    const navigate = useNavigate();

    useEffect(() => {
        const isPageReloaded = window.performance.getEntriesByType('navigation').some((nav) => nav.type === 'reload');
        if (isPageReloaded) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="service-page px-8 py-16 bg-white max-w-screen-lg mx-auto">
            <h1 className="text-4xl font-bold mb-8">Layanan Kami</h1>
            <p className="text-gray-700 mb-8">
                Selamat datang di halaman layanan Jejak Hilang. Kami menyediakan berbagai layanan untuk membantu Anda menemukan jejak yang hilang.
            </p>
            
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Pelaporan</h2>
                    <p className="text-gray-700">
                        Kami menyediakan layanan untuk pengguna membuat laporan guna membantu menemukan barang yang hilang.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Pencarian</h2>
                    <p className="text-gray-700">
                        Kami menyediakan layanan pencarian terperinci guna membantu pengguna menemukan barang yang hilang.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Pemantauan</h2>
                    <p className="text-gray-700">
                        Tim kami melakukan pemantauan secara berkala untuk memastikan informasi yang akurat dan terkini melalui web admin.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Dukungan 24/7</h2>
                    <p className="text-gray-700">
                        Kami siap membantu Anda kapan saja dengan dukungan penuh selama 24 jam sehari.
                    </p>
                </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Service;
