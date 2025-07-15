import React from 'react';
import './Loader.css'; // You can also use styled-components or Tailwind CSS

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;