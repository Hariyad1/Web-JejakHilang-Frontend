import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { Table, Button } from "antd";
import { EyeOutlined, DeleteOutlined, MenuOutlined } from "@ant-design/icons";

const AdminDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("posts");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    try {
      await axios.delete(URL + `/api/admin/posts/${id}`, { withCredentials: true });
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(URL + `/api/admin/users/${id}`, { withCredentials: true });
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.log(err);
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

  const showPostDetails = (post) => {
    setSelectedPost(post);
  };

  const closePopup = () => {
    setSelectedPost(null);
  };

  const columnsPosts = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Gambar',
      dataIndex: 'photo',
      key: 'photo',
      render: (text) => <img src={text} alt="Post" className="w-16 h-16 object-cover" />,
    },
    {
      title: 'Judul',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Deskripsi',
      dataIndex: 'desc',
      key: 'desc',
      render: (text) => text.length > 200 ? text.substring(0, 200) + '...' : text,
    },
    {
      title: 'Diposting',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Kontak',
      dataIndex: 'contactNo',
      key: 'contactNo',
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button onClick={() => showPostDetails(record)} icon={<EyeOutlined />} />
          <Button onClick={() => deletePost(record._id)} icon={<DeleteOutlined />} danger />
        </div>
      ),
    },
  ];

  const columnsUsers = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => deleteUser(record._id)} icon={<DeleteOutlined />} danger />
      ),
    },
  ];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (user?.role !== "admin") {
    return <div className="text-center text-red-500">Access Denied</div>;
  }

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => setMenuOpen(!menuOpen)} icon={<MenuOutlined />} />
          <h1 className="hidden md:block text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={logout} type="primary" danger>Logout</Button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="bg-black text-white p-4 rounded-lg">
            <ul>
              <li className="mb-2">
                <Button onClick={() => { setView("posts"); setMenuOpen(false); }} className="text-white">Management Posts</Button>
              </li>
              <li className="mb-2">
                <Button onClick={() => { setView("users"); setMenuOpen(false); }} className="text-white">Management User</Button>
              </li>
            </ul>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{view === "posts" ? "User Posts" : "User Management"}</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search here..."
                className="border rounded px-2 py-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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

          {view === "posts" ? (
            <Table
              columns={columnsPosts}
              dataSource={filteredPosts.slice(0, rowsPerPage)}
              rowKey="_id"
            />
          ) : (
            <Table
              columns={columnsUsers}
              dataSource={filteredUsers.slice(0, rowsPerPage)}
              rowKey="_id"
            />
          )}
        </div>

        {/* Pop-up for Post Details */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">{selectedPost.title}</h1>
                <Button onClick={closePopup} type="danger">Close</Button>
              </div>
              <div className="flex justify-center mt-4">
                <img src={selectedPost.photo} className="max-w-full h-auto" alt="Post Image" />
              </div>
              <div className="mt-4">
                <h1 className="text-gray-700 mb-4">{selectedPost.desc}</h1>
                <p className="text-gray-600">Posted by: {selectedPost.username}</p>
                <p className="text-gray-600">Contact Number: {selectedPost.contactNo}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-blue-600 text-xl font-semibold">Comments:</h3>
                {selectedPost.comments?.length > 0 ? (
                  selectedPost.comments.map((c) => (
                    <div key={c._id} className="text-gray-700">
                      {c.text}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Comment kosong</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 