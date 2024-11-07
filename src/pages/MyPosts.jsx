import { Link, useLocation } from "react-router-dom"
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import HomePostItem from "../component/HomePostItem"
import Loader from "../component/Loader"


const MyPosts = () => {
    const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  // console.log(user)

  const fetchPosts=async()=>{
    if (!user || !user._id) return;
    setLoader(true);
    try{
      const res=await axios.get(`${URL}/api/posts/user/${user._id}`)
      // console.log(res.data)
      setPosts(res.data.reverse())
      setNoResults(res.data.length === 0);
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoader(false);
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search, user])

  return (
    <div>
        <Navbar/>
        <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <HomePostItem key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">Anda tidak memiliki postingan</h3>}
        </div>
        <Footer/>
    </div>
  )
}

export default MyPosts