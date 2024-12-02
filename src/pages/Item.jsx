import axios from "axios"
import Footer from "../components/Footer"
import HomePostItem from "../components/HomePostItem"
import Navbar from "../components/Navbar"
import { IF, URL } from "../url"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from '../components/Loader'
import { UserContext } from "../context/UserContext"
import { SearchOutlined } from "@ant-design/icons";

const Item = () => {
  const { search } = useLocation()
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(5)
  const [selectedTab, setSelectedTab] = useState("all")

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin")
    } else {
      fetchPosts()
    }
  }, [user, search, navigate])

  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + "/api/posts/" + search)
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
  }, [search])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === "all" || post.reportType === selectedTab
    return matchesSearch && matchesTab
  })

  const totalPages = Math.ceil(filteredPosts.length / entriesPerPage)

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  )

  const handleTabChange = (tab) => {
    setSelectedTab(tab)
    setCurrentPage(1)
  }

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh] mt-8 mb-8">
        <h1 className="text-2xl font-bold mb-4 text-center bg-blue-100 p-2 rounded-md" style={{ color: 'black' }}>
          Daftar Laporan
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
              <div className="mb-2 md:mb-0">
                Showing {currentPosts.length} of {filteredPosts.length} entries
              </div>
              <div className="flex">
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
          <h3 className="text-center font-bold mt-16">Tidak ada postingan yang tersedia</h3>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Item
