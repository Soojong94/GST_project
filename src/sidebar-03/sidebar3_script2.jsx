import React, { useState } from 'react';
import './style.css'; // CSS 파일을 import

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleExpandClick = () => {
    setCollapsed(!collapsed);
  };

  const handleLinkClick = (hrefLinkClick) => {
    const allLinks = document.querySelectorAll(".sidebar-links a");
    allLinks.forEach((link) => {
      if (link.href === hrefLinkClick) {
        link.classList.add("active");
      } else {
        link.classList.remove('active');
      }
    });
  };

  const imgpath = "../assets/images.png"
  
  return (
    
    <nav className={collapsed ? 'collapsed' : ''}>
      <div className="sidebar-top">
        <a href="#" className="logo__wrapper">
          <img src={imgpath} alt="Logo" className="logo" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHrvVPiqQMIIcwCM-b_rEkwt-m8JMa0NbGAg&usqp=CAU" alt="Logo" className="logo-small" />
        </a>
      </div>
      <div className="sidebar-links">
        <ul>
          <li>
            <a href="#home" onClick={() => handleLinkClick('#home')} className="tooltip">
              <span className="link hide">Home</span>
              <span className="tooltip__content">Home</span>
            </a>
          </li>
          <li>
            <a href="#portfolio" onClick={() => handleLinkClick('#portfolio')} className="tooltip">
              <span className="link hide">Portfolio</span>
              <span className="tooltip__content">Portfolio</span>
            </a>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
      <div className="sidebar-bottom hide">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHrvVPiqQMIIcwCM-b_rEkwt-m8JMa0NbGAg&usqp=CAU" alt="Diamond" />
        <p>Welcome to Laplace Diamond club!</p>
        <button>Explore Benefits</button>
      </div>
      <div className="expand-btn" onClick={handleExpandClick}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHrvVPiqQMIIcwCM-b_rEkwt-m8JMa0NbGAg&usqp=CAU" />
        <span className="hide">Collapse</span>
      </div>
    </nav>
  );
}

export default Sidebar;
