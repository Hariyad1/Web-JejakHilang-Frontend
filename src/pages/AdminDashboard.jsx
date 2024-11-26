// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../context/UserContext";
import { Table, Button, Pagination } from "antd";
import { SearchOutlined, EyeOutlined, DeleteOutlined, MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import PostDetails from "../component/admincomponent/PostDetails";
import AdminMenu from "../component/admincomponent/AdminMenu";
import UserTable from "../component/admincomponent/UserTable";
import PostTable from "../component/admincomponent/PostTable";
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../App.css';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("posts");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (user?.role === "admin") {
      fetchPosts();
      fetchUsers();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/admin/posts", { withCredentials: true });
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(URL + "/api/admin/users", { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda tidak dapat mengembalikan data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(URL + `/api/admin/posts/${id}`, { withCredentials: true });
        setPosts(posts.filter(post => post._id !== id));
        Swal.fire({
          title: 'Dihapus!',
          text: 'Data telah dihapus.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-swal-button'
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda tidak dapat mengembalikan data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(URL + `/api/admin/users/${id}`, { withCredentials: true });
        setUsers(users.filter(user => user._id !== id));
        Swal.fire({
          title: 'Dihapus!',
          text: 'Data telah dihapus.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-swal-button'
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null);
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  const showPostDetails = async (post) => {
    const comments = await fetchComments(post._id);
    setSelectedPost({ ...post, comments });
  };

  const closePopup = () => {
    setSelectedPost(null);
  };

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(URL + `/api/comments/post/${postId}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  if (user?.role !== "admin") {
    return <div className="text-center text-red-500">Access Denied</div>;
  }

  return (
    <div className={`${theme === 'dark' ? 'dark-mode' : ''} ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <div className="flex-1 p-4 mx-4 md:mx-16 lg:mx-32">
        <div className="flex justify-between items-center mb-4 relative">
          <div className="relative">
            <Button onClick={() => setMenuOpen(!menuOpen)} icon={<MenuOutlined />} />
            {menuOpen && (
              <AdminMenu setView={setView} setMenuOpen={setMenuOpen} />
            )}
          </div>
          <h1 className="hidden md:block text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button onClick={toggleTheme} className="flex items-center justify-center">
              {theme === 'light' ? <FaMoon style={{ fontSize: '24px' }} /> : <FaSun style={{ fontSize: '24px' }} />}
            </Button>
            <Button onClick={logout} type="primary" danger className="flex items-center justify-center">
              Logout <LogoutOutlined />
            </Button>
          </div>
        </div>

        <div className={`shadow-lg rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`} style={{ width: '100%', overflowX: 'auto' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-2xl font-semibold mb-2 md:mb-0">
              {view === "posts" ? "Post Management" : "User Management"}
            </h2>
            <div className="flex space-x-2 ml-auto">
              <div className="flex items-center border rounded px-2 py-1">
                <SearchOutlined className="mr-2" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="flex-1 border-none outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          <div className="hide-scrollbar" style={{ overflowX: 'true' }}>
          {view === "posts" ? (
            <PostTable posts={paginatedPosts} theme={theme} showPostDetails={showPostDetails} deletePost={deletePost} />
          ) : (
            <UserTable users={paginatedUsers} theme={theme} deleteUser={deleteUser} />
          )}
          <Pagination
            current={currentPage}
            pageSize={rowsPerPage}
            total={view === "posts" ? filteredPosts.length : filteredUsers.length}
            onChange={handlePageChange}
            className="mt-4 text-center"
          />
          </div>
        </div>

        {selectedPost && (
          <PostDetails selectedPost={selectedPost} closePopup={closePopup} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;