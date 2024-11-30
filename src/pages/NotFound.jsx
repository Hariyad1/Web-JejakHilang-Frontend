import React from 'react';
import { useTheme } from '../context/ThemeContext';

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: theme.backgroundColor,
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{ fontSize: '100px', color: theme.primaryColor || '#00BFFF' }}>404</div>
      <h1 style={{ color: theme.textColor }}>Oops, Halaman tidak ditemukan!</h1>
      <p style={{ color: theme.textColor }}>Tidak ada siapa-siapa di sini!</p>
      <a href="/" style={{ color: theme.linkColor || '#00BFFF', textDecoration: 'none', fontSize: '18px' }}>Kembali ke Home</a>
    </div>
  );
};

export default NotFound;