import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserOutlined, MailOutlined, EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useTheme } from '../context/ThemeContext';
import Swal from 'sweetalert2';
import '../App.css';

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
      const res = await axios.get(URL + "/api/users/" + user._id, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address with @gmail.com, @yahoo.com, or @outlook.com domain.',
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      return;
    }

    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(username)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Username',
        text: 'Username can only contain letters and numbers.',
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      return;
    }

    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );
      setUpdated(true);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User updated successfully!',
        customClass: {
          confirmButton: 'swal-button'
        }
      });
    } catch (err) {
      console.log(err);
      setUpdated(false);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an error updating the user.',
        customClass: {
          confirmButton: 'swal-button'
        }
      });
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
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
      const res = await axios.get(URL + "/api/posts/user/" + user._id, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
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
      title: 'Gambar',
      dataIndex: 'photo',
      key: 'photo',
      render: (text, record) => (
        record.photo ? <img src={record.photo} alt={record.title} style={{ width: 50, height: 50 }} /> : 'No Image'
      ),
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
      className: 'hidden md:table-cell',
      width: 300,
      render: (text) => (
        <div style={{ 
          maxWidth: '300px',
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap' 
        }}>
          {text}
        </div>
      ),
    },
    {
      title: 'Aksi',
      key: 'actions',
      align: 'center',
      width: 100,
      render: (text, record) => (
        <div className="flex justify-center">
          <Link
            to={user ? `/posts/post/${record._id}` : "/login"}
            className="flex items-center px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <EyeOutlined className="mr-2" />
            View
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div id="root" className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Navbar />
      <div className="flex-grow px-4 md:px-8 mt-8 mb-8 flex flex-col lg:flex-row mx-0 md:mx-2 lg:mx-32 z-10">
        <div className="flex flex-col items-center lg:items-start lg:w-[30%] w-full mb-8 lg:mb-0">
          <div className={`flex flex-col space-y-4 items-start p-4 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
               style={{ width: '100%', maxWidth: '300px', minHeight: '270px' }}>
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
          </div>
        </div>
        <div className="lg:w-[70%] w-full lg:ml-8 flex flex-col justify-between">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Postingan Anda:</h1>
          <div className={`overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
              scroll={{ x: '100%' }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
