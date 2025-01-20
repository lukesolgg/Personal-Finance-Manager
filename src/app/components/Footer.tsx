import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // Adjust according to needed icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2025 Personal Finance Manager</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;