import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { MenuOutlined } from "@ant-design/icons";
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user, setUser } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.get(URL + "/api/auth/logout", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem('authToken');
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`bg-gradient-to-r from-blue-500 to-violet-500 p-4 ${theme}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Temukan atau Laporkan Barang Hilang Anda
          </h1>
        </div>
        <div className="hidden md:flex items-center justify-center space-x-4 ml-16">
          {user ? (
            <>
              <h3
                className={`border rounded p-1 hover:underline transition-colors duration-300 ${
                  currentPath === `/profile/${user._id}` ? 'bg-white text-blue-500' : 'text-white hover:bg-white hover:text-blue-500'
                } ${theme === 'light' && currentPath === `/profile/${user._id}` ? 'text-black' : ''}`}
              >
                <Link to={`/profile/${user._id}`}>Profil</Link>
              </h3>
              <h3
                className={`border rounded p-1 hover:underline transition-colors duration-300 ${
                  currentPath === '/write' ? 'bg-white text-blue-500' : 'text-white hover:bg-white hover:text-blue-500'
                } ${theme === 'light' && currentPath === '/write' ? 'text-black' : ''}`}
              >
                <Link to="/write">Buat Laporan</Link>
              </h3>
              <h3
                className={`border rounded p-1 hover:underline transition-colors duration-300 ${
                  currentPath === `/myposts/${user._id}` ? 'bg-white text-blue-500' : 'text-white hover:bg-white hover:text-blue-500'
                } ${theme === 'light' && currentPath === `/myposts/${user._id}` ? 'text-black' : ''}`}
              >
                <Link to={`/myposts/${user._id}`}>Laporan Saya</Link>
              </h3>
              <h3
                className={`border rounded p-1 hover:underline transition-colors duration-300 ${
                  currentPath === '/Item' ? 'bg-white text-blue-500' : 'text-white hover:bg-white hover:text-blue-500'
                } ${theme === 'light' && currentPath === '/Item' ? 'text-black' : ''}`}
              >
                <Link to="/Item">Daftar Laporan</Link>
              </h3>
              <h3
                onClick={handleLogout}
                className="border rounded p-1 text-white hover:underline hover:bg-white hover:text-blue-500 transition-colors duration-300 cursor-pointer ml-2"
              >
                Logout
              </h3>
            </>
          ) : (
            <>
              <h3 className="border rounded p-2 hover:underline text-white hover:bg-white hover:text-blue-500 transition-colors duration-300">
                <Link to="/login">Login</Link>
              </h3>
              <h3 className="border rounded p-2 bg-blue-600 text-white hover:underline hover:bg-blue-800 hover:text-blue-500 transition-colors duration-300">
                <Link to="/register">Register</Link>
              </h3>
            </>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <button
            onClick={toggleTheme}
            className="border rounded p-2 text-white hover:underline hover:bg-white hover:text-blue-500 transition-colors duration-300 flex items-center mb-2 md:mb-0 md:ml-4"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <div
            onClick={showMenu}
            className="md:hidden text-2xl cursor-pointer text-white relative"
          >
            <p className="cursor-pointer relative">
              <MenuOutlined />
            </p>
            {menu && <Menu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
