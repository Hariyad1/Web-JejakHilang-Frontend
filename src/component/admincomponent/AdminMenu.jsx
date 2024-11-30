// frontend/src/components/AdminMenu.jsx
import React from 'react';
import { Button } from "antd";
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';

const AdminMenu = ({ setView, setMenuOpen }) => {
  const handleViewChange = (view) => {
    setView(view);
    setMenuOpen(false);
  };

  return (
    <div
      className="absolute top-full left-0 bg-black text-white p-2 rounded-lg shadow-lg inline-block"
      style={{ zIndex: 1000 }}
    >
      <ul>
        <li className="mb-2">
          <Button 
            onClick={() => handleViewChange("posts")} 
            className="text-white bg-black p-2 rounded-md"
            style={{ margin: '4px' }}
            icon={<FileTextOutlined />}
          >
            Post Management
          </Button>
        </li>
        <li className="mb-2">
          <Button 
            onClick={() => handleViewChange("users")} 
            className="text-white bg-black p-2 rounded-md"
            style={{ margin: '4px' }}
            icon={<UserOutlined />}
          >
            User Management
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
