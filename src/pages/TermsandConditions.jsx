import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function TermsAndConditions() {
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
                <div className="terms-and-conditions-page px-8 py-16 bg-white max-w-screen-lg mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Syarat & Ketentuan</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Pendahuluan</h2>
                <p className="text-gray-700">
                    Syarat dan ketentuan ini mengatur penggunaan situs web JejakHilang dan layanan yang disediakan melalui situs web ini. Dengan mengakses atau menggunakan situs web ini, Anda setuju untuk terikat dengan syarat dan ketentuan ini.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Layanan</h2>
                <p className="text-gray-700">
                    JejakHilang menyediakan platform bagi pengguna untuk melaporkan barang hilang dan ditemukan serta mencari barang yang mungkin hilang. Situs web ini bertindak sebagai fasilitator dan tidak bertanggung jawab atas transaksi atau perjanjian yang dibuat antara pengguna.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Perilaku Pengguna</h2>
                <p className="text-gray-700">
                    Anda setuju untuk menggunakan situs web ini hanya untuk tujuan yang sah dan dengan cara yang tidak melanggar hak, membatasi, atau menghalangi penggunaan dan kenikmatan orang lain dari situs ini.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Konten</h2>
                <p className="text-gray-700">
                    JejakHilang tidak menjamin keakuratan, keandalan, atau kualitas konten apa pun yang diposting di situs web. Anda memahami bahwa dengan menggunakan situs web ini, Anda mungkin terpapar konten yang tidak akurat, menyinggung, atau tidak menyenangkan.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Tanggung Jawab</h2>
                <p className="text-gray-700">
                    JejakHilang tidak bertanggung jawab atas kerugian atau kerusakan yang mungkin timbul dari penggunaan situs web ini atau layanan yang disediakan melalui situs web. JejakHilang tidak akan bertanggung jawab atas kerugian tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan situs web.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Perubahan Syarat dan Ketentuan</h2>
                <p className="text-gray-700">
                    JejakHilang berhak untuk mengubah syarat dan ketentuan ini kapan saja. Penggunaan situs web yang berkelanjutan setelah perubahan dilakukan akan dianggap sebagai penerimaan dari syarat dan ketentuan yang telah direvisi.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Hukum yang Berlaku</h2>
                <p className="text-gray-700">
                    Dengan menggunakan situs web JejakHilang, Anda setuju untuk terikat dengan syarat dan ketentuan ini. Jika Anda tidak setuju dengan syarat dan ketentuan ini, Anda tidak boleh menggunakan situs web ini.
                    </p>
                </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TermsAndConditions;
