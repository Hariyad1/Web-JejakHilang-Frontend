// frontend/src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { Table, Button, Pagination } from "antd";
import { EyeOutlined, DeleteOutlined, MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import PostDetails from "../component/admincomponent/PostDetails";
import AdminMenu from "../component/admincomponent/AdminMenu";

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
      render: (text) => <img src={text} alt="No Image" className="w-16 h-16 object-cover" />,
    },
    {
      title: 'Judul',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Deskripsi',
      dataIndex: 'desc',
      key: 'desc',
      width: 400,
      className: 'hidden md:table-cell',
      render: (text) => (
        <div style={{ 
          whiteSpace: 'normal', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          width: '400px', 
          maxWidth: '100%', 
          boxSizing: 'border-box'
        }}>
          {text.length > 300 ? text.substring(0, 300) + '...' : text}
        </div>
      ),
    },
    {
      title: 'Jenis Laporan',
      dataIndex: 'reportType',
      key: 'reportType',
      className: 'hidden md:table-cell',
      sorter: (a, b) => {
        const order = { 'pencari': 1, 'penemu': 2 };
        return order[a.reportType] - order[b.reportType];
      },
    },
    {
      title: 'Diposting',
      dataIndex: 'username',
      key: 'username',
      className: 'hidden md:table-cell',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Kontak',
      dataIndex: 'contactNo',
      key: 'contactNo',
      className: 'hidden md:table-cell',
      sorter: (a, b) => a.contactNo.localeCompare(b.contactNo),
    },
    {
      title: 'Aksi',
      key: 'action',
      align: 'center',
      width: 150,
      render: (text, record) => (
        <div className="flex justify-center space-x-2">
          <Button 
            onClick={() => showPostDetails(record)} 
            icon={<EyeOutlined />} 
            className="flex items-center justify-center"
          >
            View
          </Button>
          <Button 
            onClick={() => deletePost(record._id)} 
            icon={<DeleteOutlined />} 
            danger 
            className="flex items-center justify-center"
          >
            Delete
          </Button>
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
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  if (user?.role !== "admin") {
    return <div className="text-center text-red-500">Access Denied</div>;
  }

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center md:mx-16 lg:mx-64 mb-4">
          <Button onClick={() => setMenuOpen(!menuOpen)} icon={<MenuOutlined />} />
          <h1 className="hidden md:block text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={logout} type="primary" danger className="flex items-center justify-center">
            Logout <LogoutOutlined />
          </Button>
        </div>

        {menuOpen && (
          <AdminMenu setView={setView} setMenuOpen={setMenuOpen} />
        )}

        <div className="bg-white shadow-lg rounded-lg p-4 md:mx-16 lg:mx-64">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-2xl font-semibold mb-2 md:mb-0">
              {view === "posts" ? "User Posts" : "User Management"}
            </h2>
            <div className="flex space-x-2 ml-auto">
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
            <>
              <Table
                columns={columnsPosts}
                dataSource={paginatedPosts}
                rowKey="_id"
                pagination={false}
              />
              <Pagination
                current={currentPage}
                pageSize={rowsPerPage}
                total={filteredPosts.length}
                onChange={handlePageChange}
                className="mt-4 text-center"
              />
            </>
          ) : (
            <>
              <Table
                columns={columnsUsers}
                dataSource={paginatedUsers}
                rowKey="_id"
                pagination={false}
              />
              <Pagination
                current={currentPage}
                pageSize={rowsPerPage}
                total={filteredUsers.length}
                onChange={handlePageChange}
                className="mt-4 text-center"
              />
            </>
          )}
        </div>

        {selectedPost && (
          <PostDetails selectedPost={selectedPost} closePopup={closePopup} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;