import { Link, useLocation } from "react-router-dom"
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import HomePostItem from "../component/HomePostItem"
import Loader from "../component/Loader"
import { SearchOutlined } from "@ant-design/icons";
const MyPosts = () => {
  const { search } = useLocation()
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)
  const { user } = useContext(UserContext)

  // State untuk pencarian, paginasi, dan jumlah entitas
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(5)

  // State untuk tab yang dipilih
  const [selectedTab, setSelectedTab] = useState("all")

  const fetchPosts = async () => {
    if (!user || !user._id) return
    setLoader(true)
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`)
      setPosts(res.data.reverse())
      setNoResults(res.data.length === 0)
    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [search, user])

  // Debugging: Log posts
  useEffect(() => {
    console.log("Posts:", posts)
  }, [posts])

  // Filter posts berdasarkan searchTerm dan selectedTab
  const filteredPosts = posts.filter(post => {
    console.log("Post reportType:", post.reportType);
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === "all" || post.reportType === selectedTab;
    return matchesSearch && matchesTab;
  });

  // Hitung total halaman
  const totalPages = Math.ceil(filteredPosts.length / entriesPerPage)

  // Ambil posts untuk halaman saat ini
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  )

  // Fungsi untuk mengubah tab
  const handleTabChange = (tab) => {
    setSelectedTab(tab)
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTab]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh] mt-4">
        <h1 className="text-2xl font-bold mb-4 text-center bg-blue-100 p-2 rounded-md">
          Laporan Saya
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-2 lg:mb-0 order-1 lg:order-none w-full lg:w-auto">
            <div className="relative">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari postingan..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="p-2 pl-10 border rounded-lg w-full lg:w-auto mb-2 lg:mb-0"
              />
            </div>
          </div>
          {/* Tab Navigasi */}
          <div className="flex items-center mb-4 w-full lg:w-auto md:mt-4">
            <h2 className="text-xl font-bold mb-2 text-left mr-4">Filter:</h2>
            <select
              value={selectedTab}
              onChange={(e) => handleTabChange(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full lg:w-auto"
            >
              <option value="all">Semua</option>
              <option value="Penemu">Penemu</option>
              <option value="Pencari">Pencari</option>
            </select>
          </div>
          <div className="mb-2 lg:mb-0 order-2 lg:order-none w-full lg:w-auto text-left">
            <label>
              Show 
              <select
                value={entriesPerPage}
                onChange={e => setEntriesPerPage(Number(e.target.value))}
                className="p-2 border rounded-lg mx-2 w-full lg:w-auto"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              entries
            </label>
          </div>
        </div>
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          <>
            {currentPosts.map(post => (
              <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePostItem post={post} />
              </Link>
            ))}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
              <div className="mb-2 md:mb-0 text-center md:text-left">
                Showing {currentPosts.length} of {filteredPosts.length} entries
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg"
                >
                  Previous
                </button>
                <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <h3 className="text-center font-bold mt-16">Anda tidak memiliki postingan</h3>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default MyPosts