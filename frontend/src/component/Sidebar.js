// Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`sidebar ${isHovered ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? '조직도' : ''}
    </div>
  );
}

export default Sidebar;
