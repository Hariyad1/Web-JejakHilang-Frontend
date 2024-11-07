import SectionCategorize from "../component/SectionCategorize"
import Footer from "../component/Footer"
//import Categories from "../component/Categories"
//import Navbar from "../component/Navbar"

const Home = () => {
  return (
    <div>
      
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Temukan Barang Hilang Anda
        </h1>
        </div>        
        </div>
      <div className="space-y-0">
        <SectionCategorize />
        <Footer />
      </div>
    </div>
  )
}

export default Home
