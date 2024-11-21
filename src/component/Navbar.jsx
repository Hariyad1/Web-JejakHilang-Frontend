import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { MenuOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user, setUser } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          <Link to="/Item">Temukan Atau Laporkan Barang Hilang Anda</Link>
        </h1>
        <div className="hidden md:flex items-center justify-center space-x-4 ml-2">
          {user ? (
            <>
              <h3 className="border rounded p-2 hover:underline text-white hover:bg-white hover:text-blue-500 transition-colors duration-300">
                <Link
                  to={"/profile/" + user._id}
                >
                  Profil
                </Link>
              </h3>
              <h3 className="border rounded p-2 hover:underline text-white hover:bg-white hover:text-blue-500 transition-colors duration-300">
                <Link
                  to="/write"
                >
                  Buat Laporan
                </Link>
              </h3>
              <h3 className="border rounded p-2 hover:underline text-white hover:bg-white hover:text-blue-500 transition-colors duration-300">
                <Link
                  to={"/myposts/" + user._id}
                >
                  Laporan Saya
                </Link>
              </h3>
              <h3 className="border rounded p-2 hover:underline text-white hover:bg-white hover:text-blue-500 transition-colors duration-300">
                <Link
                  to={"/Item"}
                >
                  Daftar Laporan
                </Link>
              </h3>
              <h3
                onClick={handleLogout}
                className="border rounded p-2 text-white hover:underline hover:bg-white hover:text-blue-500 transition-colors duration-300 cursor-pointer"
              >
                Logout
              </h3>
            </>
          ) : (
            <>
              <h3 className="border rounded p-2 hover:underline text-white hover:bg-white hover:text-blue-500 transition-colors duration-300">
                <Link
                  to="/login"
                >
                  Login
                </Link>
              </h3>
              <h3 className="border rounded p-2 hover:underline text-white hover:bg-white hover:text-blue-500 transition-colors duration-300">
                <Link
                  to="/register"
                >
                  Register
                </Link>
              </h3>
            </>
          )}
        </div>
        <div
          onClick={showMenu}
          className="md:hidden text-2xl cursor-pointer text-white ml-2"
        >
          <p className="cursor-pointer relative">
            <MenuOutlined />
            
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
