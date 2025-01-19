import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p className="text-sm text-gray-600">PFM</p>
        <p className="text-xs text-gray-600">© 2023 Personal Finance Manager. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;