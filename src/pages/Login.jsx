import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../context/UserContext";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Email dan password harus diisi.',
        showConfirmButton: true,
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      return;
    }
    try {
      const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true });
      console.log(res.data);
      const token = res.data.token;
      localStorage.setItem('authToken', token);
      setUser(res.data);
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        showConfirmButton: false,
        timer: 1500
      });
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/item");
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: 'Email atau password salah.',
        showConfirmButton: true,
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      console.log(err);
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <header className="p-4 flex justify-between items-center bg-gradient-to-r from-blue-500 to-violet-500 mb-4">
        <h1 className="text-lg md:text-3xl font-extrabold mr-4 pl-0 pr-0 md:pl-20 md:pr-0">
          <Link to="/"> Temukan atau Laporkan Barang Hilang Anda</Link>
        </h1>
        <div className="flex items-center">
          <ThemeToggle />
          <Link to="/register" className="text-white hover:underline ml-4 pl-0 pr-0 md:pr-20">Daftar</Link>
        </div>
      </header>
      <main className="flex-1 flex justify-center items-center">
        <div className={`w-full md:w-1/3 p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md rounded-lg`}>
          <h1 className="text-2xl font-bold mb-4 text-center">Masukkan Akun Anda</h1>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="relative mb-3">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MailOutlined />
            </span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:border-black"
              type="text"
              placeholder="Masukkan Email"
            />
          </div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative mb-3">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockOutlined />
            </span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:border-black"
              type="password"
              placeholder="Masukkan Password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <div className="justify-center flex mt-4">
            <p>Belum memiliki akun?</p>
            <Link to="/register" className="ml-2 text-blue-500 hover:underline">Daftar disini</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
