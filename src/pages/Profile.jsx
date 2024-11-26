import { useContext, useEffect, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserOutlined, MailOutlined, EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
  const { theme } = useTheme();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const fetchProfile = async () => {
    if (!user || !user._id) return;
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);

    // Validasi email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    if (!user || !user._id) return;
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param, user]);

  useEffect(() => {
    fetchUserPosts();
  }, [param, user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const columns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Image',
      dataIndex: 'photo',
      key: 'photo',
      render: (text, record) => (
        record.photo ? <img src={record.photo} alt={record.title} style={{ width: 50, height: 50 }} /> : 'No Image'
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
      className: 'hidden md:table-cell',
      render: (text) => (
        <span>
          {text.length > 250 ? `${text.substring(0, 250)}...` : text}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span className="flex items-center">
          <Link
            to={user ? `/posts/post/${record._id}` : "/login"}
            className="flex items-center px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <EyeOutlined className="mr-2" />
            View
          </Link>
        </span>
      ),
    },
  ];

  return (
    <div className={`min-h-screen ${theme}`}>
      <Navbar />
      <div className="px-4 md:px-8 md:space-x-8 mt-8 mb-8 flex mx-0 md:mx-2 lg:mx-32 flex-col md:flex-row z-10">
        <div className="md:w-[70%] w-full md:mt-0 mb-8 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Your Posts:</h1>
          <Table
            dataSource={posts}
            columns={columns}
            rowKey="_id"
            pagination={{
              ...pagination,
              showTotal: (total, range) => `Total items: ${total}`,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20'],
            }}
            onChange={handleTableChange}
          />
        </div>
        <div className="md:sticky md:top-12 md:w-[30%] w-full md:items-end">
          <div className={`flex flex-col space-y-4 items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="flex items-center space-x-2">
              <UserOutlined />
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Your Username"
                type="text"
              />
            </div>
            <div className="flex items-center space-x-2">
              <MailOutlined />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                type="email"
              />
            </div>
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-semibold transition duration-300 ease-in-out"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-semibold transition duration-300 ease-in-out"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
