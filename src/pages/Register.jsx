import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validasi format email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-4  flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500">
        <h1 className="text-lg md:text-3xl pl-20 font-extrabold">
          <Link to="/">Temukan Barang Hilang Anda</Link>
        </h1>
        <Link to="/login" className="text-white pr-20 hover:underline">Masuk</Link>
      </header>
      <main className="flex-1 flex justify-center items-center">
        <div className="w-full md:w-1/3 p-4 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Daftarkan Akun Anda</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none"
            type="text"
            placeholder="Masukkan Username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none"
            type="text"
            placeholder="Masukkan Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none"
            type="password"
            placeholder="Masukkan Password"
          />
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
