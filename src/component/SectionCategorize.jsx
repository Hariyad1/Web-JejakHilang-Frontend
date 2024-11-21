import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom"

const SectionCatagorize = () => {
  return (
    <div className="flex w-full  bg-white-900 rounded-lg shadow-md">
      <Carousel
        autoPlay
        showThumbs={false}
        infiniteLoop
        interval={5000}
        transitionTime={500}
        stopOnHover
      >
        <div>
          <img
            src="./imges/rb_2150696452.png"
            alt="Category Image 1"
            className="object-contain h-screen w-auto"
          />
        </div>
        <div>
          <img
            src="./imges/rb_2150696455.png"
            alt="Category Image 2"
            className="object-contain h-screen w-auto"
          />
        </div>
        <div>
          <img
            src="./imges/rb_2150696461.png"
            alt="Category Image 3"
            className="object-contain h-screen w-auto"
          />
        </div>
      </Carousel>
      <div className="flex inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-black">
          <h2 className="text-3xl font-extrabold mb-10 mt-4">Temukan atau Laporkan Barang Hilang dari Sini</h2>
          <p className="text-lg mt-4 mb-10">Buat Postingan dan Cari Barang Hilang Anda di Sini</p>
          <Link
            to="/item"
            className="mt-10 px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-700 text-white text-sm font-semibold transition duration-300 ease-in-out"
          >
            Eksplor Sekarang
          </Link>
        </div>
      </div>

    </div>
  );
};

export default SectionCatagorize;
