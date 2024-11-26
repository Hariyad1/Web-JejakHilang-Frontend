/* eslint-disable react/prop-types */
import { IF } from "../url";
import { TagOutlined, UserOutlined, PhoneOutlined, FileOutlined, CalendarOutlined } from "@ant-design/icons";
import { useTheme } from '../context/ThemeContext';
import LazyLoad from 'react-lazyload';

const HomePostItem = ({ post }) => {
  const { theme } = useTheme();

  return (
    <div className={`w-full flex flex-col lg:flex-row mt-8 space-y-4 lg:space-y-0 lg:space-x-4 bg-white shadow-lg rounded-lg overflow-hidden ${theme}`}>
      <div className="w-full lg:w-[40%] min-h-[250px] lg:h-full relative">
        <LazyLoad height={200} offset={100}>
          <img
            src={post.photo}
            alt={post.title}
            className="absolute inset-0 w-full h-full"
          />
        </LazyLoad>
      </div>

      <div className="flex flex-col w-full lg:w-[60%] p-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
          {post.title}
        </h1>

        <div className="flex flex-col lg:flex-row mb-4 text-sm font-medium text-gray-500 items-start lg:items-center justify-between">
          <div className="flex space-x-2 mb-2 mr-2 lg:mb-0">
            {post.categories?.map((c, i) => (
              <div key={i} className="bg-gray-200 rounded-md p-1">
                <TagOutlined className="mr-2" />
                {c}
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <CalendarOutlined className="ml-4" />
            <p>{new Date(post.updatedAt).toDateString()}</p>
            <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          <span>{post.desc.slice(0, 200)} </span>
          <button
            onClick={() => window.location.href = '#'}
            className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
          >
            Baca Selengkapnya
          </button>
        </p>

        <div className="text-sm font-medium text-gray-800 flex items-center">
          <UserOutlined className="mr-2" />
          Posted by: {post.username}
        </div>
        <div className="text-sm font-medium text-gray-800 flex items-center">
          <PhoneOutlined className="mr-2" />
          Contact Number: {post.contactNo}
        </div>

        <div className="text-sm font-medium mt-2 p-2 bg-gray-100 rounded-md inline-block max-w-max">
          <FileOutlined className="mr-2" />
          {post.reportType}
        </div>
      </div>
    </div>
  );
};

export default HomePostItem;
