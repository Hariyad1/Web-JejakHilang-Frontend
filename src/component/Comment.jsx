/* eslint-disable react/prop-types */
import axios from "axios"
import { MdDelete } from "react-icons/md"
import { UserOutlined, CommentOutlined } from "@ant-design/icons"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Comment = ({c,comments,setComments}) => {

  const {user}=useContext(UserContext)
  const deleteComment=async(id)=>{
    try{
      await axios.delete(URL+"/api/comments/"+id,{withCredentials:true})
      setComments(comments.filter(comment => comment._id !== id))
    }
    catch(err){
      console.log(err)
    }
  }
  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)
  return (
    <div className="w-full md:w-[75%] px-2 py-2 bg-gray-200 rounded-lg my-2 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-2">
          <UserOutlined className="mr-0" />
          <h3 className="font-bold text-gray-600">@{c.author}</h3>
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <p className="text-gray-500 text-sm">{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          {user?._id === c?.userId && (
            <p className="cursor-pointer text-red-600 md:ml-2 absolute top-2 right-2 mt-0 md:static md:mr-0" onClick={() => deleteComment(c._id)}>
              <MdDelete />
            </p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-700 ml-4">
          <CommentOutlined className="mr-2" />
          {c.comment}
        </p>
      </div>
    </div>
  )
}

export default Comment