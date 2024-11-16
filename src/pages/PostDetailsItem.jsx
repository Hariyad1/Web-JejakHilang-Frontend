import { useNavigate, useParams } from "react-router-dom";
import Comment from "../component/Comment";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../component/Loader";

const PostDetailsItem = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

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
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true
      });
      navigate("/Item");
    } catch (err) {
      console.log(err);
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
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-4 md:px-8 mt-8">
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
              <p className="text-gray-600">{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p className="text-gray-600">{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <img src={post.photo} className="w-full max-w-[500px] h-auto mt-4" alt="Post Image" />
            {console.log("Image URL:", post.photo)}
          </div>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p className="text-green-600">Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <div
                  key={i}
                  className="bg-yellow-300 rounded-lg px-3 py-1 text-yellow-800"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm md:text-lg text-gray-700 mt-6 mb-4">{post.desc}</p>
            <p className="text-sm md:text-m text-gray-600">Posted by: {post.username}</p>
            <p className="text-sm md:text-m text-gray-600">Contact Number: {post.contactNo}</p>
            {post.reportType && (
              <p className="text-sm md:text-m text-gray-600">Tipe Laporan: {post.reportType}</p>
            )}
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-blue-600 text-xl font-semibold mt-6 mb-4">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* Write a comment */}
          <div className="w-full md:w-[50%] flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 rounded-lg order-1 md:order-1 border border-gray-300 mb-1 md:mb-0 md:mr-4"
            />
            <button
              onClick={postComment}
              className="bg-blue-600 text-white text-sm px-2 py-2 w-full md:w-[20%] mt-4 md:mt-0 rounded-lg hover:bg-blue-400 hover:text-black order-2 md:order-2"
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
