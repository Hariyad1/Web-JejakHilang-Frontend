import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { UserContext } from "../context/UserContext";
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import '../App.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleRegister = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enter a valid email address.',
        showConfirmButton: true,
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      return;
    }

    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password });
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You can now log in with your new account.',
        showConfirmButton: true,
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setError(false);
      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Something went wrong. Please try again.',
        showConfirmButton: true,
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <header className="p-4 flex justify-between items-center bg-gradient-to-r from-blue-500 to-violet-500 mb-8">
        <h1 className="text-lg md:text-3xl font-extrabold mr-4 pl-0 pr-0 md:pl-20 md:pr-0">
          <Link to="/"> Temukan atau Laporkan Barang Hilang Anda</Link>
        </h1>
        <div className="flex items-center">
          <ThemeToggle />
          <Link to="/login" className="text-white hover:underline ml-4 pl-0 pr-0 md:pr-20">Masuk</Link>
        </div>
      </header>
      <main className="flex-1 flex justify-center items-center mb-8">
        <div className={`w-full md:w-1/3 p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md rounded-lg`}>
          <h1 className="text-2xl font-bold mb-4 text-center">Daftarkan Akun Anda</h1>
          <label className="block text-sm font-medium mb-2">Username</label>
          <div className="relative mb-3">
            <span className="absolute top-2/4 transform -translate-y-2/4 left-0 flex items-center pl-3 pointer-events-none">
              <UserOutlined className="text-gray-400" />
            </span>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 py-2 border rounded-lg focus:outline-none"
              type="text"
              placeholder="Masukkan Username"
            />
          </div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="relative mb-3">
            <span className="absolute top-2/4 transform -translate-y-2/4 left-0 flex items-center pl-3 pointer-events-none">
              <MailOutlined className="text-gray-400" />
            </span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 py-2 border rounded-lg focus:outline-none"
              type="text"
              placeholder="Masukkan Email"
            />
          </div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative mb-3">
            <span className="absolute top-2/4 transform -translate-y-2/4 left-0 flex items-center pl-3 pointer-events-none">
              <LockOutlined className="text-gray-400" />
            </span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-2 border rounded-lg focus:outline-none"
              type="password"
              placeholder="Masukkan Password"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
          {error && <p className="text-red-500 text-sm mt-2">Something went wrong</p>}
          <div className="flex justify-center mt-4">
            <p>Sudah memiliki akun?</p>
            <Link to="/login" className="ml-2 text-blue-500 hover:underline">
              Masuk
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
