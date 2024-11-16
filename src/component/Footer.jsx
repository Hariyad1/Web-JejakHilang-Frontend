import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 mt-8 w-full px-8 flex flex-col md:flex-row space-y-6 md:space-y-0 items-center md:items-start justify-around text-sm md:text-md py-8 text-white">
        <div className="flex flex-col items-center md:ml-8">
          <h2 className="text-xl font-semibold text-center">Kontak Kami</h2>
          <div className="flex items-center space-x-4">
            <img src="/LogoJejakHilang.svg" alt="Logo JejakHilang" className="w-24 h-24" />
            <div className="flex flex-col items-center md:items-start">
              <p className="text-sm">Alamat: Jl. Contoh No. 123</p>
              <p className="text-sm">Telepon: (021) 123-4567</p>
              <p className="text-sm">Email: info@contoh.com</p>
              <a href="https://wa.me/6285849268852" className="text-sm flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="mr-2" />WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:mr-32">
          <h2 className="text-xl font-semibold mb-2 text-center">Ikuti Kami</h2>
          <div className="flex flex-col items-center md:items-start">
            <a href="https://www.facebook.com/jejak.hilang//" className="text-sm flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="mr-2" />Facebook
            </a>
            <a href="https://twitter.com/jejak_hilang//" className="text-sm flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="mr-2" />Twitter
            </a>
            <a href="https://www.instagram.com/jejak.hilang//" className="text-sm flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="mr-2" />Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:mr-8">
          <h2 className="text-xl font-semibold mb-2 text-center">Tautan</h2>
          <div className="flex flex-col items-center md:items-start">
            <a href="/about" className="text-sm hover:underline">Tentang Kami</a>
            <a href="/service" className="text-sm hover:underline">Layanan</a>
            <a href="/privacy-policy" className="text-sm hover:underline">Kebijakan Privasi</a>
            <a href="/terms-and-conditions" className="text-sm hover:underline">Syarat dan Ketentuan</a>
          </div>
        </div>
      </div>
      <p className="py-2 pb-6 text-center text-white bg-gradient-to-r from-purple-500 to-blue-600">
        &copy;JejakHilang {new Date().getFullYear()}
      </p>
    </>
  );
};

export default Footer;
