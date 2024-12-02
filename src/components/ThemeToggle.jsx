import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-white hover:bg-white hover:text-blue-500 transition-colors duration-300 p-2 rounded-full z-10"
    >
      {theme === 'light' ? <FaMoon style={{ fontSize: '24px' }} /> : <FaSun style={{ fontSize: '24px' }} />}
    </button>
  );
};

export default ThemeToggle;