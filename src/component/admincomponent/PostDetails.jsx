// frontend/src/components/PostDetails.jsx
import React from 'react';
import { Button } from "antd";
import { CloseOutlined, UserOutlined, PhoneOutlined, FileOutlined, TagOutlined, CalendarOutlined } from "@ant-design/icons";
import Draggable from 'react-draggable';
import Comment from '../../component/Comment';
import '../../App.css';

const PostDetails = ({ selectedPost, closePopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-4 popup-container">
      <Draggable cancel=".no-drag">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mt-10 md:mt-24 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center cursor-move">
            <h1 className="text-lg sm:text-xl font-bold text-blue-600">{selectedPost.title}</h1>
            <Button onClick={closePopup} type="danger" className="no-drag bg-blue-100 p-4 rounded-md" icon={<CloseOutlined />}>
              Close  
            </Button>
          </div>
          <p className="text-gray-500 text-sm mt-1 flex items-center">
            <CalendarOutlined className="mr-2" />
            {new Date(selectedPost.updatedAt).toLocaleString()}
          </p>
          <div className="flex justify-center mt-4">
            <img src={selectedPost.photo} className="max-w-full h-auto" alt="Post Image" />
          </div>
          <div className="mt-4 bg-gray-100 p-4 rounded-md">
            <h1 className="text-gray-700 mb-4">{selectedPost.desc}</h1>
            {selectedPost.categories?.length > 0 && (
              <div className="flex space-x-2 mb-3">
                {selectedPost.categories.map((c, i) => (
                  <div key={i} className="bg-gray-200 rounded-md p-1">
                    <TagOutlined className="mr-2" />
                    {c}
                  </div>
                ))}
              </div>
            )}
            <p className="text-gray-600">
              <UserOutlined className="mr-2" />
              Posted by: {selectedPost.username}
            </p>
            <p className="text-gray-600">
              <PhoneOutlined className="mr-2" />
              Contact Number: {selectedPost.contactNo}
            </p>
            {selectedPost.reportType && (
              <div className="text-sm font-medium mt-2 p-2 bg-gray-200 rounded-md inline-block max-w-max">
                <FileOutlined className="mr-2" />
                {selectedPost.reportType}
              </div>
            )}
            <h3 className="text-blue-600 text-xl font-semibold mt-4">Comments:</h3>
            {selectedPost.comments?.length > 0 ? (
              selectedPost.comments.map((c) => (
                <div key={c._id} className="text-gray-700 text-xs border-gray-300 mb-2">
                  <Comment c={c} post={selectedPost} />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments available</p>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default PostDetails;
