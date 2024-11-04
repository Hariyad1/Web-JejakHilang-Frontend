import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Item from "./pages/Item"
import Others from "./pages/Others"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PostDetailsItem from "./pages/PostDetailsItem"
import CreatePost from "./pages/CreatePost"
import EditPost from "./pages/EditPost"
import Profile from "./pages/Profile"
import MyPosts from "./pages/MyPosts"
import { UserContextProvider } from "./context/UserContext"


const App = () => {
  return (
    <UserContextProvider>
        <Routes>
        <Route exact path ="/item" element={<Item/>}/>
        <Route exact path ="/others" element={<Others/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/write" element={<CreatePost/>}/>
        <Route exact path="/edit/:id" element={<EditPost/>}/>
        <Route exact path="/myposts/:id" element={<MyPosts/>}/>
        <Route exact path="/posts/post/:id" element={<PostDetailsItem/>}/>
        <Route exact path="/profile/:id" element={<Profile/>}/>
        </Routes>
    </UserContextProvider>
  )
}

export default App
