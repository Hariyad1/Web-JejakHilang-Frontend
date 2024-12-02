import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      {children}
    </div>
  );
};

export default ThemeWrapper;