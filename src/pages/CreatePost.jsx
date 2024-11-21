import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { ImCross } from 'react-icons/im';
import { URL } from '../url';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function validateContactNo(contactNo) {
  const contactNoPattern = /^\+?[0-9]{9,15}$/;
  return contactNoPattern.test(contactNo);
}

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [contactno, setContactNo] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();
  const [reportType, setReportType] = useState("");

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (cat.trim() === "") return;

    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
      contactNo: contactno,
      reportType,
    };

    // Image upload
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", Date.now() + file.name);

      try {
        const imgUpload = await axios.post(URL + "/api/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Simpan URL yang dikembalikan oleh ImageKit
        post.photo = imgUpload.data.url; // Pastikan ini adalah path yang benar dari response
      } catch (err) {
        console.log(err);
      }
    }

    // Post upload
    try {
      if (!validateContactNo(contactno)) {
        throw new Error('Please enter a valid contact number');
      }
      const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" bg-gray-100 " >
      <Navbar />
      <div className="px-8 md:px-64 mt-8 w-full">
        <h1 className="font-bold text-2xl md:text-3xl mt-8 text-center">Buat Laporan</h1>
        <form className="w-full mt-4 space-y-4 md:space-y-8">
          <div>
            <h2 className="font-semibold mb-2">Judul Laporan:</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="px-4 py-2 outline-none w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Judul Laporan"
            />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Foto Laporan:</h2>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="px-1 w-full md:w-2/3"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <div>
                <h2 className="font-semibold mb-2">Kategori Laporan:</h2>
                <input
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="px-4 py-2 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64 mr-4"
                  placeholder="Masukkan Kategori Laporan"
                  type="text"
                />
                <button
                  onClick={addCategory}
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-blue-600"
                >
                  Tambah
                </button>
              </div>
            </div>
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-red-500 rounded-full cursor-pointer p-1 text-sm hover:bg-red-600"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Deskripsi Laporan:</h2>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
              cols={20}
              className="px-4 py-2 outline-none w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Deskripsi Laporan"
            />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Nomor Kontak:</h2>
            <input
              onChange={(e) => setContactNo(e.target.value)}
              type="text"
            className="px-4 py-2 outline-none w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Nomor Kontak"
            />
          </div>
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Pilih Laporan:</h2>
            <div className="flex space-x-10">
              <label className="flex items-center text-lg">
                <input
                  type="radio"
                  value="Penemu"
                  checked={reportType === "Penemu"}
                  onChange={(e) => setReportType(e.target.value)}
                  className="mr-3"
                />
                Penemu (Orang yang Menemukan)
              </label>
              <label className="flex items-center text-lg">
                <input
                  type="radio"
                  value="Pencari"
                  checked={reportType === "Pencari"}
                  onChange={(e) => setReportType(e.target.value)}
                  className="mr-3"
                />
                Pencari (Orang yang Mencari)
              </label>
            </div>
          </div>
          <div className="flex flex-wrap">
            <button
              onClick={handleCreate}
              className="bg-blue-500 w-full md:w-1/4 mx-auto text-white font-semibold px-4 py-2 rounded-lg md:text-xl text-lg hover:bg-blue-600"
            >
              Create
            </button>
          </div>

        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
