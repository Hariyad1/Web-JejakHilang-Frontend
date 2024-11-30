import { useContext, useEffect, useState } from "react"
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import {ImCross} from 'react-icons/im'
import axios from "axios"
import { URL, IF } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import Swal from "sweetalert2"

function validateContactNo(contactNo) {
  const contactNoPattern = /^\+?[0-9]{9,15}$/;
  return contactNoPattern.test(contactNo);
}

const EditPost = () => {
  const postId=useParams().id
  const {user}=useContext(UserContext)
  const [contactNo,setContactNo]=useState("")
  const navigate=useNavigate()
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [file,setFile]=useState(null)
  const [reportType,setReportType]=useState("")
  const [cat,setCat]=useState("")
  const [cats,setCats]=useState([])
  const [photo, setPhoto] = useState("");

  const fetchPost=async()=>{
    try{
      const res=await axios.get(URL+"/api/posts/"+postId)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setPhoto(res.data.photo)
      setCats(res.data.categories)
      setContactNo(res.data.contactNo)
      setReportType(res.data.reportType)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleUpdate=async (e)=>{
    e.preventDefault();

    // Validate title: minimum 5 characters
    if (title.trim().length < 5) {
      Swal.fire({
        icon: 'error',
        title: 'Judul tidak valid',
        text: 'Judul harus memiliki setidaknya 5 karakter.',
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      return;
    }

    // Validate categories: maximum 3 categories
    if (cats.length > 2) {
      Swal.fire({
        icon: 'error',
        title: 'Terlalu Banyak Kategori',
        text: 'Anda hanya dapat memilih hingga 2 kategori.',
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      return;
    }

    // Validate description: minimum 25 characters
    if (desc.trim().length < 25) {
      Swal.fire({
        icon: 'error',
        title: 'Deskripsi tidak valid',
        text: 'Deskripsi harus memiliki setidaknya 25 karakter.',
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      return;
    }

    // Validate contact number: must be filled and valid
    if (!validateContactNo(contactNo)) {
      Swal.fire({
        icon: 'error',
        title: 'Nomor Kontak tidak valid',
        text: 'Silakan masukkan nomor kontak yang valid.',
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      return;
    }

    // Validate report type: must be selected
    if (!reportType) {
      Swal.fire({
        icon: 'error',
        title: 'Jenis Laporan Diperlukan',
        text: 'Silakan pilih jenis laporan.',
        customClass: {
          confirmButton: 'swal-button'
        }
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda tidak dapat membatalkan ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, perbarui!',
      customClass: {
        confirmButton: 'swal-button'
      }
    });

    if (result.isConfirmed) {
      const post = {
        title,
        desc,
        username: user.username,
        userId: user._id,
        categories: cats,
        contactNo: contactNo,
        reportType: reportType
      };

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("img", filename);
        data.append("file", file);
        post.photo = filename;

        try {
          const imgUpload = await axios.post(URL + "/api/upload", data);
        } catch (err) {
          console.log(err);
        }
      } else {
        post.photo = photo;
      }

      try {
        const res = await axios.put(URL + "/api/posts/" + postId, post, { withCredentials: true });
        Swal.fire({
          title: 'Diperbarui!',
          text: 'Postingan Anda telah diperbarui.',
          icon: 'success',
          customClass: {
            confirmButton: 'swal-button'
          }
        });
        navigate("/posts/post/" + res.data._id);
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: 'Terjadi kesalahan saat memperbarui postingan Anda.',
          icon: 'error',
          customClass: {
            confirmButton: 'swal-button'
          }
        });
      }
    }
  }

  useEffect(()=>{
    fetchPost()
  },[postId])

  const deleteCategory = (i) => {
    let updatedCats = [...cats]
    updatedCats.splice(i, 1)
    setCats(updatedCats)

  }
  const addCategory = () => {
    let updatedCats = [...cats]
    updatedCats.push(cat)
    setCat("")
    setCats(updatedCats)
  }
  return (

   <div className=" bg-gray-100 ">
    <Navbar/>
    <div className="px-8 md:px-64 mt-8 w-[100%] mb-8">
      <h1 className="font-bold text-2xl md:text-3xl mt-8 text-center">Edit Laporan Anda </h1>
      <form className="w-full mt-4 space-y-4 md:space-y-8">
        <div>
          <h2 className="font-semibold mb-2">Judul Laporan:</h2>
          <input  onChange={(e)=>setTitle(e.target.value)} value={title} type="text" className="px-4 py-2 outline-none w-full  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter post title"></input>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Foto Laporan:</h2>
          <input onChange={(e)=>setFile(e.target.files[0])} type="file" className="px-4 w-full md:w-2/3"></input>
        </div>
        {photo && !file && <img src={photo} alt="Current" className="w-full md:w-1/3 mt-4" />}
        <div className="flex flex-col">
          <div></div>
            <h2 className="font-semibold mb-2">Kategori Laporan:</h2>
            <div className="flex items-center space-x-4 md:space-x-8"> 
              <input value={cat} onChange={(e)=>setCat(e.target.value)} className="px-4 py-2 outline-none   border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter the post catergory" type="text"></input>
            <div onClick={addCategory} className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-blue-600">Tambah</div>            
          </div>

          <div className="flex px-4 mt-3">
            {cats?.map((c,i)=>(
          <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
            <p>{c}</p>
            <p onClick={()=>deleteCategory(i)} className="text-white bg-red-500 rounded-full cursor-pointer p-1 text-sm hover:bg-red-600"><ImCross/></p>
          </div> ))}
            
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Deskripsi Laporan:</h2>
          <textarea  onChange={(e)=>setDesc(e.target.value)} value={desc}  rows={5} cols={0} className="px-4 py-2 outline-none w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter post description"/>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Nomor Kontak:</h2>
          <input onChange={(e)=>setContactNo(e.target.value)} value={contactNo} type="text" className="px-4 py-2 outline-none w-full md:w-2/3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter contact Number"></input>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Jenis Laporan:</h2>
          <div className="flex space-x-10">
            <label className="flex items-center text-lg">
              <input
                type="radio"
                value="Penemu"
                checked={reportType === "Penemu"}
                onChange={(e) => setReportType(e.target.value)}
                className="radio-large"
              />
              Penemu (Orang yang Menemukan)
            </label>
            <label className="flex items-center text-lg">
              <input
                type="radio"
                value="Pencari"
                checked={reportType === "Pencari"}
                onChange={(e) => setReportType(e.target.value)}
                className="radio-large"
              />
              Pencari (Orang yang Mencari)
            </label>
          </div>
        </div>
        <div className="flex flex-wrap">
        <button onClick={handleUpdate}  className="bg-blue-500 w-full md:w-1/4 mx-auto text-white font-semibold px-4 py-2 rounded-lg md:text-xl text-lg hover:bg-blue-600">Update</button>
        </div>
        
      </form>

    </div>
    <Footer/>
          </div>

  )
}

export default EditPost
