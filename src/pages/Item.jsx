import axios from "axios"
import Footer from "../component/Footer"
import HomePostItem from "../component/HomePostItem"
import Navbar from "../component/Navbar"
import { URL } from "../url"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from '../component/Loader'
import { UserContext } from "../context/UserContext"

const Item = () => {
  const { search } = useLocation()
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  // State untuk pencarian, paginasi, dan jumlah entitas
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(5)

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

  // Filter posts berdasarkan searchTerm
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Hitung total halaman
  const totalPages = Math.ceil(filteredPosts.length / entriesPerPage)

  // Ambil posts untuk halaman saat ini
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  )

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh] mt-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-2 md:mb-0 order-1 md:order-none">
            <span className="mr-2">Cari</span>
            <input
              type="text"
              placeholder="postingan..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="p-2 border"
            />
          </div>
          <div className="mb-2 md:mb-0 order-2 md:order-none w-full md:w-auto text-left">
            <label>
              Show 
              <select
                value={entriesPerPage}
                onChange={e => setEntriesPerPage(Number(e.target.value))}
                className="p-2 border mx-2"
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
                  className="px-4 py-2 border"
                >
                  Previous
                </button>
                <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border"
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
