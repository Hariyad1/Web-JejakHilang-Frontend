import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 w-full px-8 flex flex-col md:flex-row space-y-6 md:space-y-0 items-center md:items-start justify-around text-sm md:text-md py-8 text-white">
        <div className="flex flex-col items-center md:ml-8 md:mr-8">
          <h2 className="text-xl font-semibold text-center mb-2">Kontak Kami</h2>
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4">
            <div className="flex flex-col items-center mb-4 md:mb-0 mr-0 md:mr-4">
              <img src="/logojh.svg" alt="Logo JejakHilang" className="w-24 h-24" />
              <span className="text-lg">
                <span className="text-black">Jejak</span>
                <span className="text-blue-300">Hilang</span>
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <a href="https://www.google.com/maps/search/?api=1&query=Jl.+Yos+Sudarso,+Palangka,+Kec.+Jekan+Raya,+Kota+Palangka+Raya,+Kalimantan+Tengah+74874" className="text-sm break-words max-w-xs mb-2 hover:underline" target="_blank" rel="noopener noreferrer">
                Alamat: Jl. Yos Sudarso, Palangka, Kec. Jekan Raya,<br />
                Kota Palangka Raya, Kalimantan Tengah 74874
              </a>
              <a href="tel:+6285849268852" className="text-sm hover:underline">Telepon: +62 858-4926-8852</a>
              <a href="mailto:jejkhilang@gmail.com" className="text-sm hover:underline">Email: jejkhilang@gmail.com</a>
              <a href="https://wa.me/6285849268852" className="text-sm flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="mr-2" />WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:mr-32">
          <h2 className="text-xl font-semibold mb-2 text-center">Ikuti Kami</h2>
          <div className="flex flex-col items-center md:items-start">
            <a href="https://www.facebook.com/jejkhilang" className="text-sm flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="mr-2" />Facebook
            </a>
            <a href="https://twitter.com/jejkhilang" className="text-sm flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="mr-2" />Twitter
            </a>
            <a href="https://www.instagram.com/jejkhilang" className="text-sm flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
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
        &copy;JejakHilang {new Date().getFullYear()}, All rights reserved.
      </p>
    </>
  );
};

export default Footer;
