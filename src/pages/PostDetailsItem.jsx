import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { UserOutlined, PhoneOutlined, TagOutlined, FileOutlined, CalendarOutlined } from "@ant-design/icons";
import axios from "axios";
import { IF, URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { useTheme } from '../context/ThemeContext';
import Swal from 'sweetalert2';

const PostDetailsItem = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
      console.log("Post data:", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'swal-button'
      }
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(URL + "/api/posts/" + postId, {
          withCredentials: true
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your post has been deleted.',
          icon: 'success',
          customClass: {
            confirmButton: 'swal-button'
          }
        });
        navigate("/Item");
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error deleting your post.',
          icon: 'error',
          customClass: {
            confirmButton: 'swal-button'
          }
        });
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        { comment: comment, author: user.username, postId: postId, userId: user._id },
        { withCredentials: true }
      );
      setComments([...comments, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`min-h-screen ${theme}`}>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-64 mt-8 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600 md:text-3xl">{post.title}</h1>
            {user?._id === post?.userId && (
              <div className="flex items-center text-4xl justify-center space-x-4">
                <p
                  className="cursor-pointer text-red-600 hover:text-red-400"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer text-red-600 hover:text-red-400" 
                onClick={handleDeletePost}><MdDelete/></p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <div className="flex space-x-2">
              <CalendarOutlined className="mr-2" />
              <p className="text-gray-600">{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p className="text-gray-600">{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <img src={post.photo} className="w-full max-w-[500px] h-auto mt-4" alt="Post Image" />
          </div>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            {post.categories && post.categories.length > 0 && (
              <>
                <p className="text-green-600">Kategori:</p>
                <div className="flex justify-center items-center space-x-2">
                  {post.categories.map((c, i) => (
                    <div
                      key={i}
                      className="bg-yellow-300 rounded-lg px-3 py-1 text-yellow-800"
                    >
                      <TagOutlined className="mr-2" />
                      {c}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            <p className="text-sm md:text-lg text-gray-700 mt-6 mb-4">{post.desc}</p>
            <p className="text-sm md:text-m text-gray-600">
              <UserOutlined className="mr-2" />
              Posted by: {post.username}
            </p>
            <p className="text-sm md:text-m text-gray-600">
              <PhoneOutlined className="mr-2" />
              Contact Number: {post.contactNo}
            </p>
            {post.reportType && (
              <p className="text-sm md:text-m text-gray-600">
                <FileOutlined className="mr-2" />
                Tipe Laporan: {post.reportType}
              </p>
            )}
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-blue-600 text-xl font-semibold mt-6 mb-4">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} comments={comments} setComments={setComments} />
            ))}
          </div>
          <div className="w-full md:w-[75%] flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[100%] outline-none py-2 px-4 mt-4 md:mt-0 rounded-lg order-1 md:order-1 border border-gray-300 mb-1 md:mb-0 md:mr-4"
            />
            <button
              onClick={postComment}
              className="bg-blue-600 text-white text-sm px-2 py-2 w-full md:w-[40%] mt-4 md:mt-0 rounded-lg hover:bg-blue-400 hover:text-black order-2 md:order-2"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetailsItem;
