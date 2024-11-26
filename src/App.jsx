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
import AdminDashboard from "./pages/AdminDashboard"
import About from "./pages/About"
import Service from "./pages/Service"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsAndConditions from "./pages/TermsandConditions"
import { UserContextProvider } from "./context/UserContext"
import ProtectedRoute from "./context/ProtectedRoute"
import NotFound from "./pages/NotFound"

const App = () => {

  return (
    <UserContextProvider>
        <Routes>
          <Route exact path ="/item" element={<Item/>}/>
          <Route exact path ="/others" element={<ProtectedRoute allowedRoles={['user']}><Others/></ProtectedRoute>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/write" element={<ProtectedRoute allowedRoles={['user']}><CreatePost/></ProtectedRoute>}/>
          <Route exact path="/edit/:id" element={<ProtectedRoute allowedRoles={['user']}><EditPost/></ProtectedRoute>}/>
          <Route exact path="/myposts/:id" element={<ProtectedRoute allowedRoles={['user']}><MyPosts/></ProtectedRoute>}/>
          <Route exact path="/posts/post/:id" element={<ProtectedRoute allowedRoles={['user']}><PostDetailsItem/></ProtectedRoute>}/>
          <Route exact path="/profile/:id" element={<ProtectedRoute allowedRoles={['user']}><Profile/></ProtectedRoute>}/>
          <Route exact path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard/></ProtectedRoute>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/service" element={<Service/>}/>
          <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}/>
          <Route exact path="/terms-and-conditions" element={<TermsAndConditions/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </UserContextProvider>
  )
}

export default App
